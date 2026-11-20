/// <reference path="helper/TileMapHelper.d.ts" />
namespace gdjs {
  export class SimpleTileMapEditor {
    inGameEditor: gdjs.InGameEditor;
    object: gdjs.SimpleTileMapRuntimeObject | null = null;
    currentTool: gdjs.SimpleTileMapEditor.SimpleTileMapEditorTool | null = null;
    freeHandTool: gdjs.SimpleTileMapEditor.FreeHandTool;

    pickedTilesMinX: integer = 0;
    pickedTilesMinY: integer = 0;
    pickedTilesMaxX: integer = 0;
    pickedTilesMaxY: integer = 0;
    arePickedTilesFlippedHorizontally = false;
    arePickedTilesFlippedVertically = false;

    constructor(inGameEditor: gdjs.InGameEditor) {
      this.inGameEditor = inGameEditor;
      this.freeHandTool = new gdjs.SimpleTileMapEditor.FreeHandTool(this);

      if (gdjs.registerInGameEditorPostStepCallback) {
        gdjs.registerInGameEditorPostStepCallback((editor) =>
          this.update(editor)
        );
      }
    }

    update(editor: InGameEditor): void {
      const selectedObjects = editor.getSelectedObjects();
      const object =
        selectedObjects.length === 1 &&
        selectedObjects[0] instanceof gdjs.SimpleTileMapRuntimeObject
          ? selectedObjects[0]
          : null;
      if (!object) {
        return;
      }
      if (object !== this.object) {
        this.switchToNoTool();
      }
      this.object = object;

      const inputManager = editor.getRuntimeGame().getInputManager();
      if (
        inputManager.wasKeyJustPressed(
          gdjs.evtTools.input.keysNameToCode.Escape
        )
      ) {
        this.switchToNoTool();
      }
      if (!this.currentTool) {
        return;
      }
      editor.captureLeftMouseButton();
      this.currentTool.update(this);
    }

    switchToNoTool(): void {
      if (this.currentTool) {
        this.currentTool.onStopBeingUsed();
      }
      this.currentTool = null;
    }

    switchToFreeHand(): void {
      if (this.currentTool) {
        this.currentTool.onStopBeingUsed();
      }
      this.currentTool = this.freeHandTool;
    }

    switchToRectangle(): void {
      if (this.currentTool) {
        this.currentTool.onStopBeingUsed();
      }
    }

    switchToFloodFill(): void {
      if (this.currentTool) {
        this.currentTool.onStopBeingUsed();
      }
    }

    switchToPicker(): void {
      if (this.currentTool) {
        this.currentTool.onStopBeingUsed();
      }
    }

    switchToEraser(): void {
      if (this.currentTool) {
        this.currentTool.onStopBeingUsed();
      }
    }

    setPickedTiles(
      minX: integer,
      minY: integer,
      maxX: integer,
      maxY: integer
    ): void {
      this.pickedTilesMinX = minX;
      this.pickedTilesMinY = minY;
      this.pickedTilesMaxX = maxX;
      this.pickedTilesMaxY = maxY;
    }

    getPickedTilesDimX() {
      return this.pickedTilesMaxX - this.pickedTilesMinX + 1;
    }

    getPickedTilesDimY() {
      return this.pickedTilesMaxY - this.pickedTilesMinY + 1;
    }

    setPickedTilesFlippedHorizontally(flipHorizontally: boolean): void {
      this.arePickedTilesFlippedHorizontally = flipHorizontally;
    }

    setPickedTilesFlippedVertically(flipVertically: boolean): void {
      this.arePickedTilesFlippedVertically = flipVertically;
    }
  }

  /** @internal */
  export namespace SimpleTileMapEditor {
    export interface SimpleTileMapEditorTool {
      update(tileMapEditor: SimpleTileMapEditor): void;
      onStopBeingUsed(): void;
    }

    export class FreeHandTool implements SimpleTileMapEditorTool {
      tileMapEditor: SimpleTileMapEditor;
      oldCursorTileX: integer = Number.NaN;
      oldCursorTileY: integer = Number.NaN;
      wasLeftMouseButtonPressed = false;

      underCursorTiles: Array<integer> = [];

      constructor(tileMapEditor: SimpleTileMapEditor) {
        this.tileMapEditor = tileMapEditor;
      }

      update(): void {
        const object = this.tileMapEditor.object;
        const editor = this.tileMapEditor.inGameEditor;
        if (!object) {
          return;
        }
        const inputManager = editor.getRuntimeGame().getInputManager();

        const cursor = editor._getProjectedCursor();
        if (!cursor) {
          return;
        }
        const [cursorX, cursorY] = cursor;
        const [cursorTileX, cursorTileY] =
          object.getGridCoordinatesFromSceneCoordinates(cursorX, cursorY);

        const hasCursorMoved =
          cursorTileX !== this.oldCursorTileX ||
          cursorTileY !== this.oldCursorTileY;
        const isLeftMouseButtonPressed = inputManager.isMouseButtonPressed(0);

        if (hasCursorMoved) {
          this.restoreTilesUnderCursor();
        }
        if (
          isLeftMouseButtonPressed &&
          (!this.wasLeftMouseButtonPressed || hasCursorMoved)
        ) {
          // Paint tiles
          this.displayCursorTiles(cursorTileX, cursorTileY);
          // Avoid to revert the changes when the cursor moves.
          this.saveTilesUnderCursor(cursorTileX, cursorTileY);

          editor._sendSelectionUpdate({
            hasSelectedObjectBeenModified: true,
          });
        }
        if (hasCursorMoved) {
          this.saveTilesUnderCursor(cursorTileX, cursorTileY);
          this.displayCursorTiles(cursorTileX, cursorTileY);
        }
        this.oldCursorTileX = cursorTileX;
        this.oldCursorTileY = cursorTileY;
        this.wasLeftMouseButtonPressed = isLeftMouseButtonPressed;
      }

      onStopBeingUsed() {
        this.restoreTilesUnderCursor();
      }

      /**
       * Save the tiles under the cursor to be able to restore them when the
       * cursor moves.
       */
      private saveTilesUnderCursor(cursorTileX: integer, cursorTileY: integer) {
        const object = this.tileMapEditor.object;
        if (!object) {
          return;
        }
        const pickedTilesDimX = this.tileMapEditor.getPickedTilesDimX();
        const pickedTilesDimY = this.tileMapEditor.getPickedTilesDimY();

        for (let offsetY = 0; offsetY < pickedTilesDimY; offsetY++) {
          for (let offsetX = 0; offsetX < pickedTilesDimX; offsetX++) {
            const tileX = cursorTileX + offsetX;
            const tileY = cursorTileY + offsetY;
            const tileId = object.getTileAtGridCoordinates(tileX, tileY);
            const isFlippedOnX = object.isTileFlippedOnXAtGridCoordinates(
              tileX,
              tileY
            );
            const isFlippedOnY = object.isTileFlippedOnYAtGridCoordinates(
              tileX,
              tileY
            );
            const flippedTileId =
              tileId === -1
                ? -1
                : TileMapHelper.FlippingHelper.setFlippedHorizontally(
                    TileMapHelper.FlippingHelper.setFlippedVertically(
                      tileId,
                      isFlippedOnY
                    ),
                    isFlippedOnX
                  );
            this.underCursorTiles[offsetY * pickedTilesDimX + offsetX] =
              flippedTileId;
          }
        }
      }

      /**
       * Display picked tiles at the cursor
       */
      private displayCursorTiles(cursorTileX: integer, cursorTileY: integer) {
        const object = this.tileMapEditor.object;
        if (!object) {
          return;
        }
        const pickedTilesMinX = this.tileMapEditor.pickedTilesMinX;
        const pickedTilesMinY = this.tileMapEditor.pickedTilesMinY;
        const pickedTilesDimX = this.tileMapEditor.getPickedTilesDimX();
        const pickedTilesDimY = this.tileMapEditor.getPickedTilesDimY();
        const isFlippedOnX =
          this.tileMapEditor.arePickedTilesFlippedHorizontally;
        const isFlippedOnY = this.tileMapEditor.arePickedTilesFlippedVertically;

        for (let offsetY = 0; offsetY < pickedTilesDimY; offsetY++) {
          for (let offsetX = 0; offsetX < pickedTilesDimX; offsetX++) {
            const tileX = cursorTileX + offsetX;
            const tileY = cursorTileY + offsetY;
            const pickedTileX =
              pickedTilesMinX +
              (isFlippedOnX ? pickedTilesDimX - 1 - offsetX : offsetX);
            const pickedTileY =
              pickedTilesMinY +
              (isFlippedOnY ? pickedTilesDimY - 1 - offsetY : offsetY);
            const tileId =
              object.getTileSetColumnCount() * pickedTileY + pickedTileX;
            object.setTileAtGridCoordinates(tileId, tileX, tileY);
            object.flipTileOnXAtGridCoordinates(tileX, tileY, isFlippedOnX);
            object.flipTileOnYAtGridCoordinates(tileX, tileY, isFlippedOnY);
          }
        }
      }

      /**
       * Revert displaying picked tiles at the cursor
       */
      private restoreTilesUnderCursor() {
        const object = this.tileMapEditor.object;
        if (!object) {
          return;
        }
        const pickedTilesDimX = this.tileMapEditor.getPickedTilesDimX();
        const pickedTilesDimY = this.tileMapEditor.getPickedTilesDimY();

        for (let offsetY = 0; offsetY < pickedTilesDimY; offsetY++) {
          for (let offsetX = 0; offsetX < pickedTilesDimX; offsetX++) {
            const tileX = this.oldCursorTileX + offsetX;
            const tileY = this.oldCursorTileY + offsetY;
            const flippedTileId =
              this.underCursorTiles[offsetY * pickedTilesDimX + offsetX];
            if (flippedTileId === -1) {
              object.removeTileAtGridCoordinates(tileX, tileY);
            } else {
              const tileId =
                TileMapHelper.FlippingHelper.getTileId(flippedTileId);
              const isFlippedOnX =
                TileMapHelper.FlippingHelper.isFlippedHorizontally(
                  flippedTileId
                );
              const isFlippedOnY =
                TileMapHelper.FlippingHelper.isFlippedVertically(flippedTileId);
              object.setTileAtGridCoordinates(tileId, tileX, tileY);
              object.flipTileOnXAtGridCoordinates(tileX, tileY, isFlippedOnX);
              object.flipTileOnYAtGridCoordinates(tileX, tileY, isFlippedOnY);
            }
          }
        }
      }
    }

    class SimpleTileMapMessageListener
      extends gdjs.AbstractDebuggerClient.ExtensionMessageListener
    {
      simpleTileMapEditor: SimpleTileMapEditor;

      constructor(inGameEditor: gdjs.InGameEditor) {
        super(inGameEditor);
        this.simpleTileMapEditor = new SimpleTileMapEditor(inGameEditor);
      }

      override handleCommand(
        data: gdjs.AbstractDebuggerClient.ExtensionMessage
      ): void {
        if (data.command === 'setTool') {
          if (!data.payload) {
            this.simpleTileMapEditor.switchToNoTool();
            return;
          }
          const tool = data.payload.kind;
          switch (tool) {
            case 'freehand':
              this.simpleTileMapEditor.switchToFreeHand();
              this.setPickedTiles(data.payload);
              break;

            case 'rectangle':
              this.simpleTileMapEditor.switchToRectangle();
              this.setPickedTiles(data.payload);
              break;

            case 'floodfill':
              this.simpleTileMapEditor.switchToFloodFill();
              this.setPickedTiles(data.payload);
              break;

            case 'picker':
              this.simpleTileMapEditor.switchToPicker();
              break;

            case 'erase':
              this.simpleTileMapEditor.switchToEraser();
              break;

            default:
              break;
          }
        }
      }

      private setPickedTiles(payload: any): void {
        this.simpleTileMapEditor.setPickedTiles(
          payload.coordinates[0].x,
          payload.coordinates[0].y,
          payload.coordinates[1].x,
          payload.coordinates[1].y
        );
        this.simpleTileMapEditor.setPickedTilesFlippedHorizontally(
          payload.flipHorizontally
        );
        this.simpleTileMapEditor.setPickedTilesFlippedVertically(
          payload.flipVertically
        );
      }
    }
    gdjs.AbstractDebuggerClient.registerExtensionMessageListener(
      'TileMap::SimpleTileMap',
      SimpleTileMapMessageListener
    );
  }
}

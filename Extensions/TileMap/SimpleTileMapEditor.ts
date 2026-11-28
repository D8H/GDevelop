/// <reference path="helper/TileMapHelper.d.ts" />
namespace gdjs {
  export class SimpleTileMapEditor {
    inGameEditor: gdjs.InGameEditor;
    object: gdjs.SimpleTileMapRuntimeObject | null = null;
    tilesRestorer: gdjs.SimpleTileMapEditor.TilesRestorer;
    private currentTool: gdjs.SimpleTileMapEditor.SimpleTileMapEditorTool | null =
      null;
    private freeHandTool: gdjs.SimpleTileMapEditor.FreeHandTool;
    private rectangleTool: gdjs.SimpleTileMapEditor.RectangleTool;
    private floodFillTool: gdjs.SimpleTileMapEditor.FloodFillTool;
    private eraserTool: gdjs.SimpleTileMapEditor.EraserTool;

    pickedTilesMinX: integer = 0;
    pickedTilesMinY: integer = 0;
    pickedTilesMaxX: integer = 0;
    pickedTilesMaxY: integer = 0;
    arePickedTilesFlippedHorizontally = false;
    arePickedTilesFlippedVertically = false;

    cursor: gdjs.InGameEditor.ThreeSquare;
    isCursorVisible: boolean = false;

    constructor(inGameEditor: gdjs.InGameEditor) {
      this.inGameEditor = inGameEditor;
      this.tilesRestorer = new gdjs.SimpleTileMapEditor.TilesRestorer(this);
      this.freeHandTool = new gdjs.SimpleTileMapEditor.FreeHandTool(this);
      this.rectangleTool = new gdjs.SimpleTileMapEditor.RectangleTool(this);
      this.floodFillTool = new gdjs.SimpleTileMapEditor.FloodFillTool(this);
      this.eraserTool = new gdjs.SimpleTileMapEditor.EraserTool(this);

      this.cursor = new gdjs.InGameEditor.ThreeSquare(
        0xffd200,
        0.5,
        0xffd200,
        1
      );
      this.cursor.setStrokeColor;

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
      this.switchTool(null);
    }

    switchToFreeHand(): void {
      this.switchTool(this.freeHandTool);
    }

    switchToRectangle(): void {
      this.switchTool(this.rectangleTool);
    }

    switchToFloodFill(): void {
      this.switchTool(this.floodFillTool);
    }

    switchToPicker(): void {
      this.switchTool(null);
    }

    switchToEraser(): void {
      this.switchTool(this.eraserTool);
    }

    private switchTool(
      tool: gdjs.SimpleTileMapEditor.SimpleTileMapEditorTool | null
    ) {
      if (this.currentTool) {
        this.currentTool.onStopBeingUsed();
        this.setCursorVisible(false);
      }
      this.currentTool = tool;
      if (this.currentTool) {
        this.setCursorVisible(true);
        this.currentTool.onStartBeingUsed();
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

    expandTileMapToCamera(): FloatPoint {
      if (!this.object) {
        return [0, 0];
      }
      const tileMap = this.object.getTileMap();
      if (!tileMap) {
        return [0, 0];
      }
      const game = this.inGameEditor.getRuntimeGame();

      const zoomFactor = this.inGameEditor.getZoomFactor();
      const cameraTilesRadius =
        Math.floor(
          Math.max(
            game.getGameResolutionWidth() /
              Math.max(8, tileMap.getTileHeight() * zoomFactor),
            game.getGameResolutionHeight() /
              Math.max(8, tileMap.getTileWidth() * zoomFactor)
          )
        ) /
          2 +
        1;
      const cameraCenter = this.inGameEditor.getCameraCenterFor2D();

      const tileOffsetX =
        (cameraCenter ? cameraCenter[0] - this.object.getX() : 0) /
        tileMap.getTileWidth();
      const tileOffsetY =
        (cameraCenter ? cameraCenter[1] - this.object.getY() : 0) /
        tileMap.getTileHeight();

      const tileMinX = Math.floor(tileOffsetX - cameraTilesRadius);
      const tileMinY = Math.floor(tileOffsetY - cameraTilesRadius);
      const tileMaxX = Math.ceil(tileOffsetX + cameraTilesRadius);
      const tileMaxY = Math.ceil(tileOffsetY + cameraTilesRadius);

      const columnsToUnshift = Math.abs(Math.min(tileMinX, 0));
      const rowsToUnshift = Math.abs(Math.min(tileMinY, 0));
      const columnsToAppend = Math.max(0, tileMaxX - tileMap.getDimensionX());
      const rowsToAppend = Math.max(0, tileMaxY - tileMap.getDimensionY());

      tileMap.increaseDimensions(
        columnsToAppend,
        columnsToUnshift,
        rowsToAppend,
        rowsToUnshift
      );
      this.object.setX(
        this.object.getX() - columnsToUnshift * tileMap.getTileWidth()
      );
      this.object.setY(
        this.object.getY() - rowsToUnshift * tileMap.getTileHeight()
      );

      if (
        columnsToUnshift ||
        rowsToUnshift ||
        columnsToAppend ||
        rowsToAppend
      ) {
        console.log(
          'expandTileMapToCamera',
          columnsToUnshift,
          rowsToUnshift,
          columnsToAppend,
          rowsToAppend
        );
      }

      this.tilesRestorer.handleTileOffset(columnsToUnshift, rowsToUnshift);
      return [columnsToUnshift, rowsToUnshift];
    }

    trimTileMap(): FloatPoint {
      if (!this.object) {
        return [0, 0];
      }
      const tileMap = this.object.getTileMap();
      if (!tileMap) {
        return [0, 0];
      }
      const result = tileMap.trimEmptyColumnsAndRowToFitLayer(0);
      console.log('trimTileMap', result);
      if (!result) {
        return [0, 0];
      }
      const shiftedColumns = result.shiftedColumns;
      const shiftedRows = result.shiftedRows;
      this.object.setX(
        this.object.getX() + shiftedColumns * tileMap.getTileWidth()
      );
      this.object.setY(
        this.object.getY() + shiftedRows * tileMap.getTileHeight()
      );
      this.tilesRestorer.handleTileOffset(-shiftedColumns, -shiftedRows);
      return [-shiftedColumns, -shiftedRows];
    }

    setCursorPosition(
      tileMinX: integer,
      tileMinY: integer,
      tileDimX: integer,
      tileDimY: integer
    ): void {
      if (!this.object) {
        return;
      }
      console.log('setCursorPosition', tileMinX, tileMinY);
      let minX = this.object.getSceneXCoordinateOfTileCenter(
        tileMinX - 0.5,
        tileMinY - 0.5
      );
      let minY = this.object.getSceneYCoordinateOfTileCenter(
        tileMinX - 0.5,
        tileMinY - 0.5
      );
      let maxX = this.object.getSceneXCoordinateOfTileCenter(
        tileMinX + tileDimX - 0.5,
        tileMinY + tileDimY - 0.5
      );
      let maxY = this.object.getSceneYCoordinateOfTileCenter(
        tileMinX + tileDimX - 0.5,
        tileMinY + tileDimY - 0.5
      );
      this.cursor.position.x = (minX + maxX) / 2;
      this.cursor.position.y = (minY + maxY) / 2;
      this.cursor.scale.x = maxX - minX;
      this.cursor.scale.y = maxY - minY;
    }

    setCursorVisible(visible: boolean): void {
      if (visible === this.isCursorVisible) {
        return;
      }
      this.isCursorVisible = visible;
      if (visible) {
        const currentScene = this.inGameEditor.getCurrentScene();
        if (!currentScene) return;

        const topVisibleLayer = this.inGameEditor.getTopVisibleLayer();
        if (!topVisibleLayer) return;

        const threeGroup = topVisibleLayer.getRenderer().getThreeGroup();
        if (!threeGroup) return;
        threeGroup.add(this.cursor);
      } else {
        this.cursor.removeFromParent();
      }
    }
  }

  /** @internal */
  export namespace SimpleTileMapEditor {
    export interface SimpleTileMapEditorTool {
      onStartBeingUsed(): void;
      update(tileMapEditor: SimpleTileMapEditor): void;
      onStopBeingUsed(): void;
    }

    export class FreeHandTool implements SimpleTileMapEditorTool {
      tileMapEditor: SimpleTileMapEditor;
      private oldCursorTileX: integer = Number.NaN;
      private oldCursorTileY: integer = Number.NaN;
      private wasLeftMouseButtonPressed = false;

      constructor(tileMapEditor: SimpleTileMapEditor) {
        this.tileMapEditor = tileMapEditor;
      }

      onStartBeingUsed(): void {
        this.tileMapEditor.inGameEditor.setSelectionVisible(false);
      }

      onStopBeingUsed() {
        this.restoreTilesUnderCursor();
        this.tileMapEditor.trimTileMap();
        this.tileMapEditor.inGameEditor.setSelectionVisible(true);
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
        let [cursorTileX, cursorTileY] =
          object.getGridCoordinatesFromSceneCoordinates(cursorX, cursorY);

        const hasCursorMoved =
          cursorTileX !== this.oldCursorTileX ||
          cursorTileY !== this.oldCursorTileY;
        const isLeftMouseButtonPressed = inputManager.isMouseButtonPressed(0);
        const isLeftMouseButtonReleased = inputManager.isMouseButtonReleased(0);

        this.tileMapEditor.setCursorPosition(
          cursorTileX,
          cursorTileY,
          this.tileMapEditor.getPickedTilesDimX(),
          this.tileMapEditor.getPickedTilesDimY()
        );

        if (hasCursorMoved) {
          this.restoreTilesUnderCursor();
        }

        {
          const [tileOffsetX, tileOffsetY] =
            this.tileMapEditor.expandTileMapToCamera();
          cursorTileX += tileOffsetX;
          cursorTileY += tileOffsetY;
          this.oldCursorTileX += tileOffsetX;
          this.oldCursorTileY += tileOffsetY;
        }

        if (
          isLeftMouseButtonPressed &&
          (!this.wasLeftMouseButtonPressed || hasCursorMoved)
        ) {
          // Paint tiles
          if (this.oldCursorTileY === cursorTileY) {
            const minX = Math.min(this.oldCursorTileX, cursorTileX);
            const maxX = Math.max(this.oldCursorTileX, cursorTileX);
            for (let x = minX; x <= maxX; x++) {
              this.displayCursorTiles(x, cursorTileY);
            }
          } else if (this.oldCursorTileX === cursorTileX) {
            const minY = Math.min(this.oldCursorTileY, cursorTileY);
            const maxY = Math.max(this.oldCursorTileY, cursorTileY);
            for (let y = minY; y <= maxY; y++) {
              // Paint tiles
              this.displayCursorTiles(cursorTileX, y);
            }
          } else {
            // TODO Handle oblique lines.
            this.displayCursorTiles(cursorTileX, cursorTileY);
          }
          // Avoid to revert the changes when the cursor moves.
          this.saveTilesUnderCursor(cursorTileX, cursorTileY);
        }
        if (isLeftMouseButtonReleased) {
          const tileMap = object.getTileMap();
          if (tileMap) {
            const [tileOffsetX, tileOffsetY] = this.tileMapEditor.trimTileMap();
            cursorTileX += tileOffsetX;
            cursorTileY += tileOffsetY;
            editor._sendSelectionUpdate({
              hasSelectedObjectBeenModified: true,
            });
          }
        }
        if (hasCursorMoved) {
          this.saveTilesUnderCursor(cursorTileX, cursorTileY);
          this.displayCursorTiles(cursorTileX, cursorTileY);
        }
        this.oldCursorTileX = cursorTileX;
        this.oldCursorTileY = cursorTileY;
        this.wasLeftMouseButtonPressed = isLeftMouseButtonPressed;
      }

      /**
       * Save the tiles under the cursor to be able to restore them when the
       * cursor moves.
       */
      private saveTilesUnderCursor(cursorTileX: integer, cursorTileY: integer) {
        this.tileMapEditor.tilesRestorer.saveTilesUnderCursor(
          cursorTileX,
          cursorTileY,
          this.tileMapEditor.getPickedTilesDimX(),
          this.tileMapEditor.getPickedTilesDimY()
        );
      }

      /**
       * Revert displaying picked tiles at the cursor
       */
      private restoreTilesUnderCursor() {
        this.tileMapEditor.tilesRestorer.restoreTilesUnderCursor();
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
    }

    /** @internal */
    export class RectangleTool implements SimpleTileMapEditorTool {
      tileMapEditor: SimpleTileMapEditor;
      private oldCursorTileX: integer = Number.NaN;
      private oldCursorTileY: integer = Number.NaN;
      private wasLeftMouseButtonPressed = false;

      private isDrawing = false;
      private startTileX: integer = 0;
      private startTileY: integer = 0;

      constructor(tileMapEditor: SimpleTileMapEditor) {
        this.tileMapEditor = tileMapEditor;
      }

      onStartBeingUsed(): void {
        this.tileMapEditor.inGameEditor.setSelectionVisible(false);
      }

      onStopBeingUsed() {
        this.restoreTilesUnderCursor();
        this.tileMapEditor.trimTileMap();
        this.tileMapEditor.inGameEditor.setSelectionVisible(true);
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
        let [cursorTileX, cursorTileY] =
          object.getGridCoordinatesFromSceneCoordinates(cursorX, cursorY);

        const hasCursorMoved =
          cursorTileX !== this.oldCursorTileX ||
          cursorTileY !== this.oldCursorTileY;
        const isLeftMouseButtonPressed = inputManager.isMouseButtonPressed(0);
        const isLeftMouseButtonReleased = inputManager.isMouseButtonReleased(0);

        this.setCursorPosition(cursorTileX, cursorTileY);

        if (hasCursorMoved) {
          this.restoreTilesUnderCursor();
        }

        {
          const [tileOffsetX, tileOffsetY] =
            this.tileMapEditor.expandTileMapToCamera();
          cursorTileX += tileOffsetX;
          cursorTileY += tileOffsetY;
          this.oldCursorTileX += tileOffsetX;
          this.oldCursorTileY += tileOffsetY;
        }

        if (isLeftMouseButtonPressed && !this.wasLeftMouseButtonPressed) {
          this.isDrawing = true;
          this.startTileX = cursorTileX;
          this.startTileY = cursorTileY;
        }
        if (
          isLeftMouseButtonPressed &&
          (!this.wasLeftMouseButtonPressed || hasCursorMoved)
        ) {
        }
        if (isLeftMouseButtonReleased) {
          // Avoid to revert the changes when the cursor moves.
          this.saveTilesUnderCursor(cursorTileX, cursorTileY);
          this.isDrawing = false;
          const tileMap = object.getTileMap();
          if (tileMap) {
            const [tileOffsetX, tileOffsetY] = this.tileMapEditor.trimTileMap();
            cursorTileX += tileOffsetX;
            cursorTileY += tileOffsetY;
            editor._sendSelectionUpdate({
              hasSelectedObjectBeenModified: true,
            });
          }
        }
        if (hasCursorMoved) {
          this.saveTilesUnderCursor(cursorTileX, cursorTileY);
          this.displayCursorTiles(cursorTileX, cursorTileY);
        }
        this.oldCursorTileX = cursorTileX;
        this.oldCursorTileY = cursorTileY;
        this.wasLeftMouseButtonPressed = isLeftMouseButtonPressed;
      }

      private setCursorPosition(cursorTileX: integer, cursorTileY: integer) {
        let rectangleMinX: integer;
        let rectangleMinY: integer;
        let rectangleDimX: integer;
        let rectangleDimY: integer;
        if (this.isDrawing) {
          rectangleMinX = Math.min(cursorTileX, this.startTileX);
          rectangleMinY = Math.min(cursorTileY, this.startTileY);
          rectangleDimX = Math.abs(cursorTileX - this.startTileX) + 1;
          rectangleDimY = Math.abs(cursorTileY - this.startTileY) + 1;
        } else {
          rectangleMinX = cursorTileX;
          rectangleMinY = cursorTileY;
          rectangleDimX = this.tileMapEditor.getPickedTilesDimX();
          rectangleDimY = this.tileMapEditor.getPickedTilesDimY();
        }
        this.tileMapEditor.setCursorPosition(
          rectangleMinX,
          rectangleMinY,
          rectangleDimX,
          rectangleDimY
        );
      }

      /**
       * Save the tiles under the cursor to be able to restore them when the
       * cursor moves.
       */
      private saveTilesUnderCursor(cursorTileX: integer, cursorTileY: integer) {
        let rectangleMinX: integer;
        let rectangleMinY: integer;
        let rectangleDimX: integer;
        let rectangleDimY: integer;
        if (this.isDrawing) {
          rectangleMinX = Math.min(cursorTileX, this.startTileX);
          rectangleMinY = Math.min(cursorTileY, this.startTileY);
          rectangleDimX = Math.abs(cursorTileX - this.startTileX) + 1;
          rectangleDimY = Math.abs(cursorTileY - this.startTileY) + 1;
        } else {
          rectangleMinX = cursorTileX;
          rectangleMinY = cursorTileY;
          rectangleDimX = this.tileMapEditor.getPickedTilesDimX();
          rectangleDimY = this.tileMapEditor.getPickedTilesDimY();
        }
        this.tileMapEditor.tilesRestorer.saveTilesUnderCursor(
          rectangleMinX,
          rectangleMinY,
          rectangleDimX,
          rectangleDimY
        );
      }

      /**
       * Revert displaying picked tiles at the cursor
       */
      private restoreTilesUnderCursor() {
        this.tileMapEditor.tilesRestorer.restoreTilesUnderCursor();
      }

      /**
       * Display picked tiles at the cursor
       */
      private displayCursorTiles(cursorTileX: integer, cursorTileY: integer) {
        const object = this.tileMapEditor.object;
        if (!object) {
          return;
        }
        let rectangleMinX: integer;
        let rectangleMinY: integer;
        let rectangleDimX: integer;
        let rectangleDimY: integer;
        if (this.isDrawing) {
          rectangleMinX = Math.min(cursorTileX, this.startTileX);
          rectangleMinY = Math.min(cursorTileY, this.startTileY);
          rectangleDimX = Math.abs(cursorTileX - this.startTileX) + 1;
          rectangleDimY = Math.abs(cursorTileY - this.startTileY) + 1;
        } else {
          rectangleMinX = cursorTileX;
          rectangleMinY = cursorTileY;
          rectangleDimX = this.tileMapEditor.getPickedTilesDimX();
          rectangleDimY = this.tileMapEditor.getPickedTilesDimY();
        }
        const pickedTilesMinX = this.tileMapEditor.pickedTilesMinX;
        const pickedTilesMinY = this.tileMapEditor.pickedTilesMinY;
        const pickedTilesDimX = this.tileMapEditor.getPickedTilesDimX();
        const pickedTilesDimY = this.tileMapEditor.getPickedTilesDimY();
        const isFlippedOnX =
          this.tileMapEditor.arePickedTilesFlippedHorizontally;
        const isFlippedOnY = this.tileMapEditor.arePickedTilesFlippedVertically;

        for (let offsetY = 0; offsetY < rectangleDimY; offsetY++) {
          for (let offsetX = 0; offsetX < rectangleDimX; offsetX++) {
            const tileX = rectangleMinX + offsetX;
            const tileY = rectangleMinY + offsetY;

            // Tiling
            let pickedTileX =
              offsetX === 0 || pickedTilesDimX < 2
                ? 0
                : offsetX === rectangleDimX - 1 || pickedTilesDimX < 3
                  ? pickedTilesDimX - 1
                  : 1 + ((offsetX - 1) % (pickedTilesDimX - 2));
            let pickedTileY =
              offsetY === 0 || pickedTilesDimY < 2
                ? 0
                : offsetY === rectangleDimY - 1 || pickedTilesDimY < 3
                  ? pickedTilesDimY - 1
                  : 1 + ((offsetY - 1) % (pickedTilesDimY - 2));

            // Flipping
            pickedTileX =
              pickedTilesMinX +
              (isFlippedOnX ? pickedTilesDimX - 1 - pickedTileX : pickedTileX);
            pickedTileY =
              pickedTilesMinY +
              (isFlippedOnY ? pickedTilesDimY - 1 - pickedTileY : pickedTileY);
            const tileId =
              object.getTileSetColumnCount() * pickedTileY + pickedTileX;

            object.setTileAtGridCoordinates(tileId, tileX, tileY);
            object.flipTileOnXAtGridCoordinates(tileX, tileY, isFlippedOnX);
            object.flipTileOnYAtGridCoordinates(tileX, tileY, isFlippedOnY);
          }
        }
      }
    }

    /** @internal */
    export class FloodFillTool implements SimpleTileMapEditorTool {
      tileMapEditor: SimpleTileMapEditor;
      private oldCursorTileX: integer = Number.NaN;
      private oldCursorTileY: integer = Number.NaN;
      private queue: Array<integer> = [];

      constructor(tileMapEditor: SimpleTileMapEditor) {
        this.tileMapEditor = tileMapEditor;
      }

      onStartBeingUsed(): void {
        this.tileMapEditor.inGameEditor.setSelectionVisible(false);
      }

      onStopBeingUsed() {
        this.restoreTilesUnderCursor();
        this.tileMapEditor.inGameEditor.setSelectionVisible(true);
      }

      update(): void {
        const editor = this.tileMapEditor.inGameEditor;
        const object = this.tileMapEditor.object;
        if (!object) {
          return;
        }
        const inputManager = editor.getRuntimeGame().getInputManager();

        const cursor = editor._getProjectedCursor();
        if (!cursor) {
          return;
        }

        const [cursorX, cursorY] = cursor;
        let [cursorTileX, cursorTileY] =
          object.getGridCoordinatesFromSceneCoordinates(cursorX, cursorY);

        const hasCursorMoved =
          cursorTileX !== this.oldCursorTileX ||
          cursorTileY !== this.oldCursorTileY;
        const isLeftMouseButtonReleased = inputManager.isMouseButtonReleased(0);

        this.tileMapEditor.setCursorPosition(
          cursorTileX,
          cursorTileY,
          this.tileMapEditor.getPickedTilesDimX(),
          this.tileMapEditor.getPickedTilesDimY()
        );

        if (hasCursorMoved) {
          this.restoreTilesUnderCursor();
        }

        if (isLeftMouseButtonReleased) {
          this.restoreTilesUnderCursor();
          this.floodFillAt(cursorTileX, cursorTileY);
          const tileMap = object.getTileMap();
          if (tileMap) {
            editor._sendSelectionUpdate({
              hasSelectedObjectBeenModified: true,
            });
          }
        }
        if (hasCursorMoved) {
          this.saveTilesUnderCursor(cursorTileX, cursorTileY);
          this.displayCursorTiles(cursorTileX, cursorTileY);
        }
        this.oldCursorTileX = cursorTileX;
        this.oldCursorTileY = cursorTileY;
      }

      private floodFillAt(cursorTileX: integer, cursorTileY: integer): void {
        const object = this.tileMapEditor.object;
        if (!object) {
          return;
        }
        const targetTileId = object.getTileAtGridCoordinates(
          cursorTileX,
          cursorTileY
        );

        const newTileId =
          object.getTileSetColumnCount() * this.tileMapEditor.pickedTilesMinY +
          this.tileMapEditor.pickedTilesMinX;

        if (targetTileId === newTileId) {
          return;
        }

        const tileMap = object.getTileMap();
        if (!tileMap) {
          return;
        }
        const dimX = tileMap.getDimensionX();
        const dimY = tileMap.getDimensionY();

        this.queue.length = 0;
        this.queue.push(cursorTileX);
        this.queue.push(cursorTileY);
        while (this.queue.length >= 2) {
          const tileY = this.queue.pop() || 0;
          const tileX = this.queue.pop() || 0;
          if (tileX < 0 || tileX >= dimX || tileY < 0 || tileY >= dimY) {
            continue;
          }
          const currentTileId = object.getTileAtGridCoordinates(tileX, tileY);
          if (currentTileId !== targetTileId) {
            continue;
          }

          tileMap.setTile(tileX, tileY, 0, newTileId);
          tileMap.flipTileOnX(
            tileX,
            tileY,
            0,
            this.tileMapEditor.arePickedTilesFlippedHorizontally
          );
          tileMap.flipTileOnY(
            tileX,
            tileY,
            0,
            this.tileMapEditor.arePickedTilesFlippedVertically
          );

          this.queue.push(tileX - 1);
          this.queue.push(tileY);

          this.queue.push(tileX + 1);
          this.queue.push(tileY);

          this.queue.push(tileX);
          this.queue.push(tileY - 1);

          this.queue.push(tileX);
          this.queue.push(tileY + 1);
        }
      }

      /**
       * Save the tiles under the cursor to be able to restore them when the
       * cursor moves.
       */
      private saveTilesUnderCursor(cursorTileX: integer, cursorTileY: integer) {
        this.tileMapEditor.tilesRestorer.saveTilesUnderCursor(
          cursorTileX,
          cursorTileY,
          this.tileMapEditor.getPickedTilesDimX(),
          this.tileMapEditor.getPickedTilesDimY()
        );
      }

      /**
       * Revert displaying picked tiles at the cursor
       */
      private restoreTilesUnderCursor() {
        this.tileMapEditor.tilesRestorer.restoreTilesUnderCursor();
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
    }

    /** @internal */
    export class EraserTool implements SimpleTileMapEditorTool {
      tileMapEditor: SimpleTileMapEditor;
      private wasLeftMouseButtonPressed = false;

      private isDrawing = false;
      private startTileX: integer = 0;
      private startTileY: integer = 0;

      constructor(tileMapEditor: SimpleTileMapEditor) {
        this.tileMapEditor = tileMapEditor;
      }

      onStartBeingUsed(): void {
        this.tileMapEditor.inGameEditor.setSelectionVisible(false);
      }

      onStopBeingUsed() {
        this.tileMapEditor.trimTileMap();
        this.tileMapEditor.inGameEditor.setSelectionVisible(true);
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
        let [cursorTileX, cursorTileY] =
          object.getGridCoordinatesFromSceneCoordinates(cursorX, cursorY);

        const isLeftMouseButtonPressed = inputManager.isMouseButtonPressed(0);
        const isLeftMouseButtonReleased = inputManager.isMouseButtonReleased(0);

        this.setCursorPosition(cursorTileX, cursorTileY);

        {
          const [tileOffsetX, tileOffsetY] =
            this.tileMapEditor.expandTileMapToCamera();
          cursorTileX += tileOffsetX;
          cursorTileY += tileOffsetY;
        }

        if (isLeftMouseButtonPressed && !this.wasLeftMouseButtonPressed) {
          this.isDrawing = true;
          this.startTileX = cursorTileX;
          this.startTileY = cursorTileY;
        }
        if (isLeftMouseButtonReleased) {
          this.isDrawing = false;
          const tileMap = object.getTileMap();
          if (tileMap) {
            this.eraseTiles(cursorTileX, cursorTileY);
            const [tileOffsetX, tileOffsetY] = this.tileMapEditor.trimTileMap();
            cursorTileX += tileOffsetX;
            cursorTileY += tileOffsetY;
            editor._sendSelectionUpdate({
              hasSelectedObjectBeenModified: true,
            });
          }
        }
        this.wasLeftMouseButtonPressed = isLeftMouseButtonPressed;
      }

      private setCursorPosition(cursorTileX: integer, cursorTileY: integer) {
        let rectangleMinX: integer;
        let rectangleMinY: integer;
        let rectangleDimX: integer;
        let rectangleDimY: integer;
        if (this.isDrawing) {
          rectangleMinX = Math.min(cursorTileX, this.startTileX);
          rectangleMinY = Math.min(cursorTileY, this.startTileY);
          rectangleDimX = Math.abs(cursorTileX - this.startTileX) + 1;
          rectangleDimY = Math.abs(cursorTileY - this.startTileY) + 1;
        } else {
          rectangleMinX = cursorTileX;
          rectangleMinY = cursorTileY;
          rectangleDimX = 1;
          rectangleDimY = 1;
        }
        this.tileMapEditor.setCursorPosition(
          rectangleMinX,
          rectangleMinY,
          rectangleDimX,
          rectangleDimY
        );
      }

      private eraseTiles(cursorTileX: integer, cursorTileY: integer) {
        const object = this.tileMapEditor.object;
        if (!object) {
          return;
        }
        const rectangleMinX = Math.min(cursorTileX, this.startTileX);
        const rectangleMinY = Math.min(cursorTileY, this.startTileY);
        const rectangleDimX = Math.abs(cursorTileX - this.startTileX) + 1;
        const rectangleDimY = Math.abs(cursorTileY - this.startTileY) + 1;
        for (let offsetY = 0; offsetY < rectangleDimY; offsetY++) {
          for (let offsetX = 0; offsetX < rectangleDimX; offsetX++) {
            const tileX = rectangleMinX + offsetX;
            const tileY = rectangleMinY + offsetY;
            object.removeTileAtGridCoordinates(tileX, tileY);
          }
        }
      }
    }

    /** @internal */
    export class TilesRestorer {
      tileMapEditor: SimpleTileMapEditor;
      underCursorTiles: Array<integer> = [];
      dimX: integer = 0;
      minX: integer = 0;
      minY: integer = 0;

      constructor(tileMapEditor: SimpleTileMapEditor) {
        this.tileMapEditor = tileMapEditor;
      }

      handleTileOffset(tileOffsetX: number, tileOffsetY: number) {
        this.minX += tileOffsetX;
        this.minY += tileOffsetY;
      }

      /**
       * Save the tiles under the cursor to be able to restore them when the
       * cursor moves.
       */
      saveTilesUnderCursor(
        minX: integer,
        minY: integer,
        dimX: integer,
        dimY: integer
      ) {
        const object = this.tileMapEditor.object;
        if (!object) {
          return;
        }
        this.underCursorTiles.length = dimX * dimY;
        this.dimX = dimX;
        this.minX = minX;
        this.minY = minY;
        for (let offsetY = 0; offsetY < dimY; offsetY++) {
          for (let offsetX = 0; offsetX < dimX; offsetX++) {
            const tileX = minX + offsetX;
            const tileY = minY + offsetY;
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
            this.underCursorTiles[offsetY * dimX + offsetX] = flippedTileId;
          }
        }
      }

      /**
       * Revert displaying picked tiles at the cursor
       */
      restoreTilesUnderCursor() {
        const object = this.tileMapEditor.object;
        if (!object) {
          return;
        }
        const dimX = this.dimX;
        const dimY = Math.round(this.underCursorTiles.length / dimX);

        for (let offsetY = 0; offsetY < dimY; offsetY++) {
          for (let offsetX = 0; offsetX < dimX; offsetX++) {
            const tileX = this.minX + offsetX;
            const tileY = this.minY + offsetY;
            const flippedTileId =
              this.underCursorTiles[offsetY * dimX + offsetX];
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

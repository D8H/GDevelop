import {
  PolygonVertices,
  integer,
  float,
  EditableTileMapAsJsObject,
  EditableTileMapLayerAsJsObject,
} from "./CommonTypes";
import { FlippingHelper } from "./GID";

/**
 * A tile map model.
 *
 * Tile map files are parsed into this model by {@link TiledTileMapLoader} or {@link LDtkTileMapLoader}.
 * This model is used for rendering ({@link TileMapRuntimeObjectPixiRenderer})
 * and hitboxes handling ({@link TransformedCollisionTileMap}).
 * This allows to support new file format with only a new parser.
 */
export class EditableTileMap {
  private _backgroundResourceName: string | null = null;
  private _tileSet: Map<integer, TileDefinition>;
  private _layers: Array<AbstractEditableLayer>;
  /**
   * The width of a tile.
   */
  private readonly tileWidth: integer;
  /**
   * The height of a tile.
   */
  private readonly tileHeight: integer;
  /**
   * The number of tile columns in the map.
   */
  private dimX: integer;
  /**
   * The number of tile rows in the map.
   */
  private dimY: integer;

  /**
   * It can be useful for auto-tilling.
   */
  private tileSetColumnCount: integer = 0;
  private tileSetRowCount: integer = 0;

  /**
   * @param tileWidth The width of a tile.
   * @param tileHeight The height of a tile.
   * @param dimX The number of tile columns in the map.
   * @param dimY The number of tile rows in the map.
   * @param tileSet The tile set.
   */
  constructor(
    tileWidth: integer,
    tileHeight: integer,
    dimX: integer,
    dimY: integer,
    // TODO should the tile set be built internally?
    // It's not meant to change and it avoid to do a copy.
    tileSet: Map<integer, TileDefinition>,
  ) {
    this.tileWidth = tileWidth;
    this.tileHeight = tileHeight;
    this.dimX = dimX;
    this.dimY = dimY;
    this._tileSet = tileSet;
    this._layers = [];
  }

  clone(): EditableTileMap {
    const tileMap = new EditableTileMap(
      this.tileWidth,
      this.tileHeight,
      this.dimX,
      this.dimY,
      this._tileSet,
    );
    for (const layer of this._layers) {
      tileMap._layers.push(layer.clone(tileMap, layer.id));
    }
    return tileMap;
  }

  /**
   * Loads EditableTileMap from serialized data.
   * Uses object configuration as the source of truth as the serialized data
   * might contain expired data (if the tile set configuration has changed and
   * the serialized data was not updated).
   * @param editableTileMapAsJsObject Serialized editable tile map object
   * @param objectConfiguration
   */
  static from(
    editableTileMapAsJsObject: EditableTileMapAsJsObject,
    {
      tileSize,
      tileSetColumnCount,
      tileSetRowCount,
    }: {
      tileSize: number;
      tileSetColumnCount: number;
      tileSetRowCount: number;
    },
  ): EditableTileMap {
    const tileSet = new Map<number, TileDefinition>();

    if (
      !Number.isInteger(tileSetColumnCount) ||
      tileSetColumnCount <= 0 ||
      !Number.isInteger(tileSetRowCount) ||
      tileSetRowCount <= 0
    ) {
      throw new Error(
        `Tilemap object badly configured. Tile size ${tileSize} is not compatible with atlas image dimensions, resulting in having ${tileSetColumnCount} columns and ${tileSetRowCount} rows.`,
      );
    }
    // TODO: Actually save and load tile set when useful.
    new Array(tileSetColumnCount * tileSetRowCount)
      .fill(0)
      .forEach((_, index) => {
        tileSet.set(index, new TileDefinition(0));
      });

    const tileMap = new EditableTileMap(
      tileSize || editableTileMapAsJsObject.tileWidth,
      tileSize || editableTileMapAsJsObject.tileHeight,
      editableTileMapAsJsObject.dimX || 1,
      editableTileMapAsJsObject.dimY || 1,
      tileSet,
    );

    if (editableTileMapAsJsObject.layers) {
      editableTileMapAsJsObject.layers.forEach((layerAsJsObject: any) => {
        tileMap.addTileLayer(
          EditableTileMapLayer.from(
            layerAsJsObject,
            tileMap,
            (tileId) => tileId < tileSetColumnCount * tileSetRowCount,
          ),
        );
      });
    } else {
      tileMap.addNewTileLayer(0);
    }

    return tileMap;
  }

  toJSObject(): EditableTileMapAsJsObject {
    return {
      tileWidth: this.tileWidth,
      tileHeight: this.tileHeight,
      dimX: this.dimX,
      dimY: this.dimY,
      layers: this._layers.map((layer) => layer.toJSObject()),
    };
  }

  /**
   * @returns The tile map width in pixels.
   */
  getWidth(): integer {
    return this.tileWidth * this.dimX;
  }

  /**
   * @returns The tile map height in pixels.
   */
  getHeight(): integer {
    return this.tileHeight * this.dimY;
  }

  /**
   * @returns The tile width in pixels.
   */
  getTileHeight(): integer {
    return this.tileHeight;
  }

  /**
   * @returns The tile height in pixels.
   */
  getTileWidth(): integer {
    return this.tileWidth;
  }

  /**
   * @returns The number of tile columns in the map.
   */
  getDimensionX(): integer {
    return this.dimX;
  }

  /**
   * @returns The number of tile rows in the map.
   */
  getDimensionY(): integer {
    return this.dimY;
  }

  /**
   * Changes the number of columns in the tile map by adding/removing
   * columns at the end.
   * @param dim The number of tile columns in the map.
   */
  setDimensionX(dim: integer): void {
    if (dim === this.dimX) return;
    const columnDelta = dim - this.dimX;
    for (const layer of this.getLayers()) {
      // TODO: Implement dimensions changes for EditableObjectLayer.
      if (layer instanceof EditableTileMapLayer) {
        if (columnDelta > 0) {
          layer.increaseDimensions(columnDelta, 0, 0, 0);
        } else {
          layer.reduceDimensions(-columnDelta, 0, 0, 0);
        }
      }
    }
    this.dimX = dim;
  }

  /**
   * Increases dimensions of the tile map by adding columns and rows
   * at the start and/or at the end of the grid.
   */
  increaseDimensions(
    columnsToAppend: number,
    columnsToUnshift: number,
    rowsToAppend: number,
    rowsToUnshift: number,
  ): void {
    if (
      columnsToAppend < 0 ||
      columnsToUnshift < 0 ||
      rowsToAppend < 0 ||
      rowsToUnshift < 0 ||
      (columnsToAppend === 0 &&
        columnsToUnshift === 0 &&
        rowsToAppend === 0 &&
        rowsToUnshift === 0)
    ) {
      return;
    }
    for (const layer of this.getLayers()) {
      // TODO: Implement dimensions changes for EditableObjectLayer.
      if (layer instanceof EditableTileMapLayer) {
        layer.increaseDimensions(
          columnsToAppend,
          columnsToUnshift,
          rowsToAppend,
          rowsToUnshift,
        );
      }
    }
    this.dimX = this.dimX + columnsToAppend + columnsToUnshift;
    this.dimY = this.dimY + rowsToAppend + rowsToUnshift;
  }

  /**
   * Changes the number of row in the tile map by adding/removing
   * rows at the end.
   * @param dim The number of tile rows in the map.
   */
  setDimensionY(dim: integer): void {
    if (dim === this.dimY) return;
    const rowDelta = dim - this.dimY;
    for (const layer of this.getLayers()) {
      // TODO: Implement dimensions changes for EditableObjectLayer.
      if (layer instanceof EditableTileMapLayer) {
        if (rowDelta > 0) {
          layer.increaseDimensions(0, 0, rowDelta, 0);
        } else {
          layer.reduceDimensions(0, 0, -rowDelta, 0);
        }
      }
    }
    this.dimY = dim;
  }

  /**
   * @param tileId The tile identifier
   * @returns The tile definition from the tile set.
   */
  getTileDefinition(tileId: integer): TileDefinition | undefined {
    return this._tileSet.get(tileId);
  }

  /**
   * @returns All the tile definitions from the tile set.
   */
  getTileDefinitions(): Iterable<TileDefinition> {
    return this._tileSet.values();
  }

  getTileSetColumnCount(): integer {
    return this.tileSetColumnCount;
  }

  getTileSetRowCount(): integer {
    return this.tileSetRowCount;
  }

  setTileSetColumnCount(tileSetColumnCount: integer) {
    this.tileSetColumnCount = tileSetColumnCount;
  }

  setTileSetRowCount(tileSetRowCount: integer) {
    this.tileSetRowCount = tileSetRowCount;
  }

  /**
   * @param id The identifier of the new layer.
   * @returns The new layer.
   */
  addNewTileLayer(id: integer): EditableTileMapLayer {
    const layer = new EditableTileMapLayer(this, id);
    this._layers.push(layer);
    return layer;
  }

  /**
   * @param layer the new layer to set.
   */
  addTileLayer(layer: EditableTileMapLayer): void {
    this._layers.push(layer);
  }

  getTileLayer(id: integer): EditableTileMapLayer | null {
    const matchingLayer = this._layers.find((layer) => layer.id === id);
    if (!(matchingLayer instanceof EditableTileMapLayer)) return null;
    return matchingLayer;
  }

  /**
   * @param id The identifier of the new layer.
   * @returns The new layer.
   */
  addObjectLayer(id: integer): EditableObjectLayer {
    const layer = new EditableObjectLayer(this, id);
    this._layers.push(layer);
    return layer;
  }

  /**
   * @returns The resource name of the background
   */
  getBackgroundResourceName(): string | null {
    return this._backgroundResourceName;
  }

  /**
   * @returns All the layers of the tile map.
   */
  getLayers(): Iterable<AbstractEditableLayer> {
    return this._layers;
  }

  /**
   * Check if a point is inside a tile with a given tag.
   *
   * It doesn't use the tile hitboxes.
   * It only check the point is inside the tile square.
   *
   * @param x The X coordinate of the point to check.
   * @param y The Y coordinate of the point to check.
   * @param tag The tile tag
   * @returns true when the point is inside a tile with a given tag.
   */
  pointIsInsideTile(x: float, y: float, tag: string): boolean {
    const indexX = Math.floor(x / this.tileWidth);
    const indexY = Math.floor(y / this.tileHeight);
    for (const layer of this._layers) {
      const tileLayer = layer as EditableTileMapLayer;
      if (!tileLayer) {
        continue;
      }
      const tileId = tileLayer.getTileId(indexX, indexY);
      if (tileId === undefined) {
        return false;
      }
      const tileDefinition = this._tileSet.get(tileId)!;
      if (tileDefinition.hasTaggedHitBox(tag)) {
        return true;
      }
    }
    return false;
  }

  /**
   * @param resourceName The name of the resource
   */
  setBackgroundResourceName(resourceName: string): void {
    this._backgroundResourceName = resourceName;
  }

  /**
   * Returns true if all layers contain no defined tiled.
   */
  isEmpty(): boolean {
    return this._layers.every((layer) => layer.isEmpty());
  }

  getTileId(x: integer, y: integer, layerId: integer): integer {
    const layer = this.getTileLayer(layerId);
    if (!layer) return -1;
    const tileId = layer.getTileId(x, y);
    return tileId === undefined ? -1 : tileId;
  }

  setTile(x: integer, y: integer, layerId: integer, tileId: number) {
    const layer = this.getTileLayer(layerId);
    if (!layer) return;

    layer.setTile(x, y, tileId);
  }

  flipTileOnY(x: integer, y: integer, layerId: integer, flip: boolean) {
    const layer = this.getTileLayer(layerId);
    if (!layer) return;
    layer.setFlippedVertically(x, y, flip);
  }
  flipTileOnX(x: integer, y: integer, layerId: integer, flip: boolean) {
    const layer = this.getTileLayer(layerId);
    if (!layer) return;
    layer.setFlippedHorizontally(x, y, flip);
  }
  isTileFlippedOnX(x: integer, y: integer, layerId: integer): boolean {
    const layer = this.getTileLayer(layerId);
    if (!layer) return false;
    return layer.isFlippedHorizontally(x, y);
  }
  isTileFlippedOnY(x: integer, y: integer, layerId: integer): boolean {
    const layer = this.getTileLayer(layerId);
    if (!layer) return false;
    return layer.isFlippedVertically(x, y);
  }
  removeTile(x: integer, y: integer, layerId: integer) {
    if (x < 0 || x >= this.dimX || y < 0 || y >= this.dimY) {
      return;
    }
    const layer = this.getTileLayer(layerId);
    if (!layer) return;
    layer.removeTile(x, y);
  }

  trimEmptyColumnsAndRowToFitLayer(
    layerId: integer,
  ):
    | {
        poppedColumns: integer;
        poppedRows: integer;
        shiftedColumns: integer;
        shiftedRows: integer;
      }
    | undefined {
    const layer = this.getTileLayer(layerId);
    if (!layer) return;
    const initialRowCount = this.dimY;
    const initialColumnCount = this.dimX;

    const trimmingData = layer.getTrimmingData();

    for (const layer of this.getLayers()) {
      // TODO: Implement dimensions changes for EditableObjectLayer.
      if (layer instanceof EditableTileMapLayer) {
        layer.reduceDimensions(
          trimmingData.columnsToPop,
          trimmingData.columnsToShift,
          trimmingData.rowsToPop,
          trimmingData.rowsToShift,
        );
      }
    }
    this.dimX =
      initialColumnCount -
      trimmingData.columnsToPop -
      trimmingData.columnsToShift;
    this.dimY =
      initialRowCount - trimmingData.rowsToPop - trimmingData.rowsToShift;

    if (this.dimX === 0 && this.dimY === 0 && this._layers.length === 1) {
      // The tile map is empty. Instead of having an object with null width and height,
      // the tile map is resized to have a size of 1x1 with an empty tile. This is useful
      // in the editor. It might need to have a different behavior in the runtime.
      layer.increaseDimensions(1, 0, 1, 0);
      this.dimX = 1;
      this.dimY = 1;
      return {
        shiftedRows: 0,
        shiftedColumns: 0,
        poppedRows: initialRowCount - 1,
        poppedColumns: initialColumnCount - 1,
      };
    }

    return {
      poppedRows: trimmingData.rowsToPop,
      poppedColumns: trimmingData.columnsToPop,
      shiftedRows: trimmingData.rowsToShift,
      shiftedColumns: trimmingData.columnsToShift,
    };
  }
}

/**
 * A tile map layer.
 */
abstract class AbstractEditableLayer {
  /**
   * The layer tile map.
   */
  readonly tileMap: EditableTileMap;
  /**
   * The layer identifier.
   */
  readonly id: integer;
  private visible: boolean = true;

  /**
   * @param tileMap The layer tile map.
   * @param id The layer identifier.
   */
  constructor(tileMap: EditableTileMap, id: integer) {
    this.tileMap = tileMap;
    this.id = id;
  }

  abstract clone(tileMap: EditableTileMap, id: integer): AbstractEditableLayer;

  setVisible(visible: boolean): void {
    this.visible = visible;
  }

  toJSObject(): EditableTileMapLayerAsJsObject {
    return {
      id: this.id,
      alpha: 0,
      tiles: [],
    };
  }

  /**
   * @returns true if the layer is visible.
   */
  isVisible(): boolean {
    return this.visible;
  }

  isEmpty(): boolean {
    return true;
  }
}

/**
 * A layer where tiles are placed with pixel coordinates.
 */
export class EditableObjectLayer extends AbstractEditableLayer {
  readonly objects: TileObject[];

  /**
   * @param tileMap  The layer tile map.
   * @param id The layer identifier.
   */
  constructor(tileMap: EditableTileMap, id: integer) {
    super(tileMap, id);
    this.objects = [];
  }

  clone(tileMap: EditableTileMap, id: integer): EditableObjectLayer {
    const layer = new EditableObjectLayer(tileMap, id);
    layer.objects.push.apply(this.objects);
    return layer;
  }

  add(object: TileObject): void {
    this.objects.push(object);
  }

  isEmpty(): boolean {
    return this.objects.length === 0;
  }
}

/**
 * A tile that is placed with pixel coordinates.
 */
export class TileObject {
  /**
   * The tile identifier in the tile set.
   */
  private tileId: integer;
  /**
   * The coordinate of the tile left side.
   */
  readonly x: float;
  /**
   * The coordinate of the tile top side.
   */
  readonly y: float;

  /**
   * @param x The coordinate of the tile left side.
   * @param y The coordinate of the tile top side.
   * @param tileId The tile identifier in the tile set.
   */
  constructor(x: float, y: float, tileId: integer) {
    this.tileId = tileId;
    this.x = x;
    this.y = y;
  }

  /**
   * @return The tile identifier in the tile set.
   */
  getTileId(): integer {
    return FlippingHelper.getTileId(this.tileId);
  }

  setFlippedHorizontally(flippedHorizontally: boolean): void {
    this.tileId = FlippingHelper.setFlippedHorizontally(
      this.tileId,
      flippedHorizontally,
    );
  }

  setFlippedVertically(flippedVertically: boolean): void {
    this.tileId = FlippingHelper.setFlippedVertically(
      this.tileId,
      flippedVertically,
    );
  }

  setFlippedDiagonally(flippedDiagonally: boolean): void {
    this.tileId = FlippingHelper.setFlippedDiagonally(
      this.tileId,
      flippedDiagonally,
    );
  }

  /**
   * @returns true if the tile is flipped horizontally.
   */
  isFlippedHorizontally(): boolean {
    return FlippingHelper.isFlippedHorizontally(this.tileId);
  }

  /**
   * @returns true if the tile is flipped vertically.
   */
  isFlippedVertically(): boolean {
    return FlippingHelper.isFlippedVertically(this.tileId);
  }

  /**
   * @returns true if the tile is flipped diagonally.
   */
  isFlippedDiagonally(): boolean {
    return FlippingHelper.isFlippedDiagonally(this.tileId);
  }
}

const chunkTileIndexBitCount = 5;
const chunkSize = 1 << chunkTileIndexBitCount;
const chunkLength = chunkSize * chunkSize;
const chunkTileIndexMask = 0x1f;

class EditableTileMapLayerChuck {
  isKnownToBeEmpty = true;
  tiles: Int32Array;

  constructor() {
    this.tiles = new Int32Array(chunkLength).fill(0);
  }

  isEmpty(): boolean {
    if (this.isKnownToBeEmpty) {
      return true;
    }
    this.isKnownToBeEmpty = this.tiles.every((tileId) => tileId === 0);
    return this.isKnownToBeEmpty;
  }
}

/**
 * A tile map layer with tile organized in grid.
 */
export class EditableTileMapLayer extends AbstractEditableLayer {
  private _chunks: Array<Array<EditableTileMapLayerChuck>>;
  private _alpha: float;
  private tileOffsetX: integer = 0;
  private tileOffsetY: integer = 0;
  private chunkOffsetX: integer = 0;
  private chunkOffsetY: integer = 0;
  private dimensionX: integer;
  private dimensionY: integer;

  /**
   * @param tileMap The layer tile map.
   * @param id The layer identifier.
   */
  constructor(tileMap: EditableTileMap, id: integer) {
    super(tileMap, id);
    this.dimensionX = this.tileMap.getDimensionX();
    this.dimensionY = this.tileMap.getDimensionY();
    const chunkCountX = (this.dimensionX >> chunkTileIndexBitCount) + 1;
    const chunkCountY = (this.dimensionY >> chunkTileIndexBitCount) + 1;
    this._chunks = [];
    this._chunks.length = chunkCountY;
    for (let chunkY = 0; chunkY < chunkCountY; chunkY++) {
      const chunks = [];
      for (let chunkX = 0; chunkX < chunkCountX; chunkX++) {
        chunks[chunkX] = new EditableTileMapLayerChuck();
      }
      this._chunks[chunkY] = chunks;
    }
    this._alpha = 1;
  }

  clone(tileMap: EditableTileMap, id: integer): EditableTileMapLayer {
    const layer = new EditableTileMapLayer(tileMap, id);
    // TODO Make a trimmed clone
    for (let y = 0; y < this._chunks.length; y++) {
      const thisChunks = this._chunks[y];
      const otherChunks = layer._chunks[y];
      for (let x = 0; x < thisChunks.length; x++) {
        const thisChunk = thisChunks[x];
        const otherChunk = otherChunks[x];
        otherChunk.isKnownToBeEmpty = thisChunk.isKnownToBeEmpty;
        // TODO It can be skipped when it's empty.
        otherChunk.tiles.set(thisChunk.tiles);
      }
    }
    layer.tileOffsetX = this.tileOffsetX;
    layer.tileOffsetY = this.tileOffsetY;
    layer.chunkOffsetX = this.chunkOffsetX;
    layer.chunkOffsetY = this.chunkOffsetY;
    layer.dimensionX = this.dimensionX;
    layer.dimensionY = this.dimensionY;
    layer._alpha = this._alpha;
    return layer;
  }

  static from(
    editableTileMapLayerAsJsObject: EditableTileMapLayerAsJsObject,
    tileMap: EditableTileMap,
    isTileIdValid: (tileId: number) => boolean,
  ): EditableTileMapLayer {
    const layer = new EditableTileMapLayer(
      tileMap,
      editableTileMapLayerAsJsObject.id,
    );
    layer.setAlpha(editableTileMapLayerAsJsObject.alpha);
    editableTileMapLayerAsJsObject.tiles.forEach((row: number[], y: number) =>
      row.forEach((tileGID, x) => {
        const tileId = FlippingHelper.getTileId(tileGID);
        if (isTileIdValid(tileId)) {
          layer.setTileGID(x, y, tileGID);
        }
      }),
    );
    return layer;
  }

  toJSObject(): EditableTileMapLayerAsJsObject {
    // Array.from is needed to convert Int32Array to Array. Otherwise, JSON.stringify
    // serializes it as an object with index as keys.
    const tiles: Array<Array<number>> = [];
    tiles.length = this.dimensionY;
    for (let y = 0; y < this.dimensionY; y++) {
      const row: Array<number> = [];
      row.length = this.dimensionX;
      tiles[y] = row;
      for (let x = 0; x < this.dimensionX; x++) {
        const tileGID = this.getTileGID(x, y);
        // -1 corresponds to null value
        row[x] = tileGID === undefined ? -1 : tileGID;
      }
    }
    return {
      id: this.id,
      alpha: this._alpha,
      tiles,
    };
  }

  /**
   * The opacity (between 0-1) of the layer
   */
  getAlpha(): float {
    return this._alpha;
  }

  /**
   * @param alpha The opacity between 0-1
   */
  setAlpha(alpha: float) {
    this._alpha = alpha;
  }

  isEmpty(): boolean {
    return this._chunks.every((row) => row.every((chunk) => chunk.isEmpty()));
  }

  reduceDimensions(
    columnsToPop: number,
    columnsToShift: number,
    rowsToPop: number,
    rowsToShift: number,
  ) {
    const deltaChunkOffsetX = columnsToShift >> chunkTileIndexBitCount;
    this.chunkOffsetX += deltaChunkOffsetX;
    this.tileOffsetX +=
      columnsToShift - (deltaChunkOffsetX << chunkTileIndexBitCount);
    if (this.tileOffsetX >= chunkSize) {
      this.chunkOffsetX++;
      this.tileOffsetX -= chunkSize;
    }
    const deltaChunkOffsetY = rowsToShift >> chunkTileIndexBitCount;
    this.chunkOffsetY += deltaChunkOffsetY;
    this.tileOffsetY +=
      rowsToShift - (deltaChunkOffsetY << chunkTileIndexBitCount);
    if (this.tileOffsetY >= chunkSize) {
      this.chunkOffsetY++;
      this.tileOffsetY -= chunkSize;
    }
    this.dimensionX -= columnsToPop + columnsToShift;
    this.dimensionY -= rowsToPop + rowsToShift;
  }

  increaseDimensions(
    columnsToAppend: number,
    columnsToUnshift: number,
    rowsToAppend: number,
    rowsToUnshift: number,
  ) {
    // TODO Clear the tiles that are reused.

    const oldMinX =
      (this.chunkOffsetX << chunkTileIndexBitCount) + this.tileOffsetX;
    const newMinX = oldMinX - columnsToUnshift;
    const deltaChunkMinX = -(
      (newMinX >> chunkTileIndexBitCount) -
      (oldMinX >> chunkTileIndexBitCount)
    );
    this.chunkOffsetX -= deltaChunkMinX;
    this.tileOffsetX = newMinX & chunkTileIndexMask;

    const newChunksDimX =
      ((Math.max(0, this.chunkOffsetX) +
        (this.tileOffsetX + this.dimensionX + columnsToAppend)) >>
        chunkTileIndexBitCount) +
      1;

    if (this.chunkOffsetX < 0 || newChunksDimX > this._chunks.length) {
      const createChunk = () => new EditableTileMapLayerChuck();
      for (const row of this._chunks) {
        shiftArray(row, -this.chunkOffsetX, newChunksDimX, createChunk);
      }
      this.chunkOffsetX = Math.max(0, this.chunkOffsetX);
    }

    const oldMinY =
      (this.chunkOffsetY << chunkTileIndexBitCount) + this.tileOffsetY;
    const newMinY = oldMinY - rowsToUnshift;
    const deltaChunkMinY = -(
      (newMinY >> chunkTileIndexBitCount) -
      (oldMinY >> chunkTileIndexBitCount)
    );
    this.chunkOffsetY -= deltaChunkMinY;
    this.tileOffsetY = newMinY & chunkTileIndexMask;

    const newChunksDimY =
      ((Math.max(0, this.chunkOffsetY) +
        (this.tileOffsetY + this.dimensionY + rowsToAppend)) >>
        chunkTileIndexBitCount) +
      1;

    if (this.chunkOffsetY < 0 || newChunksDimY > this._chunks.length) {
      const createRow = () => {
        const newRow: Array<EditableTileMapLayerChuck> = [];
        newRow.length = newChunksDimY;
        for (let index = 0; index < newRow.length; index++) {
          newRow[index] = new EditableTileMapLayerChuck();
        }
        return newRow;
      };
      shiftArray(this._chunks, -this.chunkOffsetY, newChunksDimY, createRow);
      this.chunkOffsetY = Math.max(0, this.chunkOffsetY);
    }

    this.dimensionX += columnsToUnshift + columnsToAppend;
    this.dimensionY += rowsToUnshift + rowsToAppend;
  }

  /**
   * @param x The layer column.
   * @param y The layer row.
   * @param tileId The tile.
   */
  setTile(x: integer, y: integer, tileId: integer) {
    const definition = this.tileMap.getTileDefinition(tileId);
    if (!definition) {
      console.error(`Invalid tile definition index: ${tileId}`);
      return;
    }
    const chunk = this.getChunkForTile(x, y);
    if (!chunk) {
      return;
    }
    // +1 because 0 means null
    chunk.tiles[this.getChunkTileIndex(x, y)] = tileId + 1;
    chunk.isKnownToBeEmpty = false;
  }

  private getChunksDimX() {
    return ((this.tileOffsetX + this.dimensionX) >> chunkTileIndexBitCount) + 1;
  }

  private getChunksDimY() {
    return ((this.tileOffsetY + this.dimensionY) >> chunkTileIndexBitCount) + 1;
  }

  private getChunkForTile(
    x: integer,
    y: integer,
  ): EditableTileMapLayerChuck | undefined {
    x += this.tileOffsetX;
    y += this.tileOffsetY;
    const chunkX = (x >> chunkTileIndexBitCount) + this.chunkOffsetX;
    const chunkY = (y >> chunkTileIndexBitCount) + this.chunkOffsetY;
    const chunksRow = this._chunks[chunkY];
    return chunksRow && chunksRow[chunkX];
  }

  private getChunkTileIndex(x: integer, y: integer): integer {
    const localX = (x + this.tileOffsetX) & chunkTileIndexMask;
    const localY = (y + this.tileOffsetY) & chunkTileIndexMask;
    return (localY << chunkTileIndexBitCount) + localX;
  }

  /**
   * @param x The layer column.
   * @param y The layer row.
   * @param tileGID The tile GID.
   */
  setTileGID(x: integer, y: integer, tileGID: integer): void {
    const chunk = this.getChunkForTile(x, y);
    if (!chunk) {
      return;
    }
    // +1 because 0 means null
    chunk.tiles[this.getChunkTileIndex(x, y)] = tileGID + 1;
    chunk.isKnownToBeEmpty = false;
  }

  getTrimmingData(): {
    columnsToShift: number;
    rowsToShift: number;
    columnsToPop: number;
    rowsToPop: number;
  } {
    const {
      emptyLeftColumns: emptyLeftChunkColumns,
      emptyTopRows: emptyTopChunkRows,
      emptyRightColumns: emptyRightChunkColumns,
      emptyBottomRows: emptyBottomChunkRows,
    } = findEmptyCells(
      (x: integer, y: integer) => {
        const chunk = this.getChunkForTile(x, y);
        return chunk ? chunk.isKnownToBeEmpty : true;
      },
      this.getChunksDimX(),
      this.getChunksDimY(),
    );
    console.log(
      "chunk",
      emptyLeftChunkColumns,
      emptyTopChunkRows,
      emptyRightChunkColumns,
      emptyBottomChunkRows,
    );

    const offsetX = emptyLeftChunkColumns << chunkTileIndexBitCount;
    const offsetY = emptyTopChunkRows << chunkTileIndexBitCount;
    const dimensionX =
      this.dimensionX -
      ((emptyLeftChunkColumns + emptyRightChunkColumns) <<
        chunkTileIndexBitCount);
    const dimensionY =
      this.dimensionY -
      ((emptyTopChunkRows + emptyBottomChunkRows) << chunkTileIndexBitCount);

    const {
      emptyLeftColumns: emptyLeftTileColumns,
      emptyTopRows: emptyTopTileRows,
      emptyRightColumns: emptyRightTileColumns,
      emptyBottomRows: emptyBottomTileRows,
    } = findEmptyCells(
      (x: integer, y: integer) =>
        this.getTileId(x + offsetX, y + offsetY) === undefined,
      dimensionX,
      dimensionY,
    );
    console.log(
      "tiles",
      emptyLeftTileColumns,
      emptyTopTileRows,
      emptyRightTileColumns,
      emptyBottomTileRows,
    );

    // TODO Set isKnownToBeEmpty on other sides
    // TODO or just give up on isKnownToBeEmpty and keep try on the area that
    // has been edited to make a fast crop before trimming
    const extraEmptyLeftChunkColumns =
      emptyLeftTileColumns >> chunkTileIndexBitCount;
    for (let x = 0; x < extraEmptyLeftChunkColumns; x++) {
      for (
        let y = emptyTopChunkRows;
        y < this._chunks.length - emptyBottomChunkRows;
        y++
      ) {
        this._chunks[y][emptyLeftChunkColumns + x].isKnownToBeEmpty = true;
      }
    }

    return {
      columnsToShift:
        (emptyLeftChunkColumns << chunkTileIndexBitCount) +
        emptyLeftTileColumns,
      rowsToShift:
        (emptyTopChunkRows << chunkTileIndexBitCount) + emptyTopTileRows,
      columnsToPop:
        (emptyRightChunkColumns << chunkTileIndexBitCount) +
        emptyRightTileColumns,
      rowsToPop:
        (emptyBottomChunkRows << chunkTileIndexBitCount) + emptyBottomTileRows,
    };
  }

  /**
   * @param x The layer column.
   * @param y The layer row.
   */
  removeTile(x: integer, y: integer): void {
    const chunk = this.getChunkForTile(x, y);
    if (!chunk) {
      return;
    }
    // 0 means null
    chunk.tiles[this.getChunkTileIndex(x, y)] = 0;
  }

  /**
   * @param x The layer column.
   * @param y The layer row.
   * @param flippedHorizontally true if the tile is flipped horizontally.
   */
  setFlippedHorizontally(
    x: integer,
    y: integer,
    flippedHorizontally: boolean,
  ): void {
    const chunk = this.getChunkForTile(x, y);
    if (!chunk) {
      return;
    }
    const index = this.getChunkTileIndex(x, y);
    const tileId = chunk.tiles[index];
    if (tileId === 0) {
      return;
    }
    chunk.tiles[index] = FlippingHelper.setFlippedHorizontally(
      tileId,
      flippedHorizontally,
    );
    chunk.isKnownToBeEmpty = false;
  }

  /**
   * @param x The layer column.
   * @param y The layer row.
   * @param flippedVertically true if the tile is flipped vertically.
   */
  setFlippedVertically(
    x: integer,
    y: integer,
    flippedVertically: boolean,
  ): void {
    const chunk = this.getChunkForTile(x, y);
    if (!chunk) {
      return;
    }
    const index = this.getChunkTileIndex(x, y);
    const tileId = chunk.tiles[index];
    if (tileId === 0) {
      return;
    }
    chunk.tiles[index] = FlippingHelper.setFlippedVertically(
      tileId,
      flippedVertically,
    );
    chunk.isKnownToBeEmpty = false;
  }

  /**
   * @param x The layer column.
   * @param y The layer row.
   * @param flippedDiagonally true if the tile is flipped diagonally.
   */
  setFlippedDiagonally(
    x: integer,
    y: integer,
    flippedDiagonally: boolean,
  ): void {
    const chunk = this.getChunkForTile(x, y);
    if (!chunk) {
      return;
    }
    const index = this.getChunkTileIndex(x, y);
    const tileId = chunk.tiles[index];
    if (tileId === 0) {
      return;
    }
    chunk.tiles[index] = FlippingHelper.setFlippedDiagonally(
      tileId,
      flippedDiagonally,
    );
    chunk.isKnownToBeEmpty = false;
  }

  /**
   * @param x The layer column.
   * @param y The layer row.
   * @returns true if the tile is flipped horizontally.
   */
  isFlippedHorizontally(x: integer, y: integer): boolean {
    const chunk = this.getChunkForTile(x, y);
    if (!chunk) {
      return false;
    }
    return FlippingHelper.isFlippedHorizontally(
      chunk.tiles[this.getChunkTileIndex(x, y)],
    );
  }

  /**
   * @param x The layer column.
   * @param y The layer row.
   * @returns true if the tile is flipped vertically.
   */
  isFlippedVertically(x: integer, y: integer): boolean {
    const chunk = this.getChunkForTile(x, y);
    if (!chunk) {
      return false;
    }
    return FlippingHelper.isFlippedVertically(
      chunk.tiles[this.getChunkTileIndex(x, y)],
    );
  }

  /**
   * @param x The layer column.
   * @param y The layer row.
   * @returns true if the tile is flipped diagonally.
   */
  isFlippedDiagonally(x: integer, y: integer): boolean {
    const chunk = this.getChunkForTile(x, y);
    if (!chunk) {
      return false;
    }
    return FlippingHelper.isFlippedDiagonally(
      chunk.tiles[this.getChunkTileIndex(x, y)],
    );
  }

  /**
   * @param x The layer column.
   * @param y The layer row.
   * @returns The tile's GID (id + flipping bits).
   */
  getTileGID(x: integer, y: integer): integer | undefined {
    const chunk = this.getChunkForTile(x, y);
    if (!chunk) {
      return undefined;
    }
    const tileValue = chunk.tiles[this.getChunkTileIndex(x, y)];
    if (tileValue === 0) {
      return undefined;
    }
    // -1 because 0 is keep for null.
    return tileValue - 1;
  }

  /**
   * @param x The layer column.
   * @param y The layer row.
   * @returns The tile's id.
   */
  getTileId(x: integer, y: integer): integer | undefined {
    const chunk = this.getChunkForTile(x, y);
    if (!chunk) {
      return undefined;
    }
    const tileValue = chunk.tiles[this.getChunkTileIndex(x, y)];
    if (tileValue === 0) {
      return undefined;
    }
    // -1 because 0 is keep for null.
    return FlippingHelper.getTileId(tileValue - 1);
  }

  /**
   * The number of tile columns in the layer.
   */
  getDimensionX(): integer {
    return this.dimensionX;
  }

  /**
   * The number of tile rows in the layer.
   */
  getDimensionY(): integer {
    return this.dimensionY;
  }

  /**
   * @returns The layer width in pixels.
   */
  getWidth(): integer {
    return this.tileMap.getWidth();
  }

  /**
   * @returns The layer height in pixels.
   */
  getHeight(): integer {
    return this.tileMap.getHeight();
  }
}

/**
 * A tile definition from the tile set.
 */
export class TileDefinition {
  /**
   * There will probably be at most 4 tags on a tile.
   * An array lookup should take less time than using a Map.
   */
  private readonly taggedHitBoxes: {
    tag: string;
    polygons: PolygonVertices[];
    hasFullHitBox: boolean;
  }[];
  private readonly animationLength: integer;

  /**
   * A tile can be a composition of several tiles.
   */
  private stackedTiles: integer[];
  private stackTileId?: integer;

  /**
   * @param animationLength The number of frame in the tile animation.
   */
  constructor(animationLength?: integer) {
    this.taggedHitBoxes = [];
    this.animationLength = animationLength ?? 0;
    this.stackedTiles = [];
  }

  /**
   * Add a polygon for the collision layer
   * @param tag The tag to allow collision layer filtering.
   * @param polygon The polygon to use for collisions.
   * @param hasFullHitBox Set to `true` when the hitBox cover the whole tile.
   */
  addHitBox(
    tag: string,
    polygon: PolygonVertices,
    hasFullHitBox: boolean,
  ): void {
    let taggedHitBox = this.taggedHitBoxes.find((hitbox) => hitbox.tag === tag);
    if (!taggedHitBox) {
      taggedHitBox = { tag, polygons: [], hasFullHitBox: false };
      this.taggedHitBoxes.push(taggedHitBox);
    }
    taggedHitBox.hasFullHitBox ||= hasFullHitBox;
    taggedHitBox.polygons.push(polygon);
  }

  /**
   * This property is used by {@link TransformedCollisionTileMap}
   * to make collision classes.
   * @param tag  The tag to allow collision layer filtering.
   * @returns true if this tile contains any polygon with the given tag.
   */
  hasTaggedHitBox(tag: string): boolean {
    return this.taggedHitBoxes.some((hitbox) => hitbox.tag === tag);
  }

  /**
   * The hitboxes positioning is done by {@link TransformedCollisionTileMap}.
   * @param tag  The tag to allow collision layer filtering.
   * @returns The hit boxes for this tile.
   */
  getHitBoxes(tag: string): PolygonVertices[] | undefined {
    const taggedHitBox = this.taggedHitBoxes.find(
      (hitbox) => hitbox.tag === tag,
    );
    return taggedHitBox && taggedHitBox.polygons;
  }

  /**
   * Return `true` if the hit-box cover the whole tile.
   * @param tag  The tag to allow collision layer filtering.
   * @returns `true` if the hit-box cover the whole tile.
   */
  hasFullHitBox(tag: string): boolean {
    const taggedHitBox = this.taggedHitBoxes.find(
      (hitbox) => hitbox.tag === tag,
    );
    return !!taggedHitBox && taggedHitBox.hasFullHitBox;
  }

  /**
   * Animated tiles have a limitation:
   * they are only able to use frames arranged horizontally one next
   * to each other on the atlas.
   * @returns The number of frame in the tile animation.
   */
  getAnimationLength(): integer {
    return this.animationLength;
  }

  /**
   * @returns The tile representing the stack of tiles.
   */
  getStackTileId(): integer {
    return this.stackTileId!;
  }

  /**
   * @returns All the tiles composed in the stack.
   */
  getStackedTiles(): integer[] {
    return this.stackedTiles;
  }

  /**
   * @returns `true` if the defintion is a stack of tiles.
   */
  hasStackedTiles(): boolean {
    return this.stackedTiles.length > 0;
  }

  /**
   * @param stackTileId The `tileId` representing the stack.
   * @param tiles All the tiles of stack.
   */
  setStackedTiles(stackTileId: integer, ...tiles: integer[]): void {
    this.stackedTiles = tiles;
    this.stackTileId = stackTileId;
  }
}

function shiftArray<T>(
  array: Array<T>,
  offset: integer,
  newLength: integer,
  buildNewValue: () => T,
): void {
  const oldLength = array.length;
  array.length = newLength;
  for (let index = offset; index < offset + oldLength; index++) {
    array[index] = array[index - offset];
  }
  for (let index = 0; index < offset; index++) {
    array[index] = buildNewValue();
  }
  for (let index = offset + oldLength; index < array.length; index++) {
    array[index] = buildNewValue();
  }
}

function findEmptyCells(
  isEmpty: (x: integer, y: integer) => boolean,
  dimX: number,
  dimY: number,
): {
  emptyLeftColumns: number;
  emptyTopRows: number;
  emptyRightColumns: number;
  emptyBottomRows: number;
} {
  let minX = dimX;
  let minY = dimY;
  let maxX = -1;
  let maxY = -1;

  // Scan from the bottom
  for (let y = dimY - 1; y >= 0; y--) {
    let hasFoundValue = false;
    // from right to left
    for (let x = dimX - 1; x >= 0; x--) {
      hasFoundValue = !isEmpty(x, y);
      if (hasFoundValue) {
        maxX = x;
        maxY = y;
        break;
      }
    }
    if (hasFoundValue) {
      break;
    }
  }
  // The layer is empty.
  if (maxY === -1) {
    return {
      emptyTopRows: 0,
      emptyLeftColumns: 0,
      emptyBottomRows: dimX - 1,
      emptyRightColumns: dimY - 1,
    };
  }
  // Scan from the top
  for (let y = 0; y <= maxY; y++) {
    let hasFoundValue = false;
    // from left to right
    for (let x = 0; x < dimX; x++) {
      hasFoundValue = !isEmpty(x, y);
      if (hasFoundValue) {
        minX = x;
        minY = y;
        break;
      }
    }
    if (hasFoundValue) {
      break;
    }
  }
  // When only 1 row remains, we already found the bounds.
  if (minY !== maxY) {
    let hasFoundValue = false;
    // Scan from the right
    for (let x = dimX - 1; x > maxX; x--) {
      // maxY is already covered
      for (let y = minY; y < maxY; y++) {
        hasFoundValue = !isEmpty(x, y);
        if (hasFoundValue) {
          maxX = x;
          break;
        }
      }
      if (hasFoundValue) {
        break;
      }
    }
    // Scan from the left
    for (let x = 0; x < minX; x++) {
      let hasFoundValue = false;
      // minY is already covered
      for (let y = minY + 1; y <= maxY; y++) {
        hasFoundValue = !isEmpty(x, y);
        if (hasFoundValue) {
          minX = x;
          break;
        }
      }
      if (hasFoundValue) {
        break;
      }
    }
  }
  return {
    emptyTopRows: minY,
    emptyLeftColumns: minX,
    emptyBottomRows: dimY - 1 - maxY,
    emptyRightColumns: dimX - 1 - maxX,
  };
}

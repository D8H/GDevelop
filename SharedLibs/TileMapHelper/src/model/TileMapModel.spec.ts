import {
  EditableTileMap,
  EditableTileMapLayer,
  TileDefinition,
} from "./TileMapModel";

describe("TileMapModel", () => {
  const buildLayer = (size: number): EditableTileMapLayer => {
    const tileSet = new Map<number, TileDefinition>();
    for (let tileId = 0; tileId < 8; tileId++) {
      tileSet.set(tileId, new TileDefinition());
    }
    const tileMap = new EditableTileMap(64, 64, size, size, tileSet);
    return tileMap.addNewTileLayer(1);
  };

  const buildLayerWithSomeTiles = (): EditableTileMapLayer => {
    const layer = buildLayer(8);

    layer.setTile(0, 0, 1);
    layer.setTile(1, 0, 2);
    layer.setTile(0, 1, 3);
    layer.setTile(1, 1, 4);
    return layer;
  };

  const fillTilesRectangle = (
    layer: EditableTileMapLayer,
    minX: number,
    minY: number,
    maxX: number,
    maxY: number,
  ): EditableTileMapLayer => {
    for (let x = minX; x <= maxX; x++) {
      for (let y = minY; y <= maxY; y++) {
        layer.setTile(x, y, 1);
      }
    }
    return layer;
  };

  const checkLayerContent = (
    layer: EditableTileMapLayer,
    offsetX: number = 0,
    offsetY: number = 0,
  ): void => {
    expect(layer.getTileId(offsetX + 0, offsetY + 0)).to.be(1);
    expect(layer.getTileId(offsetX + 1, offsetY + 0)).to.be(2);
    expect(layer.getTileId(offsetX + 0, offsetY + 1)).to.be(3);
    expect(layer.getTileId(offsetX + 1, offsetY + 1)).to.be(4);
  };

  [0, 1, 4, 31, 32, 33, 150].forEach((delta) => {
    describe(`dimension delta: ${delta},`, () => {
      it("can be expanded at the bottom and reduced back", () => {
        const layer = buildLayerWithSomeTiles();

        layer.increaseDimensions(0, 0, delta, 0);

        expect(layer.getDimensionX()).to.be(8);
        expect(layer.getDimensionY()).to.be(8 + delta);
        checkLayerContent(layer);

        layer.reduceDimensions(0, 0, delta, 0);

        expect(layer.getDimensionX()).to.be(8);
        expect(layer.getDimensionY()).to.be(8);
        checkLayerContent(layer);
      });

      it("can be expanded on the right and reduced back", () => {
        const layer = buildLayerWithSomeTiles();

        layer.increaseDimensions(delta, 0, 0, 0);

        expect(layer.getDimensionX()).to.be(8 + delta);
        expect(layer.getDimensionY()).to.be(8);
        checkLayerContent(layer);

        layer.reduceDimensions(delta, 0, 0, 0);

        expect(layer.getDimensionX()).to.be(8);
        expect(layer.getDimensionY()).to.be(8);
        checkLayerContent(layer);
      });

      it("can be expanded on the top and reduced back", () => {
        const layer = buildLayerWithSomeTiles();

        layer.increaseDimensions(0, 0, 0, delta);

        expect(layer.getDimensionX()).to.be(8);
        expect(layer.getDimensionY()).to.be(8 + delta);
        checkLayerContent(layer, 0, delta);

        layer.reduceDimensions(0, 0, 0, delta);

        expect(layer.getDimensionX()).to.be(8);
        expect(layer.getDimensionY()).to.be(8);
        checkLayerContent(layer);
      });

      it("can be expanded on the left and reduced back", () => {
        const layer = buildLayerWithSomeTiles();

        layer.increaseDimensions(0, delta, 0, 0);

        expect(layer.getDimensionX()).to.be(8 + delta);
        expect(layer.getDimensionY()).to.be(8);
        checkLayerContent(layer, delta, 0);

        layer.reduceDimensions(0, delta, 0, 0);

        expect(layer.getDimensionX()).to.be(8);
        expect(layer.getDimensionY()).to.be(8);
        checkLayerContent(layer);
      });
    });
  });

  describe("TileMapModel", () => {
    it("can trim on the bottom", () => {
      const layer = buildLayer(8);
      fillTilesRectangle(layer, 0, 0, 7, 3);

      const {
        columnsToShift,
        rowsToShift,
        columnsToPop,
        rowsToPop,
      } = layer.getTrimmingData();

      expect(columnsToShift).to.be(0);
      expect(rowsToShift).to.be(0);
      expect(columnsToPop).to.be(0);
      expect(rowsToPop).to.be(4);
    });

    it("can trim on the right", () => {
      const layer = buildLayer(8);
      fillTilesRectangle(layer, 0, 0, 3, 7);

      const {
        columnsToShift,
        rowsToShift,
        columnsToPop,
        rowsToPop,
      } = layer.getTrimmingData();

      expect(columnsToShift).to.be(0);
      expect(rowsToShift).to.be(0);
      expect(columnsToPop).to.be(4);
      expect(rowsToPop).to.be(0);
    });

    it("can trim on the top", () => {
      const layer = buildLayer(8);
      fillTilesRectangle(layer, 0, 4, 7, 7);

      const {
        columnsToShift,
        rowsToShift,
        columnsToPop,
        rowsToPop,
      } = layer.getTrimmingData();

      expect(columnsToShift).to.be(0);
      expect(rowsToShift).to.be(4);
      expect(columnsToPop).to.be(0);
      expect(rowsToPop).to.be(0);
    });

    it("can trim on the left", () => {
      const layer = buildLayer(8);
      fillTilesRectangle(layer, 4, 0, 7, 7);

      const {
        columnsToShift,
        rowsToShift,
        columnsToPop,
        rowsToPop,
      } = layer.getTrimmingData();

      expect(columnsToShift).to.be(4);
      expect(rowsToShift).to.be(0);
      expect(columnsToPop).to.be(0);
      expect(rowsToPop).to.be(0);
    });
  });
});

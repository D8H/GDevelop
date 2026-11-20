import {
  EditableTileMap,
  EditableTileMapLayer,
  EditableTileMapAsJsObject,
  PixiTileMapHelper,
  TileDefinition,
  TileMapFileContent,
  TileMapManager,
  TileTextureCache,
  TiledTileset,
  FlippingHelper,
} from './dts/index';

declare global {
  namespace TileMapHelper {
    export {
      EditableTileMap,
      EditableTileMapLayer,
      EditableTileMapAsJsObject,
      PixiTileMapHelper,
      TileDefinition,
      TileMapFileContent,
      TileMapManager,
      TileTextureCache,
      TiledTileset,
      FlippingHelper,
    };
  }
}

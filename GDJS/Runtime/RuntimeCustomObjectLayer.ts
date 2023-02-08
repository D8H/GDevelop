/*
 * GDevelop JS Platform
 * Copyright 2013-2016 Florian Rival (Florian.Rival@gmail.com). All rights reserved.
 * This project is released under the MIT License.
 */
namespace gdjs {
  /**
   * Represents a layer of a container, used to display objects.
   *
   * Viewports and multiple cameras are not supported.
   */
  export class RuntimeCustomObjectLayer extends gdjs.RuntimeLayer {
    /**
     * @param layerData The data used to initialize the layer
     * @param instanceContainer The container in which the layer is used
     */
    constructor(
      layerData: LayerData,
      instanceContainer: gdjs.RuntimeInstanceContainer
    ) {
      super(layerData, instanceContainer);
    }

    onGameResolutionResized(
      oldGameResolutionOriginX: float,
      oldGameResolutionOriginY: float
    ): void {
      // TODO Remove?
    }

    getCameraX(cameraId?: integer): float {
      // TODO Remove?
      return 0;
    }

    getCameraY(cameraId?: integer): float {
      // TODO Remove?
      return 0;
    }

    setCameraX(x: float, cameraId?: integer): void {
      // TODO Remove?
    }

    setCameraY(y: float, cameraId?: integer): void {
      // TODO Remove?
    }

    getCameraWidth(cameraId?: integer): float {
      // TODO Remove?
      return 0;
    }

    getCameraHeight(cameraId?: integer): float {
      // TODO Remove?
      return 0;
    }

    setCameraZoom(newZoom: float, cameraId?: integer): void {
      // TODO Remove?
    }

    getCameraZoom(cameraId?: integer): float {
      // TODO Remove?
      return 0;
    }

    getCameraRotation(cameraId?: integer): float {
      // TODO Remove?
      return 0;
    }

    setCameraRotation(rotation: float, cameraId?: integer): void {
      // TODO Remove?
    }

    convertCoords(
      x: float,
      y: float,
      cameraId: integer,
      result: FloatPoint
    ): FloatPoint {
      // TODO EBO use an AffineTransformation to avoid chained calls.
      // The result parameter used to be optional.
      return this._runtimeScene.convertCoords(x, y, result || [0, 0]);
    }

    convertInverseCoords(
      x: float,
      y: float,
      cameraId: integer,
      result: FloatPoint
    ): FloatPoint {
      // TODO EBO use an AffineTransformation to avoid chained calls.
      // The result parameter used to be optional.
      return this._runtimeScene.convertInverseCoords(x, y, result || [0, 0]);
    }

    applyLayerInverseTransformation(
      x: float,
      y: float,
      cameraId: integer,
      result: FloatPoint
    ): FloatPoint {
      // TODO Remove?
      result[0] = x;
      result[1] = y;
      return result;
    }

    applyLayerTransformation(
      x: float,
      y: float,
      cameraId: integer,
      result: FloatPoint
    ): FloatPoint {
      // TODO Remove?
      result[0] = x;
      result[1] = y;
      return result;
    }

    getWidth(): float {
      // TODO Remove?
      return 0;
    }

    getHeight(): float {
      // TODO Remove?
      return 0;
    }
  }
}

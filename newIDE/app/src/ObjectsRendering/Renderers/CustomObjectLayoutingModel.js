// @flow
import { mapFor } from '../../Utils/MapFor';

const gd: libGDevelop = global.gd;

// - The term "object" is used in comments about the layout declaration because
//   the layout is done with one instance per object-child and the object name
//   is used to reference these instances.
// - The term "instance" is used for the layout calculus because it's actually
//   instances that are in the scene editor.

type Anchor = {
  /**
   * The target of the anchor on the referential object
   * as a factor of the targeted object size
   * (0 for left or top, 1 for right or bottom).
   */
  target: number,
  /**
   * A displacement to add on the anchored object.
   */
  delta: number,
};

/**
 * Layout description that allows to position the child-objects
 * to follow the size of the parent.
 */
export type InstanceAnchor = {
  leftAnchor: Anchor,
  topAnchor: Anchor,
  rightAnchor: Anchor,
  bottomAnchor: Anchor,
};

type PropertyAnchorType = 0 | 1 | 2 | 3 | 4;
const PropertyAnchor = {
  None: 0,
  Min: 1,
  Max: 2,
  Proportional: 3,
  Center: 4,
};

export type ObjectAnchor = {
  leftEdgeAnchor: PropertyAnchorType,
  topEdgeAnchor: PropertyAnchorType,
  rightEdgeAnchor: PropertyAnchorType,
  bottomEdgeAnchor: PropertyAnchorType,
};

const getPropertyValue = (
  properties: gdMapStringPropertyDescriptor,
  name: string
): PropertyAnchorType =>
  properties.has(name)
    ? ((parseFloat(properties.get(name).getValue()) ||
        0: any): PropertyAnchorType)
    : 0;

export interface PropertiesContainer {
  getProperties(): gdMapStringPropertyDescriptor;
}

/**
 * Build the layouts description from the custom object properties.
 */
export const getObjectAnchors = (
  eventBasedObject: gdEventsBasedObject,
  customObjectConfiguration: PropertiesContainer
): Map<string, ObjectAnchor> => {
  const childObjects = eventBasedObject.getObjects();
  return new Map<string, ObjectAnchor>(
    mapFor(0, childObjects.getObjectsCount(), i => {
      const childObject = childObjects.getObjectAt(i);

      if (!childObject.hasBehaviorNamed('Anchor')) {
        return null;
      }
      const properties = childObject.getBehavior('Anchor').getProperties();
      const leftEdgeAnchor = getPropertyValue(properties, 'leftEdgeAnchor');
      const topEdgeAnchor = getPropertyValue(properties, 'topEdgeAnchor');
      const rightEdgeAnchor = getPropertyValue(properties, 'rightEdgeAnchor');
      const bottomEdgeAnchor = getPropertyValue(properties, 'bottomEdgeAnchor');

      return [
        childObject.getName(),
        { leftEdgeAnchor, topEdgeAnchor, rightEdgeAnchor, bottomEdgeAnchor },
      ];
    }).filter(Boolean)
  );
};

// TODO EBO Make an event-based object instance editor (like the one for the scene)
// and use real instances instead of this.
/**
 * A minimal implementation of a fake gdInitialInstance to allow to store
 * layouting results without actually modifying events-based objects initial
 * instances.
 * @see gdInitialInstance
 */
export class LayoutedInstance {
  objectName = '';
  ptr = 0;
  x = 0;
  y = 0;
  z = 0;
  _hasCustomSize = false;
  _hasCustomDepth = false;
  _customWidth = 0;
  _customHeight = 0;
  _customDepth = 0;

  getX() {
    return this.x;
  }

  getY() {
    return this.y;
  }

  getZ() {
    return this.z;
  }

  getAngle() {
    return 0;
  }

  getRotationX() {
    return 0;
  }

  getRotationY() {
    return 0;
  }

  setObjectName(objectName: string) {
    this.objectName = objectName;
  }

  getObjectName() {
    return this.objectName;
  }

  setX(x: number) {}

  setY(y: number) {}

  setZ(z: number) {}

  setAngle(angle: number) {}

  setRotationX(angle: number) {}

  setRotationY(angle: number) {}

  isLocked() {
    return false;
  }

  setLocked(lock: boolean) {}

  isSealed() {
    return false;
  }

  setSealed(seal: boolean) {}

  getZOrder() {
    return 0;
  }

  setZOrder(zOrder: number) {}

  getLayer() {
    return '';
  }

  setLayer(layer: string) {}

  setHasCustomSize(enable: boolean) {
    this._hasCustomSize = enable;
  }

  hasCustomSize() {
    return this._hasCustomSize;
  }

  hasCustomDepth() {
    return this._hasCustomDepth;
  }

  setCustomWidth(width: number) {
    this._customWidth = width;
    this._hasCustomSize = true;
  }

  getCustomWidth() {
    return this._customWidth;
  }

  setCustomHeight(height: number) {
    this._customHeight = height;
    this._hasCustomSize = true;
  }

  getCustomHeight() {
    return this._customHeight;
  }

  setCustomDepth(depth: number) {
    this._customDepth = depth;
    this._hasCustomDepth = true;
  }

  getCustomDepth() {
    return this._customDepth;
  }

  resetPersistentUuid() {
    return this;
  }

  updateCustomProperty(
    name: string,
    value: string,
    globalObjectsContainer: gdObjectsContainer,
    objectsContainer: gdObjectsContainer
  ) {}

  getCustomProperties(
    globalObjectsContainer: gdObjectsContainer,
    objectsContainer: gdObjectsContainer
  ) {
    return null;
  }

  getRawDoubleProperty(name: string) {
    return 0;
  }

  getRawStringProperty(name: string) {
    return '';
  }

  setRawDoubleProperty(name: string, value: number) {}

  setRawStringProperty(name: string, value: string) {}

  getVariables() {
    return [];
  }

  serializeTo(element: gdSerializerElement) {}

  unserializeFrom(element: gdSerializerElement) {}
}

/**
 * The part of `gdInitialInstance` interface used by the layouting.
 * @see gdInitialInstance
 */
export type InitialInstanceDimension = {
  hasCustomSize(): boolean,
  getCustomWidth(): number,
  getCustomHeight(): number,
  getX(): number,
  getY(): number,
};

/**
 * @see RenderedInstance
 */
export interface ChildRenderedInstance {
  +_instance: InitialInstanceDimension;
  _pixiObject: { height: number };
  getDefaultWidth(): number;
  getDefaultHeight(): number;
  getOriginX(): number;
  getOriginY(): number;
  update(): void;
}

/**
 * @see RenderedCustomObjectInstance
 */
export interface LayoutedParent<
  CovariantChildRenderedInstance: ChildRenderedInstance
> {
  eventBasedObject: gdEventsBasedObject | null;
  _associatedObjectConfiguration: gdObjectConfiguration;
  getWidth(): number;
  getHeight(): number;
  getRendererOfInstance: (
    instance: gdInitialInstance
  ) => CovariantChildRenderedInstance;
  getLayoutedInstance: (instance: gdInitialInstance) => LayoutedInstance;
}

export const applyChildLayouts = <T: ChildRenderedInstance>(
  parent: LayoutedParent<T>
): ((instancePtr: number) => void) => {
  const eventBasedObject = parent.eventBasedObject;
  if (!eventBasedObject) {
    return (instancePtr: number) => {};
  }
  const customObjectConfiguration = gd.asCustomObjectConfiguration(
    parent._associatedObjectConfiguration
  );
  const objectAnchors = getObjectAnchors(
    eventBasedObject,
    customObjectConfiguration
  );
  const parentInitialMinX = eventBasedObject.getAreaMinX();
  const parentInitialMinY = eventBasedObject.getAreaMinY();
  const parentInitialMaxX = eventBasedObject.getAreaMaxX();
  const parentInitialMaxY = eventBasedObject.getAreaMaxY();
  const parentInitialCenterX = (parentInitialMaxX + parentInitialMinX) / 2;
  const parentInitialCenterY = (parentInitialMaxY + parentInitialMinY) / 2;
  const parentInitialWidth = parentInitialMaxX - parentInitialMinX;
  const parentInitialHeight = parentInitialMaxY - parentInitialMinY;

  const parentWidth = parent.getWidth();
  const parentHeight = parent.getHeight();
  const parentScaleX = parentWidth / parentInitialWidth;
  const parentScaleY = parentHeight / parentInitialHeight;
  const parentMinX = parentInitialMinX * parentScaleX;
  const parentMinY = parentInitialMinY * parentScaleX;
  const parentMaxX = parentInitialMaxX * parentScaleY;
  const parentMaxY = parentInitialMaxY * parentScaleY;
  const parentCenterX = (parentMaxX + parentMinX) / 2;
  const parentCenterY = (parentMaxY + parentMinY) / 2;

  return (instancePtr: number) => {
    // $FlowFixMe - wrapPointer is not exposed
    const initialInstance: gdInitialInstance = gd.wrapPointer(
      instancePtr,
      gd.InitialInstance
    );
    const layoutedInstance = parent.getLayoutedInstance(initialInstance);
    const renderedInstance = parent.getRendererOfInstance(
      ((layoutedInstance: any): gdInitialInstance)
    );

    const objectAnchor = objectAnchors.get(layoutedInstance.getObjectName());
    if (!objectAnchor) {
    } else {
      const {
        leftEdgeAnchor,
        topEdgeAnchor,
        rightEdgeAnchor,
        bottomEdgeAnchor,
      } = objectAnchor;

      if (parentScaleX !== 1 && (leftEdgeAnchor || rightEdgeAnchor)) {
        const initialInstanceX = initialInstance.getX();
        const initialInstanceWidth = initialInstance.hasCustomSize()
          ? initialInstance.getCustomWidth()
          : renderedInstance.getDefaultWidth();
        const initialInstanceOriginX =
          (renderedInstance.getOriginX() * initialInstanceWidth) /
          renderedInstance.getDefaultWidth();
        const initialInstanceMinX = initialInstanceX - initialInstanceOriginX;
        const initialInstanceMaxX = initialInstanceMinX + initialInstanceWidth;

        let leftPixel = initialInstanceMinX;
        if (leftEdgeAnchor === PropertyAnchor.Min) {
          leftPixel = parentMinX + initialInstanceMinX - parentInitialMinX;
        } else if (leftEdgeAnchor === PropertyAnchor.Max) {
          leftPixel = parentMaxX + initialInstanceMinX - parentInitialMaxX;
        } else if (leftEdgeAnchor === PropertyAnchor.Proportional) {
          leftPixel =
            parentMinX +
            ((initialInstanceMinX - parentInitialMinX) / parentInitialWidth) *
              parentWidth;
        } else if (leftEdgeAnchor === PropertyAnchor.Center) {
          leftPixel =
            parentCenterX + initialInstanceMinX - parentInitialCenterX;
        }

        let rightPixel = initialInstanceMaxX;
        if (rightEdgeAnchor === PropertyAnchor.Min) {
          rightPixel = parentMinX + initialInstanceMaxX - parentInitialMinX;
        } else if (rightEdgeAnchor === PropertyAnchor.Max) {
          rightPixel = parentMaxX + initialInstanceMaxX - parentInitialMaxX;
        } else if (rightEdgeAnchor === PropertyAnchor.Proportional) {
          rightPixel =
            parentMinX +
            ((initialInstanceMaxX - parentInitialMinX) / parentInitialWidth) *
              parentWidth;
        } else if (rightEdgeAnchor === PropertyAnchor.Center) {
          rightPixel =
            parentCenterX + initialInstanceMaxX - parentInitialCenterX;
        }

        const width = rightPixel - leftPixel;
        const originX =
          (renderedInstance.getOriginX() * width) /
          renderedInstance.getDefaultWidth();
        const x = leftPixel + originX;
        layoutedInstance.x = x;
        layoutedInstance.setCustomWidth(width);
      }

      if (parentScaleY !== 1 && (topEdgeAnchor || bottomEdgeAnchor)) {
        const initialInstanceY = initialInstance.getY();
        const initialInstanceHeight = initialInstance.hasCustomSize()
          ? initialInstance.getCustomHeight()
          : renderedInstance.getDefaultHeight();
        const initialInstanceOriginY =
          (renderedInstance.getOriginY() * initialInstanceHeight) /
          renderedInstance.getDefaultHeight();
        const initialInstanceMinY = initialInstanceY - initialInstanceOriginY;
        const initialInstanceMaxY = initialInstanceMinY + initialInstanceHeight;

        let bottomPixel = initialInstanceMaxY;
        if (bottomEdgeAnchor === PropertyAnchor.Min) {
          bottomPixel = parentMinY + initialInstanceMaxY - parentInitialMinY;
        } else if (bottomEdgeAnchor === PropertyAnchor.Max) {
          bottomPixel = parentMaxY + initialInstanceMaxY - parentInitialMaxY;
        } else if (bottomEdgeAnchor === PropertyAnchor.Proportional) {
          bottomPixel =
            parentMinY +
            ((initialInstanceMaxY - parentInitialMinY) / parentInitialHeight) *
              parentHeight;
        } else if (bottomEdgeAnchor === PropertyAnchor.Center) {
          bottomPixel =
            parentCenterY + initialInstanceMaxY - parentInitialCenterY;
        }

        let topPixel = initialInstanceMinY;
        if (topEdgeAnchor === PropertyAnchor.Min) {
          topPixel = parentMinY + initialInstanceMinY - parentInitialMinY;
        } else if (topEdgeAnchor === PropertyAnchor.Max) {
          topPixel = parentMaxY + initialInstanceMinY - parentInitialMaxY;
        } else if (topEdgeAnchor === PropertyAnchor.Proportional) {
          topPixel =
            parentMinY +
            ((initialInstanceMinY - parentInitialMinY) / parentInitialHeight) *
              parentHeight;
        } else if (topEdgeAnchor === PropertyAnchor.Center) {
          topPixel = parentCenterY + initialInstanceMinY - parentInitialCenterY;
        }

        const height = bottomPixel - topPixel;
        const originY =
          (renderedInstance.getOriginY() * height) /
          renderedInstance.getDefaultHeight();
        const y = topPixel + originY;
        layoutedInstance.setCustomHeight(height);
        // This ensure objects are centered if their dimensions changed from the
        // custom ones (preferred ones).
        // For instance, text object dimensions change according to how the text is wrapped.
        renderedInstance.update();
        layoutedInstance.y = y;
      }

      renderedInstance.update();
    }
  };
};

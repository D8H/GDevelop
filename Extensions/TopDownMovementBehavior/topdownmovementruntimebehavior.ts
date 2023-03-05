/*
GDevelop - Top-down movement Behavior Extension
Copyright (c) 2010-2016 Florian Rival (Florian.Rival@gmail.com)
 */

namespace gdjs {
  /**
   * Allows an object to move in 4 or 8 directions, with customizable speed, accelerations
   * and rotation.
   */
  export class TopDownMovementRuntimeBehavior extends gdjs.RuntimeBehavior {
    // Behavior configuration:
    private _allowDiagonals: boolean;
    private _acceleration: float;
    private _deceleration: float;
    private _maxSpeed: float;
    private _angularMaxSpeed: float;
    private _rotateObject: boolean;
    private _angleOffset: float;
    private _ignoreDefaultControls: boolean;
    _movementAngleOffset: float;
    _isAssistanceEnable: boolean;

    /** The latest angle of movement, in degrees. */
    private _angle: float = 0;

    // Attributes used when moving
    _xVelocity: float = 0;
    _yVelocity: float = 0;
    private _angularSpeed: float = 0;

    // Inputs
    private _leftKey: boolean = false;
    private _rightKey: boolean = false;
    private _upKey: boolean = false;
    private _downKey: boolean = false;
    private _leftKeyPressedDuration: float = 0;
    private _rightKeyPressedDuration: float = 0;
    private _upKeyPressedDuration: float = 0;
    private _downKeyPressedDuration: float = 0;
    private _wasStickUsed: boolean = false;
    _stickAngle: float = 0;
    _stickForce: float = 0;

    // @ts-ignore The setter "setViewpoint" is not detected as an affectation.
    _basisTransformation: gdjs.TopDownMovementRuntimeBehavior.BasisTransformation | null;
    _temporaryPointForTransformations: FloatPoint = [0, 0];

    private _topDownMovementHooks: Array<
      gdjs.TopDownMovementRuntimeBehavior.TopDownMovementHook
    > = [];

    constructor(
      instanceContainer: gdjs.RuntimeInstanceContainer,
      behaviorData,
      owner: gdjs.RuntimeObject
    ) {
      super(instanceContainer, behaviorData, owner);
      this._allowDiagonals = behaviorData.allowDiagonals;
      this._acceleration = behaviorData.acceleration;
      this._deceleration = behaviorData.deceleration;
      this._maxSpeed = behaviorData.maxSpeed;
      this._angularMaxSpeed = behaviorData.angularMaxSpeed;
      this._rotateObject = behaviorData.rotateObject;
      this._angleOffset = behaviorData.angleOffset;
      this._ignoreDefaultControls = behaviorData.ignoreDefaultControls;
      this._isAssistanceEnable = behaviorData.enableAssistance || false;
      this.registerHook(
        new gdjs.TopDownMovementRuntimeBehavior.Assistance(
          this,
          instanceContainer
        )
      );
      this.setViewpoint(
        behaviorData.viewpoint,
        behaviorData.customIsometryAngle
      );
      this._movementAngleOffset = behaviorData.movementAngleOffset || 0;
    }

    updateFromBehaviorData(oldBehaviorData, newBehaviorData): boolean {
      if (oldBehaviorData.allowDiagonals !== newBehaviorData.allowDiagonals) {
        this._allowDiagonals = newBehaviorData.allowDiagonals;
      }
      if (oldBehaviorData.acceleration !== newBehaviorData.acceleration) {
        this._acceleration = newBehaviorData.acceleration;
      }
      if (oldBehaviorData.deceleration !== newBehaviorData.deceleration) {
        this._deceleration = newBehaviorData.deceleration;
      }
      if (oldBehaviorData.maxSpeed !== newBehaviorData.maxSpeed) {
        this._maxSpeed = newBehaviorData.maxSpeed;
      }
      if (oldBehaviorData.angularMaxSpeed !== newBehaviorData.angularMaxSpeed) {
        this._angularMaxSpeed = newBehaviorData.angularMaxSpeed;
      }
      if (oldBehaviorData.rotateObject !== newBehaviorData.rotateObject) {
        this._rotateObject = newBehaviorData.rotateObject;
      }
      if (oldBehaviorData.angleOffset !== newBehaviorData.angleOffset) {
        this._angleOffset = newBehaviorData.angleOffset;
      }
      if (
        oldBehaviorData.ignoreDefaultControls !==
        newBehaviorData.ignoreDefaultControls
      ) {
        this._ignoreDefaultControls = newBehaviorData.ignoreDefaultControls;
      }
      if (
        oldBehaviorData.platformType !== newBehaviorData.platformType ||
        oldBehaviorData.customIsometryAngle !==
          newBehaviorData.customIsometryAngle
      ) {
        this.setViewpoint(
          newBehaviorData.platformType,
          newBehaviorData.customIsometryAngle
        );
      }
      if (
        oldBehaviorData.movementAngleOffset !==
        newBehaviorData.movementAngleOffset
      ) {
        this._movementAngleOffset = newBehaviorData.movementAngleOffset;
      }
      if (
        oldBehaviorData.enableAssistance !== newBehaviorData.enableAssistance
      ) {
        this._isAssistanceEnable = newBehaviorData.enableAssistance;
      }
      return true;
    }

    setViewpoint(viewpoint: string, customIsometryAngle: float): void {
      if (viewpoint === 'PixelIsometry') {
        this._basisTransformation = new gdjs.TopDownMovementRuntimeBehavior.IsometryTransformation(
          Math.atan(0.5)
        );
      } else if (viewpoint === 'TrueIsometry') {
        this._basisTransformation = new gdjs.TopDownMovementRuntimeBehavior.IsometryTransformation(
          Math.PI / 6
        );
      } else if (viewpoint === 'CustomIsometry') {
        this._basisTransformation = new gdjs.TopDownMovementRuntimeBehavior.IsometryTransformation(
          (customIsometryAngle * Math.PI) / 180
        );
      } else {
        this._basisTransformation = null;
      }
    }

    // TODO replace IsometryTransformation
    createIsometricTransformation = (angle: float) => {
      if (angle <= 0 || angle >= Math.PI / 4)
        throw new RangeError(
          'An isometry angle must be in ]0; pi/4] but was: ' + angle
        );

      const alpha = Math.asin(Math.tan(angle));
      const sinA = Math.sin(alpha);
      const cosB = Math.cos(Math.PI / 4);
      const sinB = cosB;
      // https://en.wikipedia.org/wiki/Isometric_projection
      //
      //   / 1     0    0 \ / cosB 0 -sinB \ / 1 0  0 \
      //   | 0  cosA sinA | |    0 1     0 | | 0 0 -1 |
      //   \ 0 -sinA cosA / \ sinB 0  cosB / \ 0 1  0 /
      const transformation = new AffineTransformation();
      transformation.setTo(cosB, -sinB, 0, //
                          sinA * sinB, sinA * cosB, 0);
      return transformation;
    }

    setAcceleration(acceleration: float): void {
      this._acceleration = acceleration;
    }

    getAcceleration() {
      return this._acceleration;
    }

    setDeceleration(deceleration: float): void {
      this._deceleration = deceleration;
    }

    getDeceleration() {
      return this._deceleration;
    }

    setMaxSpeed(maxSpeed: float): void {
      this._maxSpeed = maxSpeed;
    }

    getMaxSpeed() {
      return this._maxSpeed;
    }

    setAngularMaxSpeed(angularMaxSpeed: float): void {
      this._angularMaxSpeed = angularMaxSpeed;
    }

    getAngularMaxSpeed() {
      return this._angularMaxSpeed;
    }

    setAngleOffset(angleOffset: float): void {
      this._angleOffset = angleOffset;
    }

    getAngleOffset() {
      return this._angleOffset;
    }

    allowDiagonals(allow: boolean) {
      this._allowDiagonals = allow;
    }

    diagonalsAllowed() {
      return this._allowDiagonals;
    }

    setRotateObject(allow: boolean): void {
      this._rotateObject = allow;
    }

    isObjectRotated(): boolean {
      return this._rotateObject;
    }

    isMoving(): boolean {
      return this._xVelocity !== 0 || this._yVelocity !== 0;
    }

    getSpeed(): float {
      return Math.sqrt(
        this._xVelocity * this._xVelocity + this._yVelocity * this._yVelocity
      );
    }

    getXVelocity(): float {
      return this._xVelocity;
    }

    setXVelocity(velocityX: float): void {
      this._xVelocity = velocityX;
    }

    getYVelocity(): float {
      return this._yVelocity;
    }

    setYVelocity(velocityY: float): void {
      this._yVelocity = velocityY;
    }

    getAngle(): float {
      return this._angle;
    }

    isMovementAngleAround(degreeAngle: float, tolerance: float) {
      return (
        Math.abs(
          gdjs.evtTools.common.angleDifference(this._angle, degreeAngle)
        ) <= tolerance
      );
    }

    setMovementAngleOffset(movementAngleOffset: float): void {
      this._movementAngleOffset = movementAngleOffset;
    }

    getMovementAngleOffset() {
      return this._movementAngleOffset;
    }

    enableAssistance(enableAssistance: boolean) {
      this._isAssistanceEnable = enableAssistance;
    }

    isAssistanceEnable() {
      return this._isAssistanceEnable;
    }

    doStepPreEvents(instanceContainer: gdjs.RuntimeInstanceContainer) {
      const LEFTKEY = 37;
      const UPKEY = 38;
      const RIGHTKEY = 39;
      const DOWNKEY = 40;

      //Get the player input:
      // @ts-ignore
      this._leftKey |=
        !this._ignoreDefaultControls &&
        instanceContainer.getGame().getInputManager().isKeyPressed(LEFTKEY);
      // @ts-ignore
      this._rightKey |=
        !this._ignoreDefaultControls &&
        instanceContainer.getGame().getInputManager().isKeyPressed(RIGHTKEY);
      // @ts-ignore
      this._downKey |=
        !this._ignoreDefaultControls &&
        instanceContainer.getGame().getInputManager().isKeyPressed(DOWNKEY);
      // @ts-ignore
      this._upKey |=
        !this._ignoreDefaultControls &&
        instanceContainer.getGame().getInputManager().isKeyPressed(UPKEY);

      const elapsedTime = this.owner.getElapsedTime();

      if (!this._leftKey) {
        this._leftKeyPressedDuration = 0;
      } else {
        this._leftKeyPressedDuration += elapsedTime;
      }
      if (!this._rightKey) {
        this._rightKeyPressedDuration = 0;
      } else {
        this._rightKeyPressedDuration += elapsedTime;
      }
      if (!this._downKey) {
        this._downKeyPressedDuration = 0;
      } else {
        this._downKeyPressedDuration += elapsedTime;
      }
      if (!this._upKey) {
        this._upKeyPressedDuration = 0;
      } else {
        this._upKeyPressedDuration += elapsedTime;
      }

      let direction = -1;
      if (!this._allowDiagonals) {
        if (this._upKey && !this._downKey) {
          direction = 6;
        } else if (!this._upKey && this._downKey) {
          direction = 2;
        }
        // when 2 keys are pressed for diagonals the most recently pressed win
        if (
          this._leftKey &&
          !this._rightKey &&
          (this._upKey === this._downKey ||
            (this._upKey &&
              this._leftKeyPressedDuration < this._upKeyPressedDuration) ||
            (this._downKey &&
              this._leftKeyPressedDuration < this._downKeyPressedDuration))
        ) {
          direction = 4;
        } else if (
          this._rightKey &&
          !this._leftKey &&
          (this._upKey === this._downKey ||
            (this._upKey &&
              this._rightKeyPressedDuration < this._upKeyPressedDuration) ||
            (this._downKey &&
              this._rightKeyPressedDuration < this._downKeyPressedDuration))
        ) {
          direction = 0;
        }
      } else {
        if (this._upKey && !this._downKey) {
          if (this._leftKey && !this._rightKey) {
            direction = 5;
          } else if (!this._leftKey && this._rightKey) {
            direction = 7;
          } else {
            direction = 6;
          }
        } else if (!this._upKey && this._downKey) {
          if (this._leftKey && !this._rightKey) {
            direction = 3;
          } else if (!this._leftKey && this._rightKey) {
            direction = 1;
          } else {
            direction = 2;
          }
        } else {
          if (this._leftKey && !this._rightKey) {
            direction = 4;
          } else if (!this._leftKey && this._rightKey) {
            direction = 0;
          }
        }
      }

      const hookContext =
        gdjs.TopDownMovementRuntimeBehavior._topDownMovementHookContext;
      for (const topDownMovementHook of this._topDownMovementHooks) {
        hookContext._setDirection(direction);
        direction = topDownMovementHook.overrideDirection(hookContext);
      }
      hookContext._setDirection(direction);
      for (const topDownMovementHook of this._topDownMovementHooks) {
        topDownMovementHook.beforeSpeedUpdate(hookContext);
      }

      const object = this.owner;
      const timeDelta = this.owner.getElapsedTime() / 1000;
      const previousVelocityX = this._xVelocity;
      const previousVelocityY = this._yVelocity;
      this._wasStickUsed = false;

      // These 4 values are not actually used.
      // JavaScript doesn't allow to declare
      // variables without assigning them a value.
      let directionInRad = 0;
      let directionInDeg = 0;
      let cos = 1;
      let sin = 0;

      // Update the speed of the object:
      if (direction !== -1) {
        directionInRad =
          ((direction + this._movementAngleOffset / 45) * Math.PI) / 4.0;
        directionInDeg = direction * 45 + this._movementAngleOffset;
        // This makes the trigo resilient to rounding errors on directionInRad.
        cos = Math.cos(directionInRad);
        sin = Math.sin(directionInRad);
        if (cos === -1 || cos === 1) {
          sin = 0;
        }
        if (sin === -1 || sin === 1) {
          cos = 0;
        }
        this._xVelocity += this._acceleration * timeDelta * cos;
        this._yVelocity += this._acceleration * timeDelta * sin;
      } else if (this._stickForce !== 0) {
        if (!this._allowDiagonals) {
          this._stickAngle = 90 * Math.floor((this._stickAngle + 45) / 90);
        }
        directionInDeg = this._stickAngle + this._movementAngleOffset;
        directionInRad = (directionInDeg * Math.PI) / 180;
        const norm = this._acceleration * timeDelta * this._stickForce;
        // This makes the trigo resilient to rounding errors on directionInRad.
        cos = Math.cos(directionInRad);
        sin = Math.sin(directionInRad);
        if (cos === -1 || cos === 1) {
          sin = 0;
        }
        if (sin === -1 || sin === 1) {
          cos = 0;
        }
        this._xVelocity += norm * cos;
        this._yVelocity += norm * sin;

        this._wasStickUsed = true;
        this._stickForce = 0;
      } else if (this._yVelocity !== 0 || this._xVelocity !== 0) {
        directionInRad = Math.atan2(this._yVelocity, this._xVelocity);
        directionInDeg = (directionInRad * 180.0) / Math.PI;
        const xVelocityWasPositive = this._xVelocity >= 0;
        const yVelocityWasPositive = this._yVelocity >= 0;
        // This makes the trigo resilient to rounding errors on directionInRad.
        cos = Math.cos(directionInRad);
        sin = Math.sin(directionInRad);
        if (cos === -1 || cos === 1) {
          sin = 0;
        }
        if (sin === -1 || sin === 1) {
          cos = 0;
        }
        this._xVelocity -= this._deceleration * timeDelta * cos;
        this._yVelocity -= this._deceleration * timeDelta * sin;
        if (this._xVelocity > 0 !== xVelocityWasPositive) {
          this._xVelocity = 0;
        }
        if (this._yVelocity > 0 !== yVelocityWasPositive) {
          this._yVelocity = 0;
        }
      }
      const squaredSpeed =
        this._xVelocity * this._xVelocity + this._yVelocity * this._yVelocity;
      if (squaredSpeed > this._maxSpeed * this._maxSpeed) {
        this._xVelocity = this._maxSpeed * cos;
        this._yVelocity = this._maxSpeed * sin;
      }

      // No acceleration for angular speed for now.
      this._angularSpeed = this._angularMaxSpeed;

      for (const topDownMovementHook of this._topDownMovementHooks) {
        topDownMovementHook.beforePositionUpdate(hookContext);
      }

      // Position object.
      // This is a Verlet integration considering the acceleration as constant.
      // If you expand deltaX or deltaY, it gives, thanks to the usage of both
      // the old and the new velocity:
      // "velocity * timeDelta + acceleration * timeDelta^2 / 2".
      //
      // The acceleration is not actually always constant, particularly with a gamepad,
      // but the error is multiplied by timDelta^3. So, it shouldn't matter much.
      const deltaX = ((previousVelocityX + this._xVelocity) / 2) * timeDelta;
      const deltaY = ((previousVelocityY + this._yVelocity) / 2) * timeDelta;
      if (this._basisTransformation === null) {
        // Top-down viewpoint
        object.setX(object.getX() + deltaX);
        object.setY(object.getY() + deltaY);
      } else {
        // Isometry viewpoint
        const point = this._temporaryPointForTransformations;
        point[0] = deltaX;
        point[1] = deltaY;
        this._basisTransformation.toScreen(point, point);
        object.setX(object.getX() + point[0]);
        object.setY(object.getY() + point[1]);
      }

      // Also update angle if needed.
      if (this._xVelocity !== 0 || this._yVelocity !== 0) {
        this._angle = directionInDeg;
        if (this._rotateObject) {
          object.rotateTowardAngle(
            directionInDeg + this._angleOffset,
            this._angularSpeed
          );
        }
      }

      for (const topDownMovementHook of this._topDownMovementHooks) {
        topDownMovementHook.afterPositionUpdate(hookContext);
      }

      this._leftKey = false;
      this._rightKey = false;
      this._upKey = false;
      this._downKey = false;
    }

    simulateControl(input: string) {
      if (input === 'Left') {
        this._leftKey = true;
      } else if (input === 'Right') {
        this._rightKey = true;
      } else if (input === 'Up') {
        this._upKey = true;
      } else if (input === 'Down') {
        this._downKey = true;
      }
    }

    ignoreDefaultControls(ignore: boolean) {
      this._ignoreDefaultControls = ignore;
    }

    simulateLeftKey() {
      this._leftKey = true;
    }

    simulateRightKey() {
      this._rightKey = true;
    }

    simulateUpKey() {
      this._upKey = true;
    }

    simulateDownKey() {
      this._downKey = true;
    }

    simulateStick(stickAngle: float, stickForce: float) {
      this._stickAngle = stickAngle % 360;
      this._stickForce = Math.max(0, Math.min(1, stickForce));
    }

    /**.
     * @param input The control to be tested [Left,Right,Up,Down,Stick].
     * @returns true if the key was used since the last `doStepPreEvents` call.
     */
    isUsingControl(input: string): boolean {
      if (input === 'Left') {
        return this._leftKeyPressedDuration > 0;
      }
      if (input === 'Right') {
        return this._rightKeyPressedDuration > 0;
      }
      if (input === 'Up') {
        return this._upKeyPressedDuration > 0;
      }
      if (input === 'Down') {
        return this._downKeyPressedDuration > 0;
      }
      if (input === 'Stick') {
        return this._wasStickUsed;
      }
      return false;
    }

    getLastStickInputAngle() {
      return this._stickAngle;
    }

    /**
     * A hook must typically be registered by a behavior that requires this one
     * in its onCreate function.
     * The hook must stay forever to avoid side effects like a hooks order
     * change. To handle deactivated behavior, the hook can check that its
     * behavior is activated before doing anything.
     */
    registerHook(
      hook: gdjs.TopDownMovementRuntimeBehavior.TopDownMovementHook
    ) {
      this._topDownMovementHooks.push(hook);
    }
  }

  gdjs.registerBehavior(
    'TopDownMovementBehavior::TopDownMovementBehavior',
    gdjs.TopDownMovementRuntimeBehavior
  );

  export namespace TopDownMovementRuntimeBehavior {
    export class TopDownMovementHookContext {
      private direction: integer = -1;

      /**
       * @returns The movement direction from 0 for left to 7 for up-left and
       * -1 for no direction.
       */
      getDirection(): integer {
        return this.direction;
      }

      /**
       * This method won't change the direction used by the top-down movement
       * behavior.
       */
      _setDirection(direction: integer): void {
        this.direction = direction;
      }
    }

    // This should be a static attribute but it's not possible because of
    // declaration order.
    export const _topDownMovementHookContext = new gdjs.TopDownMovementRuntimeBehavior.TopDownMovementHookContext();

    /**
     * Allow extensions relying on the top-down movement to customize its
     * behavior a bit.
     */
    export interface TopDownMovementHook {
      /**
       * Return the direction to use instead of the direction given in
       * parameter.
       */
      overrideDirection(hookContext: TopDownMovementHookContext): integer;
      /**
       * Called before the acceleration and new direction is applied to the
       * velocity.
       */
      beforeSpeedUpdate(hookContext: TopDownMovementHookContext): void;
      /**
       * Called before the velocity is applied to the object position and
       * angle.
       */
      beforePositionUpdate(hookContext: TopDownMovementHookContext): void;
      /**
       * Called after the velocity is applied to the object position and
       * angle.
       */
      afterPositionUpdate(hookContext: TopDownMovementHookContext): void;
    }

    export interface BasisTransformation {
      toScreen(worldPoint: FloatPoint, screenPoint: FloatPoint): void;

      toWorld(screenPoint: FloatPoint, worldPoint: FloatPoint): void;

      toScreen(worldPoint: FloatPoint): void;

      toWorld(screenPoint: FloatPoint): void;
    }

    export class IsometryTransformation implements BasisTransformation {
      _screen: float[][];
      _world: float[][];

      /**
       * @param angle between the x axis and the projected isometric x axis.
       * @throws if the angle is not in ]0; pi/4[. Note that 0 is a front viewpoint and pi/4 a top-down viewpoint.
       */
      constructor(angle: float) {
        if (angle <= 0 || angle >= Math.PI / 4)
          throw new RangeError(
            'An isometry angle must be in ]0; pi/4] but was: ' + angle
          );

        const alpha = Math.asin(Math.tan(angle));
        const sinA = Math.sin(alpha);
        const cosB = Math.cos(Math.PI / 4);
        const sinB = cosB;
        // https://en.wikipedia.org/wiki/Isometric_projection
        //
        //   / 1     0    0 \ / cosB 0 -sinB \ / 1 0  0 \
        //   | 0  cosA sinA | |    0 1     0 | | 0 0 -1 |
        //   \ 0 -sinA cosA / \ sinB 0  cosB / \ 0 1  0 /
        this._screen = [
          [cosB, -sinB],
          [sinA * sinB, sinA * cosB],
        ];
        // invert
        this._world = [
          [cosB, sinB / sinA],
          [-sinB, cosB / sinA],
        ];
      }

      toScreen(worldPoint: FloatPoint, screenPoint?: FloatPoint): void {
        if (!screenPoint) {
          screenPoint = worldPoint;
        }
        const x =
          this._screen[0][0] * worldPoint[0] +
          this._screen[0][1] * worldPoint[1];
        const y =
          this._screen[1][0] * worldPoint[0] +
          this._screen[1][1] * worldPoint[1];
        screenPoint[0] = x;
        screenPoint[1] = y;
      }

      toWorld(screenPoint: FloatPoint, worldPoint?: FloatPoint): void {
        if (!worldPoint) {
          worldPoint = screenPoint;
        }
        const x =
          this._world[0][0] * screenPoint[0] +
          this._world[0][1] * screenPoint[1];
        const y =
          this._world[1][0] * screenPoint[0] +
          this._world[1][1] * screenPoint[1];
        worldPoint[0] = x;
        worldPoint[1] = y;
      }
    }

    const deltasX = [1, 1, 0, -1, -1, -1, 0, 1];
    const deltasY = [0, 1, 1, 1, 0, -1, -1, -1];
    const temporaryPointForTransformations: FloatPoint = [0, 0];
    const epsilon: float = 0.015625;

    const almostEquals = (a: float, b: float) => {
      return b - epsilon < a && a < b + epsilon;
    }

    /** Corner sliding on TopDownObstacleRuntimeBehavior instances.
     *
     * To change of direction the player must be perfectly aligned.
     * It's a very frustrating thing to do so he must be helped.
     * The pressed key gives the player intent. If he presses left,
     * he want to go that way, but he needs to be aligned to do so,
     * so the assistance makes him move up or down in the 1st place.
     */
    export class Assistance
      implements gdjs.TopDownMovementRuntimeBehavior.TopDownMovementHook {
      private instanceContainer: gdjs.RuntimeInstanceContainer;
      private topDownBehavior: gdjs.TopDownMovementRuntimeBehavior;

      // Obstacles near the object, updated with _updatePotentialCollidingObjects.
      private potentialCollidingObjects: gdjs.TopDownObstacleRuntimeBehavior[];
      private obstacleManager: gdjs.TopDownObstaclesManager;

      // Remember the decision to bypass an obstacle...
      private lastAnyObstacle: boolean = false;
      private needToCheckBypassWay: boolean = true;

      // ...and the context of that decision
      private lastAssistanceDirection: integer = -1;
      private lastDirection: integer = -1;

      private transformedPosition: FloatPoint = [0, 0];
      private relativeHitBoxesAABB: gdjs.AABB = { min: [0, 0], max: [0, 0] };
      private absoluteHitBoxesAABB: gdjs.AABB = { min: [0, 0], max: [0, 0] };
      private hitBoxesAABBUpToDate: boolean = false;
      private oldWidth: float = 0;
      private oldHeight: float = 0;
      private previousX: float = 0;
      private previousY: float = 0;

      private collidingObjects: gdjs.RuntimeObject[];

      private result: AssistanceResult = new AssistanceResult();

      constructor(
        behavior: gdjs.TopDownMovementRuntimeBehavior,
        instanceContainer: gdjs.RuntimeInstanceContainer
      ) {
        this.instanceContainer = instanceContainer;
        this.topDownBehavior = behavior;
        this.potentialCollidingObjects = [];
        this.collidingObjects = [];
        this.obstacleManager = gdjs.TopDownObstaclesManager.getManager(
          instanceContainer
        );
      }

      overrideDirection(
        hookContext: gdjs.TopDownMovementRuntimeBehavior.TopDownMovementHookContext
      ): integer {
        let direction = hookContext.getDirection();
        if (this.topDownBehavior._isAssistanceEnable) {
          const object = this.topDownBehavior.owner;
          // Check if the object has moved
          // To avoid to loop on the transform and its inverse
          // because of float approximation.
          const position = temporaryPointForTransformations;
          // TODO Handle isometry
          // if (this.topDownBehavior._basisTransformation) {
          //   this.topDownBehavior._basisTransformation.toScreen(
          //     this.transformedPosition,
          //     position
          //   );
          // } else {
            position[0] = this.transformedPosition[0];
            position[1] = this.transformedPosition[1];
          // }
          if (object.getX() !== position[0] || object.getY() !== position[1]) {
            position[0] = object.getX();
            position[1] = object.getY();
            // TODO Handle isometry
            // if (this.topDownBehavior._basisTransformation) {
            //   this.topDownBehavior._basisTransformation.toWorld(
            //     position,
            //     this.transformedPosition
            //   );
            // } else {
              this.transformedPosition[0] = position[0];
              this.transformedPosition[1] = position[1];
            // }
          }

          const stickIsUsed =
            this.topDownBehavior._stickForce !== 0 && direction === -1;
          let inputDirection: float;
          if (stickIsUsed) {
            inputDirection = this.getStickDirection();
          } else {
            inputDirection = direction;
          }
          const assistanceDirection: integer = this.suggestDirection(
            inputDirection
          );
          if (assistanceDirection !== -1) {
            if (stickIsUsed) {
              this.topDownBehavior._stickAngle = assistanceDirection * 45;
            }
            return assistanceDirection;
          }
        }
        return direction;
      }

      beforeSpeedUpdate(
        hookContext: gdjs.TopDownMovementRuntimeBehavior.TopDownMovementHookContext
      ): void {}

      beforePositionUpdate(
        hookContext: gdjs.TopDownMovementRuntimeBehavior.TopDownMovementHookContext
      ): void {
        if (this.topDownBehavior._isAssistanceEnable) {
          const object = this.topDownBehavior.owner;
          this.previousX = object.getX();
          this.previousY = object.getY();
        }
      }

      afterPositionUpdate(
        hookContext: gdjs.TopDownMovementRuntimeBehavior.TopDownMovementHookContext
      ): void {
        if (this.topDownBehavior._isAssistanceEnable) {
          const object = this.topDownBehavior.owner;
          const point = temporaryPointForTransformations;
          point[0] = object.getX() - this.previousX;
          point[1] = object.getY() - this.previousY;
          // TODO Handle isometry
          // if (this.topDownBehavior._basisTransformation) {
          //   this.topDownBehavior._basisTransformation.toWorld(point, point);
          // }
          this.shift(point[0], point[1]);

          this.applyCollision();

          const position = temporaryPointForTransformations;

          // TODO Handle isometry
          // if (this.topDownBehavior._basisTransformation) {
          //   this.topDownBehavior._basisTransformation.toScreen(
          //     this.transformedPosition,
          //     position
          //   );
          // } else {
            position[0] = this.transformedPosition[0];
            position[1] = this.transformedPosition[1];
          // }
          object.setX(position[0]);
          object.setY(position[1]);
        }
      }

      getStickDirection() {
        let direction =
          (this.topDownBehavior._stickAngle +
            this.topDownBehavior._movementAngleOffset) /
          45;
        direction = direction - Math.floor(direction / 8) * 8;
        for (let strait = 0; strait < 8; strait += 2) {
          if (strait - 0.125 < direction && direction < strait + 0.125) {
            direction = strait;
          }
          if (strait + 0.125 <= direction && direction <= strait + 2 - 0.125) {
            direction = strait + 1;
          }
        }
        if (8 - 0.125 < direction) {
          direction = 0;
        }
        return direction;
      }

      /** Analyze the real intent of the player instead of applying the input blindly.
       * @returns a direction that matches the player intents.
       */
      suggestDirection(direction: integer): integer {
        this.needToCheckBypassWay =
          this.needToCheckBypassWay || direction !== this.lastDirection;

        if (direction === -1) {
          return this.noAssistance();
        }

        const object = this.topDownBehavior.owner;
        if (
          object.getWidth() !== this.oldWidth ||
          object.getHeight() !== this.oldHeight
        ) {
          this.hitBoxesAABBUpToDate = false;
          this.oldWidth = object.getWidth();
          this.oldHeight = object.getHeight();
        }

        // Compute the list of the objects that will be used
        const timeDelta = object.getElapsedTime(this.instanceContainer) / 1000;
        this.updatePotentialCollidingObjects(
          1 + this.topDownBehavior.getMaxSpeed() * timeDelta
        );

        const downKey = 1 <= direction && direction <= 3;
        const leftKey = 3 <= direction && direction <= 5;
        const upKey = 5 <= direction && direction <= 7;
        const rightKey = direction <= 1 || 7 <= direction;

        // Used to align the player when the assistance make him bypass an obstacle
        let stopMinX = Number.MAX_VALUE;
        let stopMinY = Number.MAX_VALUE;
        let stopMaxX = -Number.MAX_VALUE;
        let stopMaxY = -Number.MAX_VALUE;
        let isBypassX = false;
        let isBypassY = false;

        // Incites of how the player should be assisted
        let assistanceLeft = 0;
        let assistanceRight = 0;
        let assistanceUp = 0;
        let assistanceDown = 0;

        // the actual decision
        let assistanceDirection = -1;

        const objectAABB = this.getHitBoxesAABB();
        const minX = objectAABB.min[0];
        const minY = objectAABB.min[1];
        const maxX = objectAABB.max[0];
        const maxY = objectAABB.max[1];
        const width = maxX - minX;
        const height = maxY - minY;

        // This affectation has no meaning, it will be override.
        let bypassedObstacleAABB: AABB | null = null;

        this.collidingObjects.length = 0;
        this.collidingObjects.push(object);

        for (var i = 0; i < this.potentialCollidingObjects.length; ++i) {
          const obstacleBehavior = this.potentialCollidingObjects[i];
          const corner = obstacleBehavior.getSlidingCornerSize();
          const obstacle = obstacleBehavior.owner;
          if (obstacle === object) {
            continue;
          }

          const obstacleAABB = obstacleBehavior.getHitBoxesAABB();
          const obstacleMinX = obstacleAABB.min[0];
          const obstacleMinY = obstacleAABB.min[1];
          const obstacleMaxX = obstacleAABB.max[0];
          const obstacleMaxY = obstacleAABB.max[1];

          const deltaX = deltasX[direction];
          const deltaY = deltasY[direction];
          // Extends the box in the player direction
          if (
            Math.max(maxX, Math.floor(maxX + deltaX)) > obstacleMinX &&
            Math.min(minX, Math.ceil(minX + deltaX)) < obstacleMaxX &&
            Math.max(maxY, Math.floor(maxY + deltaY)) > obstacleMinY &&
            Math.min(minY, Math.ceil(minY + deltaY)) < obstacleMaxY
          ) {
            this.collidingObjects.push(obstacle);

            // The player is corner to corner to the obstacle.
            // The assistance will depend on other obstacles.
            // Both direction are set and the actual to take
            // is decided at the end.
            if (
              almostEquals(maxX, obstacleMinX) &&
              almostEquals(maxY, obstacleMinY)
            ) {
              assistanceRight++;
              assistanceDown++;
            } else if (
              almostEquals(maxX, obstacleMinX) &&
              almostEquals(minY, obstacleMaxY)
            ) {
              assistanceRight++;
              assistanceUp++;
            } else if (
              almostEquals(minX, obstacleMaxX) &&
              almostEquals(minY, obstacleMaxY)
            ) {
              assistanceLeft++;
              assistanceUp++;
            } else if (
              almostEquals(minX, obstacleMaxX) &&
              almostEquals(maxY, obstacleMinY)
            ) {
              assistanceLeft++;
              assistanceDown++;
            } else if (
              (upKey && almostEquals(minY, obstacleMaxY)) ||
              (downKey && almostEquals(maxY, obstacleMinY))
            ) {
              // The player is not on the corner of the obstacle.
              // Set the assistance both ways to fall back in
              // the same case as 2 obstacles side by side
              // being collide with the player.
              if (
                (rightKey || maxX > obstacleMinX + corner) &&
                minX < obstacleMaxX &&
                (leftKey || minX < obstacleMaxX - corner) &&
                maxX > obstacleMinX
              ) {
                assistanceLeft++;
                assistanceRight++;
              }
              // The player is on the corner of the obstacle.
              // (not the exact corner, see corner affectation)
              else if (
                !rightKey &&
                obstacleMinX < maxX &&
                maxX <= obstacleMinX + corner &&
                // In case the cornerSize is bigger than the obstacle size,
                // go the on the shortest side.
                (leftKey || minX + maxX <= obstacleMinX + obstacleMaxX)
              ) {
                assistanceLeft++;
                isBypassX = true;
                if (obstacleMinX - width < stopMinX) {
                  stopMinX = obstacleMinX - width;
                  bypassedObstacleAABB = obstacleAABB;
                }
              } else if (
                !leftKey &&
                obstacleMaxX - corner <= minX &&
                minX < obstacleMaxX &&
                (rightKey || minX + maxX > obstacleMinX + obstacleMaxX)
              ) {
                assistanceRight++;
                isBypassX = true;
                if (obstacleMaxX > stopMaxX) {
                  stopMaxX = obstacleMaxX;
                  bypassedObstacleAABB = obstacleAABB;
                }
              }
            } else if (
              (leftKey && almostEquals(minX, obstacleMaxX)) ||
              (rightKey && almostEquals(maxX, obstacleMinX))
            ) {
              // The player is not on the corner of the obstacle.
              // Set the assistance both ways to fall back in
              // the same case as 2 obstacles side by side
              // being collide with the player.
              if (
                (downKey || maxY > obstacleMinY + corner) &&
                minY < obstacleMaxY &&
                (upKey || minY < obstacleMaxY - corner) &&
                maxY > obstacleMinY
              ) {
                assistanceUp++;
                assistanceDown++;
              }
              // The player is on the corner of the obstacle.
              // (not the exact corner, see corner affectation)
              else if (
                !downKey &&
                obstacleMinY < maxY &&
                maxY <= obstacleMinY + corner &&
                (upKey || minY + maxY <= obstacleMinY + obstacleMaxY)
              ) {
                assistanceUp++;
                isBypassY = true;
                if (obstacleMinY - height < stopMinY) {
                  stopMinY = obstacleMinY - height;
                  bypassedObstacleAABB = obstacleAABB;
                }
              } else if (
                !upKey &&
                obstacleMaxY - corner <= minY &&
                minY < obstacleMaxY &&
                (downKey || minY + maxY > obstacleMinY + obstacleMaxY)
              ) {
                assistanceDown++;
                isBypassY = true;
                if (obstacleMaxY > stopMaxY) {
                  stopMaxY = obstacleMaxY;
                  bypassedObstacleAABB = obstacleAABB;
                }
              }
            }
          }
        }

        // This may happen when the player is in the corner of 2 perpendicular walls.
        // No assistance is needed.
        if (
          assistanceLeft &&
          assistanceRight &&
          assistanceUp &&
          assistanceDown
        ) {
          return this.noAssistance();
        }
        // This may happen when the player goes in diagonal against a wall.
        // Make him follow the wall. This allows player to keep full speed.
        //
        // When he collided a square from the wall corner to corner,
        // a 3rd assistance may be true but it fall back in the same case.
        else if (assistanceLeft && assistanceRight) {
          isBypassX = false;
          if (leftKey && !rightKey) {
            assistanceDirection = 4;
          } else if (rightKey && !leftKey) {
            assistanceDirection = 0;
          } else {
            // Contradictory decisions are dismissed.
            //
            // This can happen, for instance, with a wall composed of squares.
            // Taken separately from one to another, a square could be bypass one the right
            // and the next one on the left even though they are side by side
            // and the player can't actually go between them.
            return this.noAssistance();
          }
        } else if (assistanceUp && assistanceDown) {
          isBypassY = false;
          if (upKey && !downKey) {
            assistanceDirection = 6;
          } else if (downKey && !upKey) {
            assistanceDirection = 2;
          } else {
            // see previous comment
            return this.noAssistance();
          }
        }
        // The player goes in diagonal and is corner to corner with the obstacle.
        // (but not against a wall, this time)
        // The velocity is used to decide.
        // This may only happen after an alignment.
        // (see "Alignment:" comment)
        else if (assistanceRight && assistanceDown) {
          if (
            (downKey && !rightKey) ||
            (downKey === rightKey && assistanceDown > assistanceRight) ||
            (assistanceDown === assistanceRight &&
              this.topDownBehavior._yVelocity > 0 &&
              Math.abs(this.topDownBehavior._xVelocity) <
                Math.abs(this.topDownBehavior._yVelocity))
          ) {
            assistanceDirection = 2;
          } else {
            assistanceDirection = 0;
          }
        } else if (assistanceLeft && assistanceDown) {
          if (
            (downKey && !leftKey) ||
            (downKey === leftKey && assistanceDown > assistanceLeft) ||
            (assistanceDown === assistanceLeft &&
              this.topDownBehavior._yVelocity > 0 &&
              Math.abs(this.topDownBehavior._xVelocity) <
                Math.abs(this.topDownBehavior._yVelocity))
          ) {
            assistanceDirection = 2;
          } else {
            assistanceDirection = 4;
          }
        } else if (assistanceLeft && assistanceUp) {
          if (
            (upKey && !leftKey) ||
            (upKey === leftKey && assistanceUp > assistanceLeft) ||
            (assistanceUp === assistanceLeft &&
              this.topDownBehavior._yVelocity < 0 &&
              Math.abs(this.topDownBehavior._xVelocity) <
                Math.abs(this.topDownBehavior._yVelocity))
          ) {
            assistanceDirection = 6;
          } else {
            assistanceDirection = 4;
          }
        } else if (assistanceRight && assistanceUp) {
          if (
            (upKey && !rightKey) ||
            (upKey === rightKey && assistanceUp > assistanceRight) ||
            (assistanceUp === assistanceRight &&
              this.topDownBehavior._yVelocity < 0 &&
              Math.abs(this.topDownBehavior._xVelocity) <
                Math.abs(this.topDownBehavior._yVelocity))
          ) {
            assistanceDirection = 6;
          } else {
            assistanceDirection = 0;
          }
        } else {
          // Slide on the corner of an obstacle to bypass it.
          // Every tricky cases are already handled .
          if (assistanceLeft) {
            assistanceDirection = 4;
          } else if (assistanceRight) {
            assistanceDirection = 0;
          } else if (assistanceUp) {
            assistanceDirection = 6;
          } else if (assistanceDown) {
            assistanceDirection = 2;
          } else {
            return this.noAssistance();
          }
        }

        // Check if there is any obstacle in the way.
        //
        // There must be no obstacle to go at least
        // as far in the direction the player chose
        // as the assistance must take to align the player.
        //
        // Because, if the assistance moves the player by 32 pixels
        // before been able to go in the right direction
        // and can only move by 4 pixels afterward
        // that it'll sound silly.
        this.needToCheckBypassWay =
          this.needToCheckBypassWay ||
          assistanceDirection !== this.lastAssistanceDirection;
        if ((isBypassX || isBypassY) && !this.needToCheckBypassWay) {
          // Don't check again if the player intent stays the same.
          //
          // Do it, for instance, if an obstacle has moved out of the way
          // and the player releases and presses agin the key.
          // Because, doing it automatically would seems weird.
          if (this.lastAnyObstacle) {
            return this.noAssistance();
          }
        } else if (isBypassX || isBypassY) {
          this.lastAssistanceDirection = assistanceDirection;
          this.lastDirection = direction;

          let anyObstacle: boolean = false;
          // reflection symmetry: y = x
          // 0 to 6, 2 to 4, 4 to 2, 6 to 0
          if (direction + assistanceDirection === 6) {
            // Because the obstacle may not be a square.
            let cornerX: float;
            let cornerY: float;
            if (assistanceDirection === 4 || assistanceDirection === 6) {
              cornerX = bypassedObstacleAABB!.min[0];
              cornerY = bypassedObstacleAABB!.min[1];
            } else {
              cornerX = bypassedObstacleAABB!.max[0];
              cornerY = bypassedObstacleAABB!.max[1];
            }
            // / cornerX \   / 0  1 \   / x - cornerX \
            // \ cornerY / + \ 1  0 / * \ y - cornerY /
            //
            // min and max are preserved by the symmetry.
            // The symmetry image is extended to check there is no obstacle before going into the passage.
            const searchMinX =
              cornerX +
              minY -
              cornerY +
              epsilon +
              (assistanceDirection === 6 ? cornerY - maxY : 0);
            const searchMaxX =
              cornerX +
              maxY -
              cornerY -
              epsilon +
              (assistanceDirection === 2 ? cornerY - minY : 0);
            const searchMinY =
              cornerY +
              minX -
              cornerX +
              epsilon +
              (assistanceDirection === 4 ? cornerX - maxX : 0);
            const searchMaxY =
              cornerY +
              maxX -
              cornerX -
              epsilon +
              (assistanceDirection === 0 ? cornerX - minX : 0);

            anyObstacle = this.obstacleManager.anyObstacle(
              searchMinX,
              searchMaxX,
              searchMinY,
              searchMaxY,
              this.collidingObjects
            );
          }
          // reflection symmetry: y = -x
          // 0 to 2, 2 to 0, 4 to 6, 6 to 4
          else if ((direction + assistanceDirection) % 8 === 2) {
            // Because the obstacle may not be a square.
            let cornerX: float;
            let cornerY: float;
            if (assistanceDirection === 2 || assistanceDirection === 4) {
              cornerX = bypassedObstacleAABB!.min[0];
              cornerY = bypassedObstacleAABB!.max[1];
            } else {
              cornerX = bypassedObstacleAABB!.max[0];
              cornerY = bypassedObstacleAABB!.min[1];
            }
            // / cornerX \   /  0  -1 \   / x - cornerX \
            // \ cornerY / + \ -1   0 / * \ y - cornerY /
            //
            // min and max are switched by the symmetry.
            // The symmetry image is extended to check there is no obstacle before going into the passage.
            const searchMinX =
              cornerX -
              (maxY - cornerY) +
              epsilon +
              (assistanceDirection === 2 ? minY - cornerY : 0);
            const searchMaxX =
              cornerX -
              (minY - cornerY) -
              epsilon +
              (assistanceDirection === 6 ? maxY - cornerY : 0);
            const searchMinY =
              cornerY -
              (maxX - cornerX) +
              epsilon +
              (assistanceDirection === 0 ? minX - cornerX : 0);
            const searchMaxY =
              cornerY -
              (minX - cornerX) -
              epsilon +
              (assistanceDirection === 4 ? maxX - cornerX : 0);

            anyObstacle = this.obstacleManager.anyObstacle(
              searchMinX,
              searchMaxX,
              searchMinY,
              searchMaxY,
              this.collidingObjects
            );
          }
          this.lastAnyObstacle = anyObstacle;
          this.needToCheckBypassWay = false;

          if (anyObstacle) {
            return this.noAssistance();
          }
        }

        this.result.inputDirection = direction;
        this.result.assistanceLeft = assistanceLeft > 0;
        this.result.assistanceRight = assistanceRight > 0;
        this.result.assistanceUp = assistanceUp > 0;
        this.result.assistanceDown = assistanceDown > 0;
        this.result.isBypassX = isBypassX;
        this.result.isBypassY = isBypassY;
        this.result.stopMinX = stopMinX;
        this.result.stopMinY = stopMinY;
        this.result.stopMaxX = stopMaxX;
        this.result.stopMaxY = stopMaxY;

        return assistanceDirection;
      }

      noAssistance(): integer {
        this.result.isBypassX = false;
        this.result.isBypassY = false;

        return -1;
      }

      applyCollision() {
        this.checkCornerStop();
        this.separateFromObstacles();
        // check again because the object can be pushed on the stop limit,
        // it won't be detected on the next frame and the alignment won't be applied.
        this.checkCornerStop();
      }

      /**
       * Check if the object must take a corner.
       *
       * When the object reach the limit of an obstacle
       * and it should take the corner according to the player intent,
       * it is aligned right on this limit and the velocity is set in the right direction.
       *
       * This avoid issues with the inertia. For instance,
       * when the object could go between 2 obstacles,
       * with it will just fly over the hole because of its inertia.
       */
      checkCornerStop() {
        const objectAABB = this.getHitBoxesAABB();
        const minX = objectAABB.min[0];
        const minY = objectAABB.min[1];
        const object = this.topDownBehavior.owner;

        const direction = this.result.inputDirection;
        const leftKey: boolean = 3 <= direction && direction <= 5;
        const upKey: boolean = 5 <= direction && direction <= 7;

        // Alignment: avoid to go too far and kind of drift or oscillate in front of a hole.
        if (
          this.result.isBypassX &&
          ((this.result.assistanceLeft && minX <= this.result.stopMinX) ||
            (this.result.assistanceRight && minX >= this.result.stopMaxX))
        ) {
          this.shift(
            -minX +
              (this.result.assistanceLeft
                ? this.result.stopMinX
                : this.result.stopMaxX),
            0
          );
          this.topDownBehavior._yVelocity =
            (upKey ? -1 : 1) *
            Math.sqrt(
              this.topDownBehavior._xVelocity *
                this.topDownBehavior._xVelocity +
                this.topDownBehavior._yVelocity *
                  this.topDownBehavior._yVelocity
            );
          this.topDownBehavior._xVelocity = 0;
        }
        if (
          this.result.isBypassY &&
          ((this.result.assistanceUp && minY <= this.result.stopMinY) ||
            (this.result.assistanceDown && minY >= this.result.stopMaxY))
        ) {
          this.shift(
            0,
            -minY +
              (this.result.assistanceUp
                ? this.result.stopMinY
                : this.result.stopMaxY)
          );
          this.topDownBehavior._xVelocity =
            (leftKey ? -1 : 1) *
            Math.sqrt(
              this.topDownBehavior._xVelocity *
                this.topDownBehavior._xVelocity +
                this.topDownBehavior._yVelocity *
                  this.topDownBehavior._yVelocity
            );
          this.topDownBehavior._yVelocity = 0;
        }
      }

      /**
       * Separate from TopDownObstacleRuntimeBehavior instances.
       */
      separateFromObstacles() {
        const object = this.topDownBehavior.owner;
        const objectAABB = this.getHitBoxesAABB();
        const minX = objectAABB.min[0];
        const minY = objectAABB.min[1];
        const maxX = objectAABB.max[0];
        const maxY = objectAABB.max[1];

        // Search the obstacle with the biggest intersection
        // to separate from this one first.
        // Because smaller collisions may shift the player
        // in the wrong direction.
        let maxSurface = 0;
        let bestObstacleBehavior: TopDownObstacleRuntimeBehavior | null = null;
        for (var i = 0; i < this.potentialCollidingObjects.length; ++i) {
          const obstacleBehavior = this.potentialCollidingObjects[i];
          if (obstacleBehavior.owner === object) {
            continue;
          }

          const obstacleAABB = obstacleBehavior.getHitBoxesAABB();
          const obstacleMinX = obstacleAABB.min[0];
          const obstacleMinY = obstacleAABB.min[1];
          const obstacleMaxX = obstacleAABB.max[0];
          const obstacleMaxY = obstacleAABB.max[1];

          const interMinX = Math.max(minX, obstacleMinX);
          const interMinY = Math.max(minY, obstacleMinY);
          const interMaxX = Math.min(maxX, obstacleMaxX);
          const interMaxY = Math.min(maxY, obstacleMaxY);

          if (interMinX < interMaxX && interMinY < interMaxY) {
            const surface = (interMaxX - interMinX) * (interMaxY - interMinY);
            if (surface > maxSurface) {
              maxSurface = surface;
              bestObstacleBehavior = obstacleBehavior;
            }
          }
        }
        if (bestObstacleBehavior !== null) {
          this.separateFrom(bestObstacleBehavior);
        }
        for (var i = 0; i < this.potentialCollidingObjects.length; ++i) {
          const obstacleBehavior = this.potentialCollidingObjects[i];
          const obstacle = obstacleBehavior.owner;
          if (obstacle === object) {
            continue;
          }
          this.separateFrom(obstacleBehavior);
        }
      }

      /**
       * Separate object and obstacle, only object move.
       * @param obstacle
       */
      separateFrom(obstacleBehavior: gdjs.TopDownObstacleRuntimeBehavior) {
        const objectAABB = this.getHitBoxesAABB();
        const minX = objectAABB.min[0];
        const minY = objectAABB.min[1];
        const maxX = objectAABB.max[0];
        const maxY = objectAABB.max[1];

        const obstacleAABB = obstacleBehavior.getHitBoxesAABB();
        const obstacleMinX = obstacleAABB.min[0];
        const obstacleMinY = obstacleAABB.min[1];
        const obstacleMaxX = obstacleAABB.max[0];
        const obstacleMaxY = obstacleAABB.max[1];

        const leftDistance = maxX - obstacleMinX;
        const upDistance = maxY - obstacleMinY;
        const rightDistance = obstacleMaxX - minX;
        const downDistance = obstacleMaxY - minY;
        const minDistance = Math.min(
          leftDistance,
          upDistance,
          rightDistance,
          downDistance
        );

        if (minDistance > 0) {
          if (leftDistance === minDistance) {
            this.shift(-maxX + obstacleMinX, 0);
          } else if (rightDistance === minDistance) {
            this.shift(-minX + obstacleMaxX, 0);
          } else if (upDistance === minDistance) {
            this.shift(0, -maxY + obstacleMinY);
          } else if (downDistance === minDistance) {
            this.shift(0, -minY + obstacleMaxY);
          }
        }
      }

      shift(deltaX: float, deltaY: float) {
        this.transformedPosition[0] += deltaX;
        this.transformedPosition[1] += deltaY;
      }

      getHitBoxesAABB(): gdjs.AABB {
        if (!this.hitBoxesAABBUpToDate) {
          const hitBoxes = this.topDownBehavior.owner.getHitBoxes();

          let minX = Number.MAX_VALUE;
          let minY = Number.MAX_VALUE;
          let maxX = -Number.MAX_VALUE;
          let maxY = -Number.MAX_VALUE;
          for (let h = 0, lenh = hitBoxes.length; h < lenh; ++h) {
            let hitBox: Polygon = hitBoxes[h];
            for (let p = 0, lenp = hitBox.vertices.length; p < lenp; ++p) {
              const point = this.topDownBehavior
                ._temporaryPointForTransformations;
              // TODO Handle isometry
              // if (this.topDownBehavior._basisTransformation) {
              //   this.topDownBehavior._basisTransformation.toWorld(
              //     hitBox.vertices[p],
              //     point
              //   );
              // } else {
                point[0] = hitBox.vertices[p][0];
                point[1] = hitBox.vertices[p][1];
              // }
              minX = Math.min(minX, point[0]);
              maxX = Math.max(maxX, point[0]);
              minY = Math.min(minY, point[1]);
              maxY = Math.max(maxY, point[1]);
            }
          }
          this.relativeHitBoxesAABB.min[0] = minX - this.transformedPosition[0];
          this.relativeHitBoxesAABB.min[1] = minY - this.transformedPosition[1];
          this.relativeHitBoxesAABB.max[0] = maxX - this.transformedPosition[0];
          this.relativeHitBoxesAABB.max[1] = maxY - this.transformedPosition[1];

          this.hitBoxesAABBUpToDate = true;
        }
        this.absoluteHitBoxesAABB.min[0] =
          this.relativeHitBoxesAABB.min[0] + this.transformedPosition[0];
        this.absoluteHitBoxesAABB.min[1] =
          this.relativeHitBoxesAABB.min[1] + this.transformedPosition[1];
        this.absoluteHitBoxesAABB.max[0] =
          this.relativeHitBoxesAABB.max[0] + this.transformedPosition[0];
        this.absoluteHitBoxesAABB.max[1] =
          this.relativeHitBoxesAABB.max[1] + this.transformedPosition[1];
        return this.absoluteHitBoxesAABB;
      }

      /**
       * Update _potentialCollidingObjects member with platforms near the object.
       */
      private updatePotentialCollidingObjects(maxMovementLength: float) {
        this.obstacleManager.getAllObstaclesAround(
          this.getHitBoxesAABB(),
          maxMovementLength,
          this.potentialCollidingObjects
        );
      }
    }

    /**
     * TopDownMovementRuntimeBehavior represents a behavior allowing objects to
     * follow a path computed to avoid obstacles.
     */
    class AssistanceResult {
      inputDirection: integer = -1;
      assistanceLeft: boolean = false;
      assistanceRight: boolean = false;
      assistanceUp: boolean = false;
      assistanceDown: boolean = false;
      isBypassX: boolean = false;
      isBypassY: boolean = false;
      stopMinX: float = 0;
      stopMinY: float = 0;
      stopMaxX: float = 0;
      stopMaxY: float = 0;
    }
  }
}

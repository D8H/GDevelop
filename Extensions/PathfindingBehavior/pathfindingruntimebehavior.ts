/*
GDevelop - Pathfinding Behavior Extension
Copyright (c) 2010-2016 Florian Rival (Florian.Rival@gmail.com)
 */
namespace gdjs {
  /**
   * PathfindingRuntimeBehavior represents a behavior allowing objects to
   * follow a path computed to avoid obstacles.
   */
  export class PathfindingRuntimeBehavior extends gdjs.RuntimeBehavior {
    _path: Array<FloatPoint> = [];

    //Behavior configuration:
    _allowDiagonals: boolean;
    _acceleration: float;
    _maxSpeed: float;
    _angularMaxSpeed: float;
    _rotateObject: boolean;
    _angleOffset: float;
    _cellWidth: float;
    _cellHeight: float;
    _gridOffsetX: float;
    _gridOffsetY: float;
    _extraBorder: float;
    // @ts-ignore The setter "setCollisionMethod" is not detected as an affectation.
    _collisionMethod: integer;
    static LEGACY_COLLISION = 0;
    static HITBOX_COLLISION = 1;
    static AABB_COLLISION = 2;

    //Attributes used for traveling on the path:
    _pathFound: boolean = false;
    _speed: float = 0;
    _angularSpeed: float = 0;
    _timeOnSegment: float = 0;
    _totalSegmentTime: float = 0;
    _currentSegment: integer = 0;
    _reachedEnd: boolean = false;
    _manager: PathfindingObstaclesManager;
    _searchContext: PathfindingRuntimeBehavior.SearchContext;

    // @ts-ignore The setter "setViewpoint" is not detected as an affectation.
    _basisTransformation: PathfindingRuntimeBehavior.BasisTransformation;
    // @ts-ignore same
    _viewpoint: string;
    _temporaryPointForTransformations: FloatPoint = [0, 0];

    constructor(
      runtimeScene: gdjs.RuntimeScene,
      behaviorData,
      owner: gdjs.RuntimeObject
    ) {
      super(runtimeScene, behaviorData, owner);

      //The path computed and followed by the object (Array of arrays containing x and y position)
      if (this._path === undefined) {
      } else {
        this._path.length = 0;
      }
      this._allowDiagonals = behaviorData.allowDiagonals;
      this._acceleration = behaviorData.acceleration;
      this._maxSpeed = behaviorData.maxSpeed;
      this._angularMaxSpeed = behaviorData.angularMaxSpeed;
      this._rotateObject = behaviorData.rotateObject;
      this._angleOffset = behaviorData.angleOffset;
      this._cellWidth = behaviorData.cellWidth;
      this._cellHeight = behaviorData.cellHeight;
      this._gridOffsetX = behaviorData.gridOffsetX || 0;
      this._gridOffsetY = behaviorData.gridOffsetY || 0;
      this._extraBorder = behaviorData.extraBorder;
      this._manager = gdjs.PathfindingObstaclesManager.getManager(runtimeScene);
      this._searchContext = new gdjs.PathfindingRuntimeBehavior.SearchContext(
        this,
        this._manager
      );
      this._setViewpoint(
        behaviorData.viewpoint,
        behaviorData.cellWidth,
        behaviorData.cellHeight
      );
      this.setCollisionMethod(behaviorData.collisionMethod);
    }

    updateFromBehaviorData(oldBehaviorData, newBehaviorData): boolean {
      if (oldBehaviorData.allowDiagonals !== newBehaviorData.allowDiagonals) {
        this.allowDiagonals(newBehaviorData.allowDiagonals);
      }
      if (oldBehaviorData.acceleration !== newBehaviorData.acceleration) {
        this.setAcceleration(newBehaviorData.acceleration);
      }
      if (oldBehaviorData.maxSpeed !== newBehaviorData.maxSpeed) {
        this.setMaxSpeed(newBehaviorData.maxSpeed);
      }
      if (oldBehaviorData.angularMaxSpeed !== newBehaviorData.angularMaxSpeed) {
        this.setAngularMaxSpeed(newBehaviorData.angularMaxSpeed);
      }
      if (oldBehaviorData.rotateObject !== newBehaviorData.rotateObject) {
        this.setRotateObject(newBehaviorData.rotateObject);
      }
      if (oldBehaviorData.angleOffset !== newBehaviorData.angleOffset) {
        this.setAngleOffset(newBehaviorData.angleOffset);
      }
      if (oldBehaviorData.gridOffsetX !== newBehaviorData.gridOffsetX) {
        this._gridOffsetX = newBehaviorData.gridOffsetX;
      }
      if (oldBehaviorData.gridOffsetY !== newBehaviorData.gridOffsetY) {
        this._gridOffsetY = newBehaviorData.gridOffsetY;
      }
      if (oldBehaviorData.extraBorder !== newBehaviorData.extraBorder) {
        this.setExtraBorder(newBehaviorData.extraBorder);
      }
      if (
        oldBehaviorData.viewpoint !== newBehaviorData.viewpoint ||
        oldBehaviorData.cellWidth !== newBehaviorData.cellWidth ||
        oldBehaviorData.cellHeight !== newBehaviorData.cellHeight
      ) {
        this._setViewpoint(
          newBehaviorData.platformType,
          newBehaviorData.cellWidth,
          newBehaviorData.cellHeight
        );
      }
      if (oldBehaviorData.collisionMethod !== newBehaviorData.collisionMethod) {
        this.setCollisionMethod(newBehaviorData.collisionMethod);
      }
      return true;
    }

    _setViewpoint(
      viewpoint: string,
      cellWidth: float,
      cellHeight: float
    ): void {
      this._viewpoint = viewpoint;
      if (viewpoint == 'Isometry') {
        if (cellHeight >= cellWidth) {
          throw new RangeError(
            `The cell height (${cellHeight}) must be smaller than the cell width (${cellHeight}) for isometry.`
          );
        }
        this._basisTransformation = new PathfindingRuntimeBehavior.IsometryTransformation(
          Math.atan(cellHeight / cellWidth)
        );
        // calculate the square size from the diagonalX of the projected square
        // the square is 45° rotated, so 2 side length at 45° is:
        // 2*cos(pi/4) == sqrt(2)
        const isometricCellSize = cellWidth / Math.sqrt(2);
        // the ratio gives the isometry angle so it's always a square
        this._cellWidth = isometricCellSize;
        this._cellHeight = isometricCellSize;
      } else {
        this._basisTransformation = new PathfindingRuntimeBehavior.IdentityTransformation();
        this._cellWidth = cellWidth;
        this._cellHeight = cellHeight;
      }
    }

    setCollisionMethod(collisionMethod: string): void {
      if (collisionMethod == 'AABB') {
        this._collisionMethod = PathfindingRuntimeBehavior.AABB_COLLISION;
      } else if (collisionMethod == 'HitBoxes') {
        this._collisionMethod = PathfindingRuntimeBehavior.HITBOX_COLLISION;
      } else {
        this._collisionMethod = PathfindingRuntimeBehavior.LEGACY_COLLISION;
      }
    }

    setCellWidth(cellWidth: integer): void {
      this._setViewpoint(this._viewpoint, cellWidth, this._cellHeight);
    }

    getCellWidth(): integer {
      return this._cellWidth;
    }

    setCellHeight(cellHeight: integer): void {
      this._setViewpoint(this._viewpoint, this._cellWidth, cellHeight);
    }

    getCellHeight(): integer {
      return this._cellHeight;
    }

    getGridOffsetX(): integer {
      return this._gridOffsetX;
    }

    getGridOffsetY(): integer {
      return this._gridOffsetY;
    }

    setAcceleration(acceleration: float): void {
      this._acceleration = acceleration;
    }

    getAcceleration() {
      return this._acceleration;
    }

    setMaxSpeed(maxSpeed: float): void {
      this._maxSpeed = maxSpeed;
    }

    getMaxSpeed() {
      return this._maxSpeed;
    }

    setSpeed(speed: float): void {
      this._speed = speed;
    }

    getSpeed() {
      return this._speed;
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

    setExtraBorder(extraBorder): void {
      this._extraBorder = extraBorder;
    }

    getExtraBorder() {
      return this._extraBorder;
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

    getNodeX(index: integer): float {
      if (index < this._path.length) {
        return this._path[index][0];
      }
      return 0;
    }

    getNodeY(index: integer): float {
      if (index < this._path.length) {
        return this._path[index][1];
      }
      return 0;
    }

    getNextNodeIndex() {
      if (this._currentSegment + 1 < this._path.length) {
        return this._currentSegment + 1;
      } else {
        return this._path.length - 1;
      }
    }

    getNodeCount(): integer {
      return this._path.length;
    }

    getNextNodeX(): float {
      if (this._path.length === 0) {
        return 0;
      }
      if (this._currentSegment + 1 < this._path.length) {
        return this._path[this._currentSegment + 1][0];
      } else {
        return this._path[this._path.length - 1][0];
      }
    }

    getNextNodeY(): float {
      if (this._path.length === 0) {
        return 0;
      }
      if (this._currentSegment + 1 < this._path.length) {
        return this._path[this._currentSegment + 1][1];
      } else {
        return this._path[this._path.length - 1][1];
      }
    }

    getLastNodeX(): float {
      if (this._path.length < 2) {
        return 0;
      }
      if (this._currentSegment < this._path.length - 1) {
        return this._path[this._currentSegment][0];
      } else {
        return this._path[this._path.length - 1][0];
      }
    }

    getLastNodeY(): float {
      if (this._path.length < 2) {
        return 0;
      }
      if (this._currentSegment < this._path.length - 1) {
        return this._path[this._currentSegment][1];
      } else {
        return this._path[this._path.length - 1][1];
      }
    }

    getDestinationX(): float {
      if (this._path.length === 0) {
        return 0;
      }
      return this._path[this._path.length - 1][0];
    }

    getDestinationY(): float {
      if (this._path.length === 0) {
        return 0;
      }
      return this._path[this._path.length - 1][1];
    }

    /**
     * Return true if the latest call to moveTo succeeded.
     */
    pathFound() {
      return this._pathFound;
    }

    /**
     * Return true if the object reached its destination.
     */
    destinationReached() {
      return this._reachedEnd;
    }

    /**
     * Compute and move on the path to the specified destination.
     */
    moveTo(runtimeScene: gdjs.RuntimeScene, x: float, y: float) {
      const owner = this.owner;

      //First be sure that there is a path to compute.
      const target = this._temporaryPointForTransformations;
      target[0] = x - this._gridOffsetX;
      target[1] = y - this._gridOffsetY;
      this._basisTransformation.toWorld(target);
      const targetCellX = Math.round(target[0] / this._cellWidth);
      const targetCellY = Math.round(target[1] / this._cellHeight);
      const start = this._temporaryPointForTransformations;
      start[0] = owner.getX() - this._gridOffsetX;
      start[1] = owner.getY() - this._gridOffsetY;
      this._basisTransformation.toWorld(start);
      const startCellX = Math.round(start[0] / this._cellWidth);
      const startCellY = Math.round(start[1] / this._cellHeight);
      if (startCellX == targetCellX && startCellY == targetCellY) {
        this._path.length = 0;
        this._path.push([owner.getX(), owner.getY()]);
        this._path.push([x, y]);
        this._enterSegment(0);
        this._pathFound = true;
        return;
      }

      //Start searching for a path
      this._searchContext.allowDiagonals(this._allowDiagonals);
      this._searchContext.setObstacles(this._manager);
      this._searchContext.setCellSize(this._cellWidth, this._cellHeight);
      this._searchContext.setStartPosition(owner.getX(), owner.getY());
      if (
        this._collisionMethod == PathfindingRuntimeBehavior.LEGACY_COLLISION
      ) {
        this._searchContext.setObjectSize(
          owner.getX() - owner.getDrawableX() + this._extraBorder,
          owner.getY() - owner.getDrawableY() + this._extraBorder,
          owner.getWidth() -
            (owner.getX() - owner.getDrawableX()) +
            this._extraBorder,
          owner.getHeight() -
            (owner.getY() - owner.getDrawableY()) +
            this._extraBorder
        );
      } else {
        const copyHitboxes = PathfindingRuntimeBehavior.deepCloneHitboxes(
          owner.getHitBoxes()
        );
        for (let pi = 0; pi < copyHitboxes.length; ++pi) {
          copyHitboxes[pi].move(-owner.getX(), -owner.getY());
        }
        this._searchContext.setObjectHitBoxes(copyHitboxes);

        const aabb = owner.getAABB();
        this._searchContext.setObjectSize(
          owner.getX() - aabb.min[0] + this._extraBorder,
          owner.getY() - aabb.min[1] + this._extraBorder,
          aabb.max[0] - owner.getX() + this._extraBorder,
          aabb.max[1] - owner.getY() + this._extraBorder
        );
      }
      if (this._searchContext.computePathTo(x, y)) {
        //Path found: memorize it
        let node = this._searchContext.getFinalNode();
        let finalPathLength = 0;
        while (node) {
          if (finalPathLength === this._path.length) {
            this._path.push([0, 0]);
          }
          this._path[finalPathLength][0] = node.pos[0] * this._cellWidth;
          this._path[finalPathLength][1] = node.pos[1] * this._cellHeight;
          this._basisTransformation.toScreen(this._path[finalPathLength]);
          this._path[finalPathLength][0] += this._gridOffsetX;
          this._path[finalPathLength][1] += this._gridOffsetY;
          node = node.parent;
          finalPathLength++;
        }
        this._path.length = finalPathLength;
        this._path.reverse();
        this._path[0][0] = owner.getX();
        this._path[0][1] = owner.getY();
        this._enterSegment(0);
        this._pathFound = true;
        return;
      }

      //Not path found
      this._pathFound = false;
    }

    static deepCloneHitboxes(hitboxes: Polygon[]): Polygon[] {
      const copyHitboxes = new Array<gdjs.Polygon>(hitboxes.length);
      for (let pi = 0; pi < hitboxes.length; ++pi) {
        copyHitboxes[pi] = gdjs.Polygon.deepClone(hitboxes[pi]);
      }
      return copyHitboxes;
    }

    _enterSegment(segmentNumber: integer) {
      if (this._path.length === 0) {
        return;
      }
      this._currentSegment = segmentNumber;
      if (this._currentSegment < this._path.length - 1) {
        const pathX =
          this._path[this._currentSegment + 1][0] -
          this._path[this._currentSegment][0];
        const pathY =
          this._path[this._currentSegment + 1][1] -
          this._path[this._currentSegment][1];
        this._totalSegmentTime = Math.sqrt(pathX * pathX + pathY * pathY);
        this._timeOnSegment = 0;
        this._reachedEnd = false;
      } else {
        this._reachedEnd = true;
        this._speed = 0;
      }
    }

    doStepPreEvents(runtimeScene: gdjs.RuntimeScene) {
      if (this._path.length === 0 || this._reachedEnd) {
        return;
      }

      //Update the speed of the object
      const timeDelta = this.owner.getElapsedTime(runtimeScene) / 1000;
      this._speed += this._acceleration * timeDelta;
      if (this._speed > this._maxSpeed) {
        this._speed = this._maxSpeed;
      }
      this._angularSpeed = this._angularMaxSpeed;

      //Update the time on the segment and change segment if needed
      this._timeOnSegment += this._speed * timeDelta;
      if (
        this._timeOnSegment >= this._totalSegmentTime &&
        this._currentSegment < this._path.length
      ) {
        this._enterSegment(this._currentSegment + 1);
      }

      //Position object on the segment and update its angle
      let newPos = [0, 0];
      let pathAngle = this.owner.getAngle();
      if (this._currentSegment < this._path.length - 1) {
        newPos[0] = gdjs.evtTools.common.lerp(
          this._path[this._currentSegment][0],
          this._path[this._currentSegment + 1][0],
          this._timeOnSegment / this._totalSegmentTime
        );
        newPos[1] = gdjs.evtTools.common.lerp(
          this._path[this._currentSegment][1],
          this._path[this._currentSegment + 1][1],
          this._timeOnSegment / this._totalSegmentTime
        );
        pathAngle =
          gdjs.toDegrees(
            Math.atan2(
              this._path[this._currentSegment + 1][1] -
                this._path[this._currentSegment][1],
              this._path[this._currentSegment + 1][0] -
                this._path[this._currentSegment][0]
            )
          ) + this._angleOffset;
      } else {
        newPos = this._path[this._path.length - 1];
      }
      this.owner.setX(newPos[0]);
      this.owner.setY(newPos[1]);
      if (this._rotateObject) {
        this.owner.rotateTowardAngle(
          pathAngle,
          this._angularSpeed,
          runtimeScene
        );
      }
    }

    doStepPostEvents(runtimeScene: gdjs.RuntimeScene) {}

    /**
     * Compute the euclidean distance between two positions.
     * @memberof gdjs.PathfindingRuntimeBehavior
     */
    static euclideanDistance(a: FloatPoint, b: FloatPoint) {
      return Math.sqrt(
        (a[0] - b[0]) * (a[0] - b[0]) + (a[1] - b[1]) * (a[1] - b[1])
      );
    }

    /**
     * Compute the taxi distance between two positions.
     * @memberof gdjs.PathfindingRuntimeBehavior
     */
    static manhattanDistance(a: FloatPoint, b: FloatPoint) {
      return Math.abs(a[0] - b[0]) + Math.abs(a[1] - b[1]);
    }
  }
  gdjs.registerBehavior(
    'PathfindingBehavior::PathfindingBehavior',
    gdjs.PathfindingRuntimeBehavior
  );

  export namespace PathfindingRuntimeBehavior {
    /**
     * Internal tool class representing a node when looking for a path
     */
    export class Node {
      pos: FloatPoint;
      cost: integer = 0;
      smallestCost: integer = -1;
      estimateCost: integer = -1;
      parent: Node | null = null;
      open: boolean = true;

      constructor(xPos: integer, yPos: integer) {
        this.pos = [xPos, yPos];
      }

      reinitialize(xPos: integer, yPos: integer) {
        this.pos[0] = xPos;
        this.pos[1] = yPos;
        this.cost = 0;
        this.smallestCost = -1;
        this.estimateCost = -1;
        this.parent = null;
        this.open = true;
      }
    }

    /**
     * Internal tool class containing the structures used by A* and members functions related
     * to them.
     * @ignore
     */
    export class SearchContext {
      _obstacles: PathfindingObstaclesManager;
      _finalNode: Node | null = null;
      _destination: FloatPoint = [0, 0];
      _start: FloatPoint = [0, 0];
      _startX: float = 0;
      _startY: float = 0;
      _allowDiagonals: boolean = true;
      _maxComplexityFactor: integer = 50;
      _cellWidth: float = 20;
      _cellHeight: float = 20;

      _behavior: gdjs.PathfindingRuntimeBehavior;
      // for rectangular collision methods
      _leftBorder: integer = 0;
      _rightBorder: integer = 0;
      _topBorder: integer = 0;
      _bottomBorder: integer = 0;
      _aabb: AABB = { min: [0, 0], max: [0, 0] };

      // for hitbox collision method
      _objectHitboxes: Polygon[] = [];
      _stampHitboxes: Polygon[] = [];

      _temporaryPointForTransformations: FloatPoint = [0, 0];

      _distanceFunction: (pt1: FloatPoint, pt2: FloatPoint) => float;
      _allNodes: Node[][] = [];

      //An array of array. Nodes are indexed by their x position, and then by their y position.
      _openNodes: Node[] = [];
      _closeObstacles: PathfindingObstacleRuntimeBehavior[] = [];

      //Used by getNodes to temporarily store obstacles near a position.
      _nodeCache: Node[] = [];

      constructor(
        behavior: gdjs.PathfindingRuntimeBehavior,
        obstacles: PathfindingObstaclesManager
      ) {
        this._obstacles = obstacles;
        this._behavior = behavior;
        this._distanceFunction = PathfindingRuntimeBehavior.euclideanDistance;

        //An array of nodes sorted by their estimate cost (First node = Lower estimate cost).
      }

      //Old nodes constructed in a previous search are stored here to avoid temporary objects (see _freeAllNodes method).
      setObstacles(
        obstacles: PathfindingObstaclesManager
      ): PathfindingRuntimeBehavior.SearchContext {
        this._obstacles = obstacles;
        return this;
      }

      getFinalNode() {
        return this._finalNode;
      }

      allowDiagonals(allowDiagonals: boolean) {
        this._allowDiagonals = allowDiagonals;
        this._distanceFunction = allowDiagonals
          ? PathfindingRuntimeBehavior.euclideanDistance
          : PathfindingRuntimeBehavior.manhattanDistance;
        return this;
      }

      setStartPosition(
        x: float,
        y: float
      ): PathfindingRuntimeBehavior.SearchContext {
        this._startX = x;
        this._startY = y;
        return this;
      }

      setObjectSize(
        leftBorder: integer,
        topBorder: integer,
        rightBorder: integer,
        bottomBorder: integer
      ): PathfindingRuntimeBehavior.SearchContext {
        this._leftBorder = leftBorder;
        this._rightBorder = rightBorder;
        this._topBorder = topBorder;
        this._bottomBorder = bottomBorder;
        return this;
      }

      setObjectHitBoxes(objectHitboxes: Polygon[]) {
        this._objectHitboxes = objectHitboxes;
        this._stampHitboxes = PathfindingRuntimeBehavior.deepCloneHitboxes(
          this._objectHitboxes
        );
      }

      setCellSize(
        cellWidth: float,
        cellHeight: float
      ): PathfindingRuntimeBehavior.SearchContext {
        this._cellWidth = cellWidth;
        this._cellHeight = cellHeight;
        return this;
      }

      computePathTo(targetX: float, targetY: float) {
        if (this._obstacles === null) {
          console.log(
            'You tried to compute a path without specifying the obstacles'
          );
          return;
        }
        this._destination[0] = targetX - this._behavior._gridOffsetX;
        this._destination[1] = targetY - this._behavior._gridOffsetY;
        this._behavior._basisTransformation.toWorld(this._destination);
        this._destination[0] = Math.round(
          this._destination[0] / this._cellWidth
        );
        this._destination[1] = Math.round(
          this._destination[1] / this._cellHeight
        );
        this._start[0] = this._startX - this._behavior._gridOffsetX;
        this._start[1] = this._startY - this._behavior._gridOffsetY;
        this._behavior._basisTransformation.toWorld(this._start);
        this._start[0] = Math.round(this._start[0] / this._cellWidth);
        this._start[1] = Math.round(this._start[1] / this._cellHeight);

        //Initialize the algorithm
        this._freeAllNodes();
        const startNode = this._getNode(this._start[0], this._start[1]);
        startNode.smallestCost = 0;
        startNode.estimateCost =
          0 + this._distanceFunction(this._start, this._destination);
        this._openNodes.length = 0;
        this._openNodes.push(startNode);

        //A* algorithm main loop
        let iterationCount = 0;
        const maxIterationCount =
          startNode.estimateCost * this._maxComplexityFactor;
        while (this._openNodes.length !== 0) {
          //Make sure we do not search forever.
          if (iterationCount++ > maxIterationCount) {
            return false;
          }

          //Get the most promising node...
          const n = this._openNodes.shift()!;
          //...and flag it as explored
          n.open = false;

          //Check if we reached destination?
          if (
            n.pos[0] == this._destination[0] &&
            n.pos[1] == this._destination[1]
          ) {
            this._finalNode = n;
            return true;
          }

          //No, so add neighbors to the nodes to explore.
          this._insertNeighbors(n);
        }
        return false;
      }

      _freeAllNodes() {
        if (this._nodeCache.length <= 32000) {
          for (const i in this._allNodes) {
            if (this._allNodes.hasOwnProperty(i)) {
              const nodeArray = this._allNodes[i];
              for (const j in nodeArray) {
                if (nodeArray.hasOwnProperty(j)) {
                  this._nodeCache.push(nodeArray[j]);
                }
              }
            }
          }
        }
        this._allNodes = [];
      }

      /**
       * Insert the neighbors of the current node in the open list
       * (Only if they are not closed, and if the cost is better than the already existing smallest cost).
       */
      _insertNeighbors(currentNode: Node) {
        this._addOrUpdateNode(
          currentNode.pos[0] + 1,
          currentNode.pos[1],
          currentNode,
          1
        );
        this._addOrUpdateNode(
          currentNode.pos[0] - 1,
          currentNode.pos[1],
          currentNode,
          1
        );
        this._addOrUpdateNode(
          currentNode.pos[0],
          currentNode.pos[1] + 1,
          currentNode,
          1
        );
        this._addOrUpdateNode(
          currentNode.pos[0],
          currentNode.pos[1] - 1,
          currentNode,
          1
        );
        if (this._allowDiagonals) {
          this._addOrUpdateNode(
            currentNode.pos[0] + 1,
            currentNode.pos[1] + 1,
            currentNode,
            1.414213562
          );
          this._addOrUpdateNode(
            currentNode.pos[0] + 1,
            currentNode.pos[1] - 1,
            currentNode,
            1.414213562
          );
          this._addOrUpdateNode(
            currentNode.pos[0] - 1,
            currentNode.pos[1] - 1,
            currentNode,
            1.414213562
          );
          this._addOrUpdateNode(
            currentNode.pos[0] - 1,
            currentNode.pos[1] + 1,
            currentNode,
            1.414213562
          );
        }
      }

      /**
       * Get (or dynamically construct) a node.
       *
       * *All* nodes should be created using this method: The cost of the node is computed thanks
       * to the objects flagged as obstacles.
       */
      _getNode(xPos: integer, yPos: integer): Node {
        //First check if their is a node a the specified position.
        if (this._allNodes.hasOwnProperty(xPos)) {
          if (this._allNodes[xPos].hasOwnProperty(yPos)) {
            return this._allNodes[xPos][yPos];
          }
        } else {
          this._allNodes[xPos] = [];
        }

        //No so construct a new node (or get it from the cache)...
        let newNode: Node;
        if (this._nodeCache.length !== 0) {
          newNode = this._nodeCache.shift()!;
          newNode.reinitialize(xPos, yPos);
        } else {
          newNode = new Node(xPos, yPos);
        }

        const nodeCenter = this._temporaryPointForTransformations;
        nodeCenter[0] = xPos * this._cellWidth;
        nodeCenter[1] = yPos * this._cellHeight;
        this._behavior._basisTransformation.toScreen(nodeCenter);
        nodeCenter[0] += this._behavior._gridOffsetX;
        nodeCenter[1] += this._behavior._gridOffsetY;

        //...and update its cost according to obstacles
        let objectsOnCell = false;

        if (
          this._behavior._collisionMethod ==
          PathfindingRuntimeBehavior.LEGACY_COLLISION
        ) {
          const radius =
            this._cellHeight > this._cellWidth
              ? this._cellHeight * 2
              : this._cellWidth * 2;
          this._obstacles.getAllObstaclesAround(
            nodeCenter[0],
            nodeCenter[1],
            radius,
            this._closeObstacles
          );
        } else {
          this._aabb.min[0] = nodeCenter[0] - this._leftBorder;
          this._aabb.min[1] = nodeCenter[1] - this._topBorder;
          this._aabb.max[0] = nodeCenter[0] + this._rightBorder;
          this._aabb.max[1] = nodeCenter[1] + this._bottomBorder;
          this._obstacles.getAllObstaclesAroundAABB(
            this._aabb,
            this._closeObstacles
          );
        }

        for (let k = 0; k < this._closeObstacles.length; ++k) {
          const obj = this._closeObstacles[k].owner;

          if (
            this._behavior._collisionMethod ==
            PathfindingRuntimeBehavior.LEGACY_COLLISION
          ) {
            const topLeftCellX = Math.floor(
              (obj.getDrawableX() - this._rightBorder) / this._cellWidth
            );
            const topLeftCellY = Math.floor(
              (obj.getDrawableY() - this._bottomBorder) / this._cellHeight
            );
            const bottomRightCellX = Math.ceil(
              (obj.getDrawableX() + obj.getWidth() + this._leftBorder) /
                this._cellWidth
            );
            const bottomRightCellY = Math.ceil(
              (obj.getDrawableY() + obj.getHeight() + this._topBorder) /
                this._cellHeight
            );

            objectsOnCell =
              topLeftCellX < xPos &&
              xPos < bottomRightCellX &&
              topLeftCellY < yPos &&
              yPos < bottomRightCellY;
          } else {
            if (
              this._behavior._collisionMethod ==
              PathfindingRuntimeBehavior.HITBOX_COLLISION
            ) {
              this._moveStampHitBoxesTo(nodeCenter[0], nodeCenter[1]);
              objectsOnCell = this._checkCollisionWithStamp(obj.getHitBoxes());
            } else if (
              this._behavior._collisionMethod ==
              PathfindingRuntimeBehavior.AABB_COLLISION
            ) {
              // this is needed to exclude touching edges
              const obstacleAABB = obj.getAABB();
              objectsOnCell =
                obstacleAABB.min[0] < this._aabb.max[0] &&
                obstacleAABB.max[0] > this._aabb.min[0] &&
                obstacleAABB.min[1] < this._aabb.max[1] &&
                obstacleAABB.max[1] > this._aabb.min[1];
            }
          }
          if (objectsOnCell) {
            if (this._closeObstacles[k].isImpassable()) {
              //The cell is impassable, stop here.
              newNode.cost = -1;
              break;
            } else {
              //Superimpose obstacles
              newNode.cost += this._closeObstacles[k].getCost();
            }
          }
        }
        if (!objectsOnCell) {
          newNode.cost = 1;
        }

        //Default cost when no objects put on the cell.
        this._allNodes[xPos][yPos] = newNode;
        return newNode;
      }

      _moveStampHitBoxesTo(x: float, y: float) {
        for (let pi = 0; pi < this._objectHitboxes.length; ++pi) {
          const objectPolygon = this._objectHitboxes[pi];
          const stampPolygon = this._stampHitboxes[pi];
          for (let vi = 0; vi < objectPolygon.vertices.length; ++vi) {
            const objectPoint = objectPolygon.vertices[vi];
            const stampPoint = stampPolygon.vertices[vi];
            stampPoint[0] = objectPoint[0] + x;
            stampPoint[1] = objectPoint[1] + y;
          }
        }
      }

      _checkCollisionWithStamp(hitboxes: Polygon[]): boolean {
        const hitBoxes1 = this._stampHitboxes;
        const hitBoxes2 = hitboxes;
        for (let k = 0, lenBoxes1 = hitBoxes1.length; k < lenBoxes1; ++k) {
          for (let l = 0, lenBoxes2 = hitBoxes2.length; l < lenBoxes2; ++l) {
            if (
              gdjs.Polygon.collisionTest(hitBoxes1[k], hitBoxes2[l], true)
                .collision
            ) {
              return true;
            }
          }
        }
        return false;
      }

      /**
       * Add a node to the openNodes (only if the cost to reach it is less than the existing cost, if any).
       */
      _addOrUpdateNode(
        newNodeX: integer,
        newNodeY: integer,
        currentNode: Node,
        factor: float
      ) {
        const neighbor = this._getNode(newNodeX, newNodeY);

        //cost < 0 means impassable obstacle
        if (!neighbor.open || neighbor.cost < 0) {
          return;
        }

        //Update the node costs and parent if the path coming from currentNode is better:
        if (
          neighbor.smallestCost === -1 ||
          neighbor.smallestCost >
            currentNode.smallestCost +
              ((currentNode.cost + neighbor.cost) / 2.0) * factor
        ) {
          if (neighbor.smallestCost != -1) {
            //The node is already in the open list..
            for (let i = 0; i < this._openNodes.length; ++i) {
              if (
                this._openNodes[i].pos[0] == neighbor.pos[0] &&
                this._openNodes[i].pos[1] == neighbor.pos[1]
              ) {
                this._openNodes.splice(
                  i,
                  //..so remove it as its estimate cost will be updated.
                  1
                );
                break;
              }
            }
          }
          neighbor.smallestCost =
            currentNode.smallestCost +
            ((currentNode.cost + neighbor.cost) / 2.0) * factor;
          neighbor.parent = currentNode;
          neighbor.estimateCost =
            neighbor.smallestCost +
            this._distanceFunction(neighbor.pos, this._destination);

          //Add the neighbor to open nodes, which are sorted by their estimate cost:
          if (
            this._openNodes.length === 0 ||
            this._openNodes[this._openNodes.length - 1].estimateCost <
              neighbor.estimateCost
          ) {
            this._openNodes.push(neighbor);
          } else {
            for (let i = 0; i < this._openNodes.length; ++i) {
              if (this._openNodes[i].estimateCost >= neighbor.estimateCost) {
                this._openNodes.splice(i, 0, neighbor);
                break;
              }
            }
          }
        }
      }
    }

    export interface BasisTransformation {
      toScreen(worldPoint: FloatPoint, screenPoint: FloatPoint): void;

      toWorld(screenPoint: FloatPoint, worldPoint: FloatPoint): void;

      toScreen(worldPoint: FloatPoint): void;

      toWorld(screenPoint: FloatPoint): void;
    }

    export class IdentityTransformation implements BasisTransformation {
      toScreen(worldPoint: FloatPoint, screenPoint?: FloatPoint): void {
        if (screenPoint) {
          screenPoint[0] = worldPoint[0];
          screenPoint[1] = worldPoint[1];
        }
      }

      toWorld(screenPoint: FloatPoint, worldPoint?: FloatPoint): void {
        if (worldPoint) {
          worldPoint[0] = screenPoint[0];
          worldPoint[1] = screenPoint[1];
        }
      }
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
        const sinB = Math.sin(Math.PI / 4);
        /* https://en.wikipedia.org/wiki/Isometric_projection
         *
         *   / 1     0    0 \ / cosB 0 -sinB \ / 1 0  0 \
         *   | 0  cosA sinA | |    0 1     0 | | 0 0 -1 |
         *   \ 0 -sinA cosA / \ sinB 0  cosB / \ 0 1  0 /
         */
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
  }
}

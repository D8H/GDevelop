namespace gdjs {
  /**
   * An affine transformation that can transform points.
   */
  export class AffineTransformation {
    private matrix: Float32Array;

    /**
     * Initialize to the identity.
     */
    constructor() {
      // | 1 0 0 |
      // | 0 1 0 |
      // | 0 0 1 |
      this.matrix = new Float32Array([1, 0, 0, 1, 0, 0]);
    }

    /**
     * Reset to the identity.
     */
    setToIdentity() {
      const matrix = this.matrix;
      // | 1 0 0 |
      // | 0 1 0 |
      // | 0 0 1 |
      matrix[0] = 1;
      matrix[1] = 0;
      matrix[2] = 0;
      matrix[3] = 1;
      matrix[4] = 0;
      matrix[5] = 0;
    }

    /**
     * Check if this transformation is the identity.
     */
    isIdentity(): boolean {
      const matrix = this.matrix;
      return (
        matrix[0] === 1 &&
        matrix[1] === 0 &&
        matrix[2] === 0 &&
        matrix[3] === 1 &&
        matrix[4] === 0 &&
        matrix[5] === 0
      );
    }

    /**
     * Check if this is equals to another transformation.
     * @param other The transformation to check.
     */
    equals(other: AffineTransformation): boolean {
      const matrix = this.matrix;
      const otherMatrix = other.matrix;
      return (
        this === other ||
        (matrix[0] === otherMatrix[0] &&
          matrix[1] === otherMatrix[1] &&
          matrix[2] === otherMatrix[2] &&
          matrix[3] === otherMatrix[3] &&
          matrix[4] === otherMatrix[4] &&
          matrix[5] === otherMatrix[5])
      );
    }

    /**
     * Check if this is almost equals to another transformation.
     * @param other The transformation to check.
     * @param epsilon The relative margin error.
     */
    nearlyEquals(other: AffineTransformation, epsilon: float): boolean {
      const matrix = this.matrix;
      const otherMatrix = other.matrix;
      return (
        this === other ||
        (gdjs.nearlyEqual(matrix[0], otherMatrix[0], epsilon) &&
          gdjs.nearlyEqual(matrix[1], otherMatrix[1], epsilon) &&
          gdjs.nearlyEqual(matrix[2], otherMatrix[2], epsilon) &&
          gdjs.nearlyEqual(matrix[3], otherMatrix[3], epsilon) &&
          gdjs.nearlyEqual(matrix[4], otherMatrix[4], epsilon) &&
          gdjs.nearlyEqual(matrix[5], otherMatrix[5], epsilon))
      );
    }

    /**
     * Copy a transformation.
     * @param other The transformation to copy.
     */
    copyFrom(other: AffineTransformation) {
      const matrix = this.matrix;
      const otherMatrix = other.matrix;

      matrix[0] = otherMatrix[0];
      matrix[1] = otherMatrix[1];
      matrix[2] = otherMatrix[2];
      matrix[3] = otherMatrix[3];
      matrix[4] = otherMatrix[4];
      matrix[5] = otherMatrix[5];

      return this;
    }

    /**
     * Reset to a translation.
     *
     * @param x The horizontal translation value.
     * @param y The vertical translation value.
     */
    setToTranslation(tx: float, ty: float) {
      const matrix = this.matrix;
      // | m0 m2 m4 |   | 1 0 tx |
      // | m1 m3 m5 | = | 0 1 ty |
      // |  0  0  1 |   | 0 0  1 |
      matrix[0] = 1;
      matrix[1] = 0;
      matrix[2] = 0;
      matrix[3] = 1;
      matrix[4] = tx;
      matrix[5] = ty;
    }

    /**
     * Concatenate a translation.
     *
     * @param tx The horizontal translation value.
     * @param ty The vertical translation value.
     */
    translate(tx: float, ty: float) {
      var matrix = this.matrix;
      //          1 0 tx
      //          0 1 ty
      //          0 0  1
      // m0 m2 m4
      // m1 m3 m5
      //  0  0  1
      matrix[4] = matrix[0] * tx + matrix[2] * ty + matrix[4];
      matrix[5] = matrix[1] * tx + matrix[3] * ty + matrix[5];
    }

    /**
     * Reset to a scale.
     *
     * @param sx The horizontal scale value.
     * @param sy The vertical scale value.
     */
    setToScale(sx: float, sy: float) {
      const matrix = this.matrix;
      // | m0 m2 m4 |   | sx 0  0 |
      // | m1 m3 m5 | = | 0  sy 0 |
      // |  0  0  1 |   | 0  0  1 |
      matrix[0] = sx;
      matrix[1] = 0;
      matrix[2] = 0;
      matrix[3] = sy;
      matrix[4] = 0;
      matrix[5] = 0;
    }

    /**
     * Concatenate a scale.
     *
     * @param sx The horizontal scale value.
     * @param sy The vertical scale value.
     */
    scale(sx: float, sy: float) {
      const matrix = this.matrix;
      //          sx  0 0
      //           0 sy 0
      //           0  0 1
      // m0 m2 m4
      // m1 m3 m5
      //  0  0  1
      matrix[0] *= sx;
      matrix[1] *= sx;
      matrix[2] *= sy;
      matrix[3] *= sy;
    }

    /**
     * Reset to a rotation.
     *
     * @param angle The angle of rotation in radians.
     */
    setToRotation(theta: float) {
      const matrix = this.matrix;
      let cost = Math.cos(theta);
      let sint = Math.sin(theta);

      // Avoid rounding errors around 0.
      if (cost === -1 || cost === 1) {
        sint = 0;
      }
      if (sint === -1 || sint === 1) {
        cost = 0;
      }

      // | m0 m2 m4 |   | cost -sint 0 |
      // | m1 m3 m5 | = | sint  cost 0 |
      // |  0  0  1 |   |  0     0   1 |
      matrix[0] = cost;
      matrix[1] = sint;
      matrix[2] = -sint;
      matrix[3] = cost;
      matrix[4] = 0;
      matrix[5] = 0;
    }

    /**
     * Concatenate a rotation.
     *
     * @param angle The angle of rotation in radians.
     */
    rotate(angle: float) {
      const matrix = this.matrix;
      let cost = Math.cos(angle);
      let sint = Math.sin(angle);

      // Avoid rounding errors around 0.
      if (cost === -1 || cost === 1) {
        sint = 0;
      }
      if (sint === -1 || sint === 1) {
        cost = 0;
      }

      //           cost -sint 0
      //           sint  cost 0
      //            0     0   1
      //  m0 m2 m4
      //  m1 m3 m5
      //   0  0  1

      const m0 = matrix[0];
      const m1 = matrix[1];
      const m2 = matrix[2];
      const m3 = matrix[3];

      matrix[0] = m0 * cost + m2 * sint;
      matrix[1] = m1 * cost + m3 * sint;
      matrix[2] = m0 * -sint + m2 * cost;
      matrix[3] = m1 * -sint + m3 * cost;
    }

    /**
     * Reset to a rotation.
     *
     * @param angle The angle of rotation in radians.
     * @param anchorX The rotation anchor point X.
     * @param anchorY The rotation anchor point Y.
     */
    setToRotationAround(angle: float, anchorX: float, anchorY: float) {
      const matrix = this.matrix;
      let cost = Math.cos(angle);
      let sint = Math.sin(angle);

      // Avoid rounding errors around 0.
      if (cost === -1 || cost === 1) {
        sint = 0;
      }
      if (sint === -1 || sint === 1) {
        cost = 0;
      }

      // | m0 m2 m4 |   | cost -sint x-x*cost+y*sint |
      // | m1 m3 m5 | = | sint  cost y-x*sint-y*cost |
      // |  0  0  1 |   |  0     0          1        |
      matrix[0] = cost;
      matrix[1] = sint;
      matrix[2] = -sint;
      matrix[3] = cost;
      matrix[4] = anchorX - anchorX * cost + anchorY * sint;
      matrix[5] = anchorY - anchorX * sint + anchorY * cost;
    }

    /**
     * Concatenate a rotation.
     *
     * @param angle The angle of rotation in radians.
     * @param anchorX The rotation anchor point X.
     * @param anchorY The rotation anchor point Y.
     */
    rotateAround(angle: float, anchorX: float, anchorY: float) {
      this.translate(anchorX, anchorY);
      this.rotate(angle);
      // First: translate anchor to origin
      this.translate(-anchorX, -anchorY);
    }

    /**
     * Reset to an horizontal flip.
     *
     * @param anchorX The flip anchor point X.
     */
    setToFlipX(anchorX: float) {
      const matrix = this.matrix;
      // | m0 m2 m4 |   | -1  0 2x |
      // | m1 m3 m5 | = |  0  1  0 |
      // |  0  0  1 |   |  0  0  1 |
      matrix[0] = -1;
      matrix[1] = 0;
      matrix[2] = 0;
      matrix[3] = 1;
      matrix[4] = 2 * anchorX;
      matrix[5] = 0;
    }

    /**
     * Concatenate an horizontal flip.
     *
     * @param anchorX The flip anchor point X.
     */
    flipX(anchorX: float) {
      this.translate(anchorX, 0);
      this.scale(-1, 1);
      // First: translate anchor to origin
      this.translate(-anchorX, 0);
    }

    /**
     * Reset to an vertical flip.
     *
     * @param anchorY The flip anchor point Y.
     */
    setToFlipY(anchorY: float) {
      const matrix = this.matrix;
      // | m0 m2 m4 |   | 1  0  0 |
      // | m1 m3 m5 | = | 0 -1 2x |
      // |  0  0  1 |   | 0  0  1 |
      matrix[0] = -1;
      matrix[1] = 0;
      matrix[2] = 0;
      matrix[3] = 1;
      matrix[4] = 0;
      matrix[5] = 2 * anchorY;
    }

    /**
     * Concatenate an vertical flip.
     *
     * @param anchorY The flip anchor point Y.
     */
    flipY(anchorY: float) {
      this.translate(0, anchorY);
      this.scale(1, -1);
      // First: translate anchor to origin
      this.translate(0, -anchorY);
    }

    /**
     * Concatenate a flip between X and Y.
     */
    flipDiagonally() {
      const matrix = this.matrix;

      const m0 = matrix[0];
      const m1 = matrix[1];
      const m2 = matrix[2];
      const m3 = matrix[3];
      const m4 = matrix[4];
      const m5 = matrix[5];

      matrix[0] = m1;
      matrix[1] = m0;
      matrix[2] = m3;
      matrix[3] = m2;
      matrix[4] = m5;
      matrix[5] = m4;
    }

    /**
     * Concatenate a transformation after this one.
     * @param other The transformation to concatenate.
     */
    concatenate(other: AffineTransformation) {
      const matrix = this.matrix;
      const otherMatrix = other.matrix;

      const m0 = matrix[0];
      const m1 = matrix[1];
      const m2 = matrix[2];
      const m3 = matrix[3];
      const m4 = matrix[4];
      const m5 = matrix[5];

      const o0 = otherMatrix[0];
      const o1 = otherMatrix[1];
      const o2 = otherMatrix[2];
      const o3 = otherMatrix[3];
      const o4 = otherMatrix[4];
      const o5 = otherMatrix[5];

      //          o0 o2 o4
      //          o1 o3 o5
      //           0  0  1
      // m0 m2 m4
      // m1 m3 m5
      //  0  0  1
      matrix[0] = o0 * m0 + o1 * m2;
      matrix[1] = o0 * m1 + o1 * m3;
      matrix[2] = o2 * m0 + o3 * m2;
      matrix[3] = o2 * m1 + o3 * m3;
      matrix[4] = o4 * m0 + o5 * m2 + m4;
      matrix[5] = o4 * m1 + o5 * m3 + m5;
    }

    /**
     * Concatenate a transformation before this one.
     * @param other The transformation to concatenate.
     */
    preConcatenate(other: AffineTransformation) {
      const matrix = this.matrix;
      const otherMatrix = other.matrix;

      const m0 = matrix[0];
      const m1 = matrix[1];
      const m2 = matrix[2];
      const m3 = matrix[3];
      const m4 = matrix[4];
      const m5 = matrix[5];

      const o0 = otherMatrix[0];
      const o1 = otherMatrix[1];
      const o2 = otherMatrix[2];
      const o3 = otherMatrix[3];
      const o4 = otherMatrix[4];
      const o5 = otherMatrix[5];

      //          m0 m2 m4
      //          m1 m3 m5
      //           0  0  1
      // o0 o2 o4
      // o1 o3 o5
      //  0  0  1
      matrix[0] = m0 * o0 + m1 * o2;
      matrix[1] = m0 * o1 + m1 * o3;
      matrix[2] = m2 * o0 + m3 * o2;
      matrix[3] = m2 * o1 + m3 * o3;
      matrix[4] = m4 * o0 + m5 * o2 + o4;
      matrix[5] = m4 * o1 + m5 * o3 + o5;
    }

    /**
     * Transform a point.
     *
     * @param source The point to transform.
     * @param destination The Point to store the transformed coordinates.
     */
    transform(source: FloatPoint, destination: FloatPoint) {
      const matrix = this.matrix;
      const sourceX = source[0];
      const sourceY = source[1];
      //          x
      //          y
      //          1
      // m0 m2 m4
      // m1 m3 m5
      //  0  0  1
      destination[0] = matrix[0] * sourceX + matrix[2] * sourceY + matrix[4];
      destination[1] = matrix[1] * sourceX + matrix[3] * sourceY + matrix[5];
    }

    /**
     * Invert the matrix.
     */
    invert() {
      const matrix = this.matrix;

      const m0 = matrix[0];
      const m1 = matrix[1];
      const m2 = matrix[2];
      const m3 = matrix[3];
      const m4 = matrix[4];
      const m5 = matrix[5];

      const n = m0 * m3 - m1 * m2;

      matrix[0] = m3 / n;
      matrix[1] = -m1 / n;
      matrix[2] = -m2 / n;
      matrix[3] = m0 / n;
      matrix[4] = (m2 * m5 - m3 * m4) / n;
      matrix[5] = -(m0 * m5 - m1 * m4) / n;

      return this;
    }

    toString() {
      const matrix = this.matrix;
      return `[[${matrix[0]} ${matrix[1]}] [${matrix[2]} ${matrix[3]}] [${matrix[4]} ${matrix[5]}]]`;
    }
  }




  /**
   * An affine transformation that can transform points.
   */
   export class AffineTransformationB {
    private m0: float = 1;
    private m1: float = 0;
    private m2: float = 0;
    private m3: float = 1;
    private m4: float = 0;
    private m5: float = 0;

    /**
     * Initialize to the identity.
     */
    constructor() {
      // | 1 0 0 |
      // | 0 1 0 |
      // | 0 0 1 |
    }

    /**
     * Reset to the identity.
     */
    setToIdentity() {
      // | 1 0 0 |
      // | 0 1 0 |
      // | 0 0 1 |
      this.m0 = 1;
      this.m1 = 0;
      this.m2 = 0;
      this.m3 = 1;
      this.m4 = 0;
      this.m5 = 0;
    }

    /**
     * Check if this transformation is the identity.
     */
    isIdentity(): boolean {
      return (
        this.m0 === 1 &&
        this.m1 === 0 &&
        this.m2 === 0 &&
        this.m3 === 1 &&
        this.m4 === 0 &&
        this.m5 === 0
      );
    }

    /**
     * Check if this is equals to another transformation.
     * @param other The transformation to check.
     */
    equals(other: AffineTransformationB): boolean {
      return (
        this === other ||
        (this.m0 === other.m0 &&
          this.m1 === other.m1 &&
          this.m2 === other.m2 &&
          this.m3 === other.m3 &&
          this.m4 === other.m4 &&
          this.m5 === other.m5)
      );
    }

    /**
     * Check if this is almost equals to another transformation.
     * @param other The transformation to check.
     * @param epsilon The relative margin error.
     */
    nearlyEquals(other: AffineTransformationB, epsilon: float): boolean {
      return (
        this === other ||
        (gdjs.nearlyEqual(this.m0, other.m0, epsilon) &&
          gdjs.nearlyEqual(this.m1, other.m1, epsilon) &&
          gdjs.nearlyEqual(this.m2, other.m2, epsilon) &&
          gdjs.nearlyEqual(this.m3, other.m3, epsilon) &&
          gdjs.nearlyEqual(this.m4, other.m4, epsilon) &&
          gdjs.nearlyEqual(this.m5, other.m5, epsilon))
      );
    }

    /**
     * Copy a transformation.
     * @param other The transformation to copy.
     */
    copyFrom(other: AffineTransformationB) {
      this.m0 = other.m0;
      this.m1 = other.m1;
      this.m2 = other.m2;
      this.m3 = other.m3;
      this.m4 = other.m4;
      this.m5 = other.m5;

      return this;
    }

    /**
     * Reset to a translation.
     *
     * @param x The horizontal translation value.
     * @param y The vertical translation value.
     */
    setToTranslation(tx: float, ty: float) {
      // | m0 m2 m4 |   | 1 0 tx |
      // | m1 m3 m5 | = | 0 1 ty |
      // |  0  0  1 |   | 0 0  1 |
      this.m0 = 1;
      this.m1 = 0;
      this.m2 = 0;
      this.m3 = 1;
      this.m4 = tx;
      this.m5 = ty;
    }

    /**
     * Concatenate a translation.
     *
     * @param tx The horizontal translation value.
     * @param ty The vertical translation value.
     */
    translate(tx: float, ty: float) {
      //          1 0 tx
      //          0 1 ty
      //          0 0  1
      // m0 m2 m4
      // m1 m3 m5
      //  0  0  1
      this.m4 = this.m0 * tx + this.m2 * ty + this.m4;
      this.m5 = this.m1 * tx + this.m3 * ty + this.m5;
    }

    /**
     * Reset to a scale.
     *
     * @param sx The horizontal scale value.
     * @param sy The vertical scale value.
     */
    setToScale(sx: float, sy: float) {
      // | m0 m2 m4 |   | sx 0  0 |
      // | m1 m3 m5 | = | 0  sy 0 |
      // |  0  0  1 |   | 0  0  1 |
      this.m0 = sx;
      this.m1 = 0;
      this.m2 = 0;
      this.m3 = sy;
      this.m4 = 0;
      this.m5 = 0;
    }

    /**
     * Concatenate a scale.
     *
     * @param sx The horizontal scale value.
     * @param sy The vertical scale value.
     */
    scale(sx: float, sy: float) {
      //          sx  0 0
      //           0 sy 0
      //           0  0 1
      // m0 m2 m4
      // m1 m3 m5
      //  0  0  1
      this.m0 *= sx;
      this.m1 *= sx;
      this.m2 *= sy;
      this.m3 *= sy;
    }

    /**
     * Reset to a rotation.
     *
     * @param angle The angle of rotation in radians.
     */
    setToRotation(theta: float) {
      let cost = Math.cos(theta);
      let sint = Math.sin(theta);

      // Avoid rounding errors around 0.
      if (cost === -1 || cost === 1) {
        sint = 0;
      }
      if (sint === -1 || sint === 1) {
        cost = 0;
      }

      // | m0 m2 m4 |   | cost -sint 0 |
      // | m1 m3 m5 | = | sint  cost 0 |
      // |  0  0  1 |   |  0     0   1 |
      this.m0 = cost;
      this.m1 = sint;
      this.m2 = -sint;
      this.m3 = cost;
      this.m4 = 0;
      this.m5 = 0;
    }

    /**
     * Concatenate a rotation.
     *
     * @param angle The angle of rotation in radians.
     */
    rotate(angle: float) {
      let cost = Math.cos(angle);
      let sint = Math.sin(angle);

      // Avoid rounding errors around 0.
      if (cost === -1 || cost === 1) {
        sint = 0;
      }
      if (sint === -1 || sint === 1) {
        cost = 0;
      }

      //           cost -sint 0
      //           sint  cost 0
      //            0     0   1
      //  m0 m2 m4
      //  m1 m3 m5
      //   0  0  1

      const m0 = this.m0;
      const m1 = this.m1;
      const m2 = this.m2;
      const m3 = this.m3;

      this.m0 = m0 * cost + m2 * sint;
      this.m1 = m1 * cost + m3 * sint;
      this.m2 = m0 * -sint + m2 * cost;
      this.m3 = m1 * -sint + m3 * cost;
    }

    /**
     * Reset to a rotation.
     *
     * @param angle The angle of rotation in radians.
     * @param anchorX The rotation anchor point X.
     * @param anchorY The rotation anchor point Y.
     */
    setToRotationAround(angle: float, anchorX: float, anchorY: float) {
      let cost = Math.cos(angle);
      let sint = Math.sin(angle);

      // Avoid rounding errors around 0.
      if (cost === -1 || cost === 1) {
        sint = 0;
      }
      if (sint === -1 || sint === 1) {
        cost = 0;
      }

      // | m0 m2 m4 |   | cost -sint x-x*cost+y*sint |
      // | m1 m3 m5 | = | sint  cost y-x*sint-y*cost |
      // |  0  0  1 |   |  0     0          1        |
      this.m0 = cost;
      this.m1 = sint;
      this.m2 = -sint;
      this.m3 = cost;
      this.m4 = anchorX - anchorX * cost + anchorY * sint;
      this.m5 = anchorY - anchorX * sint + anchorY * cost;
    }

    /**
     * Concatenate a rotation.
     *
     * @param angle The angle of rotation in radians.
     * @param anchorX The rotation anchor point X.
     * @param anchorY The rotation anchor point Y.
     */
    rotateAround(angle: float, anchorX: float, anchorY: float) {
      this.translate(anchorX, anchorY);
      this.rotate(angle);
      // First: translate anchor to origin
      this.translate(-anchorX, -anchorY);
    }

    /**
     * Reset to an horizontal flip.
     *
     * @param anchorX The flip anchor point X.
     */
    setToFlipX(anchorX: float) {
      // | m0 m2 m4 |   | -1  0 2x |
      // | m1 m3 m5 | = |  0  1  0 |
      // |  0  0  1 |   |  0  0  1 |
      this.m0 = -1;
      this.m1 = 0;
      this.m2 = 0;
      this.m3 = 1;
      this.m4 = 2 * anchorX;
      this.m5 = 0;
    }

    /**
     * Concatenate an horizontal flip.
     *
     * @param anchorX The flip anchor point X.
     */
    flipX(anchorX: float) {
      this.translate(anchorX, 0);
      this.scale(-1, 1);
      // First: translate anchor to origin
      this.translate(-anchorX, 0);
    }

    /**
     * Reset to an vertical flip.
     *
     * @param anchorY The flip anchor point Y.
     */
    setToFlipY(anchorY: float) {
      // | m0 m2 m4 |   | 1  0  0 |
      // | m1 m3 m5 | = | 0 -1 2x |
      // |  0  0  1 |   | 0  0  1 |
      this.m0 = -1;
      this.m1 = 0;
      this.m2 = 0;
      this.m3 = 1;
      this.m4 = 0;
      this.m5 = 2 * anchorY;
    }

    /**
     * Concatenate an vertical flip.
     *
     * @param anchorY The flip anchor point Y.
     */
    flipY(anchorY: float) {
      this.translate(0, anchorY);
      this.scale(1, -1);
      // First: translate anchor to origin
      this.translate(0, -anchorY);
    }

    /**
     * Concatenate a flip between X and Y.
     */
    flipDiagonally() {
      const m0 = this.m0;
      const m1 = this.m1;
      const m2 = this.m2;
      const m3 = this.m3;
      const m4 = this.m4;
      const m5 = this.m5;

      this.m0 = m1;
      this.m1 = m0;
      this.m2 = m3;
      this.m3 = m2;
      this.m4 = m5;
      this.m5 = m4;
    }

    /**
     * Concatenate a transformation after this one.
     * @param other The transformation to concatenate.
     */
    concatenate(other: AffineTransformationB) {
      const m0 = this.m0;
      const m1 = this.m1;
      const m2 = this.m2;
      const m3 = this.m3;
      const m4 = this.m4;
      const m5 = this.m5;

      const o0 = other.m0;
      const o1 = other.m1;
      const o2 = other.m2;
      const o3 = other.m3;
      const o4 = other.m4;
      const o5 = other.m5;

      //          o0 o2 o4
      //          o1 o3 o5
      //           0  0  1
      // m0 m2 m4
      // m1 m3 m5
      //  0  0  1
      this.m0 = o0 * m0 + o1 * m2;
      this.m1 = o0 * m1 + o1 * m3;
      this.m2 = o2 * m0 + o3 * m2;
      this.m3 = o2 * m1 + o3 * m3;
      this.m4 = o4 * m0 + o5 * m2 + m4;
      this.m5 = o4 * m1 + o5 * m3 + m5;
    }

    /**
     * Concatenate a transformation before this one.
     * @param other The transformation to concatenate.
     */
    preConcatenate(other: AffineTransformationB) {
      const m0 = this.m0;
      const m1 = this.m1;
      const m2 = this.m2;
      const m3 = this.m3;
      const m4 = this.m4;
      const m5 = this.m5;

      const o0 = other.m0;
      const o1 = other.m1;
      const o2 = other.m2;
      const o3 = other.m3;
      const o4 = other.m4;
      const o5 = other.m5;

      //          m0 m2 m4
      //          m1 m3 m5
      //           0  0  1
      // o0 o2 o4
      // o1 o3 o5
      //  0  0  1
      this.m0 = m0 * o0 + m1 * o2;
      this.m1 = m0 * o1 + m1 * o3;
      this.m2 = m2 * o0 + m3 * o2;
      this.m3 = m2 * o1 + m3 * o3;
      this.m4 = m4 * o0 + m5 * o2 + o4;
      this.m5 = m4 * o1 + m5 * o3 + o5;
    }

    /**
     * Transform a point.
     *
     * @param source The point to transform.
     * @param destination The Point to store the transformed coordinates.
     */
    transform(source: FloatPoint, destination: FloatPoint) {
      const sourceX = source[0];
      const sourceY = source[1];
      //          x
      //          y
      //          1
      // m0 m2 m4
      // m1 m3 m5
      //  0  0  1
      destination[0] = this.m0 * sourceX + this.m2 * sourceY + this.m4;
      destination[1] = this.m1 * sourceX + this.m3 * sourceY + this.m5;
    }

    /**
     * Invert the matrix.
     */
    invert() {
      const m0 = this.m0;
      const m1 = this.m1;
      const m2 = this.m2;
      const m3 = this.m3;
      const m4 = this.m4;
      const m5 = this.m5;

      const n = m0 * m3 - m1 * m2;

      this.m0 = m3 / n;
      this.m1 = -m1 / n;
      this.m2 = -m2 / n;
      this.m3 = m0 / n;
      this.m4 = (m2 * m5 - m3 * m4) / n;
      this.m5 = -(m0 * m5 - m1 * m4) / n;

      return this;
    }

    toString() {
      return `[[${this.m0} ${this.m1}] [${this.m2} ${this.m3}] [${this.m4} ${this.m5}]]`;
    }
  }
}

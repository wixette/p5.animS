/**
 * Utility classes for p5.animS.
 */

/**
 * A simple vertex. Similar to the vertex() function of p5.js.
 */
export class Vertex {
    /**
     * @param {!number} x x-coordinate.
     * @param {!number} y y-coordinate.
     */
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
}

/**
 * A vertex to define a cubic Bezier curve. Similar to the bezierVertex()
 *     function of p5.js.
 */
export class BezierVertex {
    /**
     * @param {!number} x2 x-coordinate for the first control point.
     * @param {!number} y2 y-coordinate for the first control point.
     * @param {!number} x3 x-coordinate for the second control point.
     * @param {!number} y3 y-coordinate for the second control point.
     * @param {!number} x4 x-coordinate for the anchor point.
     * @param {!number} y4 y-coordinate for the anchor point.
     */
    constructor(x2, y2, x3, y3, x4, y4) {
        this.x2 = x2;
        this.y2 = y2;
        this.x3 = x3;
        this.y3 = y3;
        this.x4 = x4;
        this.y4 = y4;
    }
}

/**
 * Eight coordinate numbers to define a cubic Bezier curve.
 */
export class BezierCurve {
    /**
     * @param {!number} x1 x-coordinate for the first anchor point.
     * @param {!number} y1 y-coordinate for the first anchor point.
     * @param {!number} x2 x-coordinate for the first control point.
     * @param {!number} y2 y-coordinate for the first control point.
     * @param {!number} x3 x-coordinate for the second control point.
     * @param {!number} y3 y-coordinate for the second control point.
     * @param {!number} x4 x-coordinate for the second anchor point.
     * @param {!number} y4 y-coordinate for the second anchor point.
     */
    constructor(x1, y1, x2, y2, x3, y3, x4, y4) {
        this.x1 = x1;
        this.y1 = y1;
        this.x2 = x2;
        this.y2 = y2;
        this.x3 = x3;
        this.y3 = y3;
        this.x4 = x4;
        this.y4 = y4;
    }

    /**
     * Constructs an instance from a Vertex and a BezierVertex.
     * @param {!Vertex} startVertex The first anchor point.
     * @param {!BezierVertex} bezierVertex The two control points and the
     *     second anchor point.
     */
    static fromVetices(startVertex, bezierVertex) {
        return new BezierCurve(
            startVertex.x,
            startVertex.y,
            bezierVertex.x2,
            bezierVertex.y2,
            bezierVertex.x3,
            bezierVertex.y3,
            bezierVertex.x4,
            bezierVertex.y4);
    }
}

/**
 * Gets the end point of a vertex. If the input is a Bezier vertex, its anchor
 *     point is returned. If the input is a simple vertex, the input itself is
 *     returned.
 * @param {!Vertex|BezierVertex} vertex The input vertex.
 * @returns {Vertex} The end point.
 */
export function getEndPoint(vertex) {
    if (vertex instanceof Vertex)
        return new Vertex(vertex.x, vertex.y);
    else
        return new Vertex(vertex.x4, vertex.y4);
}

/**
 * Generates a new cubic Bezier curve which is a partial segment of the
 *     given cubic Bezier curve.
 *
 * See https://stackoverflow.com/questions/878862/
 * and https://en.wikipedia.org/wiki/De_Casteljau%27s_algorithm
 * for the algorithm to break a Bezier curve into segments.
 *
 * @param {!BezierCurve} bezierCurve The original Bezier curve.
 * @param {!number} t0 The start (in a ratio value, 0-1) of the segment.
 * @param {!number} t1 The end (in a ratio value, 0-1) of the segment.
 * @returns {BezierCurve} The generated partial Bezier curve.
 */
export function partialBezierCurve(bezierCurve, t0, t1) {
    const u0 = 1.0 - t0;
    const u1 = 1.0 - t1;

    const qxa = bezierCurve.x1 * u0 * u0 + bezierCurve.x2 * 2 * t0 * u0 + bezierCurve.x3 * t0 * t0;
    const qxb = bezierCurve.x1 * u1 * u1 + bezierCurve.x2 * 2 * t1 * u1 + bezierCurve.x3 * t1 * t1;
    const qxc = bezierCurve.x2 * u0 * u0 + bezierCurve.x3 * 2 * t0 * u0 + bezierCurve.x4 * t0 * t0;
    const qxd = bezierCurve.x2 * u1 * u1 + bezierCurve.x3 * 2 * t1 * u1 + bezierCurve.x4 * t1 * t1;

    const qya = bezierCurve.y1 * u0 * u0 + bezierCurve.y2 * 2 * t0 * u0 + bezierCurve.y3 * t0 * t0;
    const qyb = bezierCurve.y1 * u1 * u1 + bezierCurve.y2 * 2 * t1 * u1 + bezierCurve.y3 * t1 * t1;
    const qyc = bezierCurve.y2 * u0 * u0 + bezierCurve.y3 * 2 * t0 * u0 + bezierCurve.y4 * t0 * t0;
    const qyd = bezierCurve.y2 * u1 * u1 + bezierCurve.y3 * 2 * t1 * u1 + bezierCurve.y4 * t1 * t1;

    const xa = qxa * u0 + qxc * t0;
    const xb = qxa * u1 + qxc * t1;
    const xc = qxb * u0 + qxd * t0;
    const xd = qxb * u1 + qxd * t1;

    const ya = qya * u0 + qyc * t0;
    const yb = qya * u1 + qyc * t1;
    const yc = qyb * u0 + qyd * t0;
    const yd = qyb * u1 + qyd * t1;

    return new BezierCurve(xa, ya, xb, yb, xc, yc, xd, yd);
}

/**
 * Generates a cubic Bezier representing an arc.
 * @param {!number} start The angle to start the arc, in radians.
 * @param {!number} size Total angle 'size', in radians.
 * @returns {BezierCurve} The result curve.
 */
export function arcToBezier(start, size) {
    const alpha = size / 2.0;
    const cosAlpha = Math.cos(alpha);
    const sinAlpha = Math.sin(alpha);
    const cotAlpha = 1.0 / Math.tan(alpha);
    const phi = start + alpha;
    const cosPhi = Math.cos(phi);
    const sinPhi = Math.sin(phi);
    const lambda = (4.0 - cosAlpha) / 3.0;
    const mu = sinAlpha + (cosAlpha - lambda) * cotAlpha;

    return new BezierCurve(
        Math.cos(start).toFixed(7),
        Math.sin(start).toFixed(7),
        (lambda * cosPhi + mu * sinPhi).toFixed(7),
        (lambda * sinPhi - mu * cosPhi).toFixed(7),
        (lambda * cosPhi - mu * sinPhi).toFixed(7),
        (lambda * sinPhi + mu * cosPhi).toFixed(7),
        Math.cos(start + size).toFixed(7),
        Math.sin(start + size).toFixed(7));
}

(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
    typeof define === 'function' && define.amd ? define(['exports'], factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.animS = {}));
}(this, (function (exports) { 'use strict';

    /**
     * Utility classes for p5.animS.
     */

    /**
     * A simple vertex. Similar to the vertex() function of p5.js.
     */
    class Vertex$1 {
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
     * Eight coordinate numbers to define a cubic Bezier curve.
     */
    class BezierCurve {
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
    function getEndPoint(vertex) {
        if (vertex instanceof Vertex$1)
            return new Vertex$1(vertex.x, vertex.y);
        else
            return new Vertex$1(vertex.x4, vertex.y4);
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
    function partialBezierCurve(bezierCurve, t0, t1) {
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
     * @fileoverview The Shape class which supports partial rendering.
     */

    class Shape {
        /**
         * @param {!Object} p5obj The p5 instance of the global object.
         * @param {!Array<Vertex|BezierVertex>} vertices The vertices that define
         *     the shape.
         * @param {!number} startFrame The start frame number of the animation.
         * @param {!number} duration The duration of the creation animation, in
         *     number of frames.
         */
        constructor(p5obj, vertices, startFrame, duration) {
            if (vertices.length <= 0)
                throw new Error('The vertex array must not be empty.');
            if (!(vertices[0] instanceof Vertex$1))
                throw new Error('The start vertex must not be a Bezier vertex.');
            this.p5obj = p5obj;
            this.vertices = vertices;
            this.startFrame = startFrame;
            this.duration = duration;
        }

        /**
         * Draws the shape instance on the current frame.
         */
        update() {
            let progress = (frameCount - this.startFrame) / this.duration;
            if (progress < 0) progress = 0;
            if (progress > 1) progress = 1;
            const numCurves = this.vertices.length - 1;
            const progressOverCurves = numCurves * progress;
            const currentCurveNo = Math.floor(progressOverCurves);
            const currentCurveProgress = progressOverCurves - currentCurveNo;

            this.p5obj.beginShape();
            // The start point.
            this.p5obj.vertex(this.vertices[0].x, this.vertices[0].y);
            let lastPoint = getEndPoint(this.vertices[0]);
            // Draws all the full curves.
            for (let i = 0; i < currentCurveNo; i++) {
                const v = this.vertices[i + 1];
                if (v instanceof Vertex$1)
                    this.p5obj.vertex(v.x, v.y);
                else
                    this.p5obj.bezierVertex(v.x2, v.y2, v.x3, v.y3, v.x4, v.y4);
                lastPoint = getEndPoint(v);
            }
            // Draws the partial curve.
            if (currentCurveNo < numCurves) {
                const v = this.vertices[currentCurveNo + 1];
                if (v instanceof Vertex$1) {
                    const x1 = lastPoint.x + (v.x - lastPoint.x) * currentCurveProgress;
                    const y1 = lastPoint.y + (v.y - lastPoint.y) * currentCurveProgress;
                    this.p5obj.vertex(x1, y1);
                } else {
                    const currentCurve = BezierCurve.fromVetices(lastPoint, v);
                    const partial = partialBezierCurve(currentCurve, 0, currentCurveProgress);
                    this.p5obj.bezierVertex(partial.x2, partial.y2, partial.x3, partial.y3, partial.x4, partial.y4);
                }
            }
            if (progress >= 1 && this.vertices.length > 1 &&
                this.vertices[this.vertices.length - 1] instanceof Vertex$1 &&
                this.vertices[0].x == this.vertices[this.vertices.length - 1].x &&
                this.vertices[0].y == this.vertices[this.vertices.length - 1].y) {
                this.p5obj.endShape(CLOSE);
            } else {
                this.p5obj.endShape();
            }
        }
    }

    /**
     * @fileoverview Manages the animated shape instances and updates the animation
     *     effects per frame.
     */

    class AnimShapes {
        /**
         * @param {Object} p5obj The instance of the p5 object.
         */
        constructor(p5obj = window) {
            this.p5obj = p5obj;
            /** @type {Map<string, Shape>} */
            this.instances = new Map();
        }

        /**
         * Checks if the animation instance exists. Returns the object if it exists.
         *     Creates and returns a new instance if it does not exist.
         * @param {!string} id A unique string ID of the animation. The animation is
         *     showed during multiple frames, so that there must be an ID for the
         *     renderer to keep track of each animation instance.
         * @param {!Function} getShapeVertices A lazy-executed closure that returns
         *     the shape vertices, for creating the new shape instance.
         * @param {!number} duration The duration of the creation animation, in
         *     number of frames, for creating the new instance.
         * @private
         */
        getOrCreateShapeInstance(id, getShapeVertices, duration) {
            if (this.instances.has(id)) {
                return this.instances.get(id);
            }
            else {
                const instance = new Shape(this.p5obj, getShapeVertices(), this.p5obj.frameCount, duration);
                this.instances.set(id, instance);
                return instance;
            }
        }

        /**
         * Draws an arc while playing its creation animation. The arc mode is always
         *     OPEN. The elipse mode is always CENTER.
         * @param {!string} id A unique string ID to identify the shape animation.
         * @param {!number} duration The duration of the creation animation, in
         *     number of frames.
         * @param {!Number} x The x-coordinate of the arc's ellipse.
         * @param {!Number} y The y-coordinate of the arc's ellipse.
         * @param {!Number} w The width of the arc's ellipse by default.
         * @param {!Number} h The height of the arc's ellipse by default.
         * @param {!Number} start The angle to start the arc, in radians.
         * @param {!Number} stop The angle to stop the arc, in radians.
         */
        arc(id, duration, x, y, w, h, start, stop) {
            const epsilon = 0.00001;
            if (start >= stop || stop - start < epsilon)
                return;

            const createShapeVertices = () => {
                x = x - w * 0.5;
                y = y - h * 0.5;
                w = Math.abs(w);
                h = Math.abs(h);

                const rx = w / 2.0;
                const ry = h / 2.0;
                let arcToDraw = 0;

                x += rx;
                y += ry;

                const curves = [];
                while (stop - start >= epsilon) {
                    arcToDraw = Math.min(stop - start, Math.PI / 2);
                    curves.push(Shape.arcToBezier(start, arcToDraw));
                    start += arcToDraw;
                }
                const shapeVertices = [];
                curves.forEach((curve, index) => {
                    if (index === 0)
                        shapeVertices.push(new Vertex(x + curve.x1 * rx, y + curve.y1 * ry));
                    shapeVertices.push(new BezierVertex(
                        x + curve.x2 * rx, y + curve.y2 * ry,
                        x + curve.x3 * rx, y + curve.y3 * ry,
                        x + curve.x4 * rx, y + curve.y4 * ry));
                });
                return shapeVertices;
            };

            const instance = this.getOrCreateShapeInstance(id, createShapeVertices, duration);
            instance.update();
        }

        /**
         * Draws an elipse (oval) while playing its creation animation. The elipse
         *     mode is always CENTER.
         * @param {!string} id A unique string ID to identify the shape animation.
         * @param {!number} duration The duration of the creation animation, in
         *     number of frames.
         * @param {!number} x The x-coordinate of the center of ellipse.
         * @param {!number} y The y-coordinate of the center of ellipse.
         * @param {!number} w The width of the ellipse.
         * @param {!number} h The height of the ellipse.
         */
        ellipse(id, duration, x, y, w, h) {
            const instance = this.getOrCreateShapeInstance(id, () => {
                x = x - w * 0.5;
                y = y - h * 0.5;
                w = Math.abs(w);
                h = Math.abs(h);
                const kappa = 0.5522847498,
                    ox = w / 2 * kappa, oy = h / 2 * kappa,
                    xe = x + w, ye = y + h,
                    xm = x + w / 2, ym = y + h / 2;
                return [
                    new Vertex(x, ym),
                    new BezierVertex(x, ym - oy, xm - ox, y, xm, y),
                    new BezierVertex(xm + ox, y, xe, ym - oy, xe, ym),
                    new BezierVertex(xe, ym + oy, xm + ox, ye, xm, ye),
                    new BezierVertex(xm - ox, ye, x, ym + oy, x, ym),
                ];
            }, duration);
            instance.update();
        }

        /**
         * Draws a circle while playing its creation animation.
         * @param {!string} id A unique string ID to identify the shape animation.
         * @param {!number} duration The duration of the creation animation, in
         *     number of frames.
         * @param {!number} x The x-coordinate of the centre of the circle.
         * @param {!number} y The y-coordinate of the centre of the circle.
         * @param {!number} d The diameter of the circle.
         */
        circle(id, duration, x, y, d) {
            d = Math.abs(d);
            this.ellipse(id, x, y, d, d, duration);
        }

        /**
         * Draws a line while playing its creation animation.
         * @param {!string} id A unique string ID to identify the shape animation.
         * @param {!number} duration The duration of the creation animation, in
         *     number of frames.
         * @param {!number} x1 The x-coordinate of the first point.
         * @param {!number} y1 The y-coordinate of the first point.
         * @param {!number} x2 The x-coordinate of the second point.
         * @param {!number} y2 The y-coordinate of the second point.
         */
        line(id, duration, x1, y1, x2, y2) {
            const instance = this.getOrCreateShapeInstance(id, () => {
                return [new Vertex(x1, y1), new Vertex(x2, y2)];
            }, duration);
            instance.update();
        }

        /**
         * Draws a quad while playing its creation animation.
         * @param {!string} id A unique string ID to identify the shape animation.
         * @param {!number} duration The duration of the creation animation, in
         *     number of frames.
         * @param {!number} x1 The x-coordinate of the first point.
         * @param {!number} y1 The y-coordinate of the first point.
         * @param {!number} x2 The x-coordinate of the second point.
         * @param {!number} y2 The y-coordinate of the second point.
         * @param {!number} x3 The x-coordinate of the third point.
         * @param {!number} y3 The y-coordinate of the third point.
         * @param {!number} x4 The x-coordinate of the fourth point.
         * @param {!number} y4 The y-coordinate of the fourth point.
         */
        quad(id, duration, x1, y1, x2, y2, x3, y3, x4, y4) {
            const instance = this.getOrCreateShapeInstance(id, () => {
                return [new Vertex(x1, y1), new Vertex(x2, y2),
                new Vertex(x3, y3), new Vertex(x4, y4),
                new Vertex(x1, y1)];
            }, duration);
            instance.update();
        }

        /**
         * Draws a rectangle while playing its creation animation.
         * @param {!string} id A unique string ID to identify the shape animation.
         * @param {!number} duration The duration of the creation animation, in
         *     number of frames.
         * @param {!number} x The x-coordinate of the rectangle.
         * @param {!number} y The y-coordinate of the rectangle.
         * @param {!number} w The width of the rectangle.
         * @param {!number} h The height of the rectangle.
         */
        rect(id, duration, x, y, w, h) {
            w = Math.abs(w);
            h = Math.abs(h);
            this.quad(id, x, y, x + w, y, x + w, y + h, x, y + h, duration);
        }

        /**
         * Draws a square while playing its creation animation.
         * @param {!string} id A unique string ID to identify the shape animation.
         * @param {!number} duration The duration of the creation animation, in
         *     number of frames.
         * @param {!number} x The x-coordinate of the square.
         * @param {!number} y The y-coordinate of the square.
         * @param {!number} s The side size of the square.
         */
        square(id, duration, x, y, s) {
            s = Math.abs(s);
            this.rect(id, x, y, s, s, duration);
        }

        /**
         * Draws a triangle while playing its creation animation.
         * @param {!string} id A unique string ID to identify the shape animation.
         * @param {!number} duration The duration of the creation animation, in
         *     number of frames.
         * @param {!number} x1 The x-coordinate of the first point.
         * @param {!number} y1 The y-coordinate of the first point.
         * @param {!number} x2 The x-coordinate of the second point.
         * @param {!number} y2 The y-coordinate of the second point.
         * @param {!number} x3 The x-coordinate of the third point.
         * @param {!number} y3 The y-coordinate of the third point.
         */
        triangle(id, duration, x1, y1, x2, y2, x3, y3) {
            const instance = this.getOrCreateShapeInstance(id, () => {
                return [new Vertex(x1, y1), new Vertex(x2, y2),
                new Vertex(x3, y3), new Vertex(x1, y1)];
            }, duration);
            instance.update();
        }

        /**
         * Draws a shape while playing its creation animation. The shape is always
         *     OPEN unless the first vertex and the last vertex are equal.
         * @param {!string} id A unique string ID to identify the shape animation.
         * @param {!number} duration The duration of the creation animation, in
         *     number of frames.
         * @param {!Array<Array<number>>} vertices The vertices that define the
         *     shape. Each element of the array may contain eithr two coordinate
         *     numbers (for simple vertices) or six coordinate numbers (for Bezier
         *     vertices).
         */
        shape(id, duration, vertices) {
            const instance = this.getOrCreateShapeInstance(id, () => {
                const shapeVertices = [];
                for (const v of vertices) {
                    if (v.length == 2) {
                        shapeVertices.push(new Vertex(v[0], v[1]));
                    } else if (v.length == 6) {
                        shapeVertices.push(new BezierVertex(v[0], v[1], v[2], v[3], v[4], v[5]));
                    } else {
                        throw new Error('Only simple vertices (x, y) or Bezier vertices' +
                            ' (x2, y2, x3, y3, x4, y4) are supported.');
                    }
                }
                return shapeVertices;
            }, duration);
            instance.update();
        }
    }

    /**
     * @fileoverview The main entry of the p5.animS lib.
     */

    /**
     * The adapter class to expose animS functions.
     */
    class AnimShapesAdapter {
        constructor(p5obj) {
            this.animShapes = new AnimShapes(p5obj);
        }
    }

    /**
     * Activates the "instance mode" and associates the animS functions with the
     *     specified p5 object. See p5() of p5.js for more details.
     */
    const createAnimS = (p5obj) => new AnimShapesAdapter(p5obj);

    exports.createAnimS = createAnimS;

    Object.defineProperty(exports, '__esModule', { value: true });

})));

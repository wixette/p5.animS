/**
 * @fileoverview Manages the animated shape instances and updates the animation
 *     effects per frame.
 */

import { Shape } from './shape.js';
import { arcToBezier, Vertex, BezierVertex } from './utils.js';

export class AnimShapes {
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
    getOrCreateShapeInstance_(id, getShapeVertices, duration) {
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
                curves.push(arcToBezier(start, arcToDraw));
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

        const instance = this.getOrCreateShapeInstance_(id, createShapeVertices, duration);
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
        const instance = this.getOrCreateShapeInstance_(id, () => {
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
        const instance = this.getOrCreateShapeInstance_(id, () => {
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
        const instance = this.getOrCreateShapeInstance_(id, () => {
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
        const instance = this.getOrCreateShapeInstance_(id, () => {
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
        const instance = this.getOrCreateShapeInstance_(id, () => {
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
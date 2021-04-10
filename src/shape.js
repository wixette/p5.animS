/**
 * @fileoverview The Shape class which supports partial rendering.
 */

import { BezierCurve, BezierVertex, getEndPoint, partialBezierCurve, Vertex } from './utils.js';

export class Shape {
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
        if (!(vertices[0] instanceof Vertex))
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
        let progress = (this.p5obj.frameCount - this.startFrame) / this.duration;
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
            if (v instanceof Vertex)
                this.p5obj.vertex(v.x, v.y);
            else
                this.p5obj.bezierVertex(v.x2, v.y2, v.x3, v.y3, v.x4, v.y4);
            lastPoint = getEndPoint(v);
        }
        // Draws the partial curve.
        if (currentCurveNo < numCurves) {
            const v = this.vertices[currentCurveNo + 1];
            if (v instanceof Vertex) {
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
            this.vertices[this.vertices.length - 1] instanceof Vertex &&
            this.vertices[0].x == this.vertices[this.vertices.length - 1].x &&
            this.vertices[0].y == this.vertices[this.vertices.length - 1].y) {
            this.p5obj.endShape(CLOSE);
        } else {
            this.p5obj.endShape();
        }
    }
}
/**
 * @fileoverview The main entry of the p5.animS lib.
 */

import { AnimShapes } from './anims.js';

/**
 * The default instance to access the animS functions.
 */
const defaultAnimS = new AnimShapes();

/**
 * Activates the "instance mode" and associates a new animS instance with the
 *     specified p5 object. See p5() of p5.js for more details.
 * @param {Object} p5obj The instance of the p5 object.
 * @returns {Object} The animS instance.
 */
export function newAnimS(p5obj) {
    return new AnimShapes(p5obj);
}

/**
 * 'Global' adapter of AnimShapes.reset
 *
 * Removes all the cached shape animation instances so that new shape
 *     creations result in new animations.
 */
export function reset() {
    defaultAnimS.reset();
}

/**
 * 'Global' adapter of AnimShapes.arc
 *
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
export function arc(id, duration, x, y, w, h, start, stop) {
    defaultAnimS.arc(id, duration, x, y, w, h, start, stop);
}

/**
 * 'Global' adapter of AnimShapes.ellipse
 *
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
export function ellipse(id, duration, x, y, w, h) {
    defaultAnimS.ellipse(id, duration, x, y, w, h);
}

/**
 * 'Global' adapter of AnimShapes.circle
 *
 * Draws a circle while playing its creation animation.
 * @param {!string} id A unique string ID to identify the shape animation.
 * @param {!number} duration The duration of the creation animation, in
 *     number of frames.
 * @param {!number} x The x-coordinate of the centre of the circle.
 * @param {!number} y The y-coordinate of the centre of the circle.
 * @param {!number} d The diameter of the circle.
 */
export function circle(id, duration, x, y, d) {
    defaultAnimS.circle(id, duration, x, y, d);
}

/**
 * 'Global' adapter of AnimShapes.line
 *
 * Draws a line while playing its creation animation.
 * @param {!string} id A unique string ID to identify the shape animation.
 * @param {!number} duration The duration of the creation animation, in
 *     number of frames.
 * @param {!number} x1 The x-coordinate of the first point.
 * @param {!number} y1 The y-coordinate of the first point.
 * @param {!number} x2 The x-coordinate of the second point.
 * @param {!number} y2 The y-coordinate of the second point.
 */
export function line(id, duration, x1, y1, x2, y2) {
    defaultAnimS.line(id, duration, x1, y1, x2, y2);
}

/**
 * 'Global' adapter of AnimShapes.quad
 *
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
export function quad(id, duration, x1, y1, x2, y2, x3, y3, x4, y4) {
    defaultAnimS.quad(id, duration, x1, y1, x2, y2, x3, y3, x4, y4);
}

/**
 * 'Global' adapter of AnimShapes.rect
 *
 * Draws a rectangle while playing its creation animation.
 * @param {!string} id A unique string ID to identify the shape animation.
 * @param {!number} duration The duration of the creation animation, in
 *     number of frames.
 * @param {!number} x The x-coordinate of the rectangle.
 * @param {!number} y The y-coordinate of the rectangle.
 * @param {!number} w The width of the rectangle.
 * @param {!number} h The height of the rectangle.
 */
export function rect(id, duration, x, y, w, h) {
    defaultAnimS.rect(id, duration, x, y, w, h);
}

/**
 * 'Global' adapter of AnimShapes.square
 *
 * Draws a square while playing its creation animation.
 * @param {!string} id A unique string ID to identify the shape animation.
 * @param {!number} duration The duration of the creation animation, in
 *     number of frames.
 * @param {!number} x The x-coordinate of the square.
 * @param {!number} y The y-coordinate of the square.
 * @param {!number} s The side size of the square.
 */
export function square(id, duration, x, y, s) {
    defaultAnimS.square(id, duration, x, y, s);
}

/**
 * 'Global' adapter of AnimShapes.triangle
 *
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
export function triangle(id, duration, x1, y1, x2, y2, x3, y3) {
    defaultAnimS.triangle(id, duration, x1, y1, x2, y2, x3, y3);
}

/**
 * 'Global' adapter of AnimShapes.shape
 *
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
export function shape(id, duration, vertices) {
    defaultAnimS.shape(id, duration, vertices);
}
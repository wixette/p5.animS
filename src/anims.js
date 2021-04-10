/**
 * @fileoverview Manages the animated shape instances and updates the animation
 *     effects per frame.
 */

import { Shape } from './shape.js';

export class AnimShapes {
    /**
     * @param {Object} p5obj The instance or the p5 object.
     */
    constructor (p5obj=window) {
        this.p5obj = p5obj;
        /** @type {Map<string, Shape>} */
        this.instances = new Map();
    }
}
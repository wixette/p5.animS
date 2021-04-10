/**
 * @fileoverview The main entry of the p5.animS lib.
 */

import { AnimShapes } from './anims.js';

/**
 * The adapter class to expose animS functions.
 */
class AnimShapesAdapter {
    constructor(p5obj) {
        this.animShapes = new AnimShapes(p5obj);
    }
}

/**
 * The default adapter to access the animS functions.
 */
const defaultAdapter = new AnimShapesAdapter();

/**
 * Activates the "instance mode" and associates the animS functions with the
 *     specified p5 object. See p5() of p5.js for more details.
 */
export const createAnimS = (p5obj) => new AnimShapesAdapter(p5obj);

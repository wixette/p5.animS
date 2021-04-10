(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
    typeof define === 'function' && define.amd ? define(['exports'], factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.animS = {}));
}(this, (function (exports) { 'use strict';

    /**
     * @fileoverview Manages the animated shape instances and updates the animation
     *     effects per frame.
     */

    class AnimShapes {
        /**
         * @param {Object} p5obj The instance or the p5 object.
         */
        constructor (p5obj=window) {
            this.p5obj = p5obj;
            /** @type {Map<string, Shape>} */
            this.instances = new Map();
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

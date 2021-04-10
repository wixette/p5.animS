import test from 'ava';
import almostEqual from 'almost-equal';
import { arcToBezier, BezierCurve, BezierVertex, getEndPoint, partialBezierCurve, Vertex } from '../src/utils.js';

test('getEndPoint', t => {
    let v1 = new Vertex(1, 2);
    let e1 = getEndPoint(v1);
    t.true(e1.x ==1 && e1.y == 2);
    let v2 = new BezierVertex(1, 2, 3, 4, 5, 6);
    let e2 = getEndPoint(v2);
    t.true(e2.x == 5 && e2.y == 6);
});

test('arcToBezier', t => {
    let curve = arcToBezier(Math.PI, Math.PI * 3);
    t.true(almostEqual(-1.0, curve.x1, almostEqual.FLT_EPSILON, almostEqual.FLT_EPSILON));
    t.true(almostEqual(0.0, curve.y1, almostEqual.FLT_EPSILON, almostEqual.FLT_EPSILON));
    t.true(almostEqual(-1.0, curve.x2, almostEqual.FLT_EPSILON, almostEqual.FLT_EPSILON));
    t.true(almostEqual(4 / 3, curve.y2, almostEqual.FLT_EPSILON, almostEqual.FLT_EPSILON));
    t.true(almostEqual(1.0, curve.x3, almostEqual.FLT_EPSILON, almostEqual.FLT_EPSILON));
    t.true(almostEqual(4 / 3, curve.y3, almostEqual.FLT_EPSILON, almostEqual.FLT_EPSILON));
    t.true(almostEqual(1.0, curve.x4, almostEqual.FLT_EPSILON, almostEqual.FLT_EPSILON));
    t.true(almostEqual(0.0, curve.y4, almostEqual.FLT_EPSILON, almostEqual.FLT_EPSILON));
});

test('partialBezierCurve', t => {
    let curve = new BezierCurve(10, 10, 5, 20, 25, 80, 10, 70);
    let partialCurve = partialBezierCurve(curve, 0.3, 0.7);
    t.true(almostEqual(10.629999999999999, partialCurve.x1, almostEqual.FLT_EPSILON, almostEqual.FLT_EPSILON));
    t.true(almostEqual(29.25999999999999, partialCurve.y1, almostEqual.FLT_EPSILON, almostEqual.FLT_EPSILON));
    t.true(almostEqual(12.469999999999999, partialCurve.x2, almostEqual.FLT_EPSILON, almostEqual.FLT_EPSILON));
    t.true(almostEqual(40.93999999999999, partialCurve.y2, almostEqual.FLT_EPSILON, almostEqual.FLT_EPSILON));
    t.true(almostEqual(15.43, partialCurve.x3, almostEqual.FLT_EPSILON, almostEqual.FLT_EPSILON));
    t.true(almostEqual(54.86, partialCurve.y3, almostEqual.FLT_EPSILON, almostEqual.FLT_EPSILON));
    t.true(almostEqual(15.670000000000002, partialCurve.x4, almostEqual.FLT_EPSILON, almostEqual.FLT_EPSILON));
    t.true(almostEqual(63.34, partialCurve.y4, almostEqual.FLT_EPSILON, almostEqual.FLT_EPSILON));
});
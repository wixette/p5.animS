const FRAME_RATE = 30;

const X1 = 260, Y1 = 150;
const X2 = 660, Y2 = 205;
const X3 = 300, Y3 = 50;
const X4 = 700, Y4 = 50;

function setup() {
    createCanvas(960, 240);
    frameRate(FRAME_RATE);
    colorMode(HSB, 360, 100, 100, 1);
    textFont('Helvetica');
    textSize(18);
}

function draw() {
    background(190, 30, 100);

    push();
    noFill();
    stroke(0, 0, 100);
    strokeWeight(5);
    animS.circle('c1', FRAME_RATE * 1, 120, 120, 70);
    animS.arc('c2', FRAME_RATE * 1.5, 120, 120, 100, 100, QUARTER_PI / 2, HALF_PI * 3);
    animS.arc('c3', FRAME_RATE * 1, 120, 120, 130, 130, PI / 3, PI * 5 / 3);
    animS.arc('c4', FRAME_RATE * 1.5, 120, 120, 160, 160, PI * 6 / 5, PI * 2);
    pop();

    push();
    noFill();
    stroke(0, 0, 100);
    strokeWeight(2);
    if (frameCount >= FRAME_RATE * 1.5) {
        animS.line('axisx', FRAME_RATE * 1, 240, 120, 720, 120);
        animS.line('axisy', FRAME_RATE * 1, 480, 220, 480, 20);
    }
    if (frameCount >= FRAME_RATE * 2.5) {
        animS.triangle('arrowx', FRAME_RATE * .5, 720, 120, 710, 117, 710, 123);
        animS.triangle('arrowy', FRAME_RATE * .5, 480, 20, 477, 30, 483, 30);
    }
    if (frameCount >= FRAME_RATE * 3) {
        strokeWeight(1);
        stroke(160, 60, 90);
        line(X1, Y1, X2, Y2);
        line(X3, Y3, X4, Y4);
        stroke(160, 60, 60);
        beginShape();
        vertex(X1, Y1);
        bezierVertex(X2, Y2, X3, Y3, X4, Y4);
        endShape();
        fill(160, 30, 90);
        circle(X1, Y1, 8);
        circle(X2, Y2, 8);
        circle(X3, Y3, 8);
        circle(X4, Y4, 8);
    }
    pop();

    if (frameCount >= FRAME_RATE * 3) {
        push();
        noFill();
        stroke(30, 60, 100);
        strokeWeight(5);
        animS.shape('curve', FRAME_RATE * 3, [
            [X1, Y1],
            [X2, Y2, X3, Y3, X4, Y4]
        ]);
        noStroke();
        fill(30, 60, 100);
        let delta = frameCount - FRAME_RATE * 3;
        delta -= delta % 5;
        let ratio = (delta > FRAME_RATE * 3) ? 1.0 : delta / (FRAME_RATE * 3);
        text('t = ' + ratio.toFixed(2), 320, 100);
        pop();
    }

    if (frameCount == FRAME_RATE * 10) {
        animS.reset();
        frameCount = 0;
    }
}
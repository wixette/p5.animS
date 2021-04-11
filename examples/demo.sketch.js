const FRAME_RATE = 30;

function setup() {
    createCanvas(960, 240);
    frameRate(FRAME_RATE);
    colorMode(HSB, 360, 100, 100, 1);
}

function draw() {
    background(190, 10, 100);

    push();
    noFill();
    stroke(40, 30, 100);
    strokeWeight(5);
    animS.circle('c1', FRAME_RATE * 3, 120, 120, 100);
    pop();

    if (frameCount == FRAME_RATE * 5) {
        animS.reset();
        frameCount = 0;
    }
}
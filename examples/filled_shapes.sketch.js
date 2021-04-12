const FRAME_RATE = 30

function setup() {
    createCanvas(960, 240);
    colorMode(HSB, 360, 100, 100, 1);
    frameRate(FRAME_RATE);
}

function draw() {
    background(190, 30, 100);
    fill(190, 50, 100);
    stroke(0, 0, 100);
    strokeWeight(5);
    animS.circle('c1', FRAME_RATE * 1.5, 240, 120, 120, 100);
    animS.circle('c2', FRAME_RATE * 1.5, 480, 120, 120, 100);
    animS.circle('c3', FRAME_RATE * 1.5, 720, 120, 120, 100);
}

function mouseClicked() {
    animS.reset();
}
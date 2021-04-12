const FRAME_RATE = 30

function setup() {
    createCanvas(960, 240);
    colorMode(HSB, 360, 100, 100, 1);
    frameRate(FRAME_RATE);
}

function draw() {
    background(190, 30, 100);
    noFill();
    stroke(0, 0, 100);
    strokeWeight(5);
    animS.line('l1', FRAME_RATE * 3, 60, 120, 900, 120);
}

function mouseClicked() {
    animS.reset();
}
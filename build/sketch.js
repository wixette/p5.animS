const FRAME_RATE = 30;

function setup() {
    createCanvas(windowWidth, windowHeight);
    frameRate(FRAME_RATE);
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}

function draw() {
    background(255);
}
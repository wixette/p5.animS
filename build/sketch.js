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
    push();
    stroke(128);
    arc(100, 100, 100, 100,
        Math.PI / 3, Math.PI * 4 / 3);
    stroke(255, 128, 0);
    strokeWeight(4);
    animS.arc('a1', FRAME_RATE * 1,
        100, 100, 100, 100,
        Math.PI / 3, Math.PI * 4 / 3);
    pop();
}
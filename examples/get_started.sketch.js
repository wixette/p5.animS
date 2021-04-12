function setup() {
    createCanvas(960, 240);
    colorMode(HSB, 360, 100, 100, 1);
}

function draw() {
    background(190, 30, 100);
    noFill();
    stroke(0, 0, 100);
    strokeWeight(5);
    animS.circle('c1', 60, 480, 120, 120, 100);
}

function mouseClicked() {
    animS.reset();
}
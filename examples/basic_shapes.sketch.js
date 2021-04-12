const FRAME_RATE = 30;
const DURATION = FRAME_RATE * 1.5;

function setup() {
    createCanvas(960, 240);
    colorMode(HSB, 360, 100, 100, 1);
    frameRate(FRAME_RATE);
}

function draw() {
    background(190, 30, 100);
    noFill();

    const C1 = color(190, 60, 100);
    const C2 = color(0, 0, 100);
    const W1 = 2;
    const W2 = 5;

    stroke(C1);
    strokeWeight(W1);
    arc(100, 80, 80, 80, PI / 3, PI * 4 / 3);
    stroke(C2);
    strokeWeight(W2);
    animS.arc('a1', DURATION,
        100, 80, 80, 80, PI / 3, PI * 4 / 3);

    stroke(C1);
    strokeWeight(W1);
    ellipse(200, 80, 80, 60);
    stroke(C2);
    strokeWeight(W2);
    animS.ellipse('e1', DURATION, 200, 80, 80, 60);

    stroke(C1);
    strokeWeight(W1);
    circle(300, 80, 80);
    stroke(C2);
    strokeWeight(W2);
    animS.circle('c1', DURATION, 300, 80, 80);

    stroke(C1);
    strokeWeight(W1);
    line(360, 120, 440, 40);
    stroke(C2);
    strokeWeight(W2);
    animS.line('l1', DURATION, 360, 120, 440, 40);

    stroke(C1);
    strokeWeight(W1);
    quad(460, 40, 480, 120, 500, 80, 540, 40);
    stroke(C2);
    strokeWeight(W2);
    animS.quad('q1', DURATION, 460, 40, 480, 120, 500, 80, 540, 40);

    stroke(C1);
    strokeWeight(W1);
    rect(580, 40, 50, 80);
    strokeWeight(W2);
    stroke(C2);
    animS.rect('r1', DURATION, 580, 40, 50, 80);

    stroke(C1);
    strokeWeight(W1);
    square(660, 40, 80);
    stroke(C2);
    strokeWeight(W2);
    animS.square('s1', DURATION, 660, 40, 80);

    stroke(C1);
    strokeWeight(W1);
    triangle(780, 40, 880, 120, 800, 120);
    stroke(C2);
    strokeWeight(W2);
    animS.triangle('t1', DURATION, 780, 40, 880, 120, 800, 120);


    stroke(C1);
    strokeWeight(W1);
    beginShape();
    vertex(60, 180);
    bezierVertex(100, 100, 150, 220, 200, 180);
    vertex(600, 180);
    bezierVertex(400, 100, 700, 220, 800, 180);
    vertex(900, 180);
    endShape();
    stroke(C2);
    strokeWeight(W2);
    animS.shape('curve1', DURATION, [
        [60, 180],
        [100, 100, 150, 220, 200, 180],
        [600, 180],
        [400, 100, 700, 220, 800, 180],
        [900, 180]
    ]);
}

function mouseClicked() {
    animS.reset();
}
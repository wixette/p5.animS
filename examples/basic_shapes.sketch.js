const FRAME_RATE = 30;

function setup() {
    createCanvas(900, 240);
    frameRate(FRAME_RATE);
}

function draw() {
    const C1 = color(255, 240, 128);
    const C2 = color(255, 128, 0);
    const duration = FRAME_RATE * 1.5;

    background(255);
    noFill();
    strokeWeight(5);

    push();
    stroke(C1);
    arc(100, 100, 100, 100,
        Math.PI / 3, Math.PI * 4 / 3);
    stroke(C2);
    animS.arc('a1', duration,
        100, 100, 100, 100,
        Math.PI / 3, Math.PI * 4 / 3);
    pop();

    push();
    stroke(C1);
    ellipse(200, 100, 90, 70);
    stroke(C2);
    animS.ellipse('e1', duration, 200, 100, 90, 70);
    pop();

    push();
    stroke(C1);
    circle(300, 100, 90);
    stroke(C2);
    animS.circle('c1', duration, 300, 100, 90);
    pop();

    push();
    stroke(C1);
    line(360, 150, 440, 50);
    stroke(C2);
    animS.line('l1', duration, 360, 150, 440, 50);
    pop();

    push();
    stroke(C1);
    quad(460, 50, 480, 150, 500, 70, 540, 50);
    stroke(C2);
    animS.quad('q1', duration, 460, 50, 480, 150, 500, 70, 540, 50);
    pop();

    push();
    stroke(C1);
    rect(560, 50, 80, 100);
    stroke(C2);
    animS.rect('r1', duration, 560, 50, 80, 100);
    pop();

    push();
    stroke(C1);
    square(660, 60, 80);
    stroke(C2);
    animS.square('s1', duration, 660, 60, 80);
    pop();

    push();
    stroke(C1);
    triangle(760, 50, 840, 100, 800, 150);
    stroke(C2);
    animS.triangle('t1', duration, 760, 50, 840, 100, 800, 150);
    pop();

    if (frameCount > duration) {
        push();
        stroke(C1);
        beginShape();
        vertex(50, 250);
        bezierVertex(100, 200, 150, 270, 200, 250);
        bezierVertex(300, 300, 280, 200, 400, 250);
        bezierVertex(400, 200, 490, 260, 500, 250);
        vertex(600, 200);
        vertex(700, 250);
        bezierVertex(600, 280, 720, 250, 850, 250);
        endShape();
        stroke(C2);

        animS.shape('curve1', duration, [
            [50, 250],
            [100, 200, 150, 270, 200, 250],
            [300, 300, 280, 200, 400, 250],
            [400, 200, 490, 260, 500, 250],
            [600, 200],
            [700, 250],
            [600, 280, 720, 250, 850, 250]
        ])
        pop();
    }
}
const sketch1 = p => {

    const A = animS.newAnimS(p);

    p.setup = function() {
      p.createCanvas(300, 300);
    };

    p.draw = function() {
      p.background(255);

      p.push();
      p.noFill();
      p.stroke(255, 128, 0);
      p.strokeWeight(5);
      A.circle('c1', 60, 150, 150, 200);

      p.pop();

    };
  };

  new p5(sketch1, document.getElementById('sketch1'));

  const sketch2 = p => {

    const A = animS.newAnimS(p);

    p.setup = function() {
      p.createCanvas(300, 300);
    };

    p.draw = function() {
      p.background(255);

      p.push();
      p.noFill();
      p.stroke(128, 128, 255);
      p.strokeWeight(5);
      A.square('c1', 60, 50, 50, 200);

      p.pop();

    };
  };

  new p5(sketch2, document.getElementById('sketch2'));
# p5.animS

p5.animS animates p5.js shapes by rendering their drawing processes.

![Demo](examples/images/demo.gif)

See https://wixette.github.io/p5.animS/ for the documentation and the examples.

Or

```
npm install
npm run build
npx http-server
```

then visit http://127.0.0.1:8080 to read the documentation.

## Getting Started

In your HTML code, put `p5.anims.js` right after `p5.js` or `p5.min.js`, followed by your sketch code:

```
<body>
    <main>
    </main>
    <script src="p5.min.js"></script>
    <script src="p5.anims.js"></script>
    <script src="sketch.js"></script>
</body>
```

`p5.animS` functions have very similar interfaces as `p5.js` functions do. For example, `animS.circle()` renders the creation animation of a circle:

```
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
```

The first parameter of `animS.circle()` is a unique instance ID so that the animation state can be kept across frames. The second parameter is the total frame number that the animation last.

`animS.reset()` is used to replay the creation animation.

Read more at [https://wixette.github.io/p5.animS/](https://wixette.github.io/p5.animS/).


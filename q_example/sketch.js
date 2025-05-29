'use strict';

let game, solids;
let images = [];
const r = 5, c = 5, l = Quadrille.cellLength;

async function setup() {
  for (let i = 1; i <= 10; i++) {
    images.push(await loadImage('paintings/p' + i + '.jpg'));
  }
  createCanvas(r * l, c * l, WEBGL);
  solids = createQuadrille(r, c);
  const args = [l / 2, true, ['yellow', 'blue', 'red',
                              'cyan', 'magenta', 'yellow']];
  solids.visit(({row, col}) => solids.fill(row, col, platonicGeometry(...args)));
  game = createQuadrille(5, 5);
  game.visit(({row, col}) => game.fill(row, col, random(images)));
  game.rand(15).rand(10, cellFn);
}

function draw() {
  background('Gold');
  drawQuadrille(game, {
    origin: CORNER,
    options: { origin: CENTER } // not really needed
  });
}

function cellFn({ row, col }) {
  push();
  background('black');
  stroke('lime');
  fill('blue');
  rotateX(millis() * 0.001);
  rotateY(millis() * 0.001);
  rotateZ(millis() * 0.001);
  model(solids.read(row, col));
  pop();
}

function mouseClicked() {
  const row = game.mouseRow;
  const col = game.mouseCol;
  game.isEmpty(row, col) ? game.fill(row, col, cellFn) : game.clear(row, col);
}

function keyPressed() {
  key === 's' && game.toImage('game.png', {
    origin: CORNER,
    options: { origin: CENTER }
  });
  key === 'c' && save(cnv, 'platonic_cells.png');
}

const mouseWheel = () => false;
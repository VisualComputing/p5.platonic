'use strict';

let dodecahedronGeom

function setup() {
  createCanvas(200, 200, WEBGL);
  dodecahedronGeom = platonicGeometry(dodecahedron, 50, true,
                                      ['yellow', 'blue', 'red'])
}

function draw() {
  background(0)
  orbitControl()
  model(dodecahedronGeom) 
}
'use strict';

let solid

function setup() {
  createCanvas(400, 400, WEBGL)
  colorMode(RGB, 1)
  strokeWeight(2)
  stroke('white')
  solid = buildGeometry(() => {
    //dodecahedron(50, ['yellow', 'blue', 'red'])
    dodecahedron(80, colors(), true)
  })
  //solid.clearColors() // Optional
  //solid.computeNormals() // Optional
}

function draw() {
  background(0)
  orbitControl()

  push()
  rotateZ(frameCount * 0.01)
  rotateX(frameCount * 0.01)
  rotateY(frameCount * 0.01)
  model(solid)
  pop()

  push()
  translate(-width / 4, -height / 4, 0)
  rotateZ(frameCount * 0.01)
  rotateX(frameCount * 0.01)
  rotateY(frameCount * 0.01)
  fill('DarkTurquoise')
  tetrahedron()
  pop()

  push()
  translate(width / 4, -height / 4, 0)
  rotateZ(frameCount * 0.01)
  rotateX(frameCount * 0.01)
  rotateY(frameCount * 0.01)
  hexahedron(colors(), true)
  pop()

  push()
  translate(-width / 4, height / 4, 0)
  rotateZ(frameCount * 0.01)
  rotateX(frameCount * 0.01)
  rotateY(frameCount * 0.01)
  octahedron(colors(), 120)
  pop()

  push()
  translate(width / 4, height / 4, 0)
  rotateZ(frameCount * 0.01)
  rotateX(frameCount * 0.01)
  rotateY(frameCount * 0.01)
  icosahedron(colors(), 80)
  pop()
}

function colors(alpha = 1) {
  return [
    [1, 0, 0, alpha],    // Red
    [0, 1, 0, alpha],    // Green
    [0, 0, 1, alpha],    // Blue
    [0, 1, 1, alpha],    // Cyan
    [1, 0, 1, alpha],    // Magenta
    [1, 1, 0, alpha],    // Yellow
    [0.5, 0, 0, alpha],  // Dark Red
    [0, 0.5, 0, alpha],  // Dark Green
    [0, 0, 0.5, alpha],  // Dark Blue
    [0, 0.5, 0.5, alpha],// Teal
    [0.5, 0, 0.5, alpha],// Purple
    [0.5, 0.5, 0, alpha],// Olive
    [1, 0.5, 0, alpha],  // Orange
    [1, 0, 0.5, alpha],  // Pink
    [0.5, 1, 0, alpha],  // Lime
    [0, 1, 0.5, alpha],  // Spring Green
    [0.5, 0.5, 0.5, alpha],// Grey
    [0.5, 1, 0.5, alpha],// Mint
    [1, 0.5, 0.5, alpha],// Salmon
    [1, 1, 0.5, alpha]   // Cream
  ]
}
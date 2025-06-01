# p5.platonic

[![npm version](https://img.shields.io/npm/v/p5.platonic.svg)](https://www.npmjs.com/package/p5.platonic)
[![Lint](https://img.shields.io/badge/lint-markdownlint-brightgreen)](https://github.com/DavidAnson/markdownlint)

A [p5.js](https://p5js.org/) library for rendering [Platonic solids](https://en.wikipedia.org/wiki/Platonic_solid) in WEBGL.

![Platonic solids.](p5.platonic.png)

---

## Usage

```js
solid(args)
```

Where `solid` can be one of the following functions:

- `tetrahedron`
- `hexahedron` (or `cube`)
- `octahedron`
- `dodecahedron`
- `icosahedron`

### Arguments (all optional, any order)
- `length`: Number — Edge length (default: `100`).
- `center`: `p5.Vector` — Center position (default: origin).
- `colors`: Array of colors (either `p5.Color` or string).
- `fuse`: Boolean — Whether to fuse vertex colors across faces (default: `false`).

### Example (Immediate Mode)

```js
function draw() {
  dodecahedron(50, ['yellow', 'blue', 'red'])
}
```

---

## Retained Mode

### Option 1: `platonicGeometry` (Recommended)

```js
let geom

function setup() {
  createCanvas(400, 400, WEBGL)
  geom = platonicGeometry(dodecahedron, 50, ['yellow', 'blue', 'red'])
}
function draw() {
  background(0)
  orbitControl()
  model(geom)
}
```

### Option 2: `buildGeometry`

```js
let geom

function setup() {
  createCanvas(400, 400, WEBGL)
  geom = buildGeometry(() => {
    dodecahedron(50, ['yellow', 'blue', 'red'])
  })
  geom.clearColors()
  geom.computeNormals()
}
function draw() {
  background(0)
  orbitControl()
  model(geom)
}
```

---

## ESM Example (Vite)

Install:

```bash
npm install p5 p5.platonic
```

Then in `main.js`:

```js
import p5 from 'p5'
import 'p5.platonic'

// Retained mode
let dodecahedronGeom, icosahedronGeom

new p5(p => {
  p.setup = () => {
    p.createCanvas(400, 400, p.WEBGL)
    dodecahedronGeom = p.platonicGeometry(p.dodecahedron, 50, true, ['yellow', 'blue', 'red'], true)
    icosahedronGeom = p.buildGeometry(() => {
      p.icosahedron(50, ['yellow', 'blue', 'red'])
    })
    // icosahedronGeom.clearColors() // optional
    icosahedronGeom.computeNormals() // optional
  }

  p.draw = () => {
    p.background(255)
    p.orbitControl()
    // Retained mode rendering
    p.model(dodecahedronGeom)
    p.push()
    p.translate(-p.width / 4, -p.height / 4, 0)
    p.rotateZ(p.frameCount * 0.01)
    p.rotateX(p.frameCount * 0.01)
    p.rotateY(p.frameCount * 0.01)
    p.model(icosahedronGeom)
    p.pop()
    // Immediate mode rendering
    p.push()
    p.translate(-p.width / 4, +p.height / 4, 0)
    p.rotateZ(p.frameCount * 0.01)
    p.rotateX(p.frameCount * 0.01)
    p.rotateY(p.frameCount * 0.01)
    p.fill('DarkTurquoise')
    p.tetrahedron()
    p.pop()
  }
})
```

---

## Installation (IIFE / CDN)

Include after `p5.js`:

```html
<script src="https://cdn.jsdelivr.net/npm/p5.platonic/dist/p5.platonic.js"></script>
<!-- or minified -->
<script src="https://cdn.jsdelivr.net/npm/p5.platonic/dist/p5.platonic.min.js"></script>
```

---

## Development (VS Code / Gitpod / Codium)

```bash
git clone https://github.com/VisualComputing/p5.platonic
cd p5.platonic
npm install
```

Then open in [VS Code](https://code.visualstudio.com/), [Gitpod](https://gitpod.io), or [Codium](https://vscodium.com).

### Useful References

- [p5.js Library Creation](https://beta.p5js.org/contribute/creating_libraries/)
- [p5.js WebGL Architecture](https://github.com/processing/p5.js/blob/main/contributor_docs/webgl_mode_architecture.md)
- [buildGeometry](https://beta.p5js.org/reference/p5/buildgeometry/)
- [model](https://beta.p5js.org/reference/p5/model/)

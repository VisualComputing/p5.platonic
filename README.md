# p5.platonic

[p5.js](https://p5js.org/) library for rendering of [platonic solids](https://en.wikipedia.org/wiki/Platonic_solid).

![Platonic solids.](p5.platonic.png)

# Usage

```js
solid(args)
```

Where `solid` can be one of the following functions: `tetrahedron`, `hexahedron` (or `cube`), `octahedron`, `dodecahedron`, or `icosahedron`, and `args` are:

* `length`: Defines the length of the solid (default is `100`).
* `center`: A [p5.Vector](https://p5js.org/reference/#/p5.Vector) defining the location of the solid center (default is `(0, 0, 0)`).
* `colors`: An array containing the [p5.Color](https://p5js.org/reference/#/p5.Color) elements used to color faces or vertices. If no colors are provided, style the `solid` using p5 `fill`, `stroke`, etc.
* `fuse`: A boolean. If `true`, defines per-vertex coloring (colors will fuse within faces); if `false`, defines per-face coloring (faces will have uniform coloring). The default is `false`.

All `args` are optional and may be specified in any order. For example, calling in `draw`:

```js
function draw() {
  dodecahedron(50, ['yellow', 'blue', 'red'])
}
```

would draw a dodecahedron with a length of `50`, with faces colored `yellow`, `blue`, and `red` (non-fused colors).

# Retained Mode

There are two ways to define retained mode geometry of the `solid` function with `args` (refer to the previous section for `solid` and `args`) in `setup`.

## Using `platonicSolid` (Recommended Way)

Call `platonicSolid(solid, args)`, for example:

```js
let dodecahedronGeom

function setup() {
  dodecahedronGeom = platonicSolid(dodecahedron, 50,
                                   ['yellow', 'blue', 'red'])
}
```

Or call `platonicSolid(args)` to define a random Platonic solid.

## Using `beginGeometry` / `endGeometry`

Using [beginGeometry](https://p5js.org/reference/#/p5/beginGeometry) and [endGeometry](https://p5js.org/reference/#/p5/endGeometry). For example, the following snippet defines a retained mode `dodecahedronGeom`:

```js
let dodecahedronGeom

function setup() {
  beginGeometry()
  dodecahedron(50, ['yellow', 'blue', 'red']) // See the previous section for arguments
  dodecahedronGeom = endGeometry()
  dodecahedronGeom.clearColors() // Optional
  dodecahedronGeom.computeNormals() // Optional
}
```

### Rendering

To render a retained-mode Platonic solid, call [model](https://p5js.org/reference/#/p5/model). For example:

```js
function draw() {
  model(dodecahedronGeom)
}
```

# Installation

Link the `p5.platonic.js` library into your HTML file, after you have linked in [p5.js](https://p5js.org/libraries/). For example:

```html | index.html
<!doctype html>
<html>
<head>
  <script src="p5.js"></script>
  <script src="p5.sound.js"></script>
  <script src=https://cdn.jsdelivr.net/gh/VisualComputing/p5.platonic/p5.platonic.js></script>
  <script src="sketch.js"></script>
</head>
<body>
</body>
</html>
```

to include its minified version use:

```html
<script src=https://cdn.jsdelivr.net/gh/VisualComputing/p5.platonic/p5.platonic.min.js></script>
```

instead.

# [vs-code](https://code.visualstudio.com/) & [vs-codium](https://vscodium.com/) & [gitpod](https://www.gitpod.io/) hacking instructions

Clone the repo (`git clone https://github.com/VisualComputing/p5.platonic`) and open it with your favorite editor.

Don't forget to check these [p5.js](https://p5js.org/) references:

1. [Library creation](https://github.com/processing/p5.js/blob/main/contributor_docs/creating_libraries.md).
2. [Software architecture](https://github.com/processing/p5.js/blob/main/src/core/README.md).
3. [Webgl mode](https://github.com/processing/p5.js/blob/main/contributor_docs/webgl_mode_architecture.md).
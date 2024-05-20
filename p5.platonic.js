'use strict';

// Details here:
// https://github.com/processing/p5.js/blob/main/contributor_docs/creating_libraries.md
(function () {
  const INFO =
  {
    LIBRARY: 'p5.platonic',
    VERSION: '0.0.4',
    HOMEPAGE: 'https://github.com/VisualComputing/p5.platonic'
  };

  console.log(INFO);

  p5.prototype._solid = function (...args) {
    this._renderer._solid(...args);
  }

  p5.RendererGL.prototype._solid = function ({
    _tris,
    _vertices,
    _indices,
    colors,
    fuse = false
  } = {}) {
    this._rendererState = this.push();
    for (let i = 0; i < _indices.length; i++) {
      this.beginShape(_tris ? 0x0004 : undefined); // TRIANGLES -> 0x0004
      !fuse && Array.isArray(colors) && this.fill(colors[i % colors.length]);
      _indices[i].forEach((index) => {
        fuse && Array.isArray(colors) && this.fill(colors[index % colors.length]);
        this.vertex(_vertices[index].x, _vertices[index].y, _vertices[index].z);
      })
      this.endShape('close'); // CLOSE -> 'close'
    }
    this.pop(this._rendererState);
  }

  p5.prototype._parseSolidArgs = function (...args) {
    let fuse, length = 100, center = p5.prototype.createVector(), colors;
    args.forEach(arg => {
      if (typeof arg === 'boolean') {
        fuse = arg;
      } else if (typeof arg === 'number') {
        length = arg;
      } else if (arg instanceof p5.Vector) {
        center = arg;
      } else if (Array.isArray(arg)) {
        colors = arg;
      }
    });
    return { fuse, length, center, colors };
  };

  p5.prototype.solidFn = function (...args) {
    return this._renderer.solidFn(...args);
  };

  p5.RendererGL.prototype.solidFn = function (fn) {
    const solidFns = {
      tetrahedron: () => this.tetrahedron,
      hexahedron: () => this.hexahedron,
      octahedron: () => this.octahedron,
      dodecahedron: () => this.dodecahedron,
      icosahedron: () => this.icosahedron
    };
    const keys = Object.keys(solidFns);
    if (typeof fn === 'string' && keys.includes(fn)) {
      return solidFns[fn]().bind(this);
    } else {
      const randomKey = keys[Math.floor(Math.random() * keys.length)];
      console.log('Selected random solid function:', randomKey);
      return solidFns[randomKey]().bind(this);
    }
  };

  p5.prototype.tetrahedron = function (...args) {
    this._renderer.tetrahedron(...args);
  };

  p5.RendererGL.prototype.tetrahedron = function (...args) {
    const { fuse, length, center, colors } = p5.prototype._parseSolidArgs(...args);
    const sqrt8 = p5.prototype.sqrt(8);
    const sqrt2 = p5.prototype.sqrt(2);
    const _vertices = [
      p5.prototype.createVector(center.x, center.y, center.z + length * sqrt8 / 3), // Top vertex
      p5.prototype.createVector(center.x - length / sqrt2, center.y - length / sqrt2, center.z - length / 3), // Base vertex 1
      p5.prototype.createVector(center.x + length / sqrt2, center.y - length / sqrt2, center.z - length / 3), // Base vertex 2
      p5.prototype.createVector(center.x, center.y + length / sqrt2, center.z - length / 3)  // Base vertex 3
    ];
    const _indices = [
      [0, 1, 2], // Face 1
      [0, 2, 3], // Face 2
      [0, 3, 1], // Face 3
      [1, 3, 2]  // Base face
    ];
    this._solid({ _tris: true, _vertices, _indices, colors, fuse });
  };

  p5.prototype.cube = function (...args) {
    this._renderer.cube(...args);
  };

  p5.RendererGL.prototype.cube = function (...args) {
    this.hexahedron(...args);
  }

  p5.prototype.hexahedron = function (...args) {
    this._renderer.hexahedron(...args);
  };

  p5.RendererGL.prototype.hexahedron = function (...args) {
    const { fuse, length, center, colors } = p5.prototype._parseSolidArgs(...args);
    const half = length / 2;
    const _vertices = [
      p5.prototype.createVector(center.x - half, center.y - half, center.z + half),
      p5.prototype.createVector(center.x + half, center.y - half, center.z + half),
      p5.prototype.createVector(center.x + half, center.y + half, center.z + half),
      p5.prototype.createVector(center.x - half, center.y + half, center.z + half),
      p5.prototype.createVector(center.x - half, center.y - half, center.z - half),
      p5.prototype.createVector(center.x + half, center.y - half, center.z - half),
      p5.prototype.createVector(center.x + half, center.y + half, center.z - half),
      p5.prototype.createVector(center.x - half, center.y + half, center.z - half)
    ];
    const _indices = [
      [0, 1, 2, 3], [1, 5, 6, 2], [5, 4, 7, 6], [4, 0, 3, 7], [3, 2, 6, 7], [4, 5, 1, 0]
    ];
    this._solid({ _vertices, _indices, colors, fuse });
  };

  p5.prototype.octahedron = function (...args) {
    this._renderer.octahedron(...args);
  };

  p5.RendererGL.prototype.octahedron = function (...args) {
    const { fuse, length, center, colors } = p5.prototype._parseSolidArgs(...args);
    const half = length / p5.prototype.sqrt(2);
    const _vertices = [
      p5.prototype.createVector(center.x, center.y + half, center.z),
      p5.prototype.createVector(center.x, center.y - half, center.z),
      p5.prototype.createVector(center.x + half, center.y, center.z),
      p5.prototype.createVector(center.x - half, center.y, center.z),
      p5.prototype.createVector(center.x, center.y, center.z + half),
      p5.prototype.createVector(center.x, center.y, center.z - half)
    ];
    const _indices = [
      [0, 2, 4], [0, 4, 3], [0, 3, 5], [0, 5, 2], [1, 4, 2], [1, 3, 4], [1, 5, 3], [1, 2, 5]
    ];
    this._solid({ _tris: true, _vertices, _indices, colors, fuse });
  };

  p5.prototype.dodecahedron = function (...args) {
    this._renderer.dodecahedron(...args);
  };

  p5.RendererGL.prototype.dodecahedron = function (...args) {
    const { fuse, length, center, colors } = p5.prototype._parseSolidArgs(...args);
    const phi = (1 + p5.prototype.sqrt(5)) / 2; // The golden ratio
    const a = length / p5.prototype.sqrt(3);  // Normalize the length
    const b = a / phi;
    const c = a * phi;
    const _vertices = [
      p5.prototype.createVector(-a, -a, -a).add(center), p5.prototype.createVector(-a, -a, a).add(center),
      p5.prototype.createVector(-a, a, -a).add(center), p5.prototype.createVector(-a, a, a).add(center),
      p5.prototype.createVector(a, -a, -a).add(center), p5.prototype.createVector(a, -a, a).add(center),
      p5.prototype.createVector(a, a, -a).add(center), p5.prototype.createVector(a, a, a).add(center),
      p5.prototype.createVector(0, -b, -c).add(center), p5.prototype.createVector(0, -b, c).add(center),
      p5.prototype.createVector(0, b, -c).add(center), p5.prototype.createVector(0, b, c).add(center),
      p5.prototype.createVector(-b, -c, 0).add(center), p5.prototype.createVector(-b, c, 0).add(center),
      p5.prototype.createVector(b, -c, 0).add(center), p5.prototype.createVector(b, c, 0).add(center),
      p5.prototype.createVector(-c, 0, -b).add(center), p5.prototype.createVector(-c, 0, b).add(center),
      p5.prototype.createVector(c, 0, -b).add(center), p5.prototype.createVector(c, 0, b).add(center)
    ];
    const _indices = [
      [0, 16, 2, 10, 8], [0, 8, 4, 14, 12], [0, 12, 1, 17, 16],
      [1, 17, 3, 11, 9], [13, 3, 11, 7, 15], [2, 10, 6, 15, 13],
      [5, 9, 11, 7, 19], [4, 8, 10, 6, 18], [4, 14, 5, 19, 18],
      [1, 9, 5, 14, 12], [18, 19, 7, 15, 6], [2, 13, 3, 17, 16]
    ];
    this._solid({ _vertices, _indices, colors, fuse });
  };

  p5.prototype.icosahedron = function (...args) {
    this._renderer.icosahedron(...args);
  };

  p5.RendererGL.prototype.icosahedron = function (...args) {
    const { fuse, length, center, colors } = p5.prototype._parseSolidArgs(...args);
    const phi = (1 + p5.prototype.sqrt(5)) / 2; // The golden ratio
    const a = length / p5.prototype.sqrt(3);  // Normalizing the edge length
    const b = a * phi;
    const c = a / phi;
    const _vertices = [
      p5.prototype.createVector(0, b, -c).add(center),
      p5.prototype.createVector(0, b, c).add(center),
      p5.prototype.createVector(0, -b, -c).add(center),
      p5.prototype.createVector(0, -b, c).add(center),
      p5.prototype.createVector(b, -c, 0).add(center),
      p5.prototype.createVector(b, c, 0).add(center),
      p5.prototype.createVector(-b, -c, 0).add(center),
      p5.prototype.createVector(-b, c, 0).add(center),
      p5.prototype.createVector(c, 0, -b).add(center),
      p5.prototype.createVector(c, 0, b).add(center),
      p5.prototype.createVector(-c, 0, -b).add(center),
      p5.prototype.createVector(-c, 0, b).add(center)
    ];
    const _indices = [
      [0, 1, 7], [0, 7, 10], [0, 10, 8], [0, 8, 5], [0, 5, 1],
      [1, 5, 9], [5, 8, 4], [8, 10, 2], [10, 7, 6], [7, 1, 11],
      [1, 9, 11], [11, 9, 3], [9, 5, 4], [4, 3, 9], [3, 4, 2],
      [3, 2, 6], [2, 4, 8], [3, 6, 11], [6, 2, 10], [6, 7, 11]
    ];
    this._solid({ _tris: true, _vertices, _indices, colors, fuse });
  };
})();
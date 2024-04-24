'use strict';

// Details here:
// https://github.com/processing/p5.js/blob/main/contributor_docs/creating_libraries.md
(function () {
  const INFO =
  {
    LIBRARY: 'p5.platonic',
    VERSION: '0.0.1',
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
    vertices = false,
    faces = true,
    outline = 'black',
    lineWeight = 0.05,
    vertexWeight = 20
  } = {}) {
    this._rendererState = this.push();
    this.stroke(outline);
    this.strokeWeight(lineWeight);
    for (let i = 0; i < _indices.length; i++) {
      this.beginShape(_tris ? 0x0004 : undefined); // TRIANGLES -> 0x0004
      faces && this.fill(...colors[i % colors.length]);
      _indices[i].forEach((index, j) => {
        !faces && this.fill(...colors[(i + j) % colors.length]);
        this.vertex(_vertices[index].x, _vertices[index].y, _vertices[index].z);
      })
      this.endShape('close'); // CLOSE -> 'close'
    }
    if (vertices) {
      this.strokeWeight(vertexWeight);
      for (let i = 0; i < _vertices.length; i++) {
        this.stroke(...colors[i % colors.length]); // Use distinct colors for each vertex
        this.point(_vertices[i].x, _vertices[i].y, _vertices[i].z); // Use point for 3D
      }
    }
    this.pop(this._rendererState);
  }

  // vertices are given NDC,
  // i.e., x, y and z vertex coordinates ∈ [-1..1]

  p5.prototype.tetrahedron = function (...args) {
    this._renderer.tetrahedron(...args);
  };

  p5.RendererGL.prototype.tetrahedron = function ({
    outline = 'black',
    lineWeight = 0.05,
    vertexWeight = 20,
    vertices = false,
    faces = true,
    alpha = 0.5,
    length = 1, // edge length
    center = p5.prototype.createVector(),
    colors = [
      [1, 0, 0, alpha], // Red
      [0, 1, 0, alpha], // Green
      [0, 0, 1, alpha], // Blue
      [0, 1, 1, alpha]  // Cyan
    ] } = {}) {
    const sqrt8 = p5.prototype.sqrt(8);
    const sqrt2 = p5.prototype.sqrt(2);
    // Vertices
    const _vertices = [
      p5.prototype.createVector(center.x, center.y, center.z + length * sqrt8 / 3), // Top vertex
      p5.prototype.createVector(center.x - length / sqrt2, center.y - length / sqrt2, center.z - length / 3), // Base vertex 1
      p5.prototype.createVector(center.x + length / sqrt2, center.y - length / sqrt2, center.z - length / 3), // Base vertex 2
      p5.prototype.createVector(center.x, center.y + length / sqrt2, center.z - length / 3)  // Base vertex 3
    ];
    // Indices for each triangular face
    const _indices = [
      [0, 1, 2], // Face 1
      [0, 2, 3], // Face 2
      [0, 3, 1], // Face 3
      [1, 3, 2]  // Base face
    ];
    this._solid({ _tris: true, _vertices, _indices, colors, faces, outline, lineWeight, vertexWeight, vertices });
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

  p5.RendererGL.prototype.hexahedron = function ({
    outline = 'black',
    lineWeight = 0.05,
    vertexWeight = 20,
    vertices = false,
    faces = true,
    alpha = 0.5,
    length = 1, // edge length
    center = p5.prototype.createVector(),
    colors = [
      [1, 0, 0, alpha],    // Red
      [0, 1, 0, alpha],    // Green
      [0, 0, 1, alpha],    // Blue
      [0, 1, 1, alpha],    // Cyan
      [1, 0, 1, alpha],    // Magenta
      [1, 1, 0, alpha],    // Yellow
      [0.5, 0, 0, alpha],  // Dark Red
      [0, 0.5, 0, alpha]   // Dark Green
    ] } = {}) {
    const half = length / 2;
    const _vertices = [
      p5.prototype.createVector(center.x - half, center.y - half, center.z + half), // 0
      p5.prototype.createVector(center.x + half, center.y - half, center.z + half), // 1
      p5.prototype.createVector(center.x + half, center.y + half, center.z + half), // 2
      p5.prototype.createVector(center.x - half, center.y + half, center.z + half), // 3
      p5.prototype.createVector(center.x - half, center.y - half, center.z - half), // 4
      p5.prototype.createVector(center.x + half, center.y - half, center.z - half), // 5
      p5.prototype.createVector(center.x + half, center.y + half, center.z - half), // 6
      p5.prototype.createVector(center.x - half, center.y + half, center.z - half)  // 7
    ];
    const _indices = [
      [0, 1, 2, 3], // Front face
      [1, 5, 6, 2], // Right face
      [5, 4, 7, 6], // Back face
      [4, 0, 3, 7], // Left face
      [3, 2, 6, 7], // Top face
      [4, 5, 1, 0]  // Bottom face
    ];
    this._solid({ _vertices, _indices, colors, faces, outline, lineWeight, vertexWeight, vertices });
  };

  p5.prototype.octahedron = function (...args) {
    this._renderer.octahedron(...args);
  };

  p5.RendererGL.prototype.octahedron = function ({
    outline = 'black',
    lineWeight = 0.05,
    vertexWeight = 20,
    vertices = false,
    faces = true,
    alpha = 0.5,
    length = 1, // edge length
    center = p5.prototype.createVector(),
    colors = [
      [1, 0, 0, alpha],    // Red
      [0, 1, 0, alpha],    // Green
      [0, 0, 1, alpha],    // Blue
      [0, 1, 1, alpha],    // Cyan
      [1, 0, 1, alpha],    // Magenta
      [1, 1, 0, alpha],    // Yellow
      [0.5, 0, 0, alpha],  // Dark Red
      [0, 0.5, 0, alpha]   // Dark Green
    ] } = {}) {
    const half = length / p5.prototype.sqrt(2); // Adjust for the diagonal length to maintain consistent edge lengths with your other solids
    const _vertices = [
      p5.prototype.createVector(center.x, center.y + half, center.z), // Top vertex
      p5.prototype.createVector(center.x, center.y - half, center.z), // Bottom vertex
      p5.prototype.createVector(center.x + half, center.y, center.z), // Right vertex
      p5.prototype.createVector(center.x - half, center.y, center.z), // Left vertex
      p5.prototype.createVector(center.x, center.y, center.z + half), // Front vertex
      p5.prototype.createVector(center.x, center.y, center.z - half)  // Back vertex
    ];
    const _indices = [
      [0, 2, 4], [0, 4, 3], [0, 3, 5], [0, 5, 2], // Four faces connecting to the top vertex
      [1, 4, 2], [1, 3, 4], [1, 5, 3], [1, 2, 5]  // Four faces connecting to the bottom vertex
    ];
    this._solid({ _tris: true, _vertices, _indices, colors, faces, outline, lineWeight, vertexWeight, vertices });
  };

  p5.prototype.dodecahedron = function (...args) {
    this._renderer.dodecahedron(...args);
  };

  p5.RendererGL.prototype.dodecahedron = function ({
    outline = 'black',
    lineWeight = 0.05,
    vertexWeight = 20,
    vertices = false,
    faces = true,
    alpha = 0.5,
    length = 1, // edge length
    center = p5.prototype.createVector(),
    colors = [
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
    ] } = {}) {
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
    this._solid({ _vertices, _indices, colors, faces, outline, lineWeight, vertexWeight, vertices });
  };

  p5.prototype.icosahedron = function (...args) {
    this._renderer.icosahedron(...args);
  };

  p5.RendererGL.prototype.icosahedron = function ({
    outline = 'black',
    lineWeight = 0.05,
    vertexWeight = 20,
    vertices = false,
    faces = true,
    alpha = 0.5,
    length = 1, // edge length
    center = p5.prototype.createVector(),
    colors = [
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
    ] } = {}) {
    const phi = (1 + p5.prototype.sqrt(5)) / 2;
    const a = (length / p5.prototype.sqrt(3));  // Normalizing the edge length
    const b = a * phi;
    const c = a / phi;
    const _vertices = [
      p5.prototype.createVector(0, b, -c).add(center),   // Vertex 0
      p5.prototype.createVector(0, b, c).add(center),    // Vertex 1
      p5.prototype.createVector(0, -b, -c).add(center),  // Vertex 2
      p5.prototype.createVector(0, -b, c).add(center),   // Vertex 3
      p5.prototype.createVector(b, -c, 0).add(center),   // Vertex 4
      p5.prototype.createVector(b, c, 0).add(center),    // Vertex 5
      p5.prototype.createVector(-b, -c, 0).add(center),  // Vertex 6
      p5.prototype.createVector(-b, c, 0).add(center),   // Vertex 7
      p5.prototype.createVector(c, 0, -b).add(center),   // Vertex 8
      p5.prototype.createVector(c, 0, b).add(center),    // Vertex 9
      p5.prototype.createVector(-c, 0, -b).add(center),  // Vertex 10
      p5.prototype.createVector(-c, 0, b).add(center)    // Vertex 11
    ]
    const _indices = [ // Indices for each triangular face
      [0, 1, 7], [0, 7, 10], [0, 10, 8], [0, 8, 5], [0, 5, 1],
      [1, 5, 9], [5, 8, 4], [8, 10, 2], [10, 7, 6], [7, 1, 11],
      [1, 9, 11], [11, 9, 3], [9, 5, 4], [4, 3, 9], [3, 4, 2],
      [3, 2, 6], [2, 4, 8], [3, 6, 11], [6, 2, 10], [6, 7, 11]
    ];
    this._solid({ _tris: true, _vertices, _indices, colors, faces, outline, lineWeight, vertexWeight, vertices });
  };
})();
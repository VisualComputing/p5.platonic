/**
 * @file Adds Platonic solid rendering functions to the p5 prototype.
 * @version 0.5.0
 * @author JP Charalambos
 * @license GPL-3.0-only
 *
 * @description
 * A p5.js addon that enables rendering Platonic solids in WEBGL mode.
 */

'use strict'

import p5 from 'p5'

p5.registerAddon((p5, fn) => {
  fn._solid = function (...args) {
    this._renderer._solid(...args)
  }

  p5.RendererGL.prototype._solid = function ({
    _tris,
    _vertices,
    _indices,
    colors,
    fuse = false
  } = {}) {
    this._rendererState = this.push()
    for (let i = 0; i < _indices.length; i++) {
      this.beginShape(_tris ? 0x0004 : undefined)
      !fuse && Array.isArray(colors) && this.fill(colors[i % colors.length])
      _indices[i].forEach((index) => {
        fuse && Array.isArray(colors) && this.fill(colors[index % colors.length])
        this.vertex(_vertices[index].x, _vertices[index].y, _vertices[index].z)
      })
      this.endShape('close')
    }
    this.pop(this._rendererState)
  }

  fn._parseSolidArgs = function (...args) {
    let fuse, length = 100, center = fn.createVector(), colors
    args.forEach(arg => {
      if (typeof arg === 'boolean') {
        fuse = arg
      } else if (typeof arg === 'number') {
        length = arg
      } else if (arg instanceof p5.Vector) {
        center = arg
      } else if (Array.isArray(arg)) {
        colors = arg
      }
    })
    return { fuse, length, center, colors }
  }

  fn.platonicGeometry = function (...args) {
    return this._renderer.platonicGeometry(...args)
  }

  p5.RendererGL.prototype.platonicGeometry = function (solid, ...args) {
    if (typeof solid !== 'function') {
      args = [solid, ...args]
      const solids = [
        this.tetrahedron.bind(this),
        this.hexahedron.bind(this),
        this.octahedron.bind(this),
        this.dodecahedron.bind(this),
        this.icosahedron.bind(this)
      ]
      solid = fn.random(solids)
    }
    this.beginGeometry()
    solid(...args)
    const model = this.endGeometry()
    const { colors } = fn._parseSolidArgs(...args)
    colors || model.clearColors()
    model.computeNormals()
    return model
  }

  for (const name of ['tetrahedron', 'cube', 'hexahedron', 'octahedron', 'dodecahedron', 'icosahedron']) {
    fn[name] = function (...args) {
      this._renderer[name](...args)
    }
  }

  p5.RendererGL.prototype.tetrahedron = function (...args) {
    const { fuse, length, center, colors } = fn._parseSolidArgs(...args)
    const sqrt8 = fn.sqrt(8)
    const sqrt2 = fn.sqrt(2)
    const _vertices = [
      fn.createVector(center.x, center.y, center.z + length * sqrt8 / 3),
      fn.createVector(center.x - length / sqrt2, center.y - length / sqrt2, center.z - length / 3),
      fn.createVector(center.x + length / sqrt2, center.y - length / sqrt2, center.z - length / 3),
      fn.createVector(center.x, center.y + length / sqrt2, center.z - length / 3)
    ]
    const _indices = [[0, 1, 2], [0, 2, 3], [0, 3, 1], [1, 3, 2]]
    this._solid({ _tris: true, _vertices, _indices, colors, fuse })
  }

  p5.RendererGL.prototype.cube = function (...args) {
    this.hexahedron(...args)
  }

  p5.RendererGL.prototype.hexahedron = function (...args) {
    const { fuse, length, center, colors } = fn._parseSolidArgs(...args)
    const half = length / 2
    const _vertices = [
      fn.createVector(center.x - half, center.y - half, center.z + half),
      fn.createVector(center.x + half, center.y - half, center.z + half),
      fn.createVector(center.x + half, center.y + half, center.z + half),
      fn.createVector(center.x - half, center.y + half, center.z + half),
      fn.createVector(center.x - half, center.y - half, center.z - half),
      fn.createVector(center.x + half, center.y - half, center.z - half),
      fn.createVector(center.x + half, center.y + half, center.z - half),
      fn.createVector(center.x - half, center.y + half, center.z - half)
    ]
    const _indices = [
      [0, 1, 2, 3], [1, 5, 6, 2], [5, 4, 7, 6],
      [4, 0, 3, 7], [3, 2, 6, 7], [4, 5, 1, 0]
    ]
    this._solid({ _vertices, _indices, colors, fuse })
  }

  p5.RendererGL.prototype.octahedron = function (...args) {
    const { fuse, length, center, colors } = fn._parseSolidArgs(...args)
    const half = length / fn.sqrt(2)
    const _vertices = [
      fn.createVector(center.x, center.y + half, center.z),
      fn.createVector(center.x, center.y - half, center.z),
      fn.createVector(center.x + half, center.y, center.z),
      fn.createVector(center.x - half, center.y, center.z),
      fn.createVector(center.x, center.y, center.z + half),
      fn.createVector(center.x, center.y, center.z - half)
    ]
    const _indices = [
      [0, 2, 4], [0, 4, 3], [0, 3, 5], [0, 5, 2],
      [1, 4, 2], [1, 3, 4], [1, 5, 3], [1, 2, 5]
    ]
    this._solid({ _tris: true, _vertices, _indices, colors, fuse })
  }

  p5.RendererGL.prototype.dodecahedron = function (...args) {
    const { fuse, length, center, colors } = fn._parseSolidArgs(...args)
    const phi = (1 + fn.sqrt(5)) / 2
    const a = length / fn.sqrt(3)
    const b = a / phi
    const c = a * phi
    const v = (x, y, z) => fn.createVector(x, y, z).add(center)
    const _vertices = [
      v(-a, -a, -a), v(-a, -a, a), v(-a, a, -a), v(-a, a, a),
      v(a, -a, -a), v(a, -a, a), v(a, a, -a), v(a, a, a),
      v(0, -b, -c), v(0, -b, c), v(0, b, -c), v(0, b, c),
      v(-b, -c, 0), v(-b, c, 0), v(b, -c, 0), v(b, c, 0),
      v(-c, 0, -b), v(-c, 0, b), v(c, 0, -b), v(c, 0, b)
    ]
    const _indices = [
      [0, 16, 2, 10, 8], [0, 8, 4, 14, 12], [0, 12, 1, 17, 16],
      [1, 17, 3, 11, 9], [13, 3, 11, 7, 15], [2, 10, 6, 15, 13],
      [5, 9, 11, 7, 19], [4, 8, 10, 6, 18], [4, 14, 5, 19, 18],
      [1, 9, 5, 14, 12], [18, 19, 7, 15, 6], [2, 13, 3, 17, 16]
    ]
    this._solid({ _vertices, _indices, colors, fuse })
  }

  p5.RendererGL.prototype.icosahedron = function (...args) {
    const { fuse, length, center, colors } = fn._parseSolidArgs(...args)
    const phi = (1 + fn.sqrt(5)) / 2
    const a = length / fn.sqrt(3)
    const b = a * phi
    const c = a / phi
    const v = (x, y, z) => fn.createVector(x, y, z).add(center)
    const _vertices = [
      v(0, b, -c), v(0, b, c), v(0, -b, -c), v(0, -b, c),
      v(b, -c, 0), v(b, c, 0), v(-b, -c, 0), v(-b, c, 0),
      v(c, 0, -b), v(c, 0, b), v(-c, 0, -b), v(-c, 0, b)
    ]
    const _indices = [
      [0, 1, 7], [0, 7, 10], [0, 10, 8], [0, 8, 5], [0, 5, 1],
      [1, 5, 9], [5, 8, 4], [8, 10, 2], [10, 7, 6], [7, 1, 11],
      [1, 9, 11], [11, 9, 3], [9, 5, 4], [4, 3, 9], [3, 4, 2],
      [3, 2, 6], [2, 4, 8], [3, 6, 11], [6, 2, 10], [6, 7, 11]
    ]
    this._solid({ _tris: true, _vertices, _indices, colors, fuse })
  }
})
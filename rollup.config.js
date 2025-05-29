// rollup.config.js
import resolve from '@rollup/plugin-node-resolve'

const external = ['p5']

export default [
  // 1. ESM build (for bundlers like Vite / npm)
  {
    input: 'src/p5.platonic.js',
    external,
    output: {
      file: 'dist/p5.platonic.esm.js',
      format: 'es',
      sourcemap: true
    },
    plugins: [resolve()]
  },

  // 2. IIFE build (for <script> usage)
  {
    input: 'src/p5.platonic.js',
    external,
    output: {
      file: 'dist/p5.platonic.js',
      format: 'iife',
      name: 'Platonic',
      globals: { p5: 'p5' },
      exports: 'none',
      sourcemap: true
    },
    plugins: [resolve()]
  }
]

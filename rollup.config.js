import typescript from 'rollup-plugin-typescript2'
import pkg from './package.json'

export default [{
  input: 'src/index.ts',
  external: ['tslib'],
  output: {
    dir: 'lib',
    entryFileNames: '[name]' + pkg.main.replace('index', ''),
    format: 'cjs',
  },
  plugins: [
    typescript(),
  ]
}, {
  input: 'src/index.ts',
  output: {
    dir: 'lib',
    entryFileNames: '[name]' + pkg.module.replace('index', ''),
    format: 'es'
  },
  plugins: [
    typescript({
      tsconfigOverride: {
        compilerOptions: {
          target: 'es6',
        }
      }
    }),
  ]
}]

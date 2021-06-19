[![NPM](https://img.shields.io/npm/v/rollup-plugin-innet-jsx.svg)](https://github.com/d8corp/rollup-plugin-innet-jsx/blob/main/CHANGELOG.md)
[![downloads](https://img.shields.io/npm/dm/rollup-plugin-innet-jsx.svg)](https://www.npmjs.com/package/rollup-plugin-innet-jsx)
[![license](https://img.shields.io/npm/l/rollup-plugin-innet-jsx)](https://github.com/d8corp/rollup-plugin-innet-jsx/blob/main/LICENSE)

# rollup-plugin-innet-jsx

🍣 A Rollup plugin which converts jsx to object (`JSXElement` from [innet](https://www.npmjs.com/package/innet)).

[![stars](https://img.shields.io/github/stars/d8corp/rollup-plugin-innet-jsx?style=social)](https://github.com/d8corp/rollup-plugin-innet-jsx/stargazers)
[![watchers](https://img.shields.io/github/watchers/d8corp/rollup-plugin-innet-jsx?style=social)](https://github.com/d8corp/rollup-plugin-innet-jsx/watchers)

## Requirements

This plugin requires an [LTS](https://github.com/nodejs/Release) Node version (v8.0.0+) and Rollup v1.20.0+.

## Install

npm
```bash
npm i -D rollup-plugin-innet-jsx
```

yarn
```bash
yarn add -D rollup-plugin-innet-jsx
```

## Usage

Create a `rollup.config.js` [configuration file](https://www.rollupjs.org/guide/en/#configuration-files) and import the plugin:

```js
import jsx from 'rollup-plugin-innet-jsx';

module.exports = {
  input: 'src/index.jsx',
  output: {
    dir: 'output',
    format: 'cjs'
  },
  plugins: [
    jsx()
  ]
};
```

Then call `rollup` either via the [CLI](https://www.rollupjs.org/guide/en/#command-line-reference) or the [API](https://www.rollupjs.org/guide/en/#javascript-api). If the build produces any errors, the plugin will write a 'alias' character to stderr, which should be audible on most systems.

### Issues
If you find a bug or have a suggestion, please file an issue on [GitHub](https://github.com/d8corp/rollup-plugin-innet-jsx/issues).  
[![issues](https://img.shields.io/github/issues-raw/d8corp/rollup-plugin-innet-jsx)](https://github.com/d8corp/rollup-plugin-innet-jsx/issues)

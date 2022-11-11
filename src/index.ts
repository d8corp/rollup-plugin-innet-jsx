import transform from 'innet-jsx'
import { Plugin } from 'rollup'

const jsxParser = require('acorn-jsx')

const name = 'rollup-plugin-innet-jsx'
const TJSX_REG = /(t|j)sx?$/

export default function jsx (): Plugin {
  return {
    name,
    options (opt) {
      if (!opt.acornInjectPlugins) {
        opt.acornInjectPlugins = [jsxParser()]
      } else if (typeof opt.acornInjectPlugins === 'function') {
        opt.acornInjectPlugins = [opt.acornInjectPlugins, jsxParser()]
      } else {
        opt.acornInjectPlugins.push(jsxParser())
      }
      return opt
    },
    transform (code: string, id: string) {
      if (TJSX_REG.test(id)) {
        return transform(code, {
          jsxFile: id,
          parser: code => this.parse(code)
        })
      }
    }
  }
}

import transform from 'innet-jsx'
import { Plugin } from 'rollup'

const jsxParser = require('acorn-jsx')

export default function jsx (): Plugin {
  return {
    name: 'jsx',
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
      if (/(t|j)sx?$/.test(id)) {
        return transform(code, {
          jsxFile: id,
          parser: code => this.parse(code)
        })
      }
    }
  }
}

import transform from 'innet-jsx'

const jsxParser = require('acorn-jsx')

export default function jsx () {
  return {
    options (opt) {
      if (!opt.acornInjectPlugins) {
        opt.acornInjectPlugins = []
      }
      opt.acornInjectPlugins.push(jsxParser())
      return opt
    },
    transform (code: string, id: string) {
      return transform(code, {
        jsxFile: id,
        parser: code => this.parse(code)
      })
    }
  }
}

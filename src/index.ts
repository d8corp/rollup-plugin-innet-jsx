import MagicString from 'magic-string'

const { extend } = require('acorn-jsx-walk')
const {base, simple} = require('acorn-walk')

extend(base)

export default function jsx () {
  return {
    transform (code, id) {
      if (id.endsWith('.tsx') || id.endsWith('.jsx')) {
        let ast

        try {
          ast = this.parse(code)
        } catch (err) {
          err.message += ` in ${id}`
          throw err
        }

        const magicString = new MagicString(code)

        simple(ast, {
          JSXNamespacedName ({start}) {
            throw Error(`innet does not support JSXNamespacedName ${id}:${start}`)
          },
          JSXText ({start, end, raw}) {
            const value = raw.trim()
            if (value) {
              magicString.overwrite(start, end, `\`${value.replace(/'/g, "\\'")}\``)
            } else {
              magicString.remove(start, end)
            }
          },
          JSXExpressionContainer ({start, end}) {
            magicString.remove(start, start + 1)
            magicString.remove(end - 1, end)
          },
          JSXFragment ({children}) {
            for (let i = 1; i < children.length; i++) {
              const {type, start, raw} = children[i]
              if (type !== 'JSXText' || raw.trim()) {
                magicString.appendLeft(start, ',')
              }
            }
          },
          JSXOpeningFragment ({start, end}) {
            magicString.overwrite(start, end, '[')
          },
          JSXClosingFragment ({start, end}) {
            magicString.overwrite(start, end, ']')
          },
          JSXElement ({children}) {
            // children
            let childrenStarted = false
            let childrenStart
            let childrenEnd
            for (let i = 0; i < children.length; i++) {
              const {type, start, end, raw} = children[i]

              if (!i) {
                childrenStart = start
              }
              if (i + 1 === children.length) {
                childrenEnd = end
              }

              if (type !== 'JSXText' || raw.trim()) {
                if (!childrenStarted) {
                  magicString.appendLeft(start, ',children:[')
                  childrenStarted = true
                } else {
                  magicString.appendLeft(start, ',')
                }
              }

              if (childrenStarted && i + 1 === children.length) {
                magicString.appendRight(end, ']')
              }
            }

            if (!childrenStarted && children.length) {
              magicString.remove(childrenStart, childrenEnd)
            }
          },
          JSXOpeningElement ({start, end, name, selfClosing, attributes}) {
            const fullName = name.type === 'JSXMemberExpression'
              ? `${name.object.name}.${name.property.name}`
              : name.name || ''
            const stringSym = /[a-z]/.test(fullName[0]) ? "'" : ''

            magicString.overwrite(start, start + 1, '{type:')
            if (stringSym) {
              magicString.appendLeft(name.start, stringSym)
              magicString.appendLeft(name.end, stringSym)
            }

            if (attributes) {
              for (let i = 0; i < attributes.length; i++) {
                const attribute = attributes[i]
                if (!i) {
                  magicString.appendLeft(attribute.start, ',props:{')
                } else {
                  magicString.appendLeft(attribute.start, ',')
                }

                if (i + 1 === attributes.length) {
                  magicString.appendLeft(attribute.end, '}')
                }
              }
            }

            if (selfClosing) {
              magicString.overwrite(end - 2, end, `}`)
            } else {
              magicString.remove(end - 1, end)
            }
          },
          JSXClosingElement ({start, end}) {
            magicString.overwrite(start, end, `}`)
          },
          JSXAttribute ({name, value}) {
            if (value) {
              magicString.overwrite(name.end, value.start, `:`)
            } else {
              magicString.appendLeft(name.end, ':true')
            }
          },
          JSXSpreadAttribute ({start, end}) {
            magicString.remove(start, start + 1)
            magicString.remove(end - 1, end)
          },
        })

        return {
          code: magicString.toString(),
          map: magicString.generateMap()
        }
      }
    }
  }
}

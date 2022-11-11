'use strict';

var transform = require('innet-jsx');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var transform__default = /*#__PURE__*/_interopDefaultLegacy(transform);

const jsxParser = require('acorn-jsx');
const name = 'rollup-plugin-innet-jsx';
const TJSX_REG = /(t|j)sx?$/;
function jsx() {
    return {
        name,
        options(opt) {
            if (!opt.acornInjectPlugins) {
                opt.acornInjectPlugins = [jsxParser()];
            }
            else if (typeof opt.acornInjectPlugins === 'function') {
                opt.acornInjectPlugins = [opt.acornInjectPlugins, jsxParser()];
            }
            else {
                opt.acornInjectPlugins.push(jsxParser());
            }
            return opt;
        },
        transform(code, id) {
            if (TJSX_REG.test(id)) {
                return transform__default["default"](code, {
                    jsxFile: id,
                    parser: code => this.parse(code)
                });
            }
        }
    };
}

module.exports = jsx;

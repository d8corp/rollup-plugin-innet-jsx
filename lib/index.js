'use strict';

var transform = require('innet-jsx');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var transform__default = /*#__PURE__*/_interopDefaultLegacy(transform);

var jsxParser = require('acorn-jsx');
function jsx() {
    return {
        name: 'jsx',
        options: function (opt) {
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
        transform: function (code, id) {
            var _this = this;
            if (/(t|j)sx?$/.test(id)) {
                return transform__default["default"](code, {
                    jsxFile: id,
                    parser: function (code) { return _this.parse(code); }
                });
            }
        }
    };
}

module.exports = jsx;

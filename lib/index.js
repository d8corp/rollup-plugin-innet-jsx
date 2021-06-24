'use strict';

var transform = require('innet-jsx');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var transform__default = /*#__PURE__*/_interopDefaultLegacy(transform);

var jsxParser = require('acorn-jsx');
function jsx() {
    return {
        options: function (opt) {
            if (!opt.acornInjectPlugins) {
                opt.acornInjectPlugins = [];
            }
            opt.acornInjectPlugins.push(jsxParser());
            return opt;
        },
        transform: function (code, id) {
            var _this = this;
            return transform__default['default'](code, id, function (code) { return _this.parse(code); });
        }
    };
}

module.exports = jsx;

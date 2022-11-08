'use strict';

var transform = require('innet-jsx');

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
                return transform(code, {
                    jsxFile: id,
                    parser: function (code) { return _this.parse(code); }
                });
            }
        }
    };
}

module.exports = jsx;

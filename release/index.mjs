import transform from 'innet-jsx';

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
                return transform(code, {
                    jsxFile: id,
                    parser: code => this.parse(code)
                });
            }
        }
    };
}

export { jsx as default };

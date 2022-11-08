import transform from 'innet-jsx';

const jsxParser = require('acorn-jsx');
function jsx() {
    return {
        name: 'jsx',
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
            if (/(t|j)sx?$/.test(id)) {
                return transform(code, {
                    jsxFile: id,
                    parser: code => this.parse(code)
                });
            }
        }
    };
}

export { jsx as default };

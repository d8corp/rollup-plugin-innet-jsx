import transform from 'innet-jsx';

(function () {
  const env = {"INNETJS_JSX_PACKAGE_VERSION":"1.4.0"};
  if (typeof process === 'undefined') {
    process = { env };
  } else if (process.env) {
    Object.assign(process.env, env);
  } else {
    process.env = env;
  }
})();
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

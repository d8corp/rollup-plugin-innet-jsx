'use strict';

var MagicString = require('magic-string');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var MagicString__default = /*#__PURE__*/_interopDefaultLegacy(MagicString);

var extend = require('acorn-jsx-walk').extend;
var _a = require('acorn-walk'), base = _a.base, simple = _a.simple;
extend(base);
function jsx() {
    return {
        transform: function (code, id) {
            if (id.endsWith('.tsx') || id.endsWith('.jsx')) {
                var ast = void 0;
                try {
                    ast = this.parse(code);
                }
                catch (err) {
                    err.message += " in " + id;
                    throw err;
                }
                var magicString_1 = new MagicString__default['default'](code);
                simple(ast, {
                    JSXNamespacedName: function (_a) {
                        var start = _a.start;
                        throw Error("innet does not support JSXNamespacedName " + id + ":" + start);
                    },
                    JSXText: function (_a) {
                        var start = _a.start, end = _a.end, raw = _a.raw;
                        var value = raw.trim();
                        if (value) {
                            magicString_1.overwrite(start, end, "`" + value.replace(/'/g, "\\'") + "`");
                        }
                        else {
                            magicString_1.remove(start, end);
                        }
                    },
                    JSXExpressionContainer: function (_a) {
                        var start = _a.start, end = _a.end;
                        magicString_1.remove(start, start + 1);
                        magicString_1.remove(end - 1, end);
                    },
                    JSXFragment: function (_a) {
                        var children = _a.children;
                        for (var i = 1; i < children.length; i++) {
                            var _b = children[i], type = _b.type, start = _b.start, raw = _b.raw;
                            if (type !== 'JSXText' || raw.trim()) {
                                magicString_1.appendLeft(start, ',');
                            }
                        }
                    },
                    JSXOpeningFragment: function (_a) {
                        var start = _a.start, end = _a.end;
                        magicString_1.overwrite(start, end, '[');
                    },
                    JSXClosingFragment: function (_a) {
                        var start = _a.start, end = _a.end;
                        magicString_1.overwrite(start, end, ']');
                    },
                    JSXElement: function (_a) {
                        var children = _a.children;
                        // children
                        var childrenStarted = false;
                        var childrenStart;
                        var childrenEnd;
                        for (var i = 0; i < children.length; i++) {
                            var _b = children[i], type = _b.type, start = _b.start, end = _b.end, raw = _b.raw;
                            if (!i) {
                                childrenStart = start;
                            }
                            if (i + 1 === children.length) {
                                childrenEnd = end;
                            }
                            if (type !== 'JSXText' || raw.trim()) {
                                if (!childrenStarted) {
                                    magicString_1.appendLeft(start, ',children:[');
                                    childrenStarted = true;
                                }
                                else {
                                    magicString_1.appendLeft(start, ',');
                                }
                            }
                            if (childrenStarted && i + 1 === children.length) {
                                magicString_1.appendRight(end, ']');
                            }
                        }
                        if (!childrenStarted && children.length) {
                            magicString_1.remove(childrenStart, childrenEnd);
                        }
                    },
                    JSXOpeningElement: function (_a) {
                        var start = _a.start, end = _a.end, name = _a.name, selfClosing = _a.selfClosing, attributes = _a.attributes;
                        var fullName = name.type === 'JSXMemberExpression'
                            ? name.object.name + "." + name.property.name
                            : name.name || '';
                        var stringSym = /[a-z]/.test(fullName[0]) ? "'" : '';
                        magicString_1.overwrite(start, start + 1, '{type:');
                        if (stringSym) {
                            magicString_1.appendLeft(name.start, stringSym);
                            magicString_1.appendLeft(name.end, stringSym);
                        }
                        if (attributes) {
                            for (var i = 0; i < attributes.length; i++) {
                                var attribute = attributes[i];
                                if (!i) {
                                    magicString_1.appendLeft(attribute.start, ',props:{');
                                }
                                else {
                                    magicString_1.appendLeft(attribute.start, ',');
                                }
                                if (i + 1 === attributes.length) {
                                    magicString_1.appendLeft(attribute.end, '}');
                                }
                            }
                        }
                        if (selfClosing) {
                            magicString_1.overwrite(end - 2, end, "}");
                        }
                        else {
                            magicString_1.remove(end - 1, end);
                        }
                    },
                    JSXClosingElement: function (_a) {
                        var start = _a.start, end = _a.end;
                        magicString_1.overwrite(start, end, "}");
                    },
                    JSXAttribute: function (_a) {
                        var name = _a.name, value = _a.value;
                        if (value) {
                            magicString_1.overwrite(name.end, value.start, ":");
                        }
                        else {
                            magicString_1.appendLeft(name.end, ':true');
                        }
                    },
                    JSXSpreadAttribute: function (_a) {
                        var start = _a.start, end = _a.end;
                        magicString_1.remove(start, start + 1);
                        magicString_1.remove(end - 1, end);
                    },
                });
                return {
                    code: magicString_1.toString(),
                    map: magicString_1.generateMap()
                };
            }
        }
    };
}

module.exports = jsx;

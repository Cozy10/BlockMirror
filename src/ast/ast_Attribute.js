
PyBlock.prototype['ast_Attribute'] = function (node, parent) {
    let value = node.value;
    let attr = node.attr;

    if (value._astname == "Name") {  
        return PyBlock.create_block("ast_Attribute", node.lineno, undefined, {
        "VALUE": Sk.ffi.remapToJs(value.id),
        "ATTR": Sk.ffi.remapToJs(attr)
        },); 
    } else {
        return PyBlock.create_block("ast_AttributeFull", node.lineno, undefined, {
            "ATTR": Sk.ffi.remapToJs(attr)
        }, {
            "VALUE": this.convert(value, node)
        });
    }
}

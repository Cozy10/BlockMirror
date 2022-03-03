
BlockMirrorTextToBlocks.prototype['ast_Attribute'] = function (node, parent) {
    let value = node.value;
    let attr = node.attr;

    if (value._astname == "Name") {  
        return BlockMirrorTextToBlocks.create_block("ast_Attribute", node.lineno, {
        "VALUE": Sk.ffi.remapToJs(value.id),
        "ATTR": Sk.ffi.remapToJs(attr)
        },); 
    } else {
        return BlockMirrorTextToBlocks.create_block("ast_AttributeFull", node.lineno, {
            "ATTR": Sk.ffi.remapToJs(attr)
        }, {
            "VALUE": this.convert(value, node)
        });
    }
}


BlockMirrorTextToBlocks.prototype['ast_Attribute'] = function (node, parent) {
    let value = node.value;
    let attr = node.attr;

    if (value._astname == "Name") {
        if (Sk.ffi.remapToJs(attr) === "pi" || Sk.ffi.remapToJs(attr) === "e"){
            return BlockMirrorTextToBlocks.create_block("math_constant", node.lineno, {
                "CONSTANT": Sk.ffi.remapToJs(attr).toUpperCase()
                },);
        }else{
            return BlockMirrorTextToBlocks.create_block("ast_Attribute", node.lineno, {
            "VALUE": Sk.ffi.remapToJs(value.id),
            "ATTR": Sk.ffi.remapToJs(attr)
            },);
        }
        
    } else {
        return BlockMirrorTextToBlocks.create_block("ast_AttributeFull", node.lineno, {
            "ATTR": Sk.ffi.remapToJs(attr)
        }, {
            "VALUE": this.convert(value, node)
        });
    }
}

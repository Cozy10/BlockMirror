BlockMirrorTextToBlocks.prototype['ast_Num'] = function (node, parent) {
    var n = node.n;
    return BlockMirrorTextToBlocks.create_block("math_number", node.lineno, {
        "NUM": Sk.ffi.remapToJs(n)
    });
}

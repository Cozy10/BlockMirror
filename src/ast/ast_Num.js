BlockMirrorTextToBlocks.createNumBlock = (num, type, node)=>{
    return BlockMirrorTextToBlocks.create_block("math_number", node.lineno, type,{
        "NUM": num
    });
}

BlockMirrorTextToBlocks.prototype['ast_Num'] = function (node, parent) {
    var n = node.n;
    return BlockMirrorTextToBlocks.createNumBlock(Sk.ffi.remapToJs(n), "float", node);
}


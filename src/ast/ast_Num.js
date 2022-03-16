BlockMirrorTextToBlocks.createNumBlock = (num, type)=>{
    return BlockMirrorTextToBlocks.create_block("math_number", node.lineno, type,{
        "NUM": num
    });
}

BlockMirrorTextToBlocks.prototype['ast_Num'] = function (node, parent) {
    var n = node.n;
    return BlockMirrorTextToBlocks.createNumBlock(Sk.ffi.remapToJS(n), "float");
}


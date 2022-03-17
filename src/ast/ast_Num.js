PyBlock.createNumBlock = (num, type, node)=>{
    return PyBlock.create_block("math_number", node.lineno, type,{
        "NUM": num
    });
}

PyBlock.prototype['ast_Num'] = function (node, parent) {
    var n = node.n;
    return PyBlock.createNumBlock(Sk.ffi.remapToJs(n), "float", node);
}


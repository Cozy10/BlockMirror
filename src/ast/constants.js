BlockMirrorTextToBlocks.prototype.CONSTANTS = function (node, parent){
    let value = node;
    console.log(node);
    // identifier le golden ratio
    if ( value.op != undefined && value.op.prototype._astname === "Div"){
        if(value.right != undefined && value.right.n.v === 2){
            if(value.left != undefined && value.left.op != undefined && value.left.op.prototype._astname === "Add"){
                if ( value.left.left != undefined && value.left.left.n.v === 1){
                    if( value.left.right != undefined && value.left.right.func != undefined && value.left.right.func.attr != undefined && value.left.right.func.attr.v === "sqrt"){
                        if(value.left.right.args[0].n.v === 5){
                            return BlockMirrorTextToBlocks.create_block("math_constant", node.lineno, 
                            {
                                "CONSTANT": "GOLDEN_RATIO"
                            },
                            {},{});
                        }
                    }
                }
            }
        }
    }
    let attr = node.attr;
    if (attr != undefined && Sk.ffi.remapToJs(attr) === "pi" || Sk.ffi.remapToJs(attr) === "e"){
        return BlockMirrorTextToBlocks.create_block("math_constant", node.lineno, {
            "CONSTANT": Sk.ffi.remapToJs(attr).toUpperCase()
            },);
    }
    
    let func = node.func;
    let args = node.args;
    // constant infinity -> float('inf')
    if (func != undefined && Sk.ffi.remapToJs(func.id) === 'float' && Sk.ffi.remapToJs(args[0].s) === 'inf'){
        return BlockMirrorTextToBlocks.create_block("math_constant", node.lineno, {
            "CONSTANT": "INFINITY"
            },);
    }

    return undefined;
}
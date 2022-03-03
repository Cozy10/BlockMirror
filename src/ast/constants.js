BlockMirrorTextToBlocks.prototype.CONSTANTS = function (node, parent){
    // identifier le golden ratio
    if ( node.op != undefined && node.op.prototype._astname === "Div"){
        if(node.right != undefined && node.right.n.v === 2){
            if(node.left != undefined && node.left.op != undefined && node.left.op.prototype._astname === "Add"){
                if ( node.left.left != undefined && node.left.left.n.v === 1){
                    if( node.left.right != undefined && node.left.right.func != undefined && node.left.right.func.attr != undefined && node.left.right.func.attr.v === "sqrt"){
                        if(node.left.right.args[0].n.v === 5){
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

    let value = node.value;

    if (value != undefined && value === Sk.builtin.bool.true$) {
        return BlockMirrorTextToBlocks.create_block('logic_boolean', node.lineno, {
            "BOOL": 'TRUE'
        });
    } else if (value != undefined && value === Sk.builtin.bool.false$) {
        return BlockMirrorTextToBlocks.create_block('logic_boolean', node.lineno, {
            "BOOL": 'FALSE'
        });
    }
    return undefined;
}
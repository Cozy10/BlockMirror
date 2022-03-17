PyBlock.prototype.CONSTANTS = function (node, parent){
    // identifier le golden ratio
    if ( node.op != undefined && node.op.prototype._astname === "Div"){
        if(node.right != undefined && node.right.n.v === 2){
            if(node.left != undefined && node.left.op != undefined && node.left.op.prototype._astname === "Add"){
                if ( node.left.left != undefined && node.left.left.n.v === 1){
                    if( node.left.right != undefined && node.left.right.func != undefined && node.left.right.func.attr != undefined && node.left.right.func.attr.v === "sqrt"){
                        if(node.left.right.args[0].n.v === 5){
                            return PyBlock.create_block("math_constant", node.lineno, "float",
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
        return PyBlock.create_block("math_constant", node.lineno, "float", {
            "CONSTANT": Sk.ffi.remapToJs(attr).toUpperCase()
            },);
    }
    
    let func = node.func;
    let args = node.args;
    // constant infinity -> float('inf')
    if (func != undefined && args != undefined && Sk.ffi.remapToJs(func.id) === 'float' && Sk.ffi.remapToJs(args[0].s) === 'inf'){
        return PyBlock.create_block("math_constant", node.lineno, "float", {
            "CONSTANT": "INFINITY"
            },);
    }else if (func != undefined && func.attr != undefined && Sk.ffi.remapToJs(func.attr) === 'sqrt' && args[0].n != undefined && args[0].n.v === 2){
        return PyBlock.create_block("math_constant", node.lineno, "float", {
            "CONSTANT": "SQRT2"
            },);
    }else if (func != undefined && func.attr != undefined && Sk.ffi.remapToJs(func.attr) === 'sqrt' && args[0].left != undefined && args[0].right != undefined && args[0].op != undefined){
        if(args[0].left != undefined && args[0].op != undefined && args[0].right != undefined){
            if (args[0].left.n != undefined && args[0].op.prototype._astname === "Div" && args[0].right.n != undefined){
                if (args[0].left.n.v === 1 && args[0].right.n.v === 2){
                    return PyBlock.create_block("math_constant", node.lineno, "float", {
                    "CONSTANT": "SQRT1_2"
                    },);
                }
            }
                
        }
        
    }

    let value = node.value;
    if (value != undefined && value === Sk.builtin.bool.true$) {
        return PyBlock.create_block('logic_boolean', node.lineno, "bool", {
            "BOOL": 'TRUE'
        });
    } else if (value != undefined && value === Sk.builtin.bool.false$) {
        return PyBlock.create_block('logic_boolean', node.lineno, "bool", {
            "BOOL": 'FALSE'
        });
    }
    return undefined;
};
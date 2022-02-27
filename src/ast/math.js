BlockMirrorTextToBlocks.prototype.FUNCTIONS_BLOCKS["sqrt"] = function(args, node){ // Give node.args and node
    return {
        "name":"math_single", // block type="text_print"
        "fields":{
            "OP":"ROOT"
        },        // tag field of the block <field ...>
        "values":{          
            "NUM":BlockMirrorTextToBlocks.prototype.convert(args[0], node) // recursive conversion for args[0]
        },                  // tag value
        "statements":{}     //tag statement
    };
};
BlockMirrorTextToBlocks.prototype.FUNCTIONS_BLOCKS["fabs"] = function(args, node){ // Give node.args and node
    return {
        "name":"math_single", // block type="text_print"
        "fields":{
            "OP":"ABS"
        },        // tag field of the block <field ...>
        "values":{          
            "NUM":BlockMirrorTextToBlocks.prototype.convert(args[0], node) // recursive conversion for args[0]
        },                  // tag value
        "statements":{}     //tag statement
    };
};
BlockMirrorTextToBlocks.prototype.FUNCTIONS_BLOCKS["log"] = function(args, node){ // Give node.args and node
    return {
        "name":"math_single", // block type="text_print"
        "fields":{
            "OP":"LN"
        },        // tag field of the block <field ...>
        "values":{          
            "NUM":BlockMirrorTextToBlocks.prototype.convert(args[0], node) // recursive conversion for args[0]
        },                  // tag value
        "statements":{}     //tag statement
    };
};
BlockMirrorTextToBlocks.prototype.FUNCTIONS_BLOCKS["log10"] = function(args, node){ // Give node.args and node
    return {
        "name":"math_single", // block type="text_print"
        "fields":{
            "OP":"LOG10"
        },        // tag field of the block <field ...>
        "values":{          
            "NUM":BlockMirrorTextToBlocks.prototype.convert(args[0], node) // recursive conversion for args[0]
        },                  // tag value
        "statements":{}     //tag statement
    };
};
BlockMirrorTextToBlocks.prototype.FUNCTIONS_BLOCKS["exp"] = function(args, node){ // Give node.args and node
    return {
        "name":"math_single", // block type="text_print"
        "fields":{
            "OP":"EXP"
        },        // tag field of the block <field ...>
        "values":{          
            "NUM":BlockMirrorTextToBlocks.prototype.convert(args[0], node) // recursive conversion for args[0]
        },                  // tag value
        "statements":{}     //tag statement
    };
};
BlockMirrorTextToBlocks.prototype.FUNCTIONS_BLOCKS["pow"] = function(args, node){ // Give node.args and node
    return {
        "name":"math_single", // block type="text_print"
        "fields":{
            "OP":"POW10"
        },        // tag field of the block <field ...>
        "values":{          
            "NUM":BlockMirrorTextToBlocks.prototype.convert(args[1], node) // recursive conversion for args[0]
        },                  // tag value
        "statements":{}     //tag statement
    };
};


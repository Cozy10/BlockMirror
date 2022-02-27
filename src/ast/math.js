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
BlockMirrorTextToBlocks.prototype.FUNCTIONS_BLOCKS["sin"] = function(args, node){ // Give node.args and node
    return {
        "name":"math_trig", // block type="text_print"
        "fields":{
            "OP":"SIN"
        },        // tag field of the block <field ...>
        "values":{          
            "NUM":BlockMirrorTextToBlocks.prototype.convert(args[0], node) // recursive conversion for args[0]
        },                  // tag value
        "statements":{}     //tag statement
    };
};
BlockMirrorTextToBlocks.prototype.FUNCTIONS_BLOCKS["cos"] = function(args, node){ // Give node.args and node
    return {
        "name":"math_trig", // block type="text_print"
        "fields":{
            "OP":"COS"
        },        // tag field of the block <field ...>
        "values":{          
            "NUM":BlockMirrorTextToBlocks.prototype.convert(args[0], node) // recursive conversion for args[0]
        },                  // tag value
        "statements":{}     //tag statement
    };
};
BlockMirrorTextToBlocks.prototype.FUNCTIONS_BLOCKS["asin"] = function(args, node){ // Give node.args and node
    return {
        "name":"math_trig", // block type="text_print"
        "fields":{
            "OP":"ASIN"
        },        // tag field of the block <field ...>
        "values":{          
            "NUM":BlockMirrorTextToBlocks.prototype.convert(args[0], node) // recursive conversion for args[0]
        },                  // tag value
        "statements":{}     //tag statement
    };
};
BlockMirrorTextToBlocks.prototype.FUNCTIONS_BLOCKS["acos"] = function(args, node){ // Give node.args and node
    return {
        "name":"math_trig", // block type="text_print"
        "fields":{
            "OP":"ACOS"
        },        // tag field of the block <field ...>
        "values":{          
            "NUM":BlockMirrorTextToBlocks.prototype.convert(args[0], node) // recursive conversion for args[0]
        },                  // tag value
        "statements":{}     //tag statement
    };
};
BlockMirrorTextToBlocks.prototype.FUNCTIONS_BLOCKS["atan"] = function(args, node){ // Give node.args and node
    return {
        "name":"math_trig", // block type="text_print"
        "fields":{
            "OP":"ATAN"
        },        // tag field of the block <field ...>
        "values":{          
            "NUM":BlockMirrorTextToBlocks.prototype.convert(args[0], node) // recursive conversion for args[0]
        },                  // tag value
        "statements":{}     //tag statement
    };
};
BlockMirrorTextToBlocks.prototype.FUNCTIONS_BLOCKS["round"] = function(args, node){ // Give node.args and node
    return {
        "name":"math_round", // block type="text_print"
        "fields":{
            "OP":"ROUND"
        },        // tag field of the block <field ...>
        "values":{          
            "NUM":BlockMirrorTextToBlocks.prototype.convert(args[0], node) // recursive conversion for args[0]
        },                  // tag value
        "statements":{}     //tag statement
    };
};
BlockMirrorTextToBlocks.prototype.FUNCTIONS_BLOCKS["ceil"] = function(args, node){ // Give node.args and node
    return {
        "name":"math_round", // block type="text_print"
        "fields":{
            "OP":"ROUNDUP"
        },        // tag field of the block <field ...>
        "values":{          
            "NUM":BlockMirrorTextToBlocks.prototype.convert(args[0], node) // recursive conversion for args[0]
        },                  // tag value
        "statements":{}     //tag statement
    };
};
BlockMirrorTextToBlocks.prototype.FUNCTIONS_BLOCKS["floor"] = function(args, node){ // Give node.args and node
    return {
        "name":"math_round", // block type="text_print"
        "fields":{
            "OP":"ROUNDDOWN"
        },        // tag field of the block <field ...>
        "values":{          
            "NUM":BlockMirrorTextToBlocks.prototype.convert(args[0], node) // recursive conversion for args[0]
        },                  // tag value
        "statements":{}     //tag statement
    };
};


BlockMirrorTextToBlocks.prototype.FUNCTIONS_BLOCKS["math_isPrime"] = function(args, node){ // Give node.args and node
    return {
        "name":"math_number_property", // block type="text_print"
        "fields":{
            "PROPERTY": "PRIME"
        },        // tag field of the block <field ...>
        "values":{
            "NUMBER_TO_CHECK": BlockMirrorTextToBlocks.prototype.convert(args[0], node)
        },                  // tag value
        "statements":{}     //tag statement
    };
};
BlockMirrorTextToBlocks.prototype.FUNCTIONS_BLOCKS["math_standard_deviation"] = function(args, node){ // Give node.args and node
    return {
        "name":"math_on_list", // block type="text_print"
        "fields":{
            "OP":"STD_DEV"
        },        // tag field of the block <field ...>
        "values":{          
            "NUM":BlockMirrorTextToBlocks.prototype.convert(args[0], node) // recursive conversion for args[0]
        },                  // tag value
        "statements":{}     //tag statement
    };
};
BlockMirrorTextToBlocks.prototype.FUNCTIONS_BLOCKS["math_mean"] = function(args, node){ // Give node.args and node
    return {
        "name":"math_on_list", // block type="text_print"
        "fields":{
            "OP":"AVERAGE"
        },        // tag field of the block <field ...>
        "values":{          
            "NUM":BlockMirrorTextToBlocks.prototype.convert(args[0], node) // recursive conversion for args[0]
        },                  // tag value
        "statements":{}     //tag statement
    };
};
BlockMirrorTextToBlocks.prototype.FUNCTIONS_BLOCKS["math_median"] = function(args, node){ // Give node.args and node
    return {
        "name":"math_on_list", // block type="text_print"
        "fields":{
            "OP":"MEDIAN"
        },        // tag field of the block <field ...>
        "values":{          
            "NUM":BlockMirrorTextToBlocks.prototype.convert(args[0], node) // recursive conversion for args[0]
        },                  // tag value
        "statements":{}     //tag statement
    };
};
BlockMirrorTextToBlocks.prototype.FUNCTIONS_BLOCKS["math_modes"] = function(args, node){ // Give node.args and node
    return {
        "name":"math_on_list", // block type="text_print"
        "fields":{
            "OP":"MODE"
        },        // tag field of the block <field ...>
        "values":{          
            "NUM":BlockMirrorTextToBlocks.prototype.convert(args[0], node) // recursive conversion for args[0]
        },                  // tag value
        "statements":{}     //tag statement
    };
};
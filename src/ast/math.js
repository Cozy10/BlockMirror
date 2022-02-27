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


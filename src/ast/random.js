PyBlock.prototype.FUNCTIONS_BLOCKS['random'] = {};

PyBlock.prototype.FUNCTIONS_BLOCKS['random']['choice'] = function(args, node){
    let value = PyBlock.prototype.convert(args[0], node);
    return {
        "name":"lists_getIndex",
        "fields":{
            "MODE":"GET",
            "WHERE":"RANDOM"
        },
        "values":{"VALUE":value},
        "settings":{},
        "mutations":{
            "@statement":"false",
            "@at":"false"
        },
        "statements":{},
        "returnType": PyBlock.getVarType(value)
    }
}
/*PyBlock.prototype.FUNCTIONS_BLOCKS["random"]["choice"] = function(args, node){ // Give node.args and node
    return {
        "name":"math_on_list", // block type="text_print"
        "fields":{
            "OP":"RANDOM"
        },        // tag field of the block <field ...>
        "values":{          
            "NUM":PyBlock.prototype.convert(args[0], node) // recursive conversion for args[0]
        },                  // tag value
        "statements":{}     //tag statement
    };
};*/
PyBlock.prototype.FUNCTIONS_BLOCKS["random"]["randint"] = function(args, node){ // Give node.args and node
    return {
        "name":"math_random_int", // block type="text_print"
        "fields":{},        // tag field of the block <field ...>
        "values":{          
            "FROM":PyBlock.prototype.convert(args[0], node), // recursive conversion for args[0]
            "TO":PyBlock.prototype.convert(args[1], node) // recursive conversion for args[0]
        },                  // tag value
        "statements":{},     //tag statement
        "returnType": "int"
    };
};
PyBlock.prototype.FUNCTIONS_BLOCKS["random"]["random"] = function(args, node){ // Give node.args and node
    return {
        "name":"math_random_float", // block type="text_print"
        "fields":{},        // tag field of the block <field ...>
        "values":{},                  // tag value
        "statements":{},     //tag statement
        "returnType":"int"
    };
};
BlockMirrorTextToBlocks.prototype.FUNCTIONS_BLOCKS["math"] = {};
/*

Fonction de base 

*/
BlockMirrorTextToBlocks.prototype.FUNCTIONS_BLOCKS["math"]["sqrt"] = function(args, node){ // Give node.args and node
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
BlockMirrorTextToBlocks.prototype.FUNCTIONS_BLOCKS["math"]["fabs"] = function(args, node){ // Give node.args and node
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
BlockMirrorTextToBlocks.prototype.FUNCTIONS_BLOCKS["math"]["log"] = function(args, node){ // Give node.args and node
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
BlockMirrorTextToBlocks.prototype.FUNCTIONS_BLOCKS["math"]["log10"] = function(args, node){ // Give node.args and node
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
BlockMirrorTextToBlocks.prototype.FUNCTIONS_BLOCKS["math"]["exp"] = function(args, node){ // Give node.args and node
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
BlockMirrorTextToBlocks.prototype.FUNCTIONS_BLOCKS["math"]["pow"] = function(args, node){ // Give node.args and node
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
/*

Fonction de trigo

*/
BlockMirrorTextToBlocks.prototype.FUNCTIONS_BLOCKS["math"]["sin"] = function(args, node){ // Give node.args and node
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
BlockMirrorTextToBlocks.prototype.FUNCTIONS_BLOCKS["math"]["cos"] = function(args, node){ // Give node.args and node
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
BlockMirrorTextToBlocks.prototype.FUNCTIONS_BLOCKS["math"]["asin"] = function(args, node){ // Give node.args and node
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
BlockMirrorTextToBlocks.prototype.FUNCTIONS_BLOCKS["math"]["acos"] = function(args, node){ // Give node.args and node
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
BlockMirrorTextToBlocks.prototype.FUNCTIONS_BLOCKS["math"]["atan"] = function(args, node){ // Give node.args and node
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
BlockMirrorTextToBlocks.prototype.FUNCTIONS_BLOCKS["math"]["atan2"] = function(args, node){ // Give node.args and node
    return {
        "name":"math_atan2", // block type="text_print"
        "fields":{},        // tag field of the block <field ...>
        "values":{          
            "X":BlockMirrorTextToBlocks.prototype.convert(args[0], node), // recursive conversion for args[0]
            "Y":BlockMirrorTextToBlocks.prototype.convert(args[1], node) // recursive conversion for args[0]
        },                  // tag value
        "statements":{}     //tag statement
    };
};
/*

Fonctions pour arrondir

*/
BlockMirrorTextToBlocks.prototype.FUNCTIONS_BLOCKS["math"]["round"] = function(args, node){ // Give node.args and node
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
BlockMirrorTextToBlocks.prototype.FUNCTIONS_BLOCKS["math"]["ceil"] = function(args, node){ // Give node.args and node
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
BlockMirrorTextToBlocks.prototype.FUNCTIONS_BLOCKS["math"]["floor"] = function(args, node){ // Give node.args and node
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
/*

Opérations sur les listes

*/
BlockMirrorTextToBlocks.prototype.FUNCTIONS_BLOCKS["math"]["sum"] = function(args, node){ // Give node.args and node
    return {
        "name":"math_on_list", // block type="text_print"
        "fields":{
            "OP":"SUM"
        },        // tag field of the block <field ...>
        "values":{          
            "NUM":BlockMirrorTextToBlocks.prototype.convert(args[0], node) // recursive conversion for args[0]
        },                  // tag value
        "statements":{}     //tag statement
    };
};
BlockMirrorTextToBlocks.prototype.FUNCTIONS_BLOCKS["math"]["max"] = function(args, node){ // Give node.args and node
    return {
        "name":"math_on_list", // block type="text_print"
        "fields":{
            "OP":"MAX"
        },        // tag field of the block <field ...>
        "values":{          
            "NUM":BlockMirrorTextToBlocks.prototype.convert(args[0], node) // recursive conversion for args[0]
        },                  // tag value
        "statements":{}     //tag statement
    };
};
BlockMirrorTextToBlocks.prototype.FUNCTIONS_BLOCKS["math"]["math_mean"] = function(args, node){ // Give node.args and node
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
BlockMirrorTextToBlocks.prototype.FUNCTIONS_BLOCKS["math"]["math_median"] = function(args, node){ // Give node.args and node
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
BlockMirrorTextToBlocks.prototype.FUNCTIONS_BLOCKS["math"]["math_modes"] = function(args, node){ // Give node.args and node
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
BlockMirrorTextToBlocks.prototype.FUNCTIONS_BLOCKS["math"]["math_standard_deviation"] = function(args, node){ // Give node.args and node
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
BlockMirrorTextToBlocks.prototype.FUNCTIONS_BLOCKS["random"]["choice"] = function(args, node){ // Give node.args and node
    return {
        "name":"math_on_list", // block type="text_print"
        "fields":{
            "OP":"RANDOM"
        },        // tag field of the block <field ...>
        "values":{          
            "NUM":BlockMirrorTextToBlocks.prototype.convert(args[0], node) // recursive conversion for args[0]
        },                  // tag value
        "statements":{}     //tag statement
    };
};
/*

Fonction rand

*/
BlockMirrorTextToBlocks.prototype.FUNCTIONS_BLOCKS["math"]["randint"] = function(args, node){ // Give node.args and node
    return {
        "name":"math_random_int", // block type="text_print"
        "fields":{},        // tag field of the block <field ...>
        "values":{          
            "FROM":BlockMirrorTextToBlocks.prototype.convert(args[0], node), // recursive conversion for args[0]
            "TO":BlockMirrorTextToBlocks.prototype.convert(args[1], node) // recursive conversion for args[0]
        },                  // tag value
        "statements":{}     //tag statement
    };
};
BlockMirrorTextToBlocks.prototype.FUNCTIONS_BLOCKS["math"]["random"] = function(args, node){ // Give node.args and node
    return {
        "name":"math_random_float", // block type="text_print"
        "fields":{},        // tag field of the block <field ...>
        "values":{},                  // tag value
        "statements":{}     //tag statement
    };
};

BlockMirrorTextToBlocks.prototype.FUNCTIONS_BLOCKS["math"]["math_isPrime"] = function(args, node){ // Give node.args and node
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
BlockMirrorTextToBlocks.prototype.FUNCTIONS_BLOCKS["math"]["min"] = function(args, node){ // Give node.args and node
    if (args[0].args != undefined && args[0].func != undefined && args[0].func.id != undefined && args[0].func.id.v === "max" ){
        return {
            "name":"math_constrain", // block type="text_print"
            "fields":{},        // tag field of the block <field ...>
            "values":{
                "VALUE" : BlockMirrorTextToBlocks.prototype.convert(args[0].args[0],node),
                "LOW": BlockMirrorTextToBlocks.prototype.convert(args[0].args[1],node) ,
                "HIGH": BlockMirrorTextToBlocks.prototype.convert(args[1],node)
            },                  // tag value
            "statements":{}     //tag statement
        };
    }
    return {
        "name":"error_function_min_math_js", // block type="text_print"
        "fields":{},        // tag field of the block <field ...>
        "values":{},                  // tag value
        "statements":{}     //tag statement
    };
};

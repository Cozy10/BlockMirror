PyBlock.prototype.FUNCTIONS_BLOCKS["math"] = {};
//PyBlock.prototype.FUNCTIONS_BLOCKS["random"] = {};
/*

Fonction de base 

*/
PyBlock.prototype.FUNCTIONS_BLOCKS["math"]["sqrt"] = function(args, node){ // Give node.args and node
    return {
        "name":"math_single", // block type="text_print"
        "fields":{
            "OP":"ROOT"
        },        // tag field of the block <field ...>
        "values":{          
            "NUM":PyBlock.prototype.convert(args[0], node) // recursive conversion for args[0]
        },                  // tag value
        "statements":{},     //tag statement
        "returnType":"float"
    };
};
PyBlock.prototype.FUNCTIONS_BLOCKS["math"]["fabs"] = function(args, node){ // Give node.args and node
    return {
        "name":"math_single", // block type="text_print"
        "fields":{
            "OP":"ABS"
        },        // tag field of the block <field ...>
        "values":{          
            "NUM":PyBlock.prototype.convert(args[0], node) // recursive conversion for args[0]
        },                  // tag value
        "statements":{},     //tag statement
        "returnType": "float"
    };
};
PyBlock.prototype.FUNCTIONS_BLOCKS["math"]["log"] = function(args, node){ // Give node.args and node
    return {
        "name":"math_single", // block type="text_print"
        "fields":{
            "OP":"LN"
        },        // tag field of the block <field ...>
        "values":{          
            "NUM":PyBlock.prototype.convert(args[0], node) // recursive conversion for args[0]
        },                  // tag value
        "statements":{},     //tag statement
        "returnType":"float"
    };
};
PyBlock.prototype.FUNCTIONS_BLOCKS["math"]["log10"] = function(args, node){ // Give node.args and node
    return {
        "name":"math_single", // block type="text_print"
        "fields":{
            "OP":"LOG10"
        },        // tag field of the block <field ...>
        "values":{          
            "NUM":PyBlock.prototype.convert(args[0], node) // recursive conversion for args[0]
        },                  // tag value
        "statements":{},     //tag statement
        "returnType":"float"
    };
};
PyBlock.prototype.FUNCTIONS_BLOCKS["math"]["exp"] = function(args, node){ // Give node.args and node
    return {
        "name":"math_single", // block type="text_print"
        "fields":{
            "OP":"EXP"
        },        // tag field of the block <field ...>
        "values":{          
            "NUM":PyBlock.prototype.convert(args[0], node) // recursive conversion for args[0]
        },                  // tag value
        "statements":{},     //tag statement
        "returnType": "float"
    };
};
PyBlock.prototype.FUNCTIONS_BLOCKS["math"]["pow"] = function(args, node){ // Give node.args and node
    return {
        "name":"math_single", // block type="text_print"
        "fields":{
            "OP":"POW10"
        },        // tag field of the block <field ...>
        "values":{          
            "NUM":PyBlock.prototype.convert(args[1], node) // recursive conversion for args[0]
        },                  // tag value
        "statements":{},     //tag statement
        "returnType":"float"
    };
};
/*

Fonction de trigo

*/
PyBlock.prototype.FUNCTIONS_BLOCKS["math"]["sin"] = function(args, node){ // Give node.args and node
    return {
        "name":"math_trig", // block type="text_print"
        "fields":{
            "OP":"SIN"
        },        // tag field of the block <field ...>
        "values":{          
            "NUM":PyBlock.prototype.convert(args[0], node) // recursive conversion for args[0]
        },                  // tag value
        "statements":{},     //tag statement
        "returnType":"float"
    };
};
PyBlock.prototype.FUNCTIONS_BLOCKS["math"]["cos"] = function(args, node){ // Give node.args and node
    return {
        "name":"math_trig", // block type="text_print"
        "fields":{
            "OP":"COS"
        },        // tag field of the block <field ...>
        "values":{          
            "NUM":PyBlock.prototype.convert(args[0], node) // recursive conversion for args[0]
        },                  // tag value
        "statements":{},     //tag statement
        "returnType":"float"
    };
};
PyBlock.prototype.FUNCTIONS_BLOCKS["math"]["asin"] = function(args, node){ // Give node.args and node
    return {
        "name":"math_trig", // block type="text_print"
        "fields":{
            "OP":"ASIN"
        },        // tag field of the block <field ...>
        "values":{          
            "NUM":PyBlock.prototype.convert(args[0], node) // recursive conversion for args[0]
        },                  // tag value
        "statements":{},     //tag statement
        "returnType":"float"
    };
};
PyBlock.prototype.FUNCTIONS_BLOCKS["math"]["acos"] = function(args, node){ // Give node.args and node
    return {
        "name":"math_trig", // block type="text_print"
        "fields":{
            "OP":"ACOS"
        },        // tag field of the block <field ...>
        "values":{          
            "NUM":PyBlock.prototype.convert(args[0], node) // recursive conversion for args[0]
        },                  // tag value
        "statements":{}     //tag statement
        , "returnType":"float"
    };
};
PyBlock.prototype.FUNCTIONS_BLOCKS["math"]["atan"] = function(args, node){ // Give node.args and node
    return {
        "name":"math_trig", // block type="text_print"
        "fields":{
            "OP":"ATAN"
        },        // tag field of the block <field ...>
        "values":{          
            "NUM":PyBlock.prototype.convert(args[0], node) // recursive conversion for args[0]
        },                  // tag value
        "statements":{}     //tag statement
        , "returnType":"float"
    };
};
PyBlock.prototype.FUNCTIONS_BLOCKS["math"]["atan2"] = function(args, node){ // Give node.args and node
    return {
        "name":"math_atan2", // block type="text_print"
        "fields":{},        // tag field of the block <field ...>
        "values":{          
            "X":PyBlock.prototype.convert(args[0], node), // recursive conversion for args[0]
            "Y":PyBlock.prototype.convert(args[1], node) // recursive conversion for args[0]
        },                  // tag value
        "statements":{}     //tag statement
        , "returnType":"float"
    };
};
/*

Fonctions pour arrondir

*/
PyBlock.prototype.FUNCTIONS_BLOCKS["math"]["round"] = function(args, node){ // Give node.args and node
    return {
        "name":"math_round", // block type="text_print"
        "fields":{
            "OP":"ROUND"
        },        // tag field of the block <field ...>
        "values":{          
            "NUM":PyBlock.prototype.convert(args[0], node) // recursive conversion for args[0]
        },                  // tag value
        "statements":{}     //tag statement
        , "returnType":"int"
    };
};
PyBlock.prototype.FUNCTIONS_BLOCKS["math"]["ceil"] = function(args, node){ // Give node.args and node
    return {
        "name":"math_round", // block type="text_print"
        "fields":{
            "OP":"ROUNDUP"
        },        // tag field of the block <field ...>
        "values":{          
            "NUM":PyBlock.prototype.convert(args[0], node) // recursive conversion for args[0]
        },                  // tag value
        "statements":{}     //tag statement
        , "returnType":"int"
    };
};
PyBlock.prototype.FUNCTIONS_BLOCKS["math"]["floor"] = function(args, node){ // Give node.args and node
    return {
        "name":"math_round", // block type="text_print"
        "fields":{
            "OP":"ROUNDDOWN"
        },        // tag field of the block <field ...>
        "values":{          
            "NUM":PyBlock.prototype.convert(args[0], node) // recursive conversion for args[0]
        },                  // tag value
        "statements":{}     //tag statement
        , "returnType":"int"
    };
};
/*

Opérations sur les listes

*/
PyBlock.prototype.FUNCTIONS_BLOCKS["math"]["sum"] = function(args, node){ // Give node.args and node
    let num_list = PyBlock.prototype.convert(args[0], node);
    return {
        "name":"math_on_list", // block type="text_print"
        "fields":{
            "OP":"SUM"
        },        // tag field of the block <field ...>
        "values":{          
            "NUM":num_list // recursive conversion for args[0]
        },                  // tag value
        "statements":{}     //tag statement
        , "returnType": ((num_list.elementsType !== "int") ? "float":"int")
    };
};
PyBlock.prototype.FUNCTIONS_BLOCKS["math"]["max"] = function(args, node){ // Give node.args and node
    let num_list = PyBlock.prototype.convert(args[0], node);
    return {
        "name":"math_on_list", // block type="text_print"
        "fields":{
            "OP":"MAX"
        },        // tag field of the block <field ...>
        "values":{          
            "LIST":num_list // recursive conversion for args[0]
        },                  // tag value
        "statements":{}     //tag statement
        , "returnType": ((num_list.elementsType !== "int") ? "float":"int")
    };
};



PyBlock.prototype.FUNCTIONS_BLOCKS["math"]["min"] = function(args, node){ // Give node.args and node
    if (args[0].args != undefined && args[0].func != undefined && args[0].func.id != undefined && args[0].func.id.v === "max" ){
        let nodes = [PyBlock.prototype.convert(args[0].args[0],node),
            PyBlock.prototype.convert(args[0].args[1],node),
            PyBlock.prototype.convert(args[1],node)];
        let type = "int";
        nodes.forEach((element =>{
            if(PyBlock.getVarType(element) === "float"){
                type = "float";
                return;
            }
        }));
        return {
            "name":"math_constrain", // block type="text_print"
            "fields":{},        // tag field of the block <field ...>
            "values":{
                "VALUE" : nodes[0],
                "LOW":  nodes[1],
                "HIGH": node[2]
            },                  // tag value
            "statements":{},     //tag statement
            "returnType": type
        };
    }
    return {
        "name":"error_function_min_math_js", // block type="text_print"
        "fields":{},        // tag field of the block <field ...>
        "values":{},                  // tag value
        "statements":{}     //tag statement
    };
};

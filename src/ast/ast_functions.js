
PyBlock.prototype.FUNCTIONS_BLOCKS = {};

PyBlock.prototype.FUNCTIONS_BLOCKS["print"] = 
    function(args, node){
        return {
            "name":"text_print", 
            "fields":{},        
            "values":{          
                "TEXT":PyBlock.prototype.convert(args[0], node) 
            },
            "statements":{},
            "returnType": undefined
        };
    };


PyBlock.prototype.METHODS_BLOCKS = {};
PyBlock.prototype.DEFAULT_METHODS_BLOCKS = {};
PyBlock.prototype.LOCAL_FUNCTIONS = {};

PyBlock.prototype.create_block_functionDef = function(name, mutation, type, returnType){
    return function(args, node){
        let values = {};
        if(args != null && args!= undefined){
            args.forEach((arg, i)=>{
                values["ARG"+i] = PyBlock.prototype.convert(arg, node);
            });
        }
        return {"name": type, // block type=name
            "fields":{
                "NAME":name
            },        // tag field of the block <field ...>
            "values":values,                  // tag value
            "mutations":mutation,      //tag mutation
            "statements":{},     //tag statement
            "returnType": returnType
        };
    };
}
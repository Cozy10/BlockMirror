// TODO: what if all returns are inside a if/else block ?

// The mutator container

PyBlock.prototype['ast_FunctionDef'] = function (node, parent) {
    let name = node.name;
    let blockName = "procedures_defnoreturn";
    let function_type = "procedures_callnoreturn";
    let returnNode;
    let returnType;

    let values = {};
    PyBlock.incrementLevel();
    // Search return and remove all items after in the block because useless
    node.body.forEach((element, i, tab) => {
        if(element._astname === "Return"){
            if(element.value != null){
                blockName = "procedures_defreturn";
                function_type = "procedures_callreturn";
                returnNode = this.convert(element.value, node);
                returnType = PyBlock.getVarType(returnNode);
                values["RETURN"] = returnNode;
            }
            tab.splice(i);
        }
    });

    // Args
    let mutation = {};
    for(let i = 0; i<node.args.args.length; i+=1){
        mutation[node.args.args[i].arg.v] = null;
    }

    // Register functions
    PyBlock.prototype.LOCAL_FUNCTIONS[name] = 
        PyBlock.prototype.create_block_functionDef(name, mutation, function_type, returnType);
    let stack = this.convertBody(node.body, node);
    PyBlock.decrementLevel();
    return PyBlock.create_block(blockName, node.lineno, undefined, {
            'NAME': Sk.ffi.remapToJs(name)
        }, values, {}, mutation, {
            'STACK': stack
        });
};

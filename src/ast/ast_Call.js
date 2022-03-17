function getModuleName(node_func){
    if(node_func == undefined || node_func.value == undefined){
        return undefined;
    }
    if(node_func.value.id != undefined){
        let name = Sk.ffi.remapToJs(node_func.value.id);
        let type = PyBlock.getVariable(name);
        if(type != undefined){
            return type;
        }
        if((typeof PyBlock.prototype.FUNCTIONS_BLOCKS[name]) == "undefined"){
            return null;
        }
        return name;
    }
    return node_func.value._astname;
}
PyBlock.prototype['ast_Call'] = function (node, parent) {
    let func = node.func;
    let args = node.args;
    // Can we make any guesses about this based on its name?
    let mModule = getModuleName(func);
    let blockDataFunc;
    let functionName;

    // Functions from an integrated module or function defined by user in blockly
    if(mModule === undefined){
        functionName = Sk.ffi.remapToJs(node.func.id);
        // If it's a cast register his type
        if(PyBlock.CAST_TYPE[functionName] != undefined
        && node.args.length == 1){
            node.args[0].python_type = PyBlock.CAST_TYPE[functionName];
            let res = this.convert(node.args[0], node);
            res = PyBlock.setVarType(res, PyBlock.CAST_TYPE[functionName]);
            return res;
        }
        blockDataFunc = PyBlock.prototype.LOCAL_FUNCTIONS[functionName];
        if(blockDataFunc === undefined){
            blockDataFunc = PyBlock.prototype.FUNCTIONS_BLOCKS[functionName];
        }
    }
    else if(PyBlock.prototype.FUNCTIONS_BLOCKS[mModule] !== undefined){
        functionName = Sk.ffi.remapToJs(node.func.attr);
        blockDataFunc = PyBlock.prototype.FUNCTIONS_BLOCKS[mModule][functionName];
    }
    else{ // Methods
        functionName = Sk.ffi.remapToJs(node.func.attr);
        args = ((args == null) ? [node.func.value] : [node.func.value].concat(args));
        let methodsBlock = ((mModule === null) ? PyBlock.prototype.DEFAULT_METHODS_BLOCKS : PyBlock.prototype.METHODS_BLOCKS[mModule]);
        blockDataFunc = methodsBlock[functionName];
    }
    if(blockDataFunc !== undefined){
        let blockData = blockDataFunc(args, node);
        let block = PyBlock.create_block(blockData.name, node.lineno, blockData.returnType, blockData.fields,
            blockData.values, {}, blockData.mutations, blockData.statements);
        if(blockData.parentBlock != undefined){
            block = blockData.parentBlock(block);
        }
        return block;
    }
    throw new Error("Python undefined function " + functionName);
};


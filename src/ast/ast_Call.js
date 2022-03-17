function getModuleName(node_func){
    if(node_func == undefined || node_func.value == undefined){
        return undefined;
    }
    if(node_func.value.id != undefined){
        return Sk.ffi.remapToJs(node_func.value.id);
    }
    return node_func.value._astname;
}
PyBlock.prototype['ast_Call'] = function (node, parent) {
    let func = node.func;
    let args = node.args;
    // Can we make any guesses about this based on its name?
    let mModule = getModuleName(func);
    let blockDataFunc;

    // Functions from an integrated module or function defined by user in blockly
    if(mModule === undefined){
        // If it's a cast register his type
        if(PyBlock.CAST_TYPE[Sk.ffi.remapToJs(node.func.id)] != undefined
        && node.args.length == 1){
            node.args[0].python_type = PyBlock.CAST_TYPE[Sk.ffi.remapToJs(node.func.id)];
            let res = this.convert(node.args[0], node);
            res = PyBlock.setVarType(res, PyBlock.CAST_TYPE[Sk.ffi.remapToJs(node.func.id)]);
            return res;
        }
        blockDataFunc = PyBlock.prototype.LOCAL_FUNCTIONS[Sk.ffi.remapToJs(node.func.id)];
        if(blockDataFunc === undefined){
            blockDataFunc = PyBlock.prototype.FUNCTIONS_BLOCKS[Sk.ffi.remapToJs(node.func.id)];
        }
    }
    else if(PyBlock.prototype.FUNCTIONS_BLOCKS[mModule] !== undefined){
        blockDataFunc = PyBlock.prototype.FUNCTIONS_BLOCKS[mModule][Sk.ffi.remapToJs(node.func.attr)];
    }
    else{ // Methods
        args = ((args == null) ? [node.func.value] : [node.func.value].concat(args));
        blockDataFunc = PyBlock.prototype.METHODS_BLOCKS[Sk.ffi.remapToJs(node.func.attr)];
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
    throw new Error("Could not find function: " + functionName);
};


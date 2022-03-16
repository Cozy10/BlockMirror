function getModuleName(node_func){
    if(node_func == undefined || node_func.value == undefined){
        return undefined;
    }
    if(node_func.value.id != undefined){
        return Sk.ffi.remapToJs(node_func.value.id);
    }
    return node_func.value._astname;
}
BlockMirrorTextToBlocks.prototype['ast_Call'] = function (node, parent) {
    let func = node.func;
    let args = node.args;
    // Can we make any guesses about this based on its name?
    let mModule = getModuleName(func);
    let blockDataFunc;

    // Functions from an integrated module or function defined by user in blockly
    if(mModule === undefined){
        // If it's a cast register his type
        if(BlockMirrorTextToBlocks.CAST_TYPE[Sk.ffi.remapToJs(node.func.id)] != undefined
        && node.args.length == 1){
            node.args[0].python_type = BlockMirrorTextToBlocks.CAST_TYPE[Sk.ffi.remapToJs(node.func.id)];
            let res = this.convert(node.args[0], node);
            res = BlockMirrorTextToBlocks.setVarType(res, BlockMirrorTextToBlocks.CAST_TYPE[Sk.ffi.remapToJs(node.func.id)]);
            return res;
        }
        blockDataFunc = BlockMirrorTextToBlocks.prototype.LOCAL_FUNCTIONS[Sk.ffi.remapToJs(node.func.id)];
        if(blockDataFunc === undefined){
            blockDataFunc = BlockMirrorTextToBlocks.prototype.FUNCTIONS_BLOCKS[Sk.ffi.remapToJs(node.func.id)];
        }
    }
    else if(BlockMirrorTextToBlocks.prototype.FUNCTIONS_BLOCKS[mModule] !== undefined){
        blockDataFunc = BlockMirrorTextToBlocks.prototype.FUNCTIONS_BLOCKS[mModule][Sk.ffi.remapToJs(node.func.attr)];
    }
    else{ // Methods
        args = ((args == null) ? [node.func.value] : [node.func.value].concat(args));
        blockDataFunc = BlockMirrorTextToBlocks.prototype.METHODS_BLOCKS[Sk.ffi.remapToJs(node.func.attr)];
    }
    if(blockDataFunc !== undefined){
        let blockData = blockDataFunc(args, node);
        return BlockMirrorTextToBlocks.create_block(blockData.name, node.lineno, blockData.returnType, blockData.fields,
            blockData.values, {}, blockData.mutations, blockData.statements);
    }
    throw new Error("Could not find function: " + functionName);
};


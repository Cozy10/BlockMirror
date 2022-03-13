BlockMirrorTextToBlocks.CAST_TYPE = {
    "str":"Str",
    "int":"int",
    "float":"float",
    "bool":"bool",
    "list":"list"
}

BlockMirrorTextToBlocks.setVarType = (block, typeName)=>{
    block.foundType = BlockMirrorTextToBlocks.CAST_TYPE[typeName];
    return block;
}
BlockMirrorTextToBlocks.getVarType = (block)=>{
    return (((block != undefined) && (block != undefined)) ? block.foundType : undefined);
}
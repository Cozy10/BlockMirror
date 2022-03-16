BlockMirrorTextToBlocks.CAST_TYPE = { // cast_function : type
    "str":"Str",
    "int":"int",
    "float":"float",
    "bool":"bool",
    "list":"list",
    "char":"char"
}

BlockMirrorTextToBlocks.setVarType = (block, typeName)=>{
    block.foundType = typeName;
    return block;
}
BlockMirrorTextToBlocks.getVarType = (block)=>{
    return (((block != undefined) && (block != undefined)) ? block.foundType : undefined);
}
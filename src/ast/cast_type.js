PyBlock.CAST_TYPE = { // cast_function : type
    "str":"Str",
    "int":"int",
    "float":"float",
    "bool":"bool",
    "list":"list",
    "char":"char"
}

PyBlock.setVarType = (block, typeName)=>{
    block.foundType = typeName;
    return block;
}
PyBlock.getVarType = (block)=>{
    return (((block != undefined) && (block != undefined)) ? block.foundType : undefined);
}
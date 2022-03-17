PyBlock.CAST_TYPE = { // cast_function : type
    "str":"Str",
    "int":"int",
    "float":"float",
    "bool":"bool",
    "list":"List",
    "char":"char"
}
for(const type in PyBlock.CAST_TYPE){
    PyBlock.prototype.METHODS_BLOCKS[PyBlock.CAST_TYPE[type]] = {};
}
PyBlock.setVarType = (block, typeName)=>{
    block.foundType = typeName;
    return block;
}
PyBlock.getVarType = (block)=>{
    return (((block != undefined) && (block != undefined)) ? block.foundType : undefined);
}
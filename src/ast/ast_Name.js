PyBlock.prototype['ast_Name'] = function (node, parent) {
    var id = node.id;
    var ctx = node.ctx;
    if (id.v == Blockly.Python.blank) {
        return null;
    } else {
        let res = PyBlock.create_block('variables_get', node.lineno,
            PyBlock.getVariable(id.v), {
                "VAR": id.v
            });
        res.variableName = id.v;
        // if(PyBlock.variableName[res.variableName] != undefined){
        //     res.foundType = PyBlock.variableName[res.variableName].type;
        // }
        return res;
    }
}
PyBlock.getName = (block)=>{ return block.variableName; };
PyBlock.setName = (block, var_name)=>{ 
    block.variableName = var_name;
    return block;
};

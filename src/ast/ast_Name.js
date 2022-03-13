BlockMirrorTextToBlocks.prototype['ast_Name'] = function (node, parent) {
    var id = node.id;
    var ctx = node.ctx;
    if (id.v == Blockly.Python.blank) {
        return null;
    } else {
        let res = BlockMirrorTextToBlocks.create_block('variables_get', node.lineno,
            BlockMirrorTextToBlocks.Variables[id.v], {
                "VAR": id.v
            });
        res.variableName = id.v;
        // if(BlockMirrorTextToBlocks.variableName[res.variableName] != undefined){
        //     res.foundType = BlockMirrorTextToBlocks.variableName[res.variableName].type;
        // }
        return res;
    }
}
BlockMirrorTextToBlocks.getName = (block)=>{ return block.variableName; };
BlockMirrorTextToBlocks.setName = (block, var_name)=>{ 
    block.variableName = var_name;
    return block;
};

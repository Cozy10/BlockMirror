
BlockMirrorTextToBlocks.prototype['ast_Name'] = function (node, parent) {
    var id = node.id;
    var ctx = node.ctx;
    if (id.v == Blockly.Python.blank) {
        return null;
    } else {
        let res = BlockMirrorTextToBlocks.create_block('variables_get', node.lineno, {
            "VAR": id.v
        });
        res.variableName = id.v;
        return res;
    }
}

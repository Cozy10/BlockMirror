
BlockMirrorTextToBlocks.prototype['ast_Name'] = function (node, parent) {
    var id = node.id;
    var ctx = node.ctx;
    if (id.v == Blockly.Python.blank) {
        return null;
    } else {
        return BlockMirrorTextToBlocks.create_block('variables_get', node.lineno, {
            "VAR": id.v
        });
    }
}

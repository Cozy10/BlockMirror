BlockMirrorTextToBlocks.prototype['ast_Continue'] = function (node, parent) {
    return BlockMirrorTextToBlocks.create_block("controls_flow_statements", node.lineno, {"FLOW":"CONTINUE"});
};
BlockMirrorTextToBlocks.BLOCKS.push({
    "type": "ast_Continue",
    "message0": "continue",
    "inputsInline": false,
    "previousStatement": null,
    "nextStatement": null,
    "colour": BlockMirrorTextToBlocks.COLOR.CONTROL,
});

Blockly.Python['ast_Continue'] = function (block) {
    return "continue\n";
};

BlockMirrorTextToBlocks.prototype['ast_Continue'] = function (node, parent) {
    return BlockMirrorTextToBlocks.create_block("controls_flow_statements", node.lineno, {"FLOW":"CONTINUE"});
};
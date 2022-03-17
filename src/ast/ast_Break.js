PyBlock.prototype['ast_Break'] = function (node, parent) {
    return PyBlock.create_block("controls_flow_statements", node.lineno, undefined, {"FLOW":"BREAK"});
};
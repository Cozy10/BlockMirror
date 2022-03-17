PyBlock.prototype['ast_Continue'] = function (node, parent) {
    return PyBlock.create_block("controls_flow_statements", node.lineno, undefined, {"FLOW":"CONTINUE"});
};
BlockMirrorTextToBlocks.prototype['ast_IfExp'] = function (node, parent) {
    let test = node.test;
    let body = node.body;
    let orelse = node.orelse;
    let nodeThen = this.convert(node.body, node);
    let nodeElse = this.convert(node.orelse, node);
    // For now only take the type of the then node
    return BlockMirrorTextToBlocks.create_block("logic_ternary", node.lineno, BlockMirrorTextToBlocks.getVarType(nodeThen), {}, {
        "IF": this.convert(test, node),
        "THEN": nodeThen,
        "ELSE": nodeElse
    });
};
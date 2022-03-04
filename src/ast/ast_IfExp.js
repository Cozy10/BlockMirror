BlockMirrorTextToBlocks.prototype['ast_IfExp'] = function (node, parent) {
    let test = node.test;
    let body = node.body;
    let orelse = node.orelse;

    return BlockMirrorTextToBlocks.create_block("logic_ternary", node.lineno, {}, {
        "IF": this.convert(test, node),
        "THEN": this.convert(body, node),
        "ELSE": this.convert(orelse, node)
    });
};
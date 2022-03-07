BlockMirrorTextToBlocks.prototype['ast_YieldFrom'] = function (node, parent) {
    let value = node.value;

    return BlockMirrorTextToBlocks.create_block("ast_YieldFrom", node.lineno, {}, {
        "VALUE": this.convert(value, node)
    });
};
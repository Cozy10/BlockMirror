BlockMirrorTextToBlocks.prototype['ast_Yield'] = function (node, parent) {
    let value = node.value;

    if (value == null) {
        return BlockMirrorTextToBlocks.create_block("ast_Yield", node.lineno, undefined);
    } else {
        return BlockMirrorTextToBlocks.create_block("ast_YieldFull", node.lineno, undefined, {}, {
            "VALUE": this.convert(value, node)
        });
    }
};
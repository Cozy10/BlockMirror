BlockMirrorTextToBlocks.prototype['ast_Return'] = function (node, parent) {
    let value = node.value;

    if (value == null) {
        return BlockMirrorTextToBlocks.create_block("ast_Return", node.lineno);
    } else {
        return BlockMirrorTextToBlocks.create_block("procedures_ifreturn", node.lineno, {}, {
            "CONDITION": BlockMirrorTextToBlocks.create_block("logic_boolean", node.lineno, {"BOOL":"TRUE"}),
            "VALUE": this.convert(value, node)
        });
    }
};
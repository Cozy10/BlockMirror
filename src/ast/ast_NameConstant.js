BlockMirrorTextToBlocks.prototype['ast_NameConstant'] = function (node, parent) {
    let value = node.value;

    if (value === Sk.builtin.none.none$) {
        return BlockMirrorTextToBlocks.create_block('ast_NameConstantNone', node.lineno, {});
    } else if (value === Sk.builtin.bool.true$) {
        return BlockMirrorTextToBlocks.create_block('logic_boolean', node.lineno, {
            "BOOL": 'TRUE'
        });
    } else if (value === Sk.builtin.bool.false$) {
        return BlockMirrorTextToBlocks.create_block('logic_boolean', node.lineno, {
            "BOOL": 'FALSE'
        });
    }
};
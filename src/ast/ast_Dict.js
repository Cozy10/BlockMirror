
BlockMirrorTextToBlocks.prototype['ast_Dict'] = function (node, parent) {
    let keys = node.keys;
    let values = node.values;

    if (keys === null) {
        return BlockMirrorTextToBlocks.create_block("ast_Dict", node.lineno, {},
            {}, {"inline": "false"}, {"@items": 0});
    }

    let elements = {};
    for (let i = 0; i < keys.length; i++) {
        let key = keys[i];
        let value = values[i];
        elements["ADD" + i] = BlockMirrorTextToBlocks.create_block("ast_DictItem", node.lineno, {},
            {
                "KEY": this.convert(key, node),
                "VALUE": this.convert(value, node)
            },
            this.LOCKED_BLOCK);
    }

    return BlockMirrorTextToBlocks.create_block("ast_Dict", node.lineno, {},
        elements,
        {
            "inline": "false"
        }, {
            "@items": keys.length
        });
}

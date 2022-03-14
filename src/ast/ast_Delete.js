BlockMirrorTextToBlocks.prototype['ast_Delete'] = function (node, parent) {
    let targets = node.targets;

    return BlockMirrorTextToBlocks.create_block("ast_Delete", node.lineno, undefined, {},
        this.convertElements("TARGET", targets, node),
        {
            "inline": "true",
        }, {
            "@targets": targets.length
        });
};
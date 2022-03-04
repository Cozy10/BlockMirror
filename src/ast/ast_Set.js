BlockMirrorTextToBlocks.prototype['ast_Set'] = function (node, parent) {
    var elts = node.elts;

    return BlockMirrorTextToBlocks.create_block("ast_Set", node.lineno, {},
        this.convertElements("ADD", elts, node),
        {
            "inline": elts.length > 3 ? "false" : "true",
        }, {
            "@items": elts.length
        });
}

BlockMirrorTextToBlocks.prototype['ast_Tuple'] = function (node, parent) {
    var elts = node.elts;
    var ctx = node.ctx;

    return BlockMirrorTextToBlocks.create_block("ast_Tuple", node.lineno, undefined, {},
        this.convertElements("ADD", elts, node),
        {
            "inline": elts.length > 4 ? "false" : "true",
        }, {
            "@items": elts.length
        });
}

BlockMirrorTextToBlocks.prototype['ast_Starred'] = function (node, parent) {
    let value = node.value;
    let ctx = node.ctx;

    return BlockMirrorTextToBlocks.create_block('ast_Starred', node.lineno, undefined, {}, {
        "VALUE": this.convert(value, node)
    }, {
        "inline": true
    });
}
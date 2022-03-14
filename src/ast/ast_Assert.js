BlockMirrorTextToBlocks.prototype['ast_Assert'] = function (node, parent) {
    var test = node.test;
    var msg = node.msg;
    if (msg == null) {
        return BlockMirrorTextToBlocks.create_block("ast_Assert", node.lineno, undefined, {}, {
            "TEST": this.convert(test, node)
        });
    } else {
        return BlockMirrorTextToBlocks.create_block("ast_AssertFull", node.lineno, undefined, {}, {
            "TEST": this.convert(test, node),
            "MSG": this.convert(msg, node)
        });
    }
};
BlockMirrorTextToBlocks.prototype['ast_Raise'] = function (node, parent) {
    var exc = node.exc;
    var cause = node.cause;
    let values = {};
    let hasExc = false, hasCause = false;
    if (exc !== null) {
        values['EXC'] = this.convert(exc, node);
        hasExc = true;
    }
    if (cause !== null) {
        values['CAUSE'] = this.convert(cause, node);
        hasCause = true;
    }
    return BlockMirrorTextToBlocks.create_block("ast_Raise", node.lineno, undefined, {}, values, {}, {
        '@exc': hasExc,
        '@cause': hasCause
    });
};
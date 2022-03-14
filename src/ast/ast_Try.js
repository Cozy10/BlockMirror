BlockMirrorTextToBlocks.HANDLERS_CATCH_ALL = 0;
BlockMirrorTextToBlocks.HANDLERS_NO_AS = 1;
BlockMirrorTextToBlocks.HANDLERS_COMPLETE = 3;

BlockMirrorTextToBlocks.prototype['ast_Try'] = function (node, parent) {
    let body = node.body;
    let handlers = node.handlers;
    let orelse = node.orelse;
    let finalbody = node.finalbody;

    let fields = {};
    let values = {};
    let mutations = {
        "@ORELSE": orelse !== null  && orelse.length > 0,
        "@FINALBODY": finalbody !== null  && finalbody.length > 0,
        "@HANDLERS": handlers.length
    };

    let statements = {"BODY": this.convertBody(body, node)};
    if (orelse !== null) {
        statements['ORELSE'] = this.convertBody(orelse, node);
    }
    if (finalbody !== null && finalbody.length) {
        statements['FINALBODY'] = this.convertBody(finalbody, node);
    }

    let handledLevels = [];
    for (let i = 0; i < handlers.length; i++) {
        let handler = handlers[i];
        statements["HANDLER" + i] = this.convertBody(handler.body, node);
        if (handler.type === null) {
            handledLevels.push(BlockMirrorTextToBlocks.HANDLERS_CATCH_ALL);
        } else {
            values["TYPE" + i] = this.convert(handler.type, node);
            if (handler.name === null) {
                handledLevels.push(BlockMirrorTextToBlocks.HANDLERS_NO_AS);
            } else {
                handledLevels.push(BlockMirrorTextToBlocks.HANDLERS_COMPLETE);
                fields["NAME" + i] = Sk.ffi.remapToJs(handler.name.id);
            }
        }
    }

    mutations["ARG"] = handledLevels;

    return BlockMirrorTextToBlocks.create_block("ast_Try", node.lineno, undefined, fields,
        values, {}, mutations, statements);
};
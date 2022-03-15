BlockMirrorTextToBlocks.prototype['ast_While'] = function (node, parent) {

    let values = {"BOOL": this.convert(node.test, node)};
    BlockMirrorTextToBlocks.incrementLevel();
    let statements = {"DO": this.convertBody(node.body, node)};
    BlockMirrorTextToBlocks.decrementLevel();
    let mode;

    if(node.test.op != undefined && node.test.op.prototype._astname == "Not"){
        mode = "UNTIL";
        values = {"BOOL": this.convert(node.test.operand, node)};
    }
    else{
        mode = "WHILE";
        values = {"BOOL" : this.convert(node.test, node)};
    }
    return BlockMirrorTextToBlocks.create_block("controls_whileUntil", node.lineno, undefined, {"MODE":mode},
        values, {}, {}, statements);
};
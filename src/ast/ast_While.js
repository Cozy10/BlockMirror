PyBlock.prototype['ast_While'] = function (node, parent) {

    let values = {"BOOL": this.convert(node.test, node)};
    PyBlock.incrementLevel();
    let statements = {"DO": this.convertBody(node.body, node)};
    PyBlock.decrementLevel();
    let mode;

    if(node.test.op != undefined && node.test.op.prototype._astname == "Not"){
        mode = "UNTIL";
        values = {"BOOL": this.convert(node.test.operand, node)};
    }
    else{
        mode = "WHILE";
        values = {"BOOL" : this.convert(node.test, node)};
    }
    return PyBlock.create_block("controls_whileUntil", node.lineno, undefined, {"MODE":mode},
        values, {}, {}, statements);
};
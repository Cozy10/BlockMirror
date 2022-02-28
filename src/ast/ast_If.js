BlockMirrorTextToBlocks.prototype['ast_If'] = function (node, parent) {
    let test = node.test;
    let body = node.body;
    let orelse = node.orelse;

    let hasOrelse = 0;
    let elifCount = 0;

    // check if it's ifreturn block if immediatly follow by a return
    if(orelse != undefined && orelse.length == 0 && node.body[0]._astname == "Return"){
        return BlockMirrorTextToBlocks.create_block("procedures_ifreturn", node.lineno, {}, {
            "CONDITION": this.convert(test, node),
            "VALUE": this.convert(node.body[0].value, node)
        });        
    }

    let values = {"IF0": this.convert(test, node)};
    let statements = {"DO0": this.convertBody(body, node)};

    while (orelse !== undefined && orelse.length > 0) {
        if (orelse.length === 1) {
            if (orelse[0]._astname === "If") {
                // This is an ELIF
                this.heights.shift();
                elifCount++;
                values['IF' + elifCount] = this.convert(orelse[0].test, node);
                statements['DO' + elifCount] = this.convertBody(orelse[0].body, node);
            } else {
                hasOrelse = 1;
                statements['ELSE'] = this.convertBody(orelse, node);
            }
        } else {
            hasOrelse = 1;
            statements['ELSE'] = this.convertBody(orelse, node);
        }
        orelse = orelse[0].orelse;
    }

    return BlockMirrorTextToBlocks.create_block("controls_if", node.lineno, {},
        values, {}, {
            "@else": hasOrelse,
            "@elseif": elifCount
        }, statements);
};
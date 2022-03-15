BlockMirrorTextToBlocks.prototype['ast_If'] = function (node, parent) {
    let test = node.test;
    let body = node.body;
    let orelse = node.orelse;

    let hasOrelse = 0;
    let elifCount = 0;


    // check if it's ifreturn block if immediatly follow by a return
    if(orelse != undefined && orelse.length == 0 && node.body[0]._astname == "Return"){
        let values = {"CONDITION": this.convert(test, node)}
        let returnType;
        if(node.body[0].value != null){
            BlockMirrorTextToBlocks.incrementLevel();
            values["VALUE"] = this.convert(node.body[0].value, node);
            returnType = BlockMirrorTextToBlocks.getVarType(values['VALUE']);
        }
        let res = BlockMirrorTextToBlocks.create_block("procedures_ifreturn", node.lineno, returnType, {}, values);
        BlockMirrorTextToBlocks.decrementLevel();
        return res;
    }
    let values = {"IF0": this.convert(test, node)};
    BlockMirrorTextToBlocks.incrementLevel();
    let statements = {"DO0": this.convertBody(body, node)};
    BlockMirrorTextToBlocks.decrementLevel();

    while (orelse !== undefined && orelse.length > 0) {
        if (orelse.length === 1) {
            if (orelse[0]._astname === "If") {
                // This is an ELIF
                this.heights.shift();
                elifCount++;
                values['IF' + elifCount] = this.convert(orelse[0].test, node);
                BlockMirrorTextToBlocks.incrementLevel();
                statements['DO' + elifCount] = this.convertBody(orelse[0].body, node);
                BlockMirrorTextToBlocks.decrementLevel();
            } else {
                hasOrelse = 1;
                BlockMirrorTextToBlocks.incrementLevel();
                statements['ELSE'] = this.convertBody(orelse, node);
                BlockMirrorTextToBlocks.decrementLevel();
            }
        } else {
            hasOrelse = 1;
            BlockMirrorTextToBlocks.incrementLevel();
            statements['ELSE'] = this.convertBody(orelse, node);
            BlockMirrorTextToBlocks.decrementLevel();
        }
        orelse = orelse[0].orelse;
    }
    
    return BlockMirrorTextToBlocks.create_block("controls_if", node.lineno,
        undefined,
        {},
        values, {}, {
            "@else": hasOrelse,
            "@elseif": elifCount
        }, statements);
};
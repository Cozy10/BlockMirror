PyBlock.prototype['ast_If'] = function (node, parent) {
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
            PyBlock.incrementLevel();
            values["VALUE"] = this.convert(node.body[0].value, node);
            returnType = PyBlock.getVarType(values['VALUE']);
        }
        let res = PyBlock.create_block("procedures_ifreturn", node.lineno, returnType, {}, values);
        PyBlock.decrementLevel();
        return res;
    }
    let values = {"IF0": this.convert(test, node)};
    PyBlock.incrementLevel();
    let statements = {"DO0": this.convertBody(body, node)};
    PyBlock.decrementLevel();

    while (orelse !== undefined && orelse.length > 0) {
        if (orelse.length === 1) {
            if (orelse[0]._astname === "If") {
                // This is an ELIF
                this.heights.shift();
                elifCount++;
                values['IF' + elifCount] = this.convert(orelse[0].test, node);
                PyBlock.incrementLevel();
                statements['DO' + elifCount] = this.convertBody(orelse[0].body, node);
                PyBlock.decrementLevel();
            } else {
                hasOrelse = 1;
                PyBlock.incrementLevel();
                statements['ELSE'] = this.convertBody(orelse, node);
                PyBlock.decrementLevel();
            }
        } else {
            hasOrelse = 1;
            PyBlock.incrementLevel();
            statements['ELSE'] = this.convertBody(orelse, node);
            PyBlock.decrementLevel();
        }
        orelse = orelse[0].orelse;
    }
    
    return PyBlock.create_block("controls_if", node.lineno,
        undefined,
        {},
        values, {}, {
            "@else": hasOrelse,
            "@elseif": elifCount
        }, statements);
};
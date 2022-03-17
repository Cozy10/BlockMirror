var isWeirdSliceCase = function(slice) {
    return (slice.lower == null && slice.upper == null &&
        slice.step !== null && slice.step._astname === 'NameConstant' &&
        slice.step.value === Sk.builtin.none.none$);
}

PyBlock.prototype.addSliceDim = function (slice, i, values, mutations, node) {
    let sliceKind = slice._astname;
    if (sliceKind === "Index") {
        values['INDEX' + i] = this.convert(slice.value, node);
        mutations.push("I");
    } else if (sliceKind === "Slice") {
        let L = "0", U = "0", S = "0";
        if (slice.lower !== null) {
            values['SLICELOWER' + i] = this.convert(slice.lower, node);
            L = "1";
        }
        if (slice.upper !== null) {
            values['SLICEUPPER' + i] = this.convert(slice.upper, node);
            U = "1";
        }
        if (slice.step !== null && !isWeirdSliceCase(slice)) {
            values['SLICESTEP' + i] = this.convert(slice.step, node);
            S = "1";
        }
        mutations.push("S" + L + U + S);
    }
}

PyBlock.prototype['ast_Index'] = function(node, parent){
    var value = node.value;
    var lineno = node._parent.lineno;
    let num = this.convert(value, node);
    return PyBlock.create_block("math_number", lineno, PyBlock.getVarType(num), {
        "NUM": num
    });
}

PyBlock.prototype['ast_Slice'] = function(node, parent){
    return null;
}

PyBlock.prototype['ast_Subscript'] = function(node, parent){
    var value = node.value;
    var slice = node.slice;
    // in list get sub-list from
    if(slice._astname === 'Slice'){
        let lower = slice.lower;
        let lower_value;
        let upper = slice.upper;
        let where1 = "FROM_START";
        let where2 = "FROM_START";
        let at1 = "true";
        let at2 = "true";
        let blockName;
        let foundType;
        let valueNode = this.convert(value, node);
        let values;
        if(PyBlock.getVarType(valueNode) === "Str"){
            blockName = "text_getSubstring";
            foundType = "Str";
            values = {
                "STRING":valueNode
            }
        }
        else{
            blockName = "lists_getSublist";
            foundType = "List";
            values = {
                "LIST":valueNode
            }
        }
        if(lower != null && lower.op != undefined && lower.op.prototype._astname === 'USub'){
            lower = lower.operand;
            lower_value = this.convert(lower, node);
            where1 = "FROM_END";
        }
        if(upper != null && upper.op != undefined && upper.op.prototype._astname === 'USub'){
            upper = upper.operand;
            where2 = "FROM_END";
        }
        
        if(lower == null){
            at1 = "false";
            where1 = "FIRST";
        }
        else{
            if(where1 != "FROM_END"){
                if(lower._astname == 'Num'){
                    lower.n.v += 1;
                    lower_value = this.convert(lower, node);
                }
                else{
                    let right = PyBlock.createNumBlock(1, "int", node);
                    lower_value = PyBlock.createOpBlock("ADD", this.convert(lower, node), right, "int", node);
                }
            }
            Object.assign(values, {"AT1":lower_value});
        }
        if(upper == null){
            at2 = "false";
            where2 = "LAST";
        }
        else{
            Object.assign(values, {"AT2":this.convert(upper, node)});
        }

        return PyBlock.create_block(
            blockName, // type
            node.lineno, // line_number
            foundType,
            {
                "WHERE1":where1,
                "WHERE2":where2
            }, // fields
            values //values
            , {} // settings
            , 
            {
                "@at1":at1,
                "@at2":at2 // mutations
            }
            , {} // statements
            );
    }

    // in list get element from index
    if(slice._astname === 'Index'){
        let mode = "GET";
        let at = "true";
        let where = "FROM_START";
        let statement = "false";
        let blockName;
        let valueNode = this.convert(value, node);
        let foundType;
        if(PyBlock.getVarType(valueNode) === "Str"){
            blockName = "text_charAt";
            foundType = "char";
        }
        else {
            blockName = "lists_getIndex";
            foundType = PyBlock.Lists[PyBlock.getName(valueNode)];
        }
        // in list get # from start par defaut
        
        let values = {
            "VALUE":valueNode
        }

        // in list get # from end et in list get last
        if(slice.value.op != undefined && slice.value.op.prototype._astname === 'USub'){
            // in list get last
            if(slice.value.operand.n != undefined && slice.value.operand.n.v == 1){
                where = "LAST";
                at = "false";
            }
            // in list get # from end
            else{
                where = "FROM_END";
                Object.assign(values, {"AT":this.convert(slice.value.operand, node)});
            }
        }
        // in list get first
        else if(slice.value != undefined && slice.value.n != undefined && slice.value.n.v == 0){
            where = "FIRST";
            at = "false";
        }
        else if(at == "true"){
            let value;
            if(slice.value._astname == 'Num'){
                slice.value.n.v += 1;
                value = this.convert(slice.value, node);
            }
            else{
                let right = PyBlock.createNumBlock(1, "int", node);
                value = PyBlock.createOpBlock("ADD", this.convert(slice.value, node), right, "int", node);
            }
            Object.assign(values, {"AT":value});
        }

        let fields = {};
        if(foundType != "char"){
            Object.assign(fields, {"MODE":mode});
        }
        Object.assign(fields, {"WHERE":where});

        return PyBlock.create_block(
            blockName, // type
            node.lineno, // line_number
            foundType,
            fields, // fields
            values //values
            , {} // settings
            , 
            {
                "@statement":statement,
                "@at":at // mutations
            }
            , {} // statements
            );
    }
}
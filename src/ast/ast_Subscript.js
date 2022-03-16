var isWeirdSliceCase = function(slice) {
    return (slice.lower == null && slice.upper == null &&
        slice.step !== null && slice.step._astname === 'NameConstant' &&
        slice.step.value === Sk.builtin.none.none$);
}

BlockMirrorTextToBlocks.prototype.addSliceDim = function (slice, i, values, mutations, node) {
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

BlockMirrorTextToBlocks.prototype['ast_Index'] = function(node, parent){
    var value = node.value;
    var lineno = node._parent.lineno;
    let num = this.convert(value, node);
    return BlockMirrorTextToBlocks.create_block("math_number", lineno, BlockMirrorTextToBlocks.getVarType(num), {
        "NUM": num
    });
}

BlockMirrorTextToBlocks.prototype['ast_Slice'] = function(node, parent){
    return null;
}

BlockMirrorTextToBlocks.prototype['ast_Subscript'] = function(node, parent){
    var value = node.value;
    var slice = node.slice;
    // in list get sub-list from
    if(slice._astname === 'Slice'){
        let lower = slice.lower;
        let upper = slice.upper;
        let where1 = "FROM_START";
        let where2 = "FROM_START";
        let at1 = "true";
        let at2 = "true";
        if(lower != null && lower.op != undefined && lower.op.prototype._astname === 'USub'){
            lower = lower.operand;
            where1 = "FROM_END";
        }
        if(upper != null && upper.op != undefined && upper.op.prototype._astname === 'USub'){
            upper = upper.operand;
            where2 = "FROM_END";
        }
        let values = {
            "LIST":this.convert(value, node)
        }
        if(lower == null){
            at1 = "false";
            where1 = "FIRST";
        }
        else{
            Object.assign(values, {"AT1":this.convert(lower, node)});
        }
        if(upper == null){
            at2 = "false";
            where2 = "LAST";
        }
        else{
            Object.assign(values, {"AT2":this.convert(upper, node)});
        }

        return BlockMirrorTextToBlocks.create_block(
            "lists_getSublist", // type
            node.lineno, // line_number
            "list",
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

        // in list get # from start par defaut
        
        let values = {
            "VALUE":this.convert(value,node)
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
            Object.assign(values, {"AT":this.convert(slice.value, node)});
        }

        return BlockMirrorTextToBlocks.create_block(
            "lists_getIndex", // type
            node.lineno, // line_number
            BlockMirrorTextToBlocks.Lists[BlockMirrorTextToBlocks.getName(values['VALUE'])],
            {
                "MODE":mode,
                "WHERE":where
            }, // fields
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
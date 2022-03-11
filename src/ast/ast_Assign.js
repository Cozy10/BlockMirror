

BlockMirrorTextToBlocks.prototype['ast_Assign'] = function (node, parent) {
    let targets = node.targets;
    let value = node.value;
    let values;
    let fields = {};
    let simpleTarget = (targets.length === 1 && targets[0]._astname === 'Name');
    let valueNode;

    // in list set #
    if(targets[0]._astname === 'Subscript'){
        let mode = "SET";
        let at = "true";
        let where = "FROM_START";
        let index = targets[0].slice.value;

        let set_values = {
            "LIST":this.convert(targets[0].value, node)
        }

        // # from end
        if(index != null && index.op != undefined && index.op.prototype._astname === 'USub'){
            index = index.operand;
            where = "FROM_END";
            // last
            if(index.n != undefined && index.n.v == 1){
                at = "false";
                where = "LAST";
            }
        }

        // first
        else if(index.n != undefined && index.n.v == 0){
            at = "false";
            where = "FIRST";
        }

        if(at == "true"){
            Object.assign(set_values, {"AT":this.convert(index, node)});
        }

        Object.assign(set_values, {"TO":this.convert(value, node)});
        return BlockMirrorTextToBlocks.create_block(
            "lists_setIndex", // type
            node.lineno, // line_number
            {
                "MODE":mode,
                "WHERE":where
            }, // fields
            set_values //values
            , {} // settings
            , 
            {
                "@at":at // mutations
            }
            , {} // statements
            );
    }
    valueNode = this.convert(value, node)
    if (simpleTarget) {
        // Check if it's append
        console.log("test");
        if(valueNode.blockGuess === "text_append"){
            console.log("test2");
            // Search if our variable is the first of the operation
            if(valueNode.nodesComputed[0].variableName === Sk.ffi.remapToJs(targets[0].id)){
                valueNode.nodesComputed.splice(0, 1);
                let block;
                if(valueNode.nodesComputed.length == 1){
                    block = valueNode.nodesComputed[0];
                }
                else{
                    let values = {};
                    valueNode.nodesComputed.forEach((element, i)=>{
                        values["ADD"+i] = element;
                    });
                    block = BlockMirrorTextToBlocks.create_block("text_join", node.lineno, {},
                        values, {}, {"@items":valueNode.nodesComputed.length});
                }
                return BlockMirrorTextToBlocks.create_block("text_append", node.lineno, {
                        "VAR":  Sk.ffi.remapToJs(targets[0].id)
                    }, {
                        "TEXT": block
                    }, {});
            }
        }    
        values = {};
        fields['VAR'] = Sk.ffi.remapToJs(targets[0].id);
    } else {
        values = this.convertElements("TARGET", targets, node);
    }

    values['VALUE'] = valueNode;
    return BlockMirrorTextToBlocks.create_block("variables_set", node.lineno, fields,
        values,
        {
        }, {
            "@targets": targets.length,
            "@simple": simpleTarget
        });
};
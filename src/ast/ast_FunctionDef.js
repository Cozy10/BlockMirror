// TODO: what if all returns are inside a if/else block ?

// The mutator container

BlockMirrorTextToBlocks.prototype['ast_FunctionDef'] = function (node, parent) {
    let name = node.name;
    let blockName = "procedures_defnoreturn";

    let values = {};

    // Search return and remove all items after in the block because useless
    node.body.forEach((element, i, tab) => {
        if(element._astname === "Return"){
            if(element.value != null){
                blockName = "procedures_defreturn";
                values["RETURN"] = this.convert(element.value, node);
            }
            tab.splice(i);
        }
    });

    // Args
    let mutation = {};
    for(let i = 0; i<node.args.args.length; i+=1){
        mutation[node.args.args[i].arg.v] = null;
    }

    return BlockMirrorTextToBlocks.create_block(blockName, node.lineno, {
            'NAME': Sk.ffi.remapToJs(name)
        }, values, {}, mutation, {
            'STACK': this.convertBody(node.body, node)
        });
};

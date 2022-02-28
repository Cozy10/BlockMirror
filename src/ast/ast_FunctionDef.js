// TODO: what if a user deletes a parameter through the context menu?

// The mutator container

BlockMirrorTextToBlocks.prototype['ast_FunctionDef'] = function (node, parent) {
    let name = node.name;
    let returns = null;
    let blockName = "procedures_defnoreturn";

    let values = {};

    // Search return and remove all items after in the block
    node.body.forEach((element, i, tab) => {
        if(element._astname === "Return"){
            returns = element.value;
            blockName = "procedures_defreturn";
            values["RETURN"] = this.convert(element.value, node);
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

// TODO: what if a user deletes a parameter through the context menu?

// The mutator container

BlockMirrorTextToBlocks.prototype['ast_FunctionDef'] = function (node, parent) {
    let name = node.name;
    let args = node.args;
    let body = node.body;
    let decorator_list = node.decorator_list;
    let returns = node.returns;

    let values = {};
    console.log(node);
    
    // Args
    let mutation = {};
    for(let i = 0; i<node.args.args.length; i+=1){
        mutation[node.args.args[i].arg.v] = null;
    }

    return BlockMirrorTextToBlocks.create_block("procedures_defnoreturn", node.lineno, {
            'NAME': Sk.ffi.remapToJs(name)
        }, values, {}, mutation, {
            'STACK': this.convertBody(body, node)
        });
};

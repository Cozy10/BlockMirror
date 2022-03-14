BlockMirrorTextToBlocks.prototype['ast_With'] = function (node, parent) {
    let items = node.items;
    let body = node.body;

    let values = {};
    let mutations = {"@items": items.length};

    let renamedItems = [];
    for (let i = 0; i < items.length; i++) {
        let hasRename = items[i].optional_vars;
        renamedItems.push(hasRename);
        let innerValues = {'CONTEXT':this.convert(items[i].context_expr, node)};
        if (hasRename) {
            innerValues['AS'] = this.convert(items[i].optional_vars, node);
            values['ITEM'+i] = BlockMirrorTextToBlocks.create_block("ast_WithItemAs", node.lineno, undefined,
                {}, innerValues, this.LOCKED_BLOCK);
        } else {
            values['ITEM'+i] = BlockMirrorTextToBlocks.create_block("ast_WithItem", node.lineno, undefined,
                {}, innerValues, this.LOCKED_BLOCK);
        }
    }
    mutations['as'] = renamedItems;

    return BlockMirrorTextToBlocks.create_block("ast_With", node.lineno, {}, undefined,
        values,
        {
            "inline": "false"
        }, mutations, {
            'BODY': this.convertBody(body, node)
        });
};

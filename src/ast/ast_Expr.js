

BlockMirrorTextToBlocks.prototype['ast_Expr'] = function (node, parent) {
    var value = node.value;
    if(BlockMirrorTextToBlocks.prototype.FUNCTIONS_BLOCKS[value.func.id.v] != undefined){
        return this.convert(value, node);
    }
    var converted = this.convert(value, node);

    if (converted.constructor === Array) {
        return converted[0];
    } else if (this.isTopLevel(parent)) {
        return [this.convert(value, node)];
    } else {
        return BlockMirrorTextToBlocks.create_block("ast_Expr", node.lineno, {}, {
            "VALUE": this.convert(value, node)
        });
    }
};

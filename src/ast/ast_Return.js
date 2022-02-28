BlockMirrorTextToBlocks.prototype['ast_Return'] = function (node, parent) {
    let values = {"CONDITION": BlockMirrorTextToBlocks.create_block("logic_boolean", node.lineno, {"BOOL":"TRUE"})};
    if(node.value != null){
        values["VALUE"] = this.convert(node.value, node);
    }
    return BlockMirrorTextToBlocks.create_block("procedures_ifreturn", node.lineno, {}, values);
};
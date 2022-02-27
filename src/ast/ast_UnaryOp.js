BlockMirrorTextToBlocks.OPS = {
    "USub" : "NEG"
}

BlockMirrorTextToBlocks.UNARYOPS = [
    ["+", "UAdd", 'Do nothing to the number'],
    ["-", "USub", 'Make the number negative'],
    ["not", "Not", 'Return the logical opposite of the value.'],
    ["~", "Invert", 'Take the bit inversion of the number']
];

BlockMirrorTextToBlocks.prototype['ast_UnaryOp'] = function (node, parent) {
    const op = node.op.prototype._astname;
    let operand = node.operand;
    if(op === "Not"){
        return BlockMirrorTextToBlocks.create_block('logic_negate', node.lineno, {}, 
        {
            "BOOL": this.convert(operand, node)
        }, {
            "inline": false
        });
    }
    return BlockMirrorTextToBlocks.create_block('math_single', node.lineno, 
    {
        "OP" : BlockMirrorTextToBlocks.OPS[op]
    }, 
    {
        "NUM": this.convert(operand, node)
    }, 
    {});
}
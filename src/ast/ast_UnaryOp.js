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
        // List is empty (not len)
        if(typeof operand.func !== 'undefined' && operand.func.id.v === 'len'){
            return BlockMirrorTextToBlocks.create_block(
                'lists_isEmpty',
                node.lineno,
                "bool",
                {},
                {
                    "VALUE":this.convert(operand.args[0], node)
                },
                {},
                {},
                {});
        }
        else{
            return BlockMirrorTextToBlocks.create_block('logic_negate', "bool", node.lineno, {}, 
        {
            "BOOL": this.convert(operand, node)
        }, {
            "inline": false
        });
        }
    }
    let num = this.convert(operand, node);
    return BlockMirrorTextToBlocks.create_block('math_single', node.lineno, 
    BlockMirrorTextToBlocks.getVarType(num),
    {
        "OP" : BlockMirrorTextToBlocks.OPS[op]
    }, 
    {
        "NUM": num
    }, 
    {});
}

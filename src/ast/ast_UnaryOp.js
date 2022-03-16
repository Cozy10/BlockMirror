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
        // not len
        if(typeof operand.func !== 'undefined' && operand.func.id.v === 'len'){
            let value_block;
            if(operand.args[0] != undefined){
                value_block  = BlockMirrorTextToBlocks.prototype.convert(operand.args[0], node);
            }
            // String is empty text, args[0] is the String
            if(BlockMirrorTextToBlocks.getVarType(value_block) == 'Str'){
                return BlockMirrorTextToBlocks.create_block(
                    'text_isEmpty',
                    node.lineno,
                    "bool",
                    {},
                    {
                        "VALUE":value_block
                    },
                    {},
                    {},
                    {});
            }
            // list is empty test, args[0] is the list
            else{
                return BlockMirrorTextToBlocks.create_block(
                    'lists_isEmpty',
                    node.lineno,
                    "bool",
                    {},
                    {
                        "VALUE":value_block
                    },
                    {},
                    {},
                    {});
            }

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

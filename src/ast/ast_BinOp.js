BlockMirrorTextToBlocks.CONVERT_BINOPS = { 
    "Sub" : "MINUS",
    "Add" : "ADD",
    "Mult" : "MULTIPLY",
    "Div" : "DIVIDE",
    "BitXor" : "POWER"
};

BlockMirrorTextToBlocks.BINOPS = [
    ["+", "Add", Blockly.Python.ORDER_ADDITIVE, 'Return the sum of the two numbers.', 'increase', 'by'],
    ["-", "Sub", Blockly.Python.ORDER_ADDITIVE, 'Return the difference of the two numbers.', 'decrease', 'by'],
    ["*", "Mult", Blockly.Python.ORDER_MULTIPLICATIVE, 'Return the product of the two numbers.', 'multiply', 'by'],
    ["/", "Div", Blockly.Python.ORDER_MULTIPLICATIVE, 'Return the quotient of the two numbers.', 'divide', 'by'],
    ["%", "Mod", Blockly.Python.ORDER_MULTIPLICATIVE, 'Return the remainder of the first number divided by the second number.',
    'modulo', 'by'],
    ["**", "Pow", Blockly.Python.ORDER_EXPONENTIATION, 'Return the first number raised to the power of the second number.',
    'raise', 'to'],
    ["//", "FloorDiv", Blockly.Python.ORDER_MULTIPLICATIVE, 'Return the truncated quotient of the two numbers.',
    'floor divide', 'by'],
    ["<<", "LShift", Blockly.Python.ORDER_BITWISE_SHIFT, 'Return the left number left shifted by the right number.',
    'left shift', 'by'],
    [">>", "RShift", Blockly.Python.ORDER_BITWISE_SHIFT, 'Return the left number right shifted by the right number.',
    'right shift', 'by'],
    ["|", "BitOr", Blockly.Python.ORDER_BITWISE_OR, 'Returns the bitwise OR of the two values.',
    'bitwise OR', 'using'],
    ["^", "BitXor", Blockly.Python.ORDER_BITWISE_XOR, 'Returns the bitwise XOR of the two values.',
    'bitwise XOR', 'using'],
    ["&", "BitAnd", Blockly.Python.ORDER_BITWISE_AND, 'Returns the bitwise AND of the two values.',
    'bitwise AND', 'using'],
    ["@", "MatMult", Blockly.Python.ORDER_MULTIPLICATIVE, 'Return the matrix multiplication of the two numbers.',
    'matrix multiply', 'by']
];
var BINOPS_SIMPLE = ['Add', 'Sub', 'Mult', 'Div', 'Mod', 'Pow'];
var BINOPS_BLOCKLY_DISPLAY_FULL = BlockMirrorTextToBlocks.BINOPS.map(
    binop => [binop[0], binop[1]]
);
var BINOPS_BLOCKLY_DISPLAY = BINOPS_BLOCKLY_DISPLAY_FULL.filter(
    binop => BINOPS_SIMPLE.indexOf(binop[1]) >= 0
);
BlockMirrorTextToBlocks.BINOPS_AUGASSIGN_DISPLAY_FULL =BlockMirrorTextToBlocks.BINOPS.map(
    binop => [binop[4], binop[1]]
);
BlockMirrorTextToBlocks.BINOPS_AUGASSIGN_DISPLAY = BlockMirrorTextToBlocks.BINOPS_AUGASSIGN_DISPLAY_FULL.filter(
    binop => BINOPS_SIMPLE.indexOf(binop[1]) >= 0
);

var BINOPS_BLOCKLY_GENERATE = {};
BlockMirrorTextToBlocks.BINOPS_AUGASSIGN_PREPOSITION = {};
BlockMirrorTextToBlocks.BINOPS.forEach(function (binop) {
    BINOPS_BLOCKLY_GENERATE[binop[1]] = [" " + binop[0], binop[2]];
    BlockMirrorTextToBlocks.BINOPS_AUGASSIGN_PREPOSITION[binop[1]] = binop[5];
    //Blockly.Constants.Math.TOOLTIPS_BY_OP[binop[1]] = binop[3];
});

BlockMirrorTextToBlocks.prototype['ast_BinOp'] = function (node, parent) {
    let left = node.left;
    let op = node.op.prototype._astname;
    let right = node.right;
    let blockName = "math_arithmetic";

    return BlockMirrorTextToBlocks.create_block(blockName, node.lineno, {
        "OP": BlockMirrorTextToBlocks.CONVERT_BINOPS[op]
    }, {
        "A": this.convert(left, node),
        "B": this.convert(right, node)
    }, {
        "inline": true
    });
}

BlockMirrorTextToBlocks.prototype['math_arithmetic'] = BlockMirrorTextToBlocks.prototype['ast_BinOp'];

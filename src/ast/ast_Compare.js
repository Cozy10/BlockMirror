BlockMirrorTextToBlocks.COMPARES = [
    ["==", "Eq", 'Return whether the two values are equal.'],
    ["!=", "NotEq", 'Return whether the two values are not equal.'],
    ["<", "Lt", 'Return whether the left value is less than the right value.'],
    ["<=", "LtE", 'Return whether the left value is less than or equal to the right value.'],
    [">", "Gt", 'Return whether the left value is greater than the right value.'],
    [">=", "GtE", 'Return whether the left value is greater than or equal to the right value.'],
    ["is", "Is", 'Return whether the left value is identical to the right value.'],
    ["is not", "IsNot", 'Return whether the left value is not identical to the right value.'],
    ["in", "In", 'Return whether the left value is in the right value.'],
    ["not in", "NotIn", 'Return whether the left value is not in the right value.'],
];
BlockMirrorTextToBlocks.CONVDICT = {
    "Eq":"EQ",
    "NotEq":"NEQ",
    "Lt": "LT",
    "LtE": "LTE",
    "Gt": "GT",
    "GtE": "GTE"
};

var COMPARES_BLOCKLY_DISPLAY = BlockMirrorTextToBlocks.COMPARES.map(
    boolop => [boolop[0], boolop[1]]
);
var COMPARES_BLOCKLY_GENERATE = {};
BlockMirrorTextToBlocks.COMPARES.forEach(function (boolop) {
    COMPARES_BLOCKLY_GENERATE[boolop[1]] = boolop[0];
});

BlockMirrorTextToBlocks.BLOCKS.push({
    "type": "ast_Compare",
    "message0": "%1 %2 %3",
    "args0": [
        {"type": "input_value", "name": "A"},
        {"type": "field_dropdown", "name": "OP", "options": COMPARES_BLOCKLY_DISPLAY},
        {"type": "input_value", "name": "B"}
    ],
    "inputsInline": true,
    "output": null,
    "colour": BlockMirrorTextToBlocks.COLOR.LOGIC
});

Blockly.Python['ast_Compare'] = function (block) {
    // Basic arithmetic operators, and power.
    var tuple = COMPARES_BLOCKLY_GENERATE[block.getFieldValue('OP')];
    var operator = ' ' + tuple + ' ';
    var order = Blockly.Python.ORDER_RELATIONAL;
    var argument0 = Blockly.Python.valueToCode(block, 'A', order) || Blockly.Python.blank;
    var argument1 = Blockly.Python.valueToCode(block, 'B', order) || Blockly.Python.blank;
    var code = argument0 + operator + argument1;
    return [code, order];
};

BlockMirrorTextToBlocks.prototype['ast_Compare'] = function (node, parent) {
    var ops = node.ops;
    var left = node.left;
    var values = node.comparators;
    var result_block = this.convert(left, node);

    // on cherche si  X % 2 == 0 ou  X % 2 == 1 <=> X est pair ou impair
    console.log(left.op.prototype._astname);
    if (left.op.prototype._astname === "Mod"){ // %
        console.log(left.right.n.v);
        if(left.right.n.v === 2){ // 2
            console.log(ops[0].prototype._astname);
            if (ops[0].prototype._astname === "Eq"){ // ==
                console.log(values[0].n.v);
                if(values[0].n.v === 0){ // 0 <=> pair
                    console.log(left.left.n.v);
                    
                    return BlockMirrorTextToBlocks.create_block("math_number_property", node.lineno, 
                    {
                        "PROPERTY": "EVEN"
                    },
                    {
                        "NUMBER_TO_CHECK": BlockMirrorTextToBlocks.create_block("math_number", node.lineno, { "NUMBER_TO_CHECK": left.left.n.v},{},{})
                    },{});
                }
                if(values[0].n.v === 1) { // 1 <=> impair
                    return BlockMirrorTextToBlocks.create_block("math_number_property", node.lineno, 
                    {
                        "PROPERTY": "ODD"
                    },
                    {
                        "NUMBER_TO_CHECK": BlockMirrorTextToBlocks.create_block("math_number", node.lineno, { "NUMBER_TO_CHECK": left.left.n.v},{},{})
                    },{});
                }
            }     
        }
    }
    for (var i = 0; i < values.length; i += 1) {
        result_block = BlockMirrorTextToBlocks.create_block("logic_compare", node.lineno, {
            "OP": BlockMirrorTextToBlocks.CONVDICT[ops[i].prototype._astname]
        }, {
            "A": result_block,
            "B": this.convert(values[i], node)
        }, {
            "inline": "true"
        });
    }
    return result_block;
};
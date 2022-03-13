BlockMirrorTextToBlocks.BOOLOPS = [
    ["and", "And", Blockly.Python.ORDER_LOGICAL_AND, 'Return whether the left and right both evaluate to True.'],
    ["or", "Or", Blockly.Python.ORDER_LOGICAL_OR, 'Return whether either the left or right evaluate to True.']
];
var BOOLOPS_BLOCKLY_DISPLAY = BlockMirrorTextToBlocks.BOOLOPS.map(
    boolop => [boolop[0], boolop[1]]
);
var BOOLOPS_BLOCKLY_GENERATE = {};
BlockMirrorTextToBlocks.BOOLOPS.forEach(function (boolop) {
    BOOLOPS_BLOCKLY_GENERATE[boolop[1]] = [" " + boolop[0] + " ", boolop[2]];
});

BlockMirrorTextToBlocks.prototype['ast_BoolOp'] = function (node, parent) {
    var op = node.op;
    var values = node.values;
    var result_block = this.convert(values[0], node);
    for (var i = 1; i < values.length; i += 1) {
        result_block = BlockMirrorTextToBlocks.create_block("logic_operation", node.lineno, "bool", {
            "OP": op.prototype._astname.toUpperCase()
        }, {
            "A": result_block,
            "B": this.convert(values[i], node)
        }, {
            "inline": "true"
        });
    }
    return result_block;
};



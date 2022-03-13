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
BlockMirrorTextToBlocks.prototype['ast_Compare'] = function (node, parent) {
    var ops = node.ops;
    var left = node.left;
    var values = node.comparators;
    var result_block = this.convert(left, node);
    
    // on cherche si  X 
    if (left.op != undefined && left.op.prototype._astname === "Mod"){ // %
        if(left.right.n != undefined && left.right.n.v === 2){ // 2
            if (ops[0].prototype._astname === "Eq"){ // ==
                if(values[0] != undefined && values[0].n.v === 0){ // 0 <=> pair                    
                    return BlockMirrorTextToBlocks.create_block("math_number_property", node.lineno,
                    "bool",
                    {
                        "PROPERTY": "EVEN"
                    },
                    {
                        "NUMBER_TO_CHECK": this.convert(left.left,node)
                    },{});
                }
                if(values[0] != undefined && values[0].n.v === 1) { // 1 <=> impair
                    return BlockMirrorTextToBlocks.create_block("math_number_property", node.lineno,
                    "bool",
                    {
                        "PROPERTY": "ODD"
                    },
                    {
                        "NUMBER_TO_CHECK": this.convert(left.left,node)
                    },{});
                }
            }
        }
        if(left.right.n != undefined && left.right.n.v === 1){ // 1 <=> est entier
            return BlockMirrorTextToBlocks.create_block("math_number_property", node.lineno,
            "bool",
            {
                "PROPERTY": "WHOLE"
            },
            {
                "NUMBER_TO_CHECK": this.convert(left.left,node)
            },{});
        }
        if(left.right != undefined){ // un nombre quelconque
            if (ops[0].prototype._astname === "Eq"){ // ==
                if(values[0].n != undefined && values[0].n.v === 0){ // 0 <=> divisible par                    
                    return BlockMirrorTextToBlocks.create_block("math_number_property", node.lineno, 
                    "bool",
                    {
                        "PROPERTY": "DIVISIBLE_BY"
                    },
                    {
                        "NUMBER_TO_CHECK": this.convert(left.left,node),
                        "DIVISOR": this.convert(left.right,node)
                    },{});
                }
            }
        }
    }
    if (ops[0].prototype._astname === "Gt"){  // X >
        if(values[0] != undefined && values[0].n.v === 0){ // 0 <=> positif
            return BlockMirrorTextToBlocks.create_block("math_number_property", node.lineno, 
            "bool",
            {
                "PROPERTY": "POSITIVE"
            },
            {
                "NUMBER_TO_CHECK":  this.convert(left,node)
            },{});
        }
    } 
    if (ops[0].prototype._astname === "Lt"){  // X <
        if(values[0] != undefined && values[0].n.v === 0){ // 0 <=> négatif
            return BlockMirrorTextToBlocks.create_block("math_number_property", node.lineno, 
            "bool",
            {
                "PROPERTY": "NEGATIVE"
            },
            {
                "NUMBER_TO_CHECK": this.convert(left,node)
            },{});
        }
    }    
    
    for (var i = 0; i < values.length; i += 1) {
        result_block = BlockMirrorTextToBlocks.create_block("logic_compare", node.lineno, 
        "bool", {
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
PyBlock.prototype['ast_AugAssign'] = function (node, parent) {
    let target = node.target;
    let op = node.op.name;
    let value = node.value;

    let values = {'VALUE': this.convert(value, node)};
    let fields = {'OP_NAME': op};
    let simpleTarget = target._astname === 'Name';
    if (simpleTarget) {
        fields['VAR'] = Sk.ffi.remapToJs(target.id);
    } else {
        values['TARGET'] = this.convert(value, node);
    }

    let preposition = op;

    let allOptions = BINOPS_SIMPLE.indexOf(op) === -1;

    return PyBlock.create_block("ast_AugAssign", node.lineno, undefined, fields,
        values,
        {
            "inline": "true",
        }, {
            "@options": allOptions,
            "@simple": simpleTarget,
            "@preposition": preposition
        });
};

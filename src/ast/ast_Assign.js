

BlockMirrorTextToBlocks.prototype['ast_Assign'] = function (node, parent) {
    let targets = node.targets;
    let value = node.value;
    let values;
    let fields = {};
    let simpleTarget = (targets.length === 1 && targets[0]._astname === 'Name');
    
    if (simpleTarget) {
        values = {};
        fields['VAR'] = Sk.ffi.remapToJs(targets[0].id);
    } else {
        values = this.convertElements("TARGET", targets, node);
    }
    values['VALUE'] = this.convert(value, node);

    return BlockMirrorTextToBlocks.create_block("variables_set", node.lineno, fields,
        values,
        {
        }, {
            "@targets": targets.length,
            "@simple": simpleTarget
        });
};
BlockMirrorTextToBlocks.prototype['ast_Global'] = function (node, parent) {
    let names = node.names;

    let fields = {};
    for (var i = 0; i < names.length; i++) {
        fields["NAME" + i] = Sk.ffi.remapToJs(names[i]);
    }

    return BlockMirrorTextToBlocks.create_block("ast_Global", node.lineno,
        fields,
        {}, {
            "inline": "true",
        }, {
            "@names": names.length
        });
};
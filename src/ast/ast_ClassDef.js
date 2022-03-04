BlockMirrorTextToBlocks.prototype['ast_ClassDef'] = function (node, parent) {
    let name = node.name;
    let bases = node.bases;
    let keywords = node.keywords;
    let body = node.body;
    let decorator_list = node.decorator_list;

    let values = {};
    let fields = {'NAME': Sk.ffi.remapToJs(name)};

    if (decorator_list !== null) {
        for (let i = 0; i < decorator_list.length; i++) {
            values['DECORATOR' + i] = this.convert(decorator_list[i], node);
        }
    }

    if (bases !== null) {
        for (let i = 0; i < bases.length; i++) {
            values['BASE' + i] = this.convert(bases[i], node);
        }
    }

    if (keywords !== null) {
        for (let i = 0; i < keywords.length; i++) {
            values['KEYWORDVALUE' + i] = this.convert(keywords[i].value, node);
            let arg = keywords[i].arg;
            if (arg === null) {
                fields['KEYWORDNAME' + i] = "**";
            } else {
                fields['KEYWORDNAME' + i] = Sk.ffi.remapToJs(arg);
            }
        }
    }

    return BlockMirrorTextToBlocks.create_block("ast_ClassDef", node.lineno, fields,
        values,
        {
            "inline": "false"
        }, {
            "@decorators": (decorator_list === null ? 0 : decorator_list.length),
            "@bases": (bases === null ? 0 : bases.length),
            "@keywords": (keywords === null ? 0 : keywords.length),
        }, {
            'BODY': this.convertBody(body, node)
        });
};

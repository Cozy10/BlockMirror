BlockMirrorTextToBlocks.COMP_SETTINGS = {
    'ListComp': {start: '[', end: ']', color: BlockMirrorTextToBlocks.COLOR.LIST},
    'SetComp': {start: '{', end: '}', color: BlockMirrorTextToBlocks.COLOR.SET},
    'GeneratorExp': {start: '(', end: ')', color: BlockMirrorTextToBlocks.COLOR.SEQUENCES},
    'DictComp': {start: '{', end: '}', color: BlockMirrorTextToBlocks.COLOR.DICTIONARY},
};

['ListComp', 'SetComp', 'GeneratorExp', 'DictComp'].forEach(function (kind) {
    BlockMirrorTextToBlocks.prototype['ast_' + kind] = function (node, parent) {
        let generators = node.generators;

        let elements = {};
        if (kind === 'DictComp') {
            let key = node.key;
            let value = node.value;
            elements["ELT"] = BlockMirrorTextToBlocks.create_block("ast_DictItem", node.lineno, undefined, {},
                {
                    "KEY": this.convert(key, node),
                    "VALUE": this.convert(value, node)
                },
                {
                    "inline": "true",
                    'deletable': "false",
                    "movable": "false"
                });
        } else {
            let elt = node.elt;
            elements["ELT"] = this.convert(elt, node);
        }
        let DEFAULT_SETTINGS = {
            "inline": "true",
            'deletable': "false",
            "movable": "false"
        };
        let g = 0;
        for (let i = 0; i < generators.length; i++) {
            let target = generators[i].target;
            let iter = generators[i].iter;
            let ifs = generators[i].ifs;
            let is_async = generators[i].is_async;
            elements["GENERATOR" + g] = BlockMirrorTextToBlocks.create_block("ast_comprehensionFor", node.lineno, undefined, {},
                {
                    "ITER": this.convert(iter, node),
                    "TARGET": this.convert(target, node)
                },
                DEFAULT_SETTINGS);
            g += 1;
            if (ifs) {
                for (let j = 0; j < ifs.length; j++) {
                    elements["GENERATOR" + g] = BlockMirrorTextToBlocks.create_block("ast_comprehensionIf", node.lineno, undefined, {},
                        {
                            "TEST": this.convert(ifs[j], node)
                        },
                        DEFAULT_SETTINGS);
                    g += 1;
                }
            }
        }

        return BlockMirrorTextToBlocks.create_block("ast_" + kind, node.lineno, undefined, {},
            elements,
            {
                "inline": "false"
            }, {
                "@items": g
            });
    };

});
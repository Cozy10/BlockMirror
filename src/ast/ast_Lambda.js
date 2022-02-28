

BlockMirrorTextToBlocks.prototype['ast_Lambda'] = function (node, parent) {
    let args = node.args;
    let body = node.body;

    let values = {'BODY': this.convert(body, node)};

    let parsedArgs = 0;
    if (args !== null) {
        parsedArgs = this.parseArgs(args, values, node.lineno);
    }

    return BlockMirrorTextToBlocks.create_block("ast_Lambda", node.lineno, {},
        values,
        {
            "inline": "false"
        }, {
            "@decorators": 0,
            "@parameters": parsedArgs,
            "@returns": false,
        });
};
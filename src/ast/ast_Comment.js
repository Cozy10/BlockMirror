/*PyBlock.BLOCKS.push({
    "type": "ast_Comment",
    "message0": "# Comment: %1",
    "args0": [{"type": "field_input", "name": "BODY", "text": "will be ignored"}],
    "inputsInline": true,
    "previousStatement": null,
    "nextStatement": null,
    "colour": PyBlock.COLOR.PYTHON,
});

Blockly.Python['ast_Comment'] = function(block) {
    var text_body = block.getFieldValue('BODY');
    return '#'+text_body+'\n';
};*/

PyBlock.prototype['ast_Comment'] = function (txt, lineno) {
    var commentText = txt.slice(1);
    /*if (commentText.length && commentText[0] === " ") {
        commentText = commentText.substring(1);
    }*/
    /*return PyBlock.create_block("ast_Comment", lineno, undefined,{
        "BODY": commentText
    })*/
    // Ignore Comments
    return null;
};
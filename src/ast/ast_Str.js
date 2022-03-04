BlockMirrorTextToBlocks.prototype.isSingleChar = function (text) {
    return text === "\n" || text === "\t";
};

BlockMirrorTextToBlocks.prototype.isDocString = function (node, parent) {
    return (parent._astname === 'Expr' &&
        parent._parent &&
        ['FunctionDef', 'ClassDef'].indexOf(parent._parent._astname) !== -1 &&
        parent._parent.body[0] === parent);
};

BlockMirrorTextToBlocks.prototype.isSimpleString = function (text) {
    return text.split("\n").length <= 2 && text.length <= 40;
};

BlockMirrorTextToBlocks.prototype.dedent = function (text, levels, isDocString) {
    if (!isDocString && text.charAt(0) === "\n") {
        return text;
    }
    let split = text.split("\n");
    let indentation = "    ".repeat(levels);
    let recombined = [];
    // Are all lines indented?
    for (let i = 0; i < split.length; i++) {
        // This was a blank line, add it unchanged unless its the first line
        if (split[i] === '') {
            if (i !== 0) {
                recombined.push("");
            }
        // If it has our ideal indentation, add it without indentation
        } else if (split[i].startsWith(indentation)) {
            let unindentedLine = split[i].substr(indentation.length);
            if (unindentedLine !== '' || i !== split.length - 1) {
                recombined.push(unindentedLine);
            }
        // If it's the first line, then add it unmodified
        } else if (i === 0) {
            recombined.push(split[i]);
        // This whole structure cannot be uniformly dedented, better give up.
        } else {
            return text;
        }
    }
    return recombined.join("\n");
};

// TODO: Handle indentation intelligently
BlockMirrorTextToBlocks.prototype['ast_Str'] = function (node, parent) {
    let s = node.s;
    let text = Sk.ffi.remapToJs(s);
    /*if (text.startsWith("http") && text.endsWith(".png")) {
        return BlockMirrorTextToBlocks.create_block("ast_Image", node.lineno, {}, {}, {},
            {"@src": text});
    } else*/ if (this.isSingleChar(text)) {
        return BlockMirrorTextToBlocks.create_block("ast_StrChar", node.lineno, {"TEXT": text});
    } else if (this.isDocString(node, parent)) {
        let dedented = this.dedent(text, this.levelIndex - 1, true);
        return [BlockMirrorTextToBlocks.create_block("ast_StrDocstring", node.lineno, {"TEXT": dedented})];
    } else if (text.indexOf('\n') === -1) {
        return BlockMirrorTextToBlocks.create_block("text", node.lineno, {"TEXT": text});
    } else {
        let dedented = this.dedent(text, this.levelIndex - 1, false);
        return BlockMirrorTextToBlocks.create_block("ast_StrMultiline", node.lineno, {"TEXT": dedented});
    }
};

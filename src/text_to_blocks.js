function BlockMirrorTextToBlocks(blockMirror) {
    this.blockMirror = blockMirror;
    this.strictAnnotations = false;
    Blockly.defineBlocksWithJsonArray(BlockMirrorTextToBlocks.BLOCKS);
}

BlockMirrorTextToBlocks.xmlToString = function (xml) {
    return new XMLSerializer().serializeToString(xml);
}

BlockMirrorTextToBlocks.prototype.convertSourceToCodeBlock = function (python_source) {
    var xml = document.createElement("xml");
    xml.appendChild(BlockMirrorTextToBlocks.raw_block(python_source));
    return BlockMirrorTextToBlocks.xmlToString(xml);
}

/**
 * The main function for converting a string representation of Python
 * code to the Blockly XML representation.
 *
 * @param {string} filename - The filename being parsed.
 * @param {string} python_source - The string representation of Python
 *      code (e.g., "a = 0").
 * @returns {Object} An object which will either have the converted
 *      source code or an error message and the code as a code-block.
 */
BlockMirrorTextToBlocks.prototype.convertSource = function (filename, python_source) {
    var xml = document.createElement("xml");
    if (python_source.trim() === "") {
        return {"xml": BlockMirrorTextToBlocks.xmlToString(xml), "error": null};
    }
    this.source = python_source.split("\n");
    // Attempt parsing - might fail!
    var parse, ast, symbol_table, error;
    try {
        parse = Sk.parse(filename, python_source);
        ast = Sk.astFromParse(parse.cst, filename, parse.flags);
    } catch (e) {
        error = e;
        console.error(error);
        xml.appendChild(BlockMirrorTextToBlocks.raw_block(python_source))
        return {"xml": BlockMirrorTextToBlocks.xmlToString(xml), "error": error};
    }
    this.comments = {};
    for (var commentLocation in parse.comments) {
        var lineColumn = commentLocation.split(",");
        var yLocation = parseInt(lineColumn[0], 10);
        this.comments[yLocation] = parse.comments[commentLocation];
    }
    this.highestLineSeen = 0;
    this.levelIndex = 0;
    this.nextExpectedLine = 0;
    this.measureNode(ast);
    var converted = this.convert(ast);
    if (converted !== null) {
        for (var block = 0; block < converted.length; block += 1) {
            xml.appendChild(converted[block]);
        }
    }
    return {
        "xml": BlockMirrorTextToBlocks.xmlToString(xml), "error": null,
        "lineMap": this.lineMap, 'comments': this.comments
    };
}

BlockMirrorTextToBlocks.prototype.recursiveMeasure = function (node, nextBlockLine) {
    if (node === undefined) {
        return;
    }
    var myNext = nextBlockLine;
    if ("orelse" in node && node.orelse.length > 0) {
        if (node.orelse.length == 1 && node.orelse[0]._astname == "If") {
            myNext = node.orelse[0].lineno - 1;
        } else {
            myNext = node.orelse[0].lineno - 1 - 1;
        }
    }
    this.heights.push(nextBlockLine);
    if ("body" in node) {
        for (var i = 0; i < node.body.length; i++) {
            var next;
            if (i + 1 == node.body.length) {
                next = myNext;
            } else {
                next = node.body[i + 1].lineno - 1;
            }
            this.recursiveMeasure(node.body[i], next);
        }
    }
    if ("orelse" in node) {
        for (var i = 0; i < node.orelse.length; i++) {
            var next;
            if (i == node.orelse.length) {
                next = nextBlockLine;
            } else {
                next = 1 + (node.orelse[i].lineno - 1);
            }
            this.recursiveMeasure(node.orelse[i], next);
        }
    }
}

BlockMirrorTextToBlocks.prototype.measureNode = function (node) {
    this.heights = [];
    this.recursiveMeasure(node, this.source.length - 1);
    this.heights.shift();
}

BlockMirrorTextToBlocks.prototype.getSourceCode = function (frm, to) {
    var lines = this.source.slice(frm - 1, to);
    // Strip out any starting indentation.
    if (lines.length > 0) {
        var indentation = lines[0].search(/\S/);
        for (var i = 0; i < lines.length; i++) {
            lines[i] = lines[i].substring(indentation);
        }
    }
    return lines.join("\n");
}

BlockMirrorTextToBlocks.prototype.convertBody = function (node, is_top_level) {
    this.levelIndex += 1;
    // Empty body, return nothing
    if (node.length == 0) {
        return null;
    }

    // Final result list
    var children = [], // The complete set of peers
        root = null, // The top of the current peer
        current = null, // The bottom of the current peer
        levelIndex = this.levelIndex;

    function addPeer(peer) {
        if (root == null) {
            children.push(peer);
        } else {
            children.push(root);
        }
        root = peer;
        current = peer;
    }

    function finalizePeers() {
        if (root != null) {
            children.push(root);
        }
    }

    function nestChild(child) {
        if (root == null) {
            root = child;
            current = child;
        } else if (current == null) {
            root = current;
        } else {
            var nextElement = document.createElement("next");
            nextElement.appendChild(child);
            current.appendChild(nextElement);
            current = child;
        }
    }

    var lineNumberInBody = 0,
        lineNumberInProgram,
        previousLineInProgram = null,
        distance,
        skipped_line,
        commentCount,
        previousHeight = null,
        previousWasStatement = false;
    visitedFirstLine = false;

    // Iterate through each node
    for (var i = 0; i < node.length; i++) {
        lineNumberInBody += 1;

        lineNumberInProgram = node[i].lineno;
        distance = 0, wasFirstLine = true;
        if (previousLineInProgram != null) {
            distance = lineNumberInProgram - previousLineInProgram - 1;
            wasFirstLine = false;
        }
        lineNumberInBody += distance;

        // Handle earlier comments
        commentCount = 0;
        for (var commentLineInProgram in this.comments) {
            if (commentLineInProgram < lineNumberInProgram) {
                commentChild = this.Comment(this.comments[commentLineInProgram], commentLineInProgram);
                if (previousLineInProgram == null) {
                    nestChild(commentChild);
                } else {
                    skipped_previous_line = Math.abs(previousLineInProgram - commentLineInProgram) > 1;
                    if (is_top_level && skipped_previous_line) {
                        addPeer(commentChild);
                    } else {
                        nestChild(commentChild);
                    }
                }
                previousLineInProgram = commentLineInProgram;
                this.highestLineSeen = Math.max(this.highestLineSeen, parseInt(commentLineInProgram, 10));
                distance = lineNumberInProgram - previousLineInProgram;
                delete this.comments[commentLineInProgram];
                commentCount += 1;
            }
        }

        distance = lineNumberInProgram - this.highestLineSeen;
        this.highestLineSeen = Math.max(lineNumberInProgram, this.highestLineSeen);

        // Now convert the actual node
        var height = this.heights.shift();
        var originalSourceCode = this.getSourceCode(lineNumberInProgram, height);
        var newChild = this.convertStatement(node[i], originalSourceCode, is_top_level);

        // Skip null blocks (e.g., imports)
        if (newChild == null) {
            continue;
        }

        skipped_line = distance > 1;
        previousLineInProgram = lineNumberInProgram;
        previousHeight = height;

        // Handle top-level expression blocks
        if (is_top_level && newChild.constructor == Array) {
            addPeer(newChild[0]);
            // Handle skipped line
        } else if (is_top_level && skipped_line && visitedFirstLine) {
            addPeer(newChild);
            // The previous line was not a Peer
        } else if (is_top_level && !previousWasStatement) {
            addPeer(newChild);
            // Otherwise, always embed it in there.
        } else {
            nestChild(newChild);
        }
        previousWasStatement = newChild.constructor !== Array;

        visitedFirstLine = true;
    }


    // Handle comments that are on the very last line
    var lastLineNumber = lineNumberInProgram + 1
    if (lastLineNumber in this.comments) {
        commentChild = this.Comment(this.comments[lastLineNumber], lastLineNumber);
        nestChild(commentChild);
        delete this.comments[lastLineNumber];
    }

    // Handle any extra comments that stuck around
    if (is_top_level) {
        for (var commentLineInProgram in this.comments) {
            commentChild = this.Comment(this.comments[commentLineInProgram], commentLineInProgram);
            distance = commentLineInProgram - previousLineInProgram;
            if (previousLineInProgram == null) {
                addPeer(commentChild);
            } else if (distance > 1) {
                addPeer(commentChild);
            } else {
                nestChild(commentChild);
            }
            previousLineInProgram = commentLineInProgram;
            delete this.comments[lastLineNumber];
        }
    }


    finalizePeers();

    this.levelIndex -= 1;

    return children;
}

BlockMirrorTextToBlocks.prototype.convert = function (node, is_top_level) {
    let functionName = 'ast_' + node._astname;
    if (this[functionName] === undefined) {
        throw new Error("Could not find function: "+functionName);
    }
    return this[functionName](node, is_top_level);
}

function arrayMax(array) {
    return array.reduce(function (a, b) {
        return Math.max(a, b);
    });
}

function arrayMin(array) {
    return array.reduce(function (a, b) {
        return Math.min(a, b);
    });
}

BlockMirrorTextToBlocks.prototype.convertStatement = function (node, full_source, is_top_level) {
    try {
        return this.convert(node, is_top_level);
    } catch (e) {
        heights = this.getChunkHeights(node);
        extractedSource = this.getSourceCode(arrayMin(heights), arrayMax(heights));
        console.error(e);
        return BlockMirrorTextToBlocks.raw_block(extractedSource);
    }
}

BlockMirrorTextToBlocks.prototype.getChunkHeights = function (node) {
    var lineNumbers = [];
    if (node.hasOwnProperty("lineno")) {
        lineNumbers.push(node.lineno);
    }
    if (node.hasOwnProperty("body")) {
        for (var i = 0; i < node.body.length; i += 1) {
            var subnode = node.body[i];
            lineNumbers = lineNumbers.concat(this.getChunkHeights(subnode));
        }
    }
    if (node.hasOwnProperty("orelse")) {
        for (var i = 0; i < node.orelse.length; i += 1) {
            var subnode = node.orelse[i];
            lineNumbers = lineNumbers.concat(this.getChunkHeights(subnode));
        }
    }
    return lineNumbers;
}

BlockMirrorTextToBlocks.create_block = function (type, lineNumber, fields, values, settings, mutations, statements) {
    var newBlock = document.createElement("block");
    // Settings
    newBlock.setAttribute("type", type);
    newBlock.setAttribute("line_number", lineNumber);
    for (var setting in settings) {
        var settingValue = settings[setting];
        newBlock.setAttribute(setting, settingValue);
    }
    // Mutations
    if (mutations !== undefined && Object.keys(mutations).length > 0) {
        var newMutation = document.createElement("mutation");
        for (let mutation in mutations) {
            var mutationValue = mutations[mutation];
            if (mutation.charAt(0) === '@') {
                newMutation.setAttribute(mutation.substr(1), mutationValue);
            } else if (mutationValue != null && mutationValue.constructor === Array) {
                for (var i = 0; i < mutationValue.length; i++) {
                    let mutationNode = document.createElement(mutation);
                    mutationNode.setAttribute("name", mutationValue[i]);
                    newMutation.appendChild(mutationNode);
                }
            } else {
                let mutationNode = document.createElement("arg");
                if (mutation.charAt(0) === '!') {
                    mutationNode.setAttribute("name", "");
                } else {
                    mutationNode.setAttribute("name", mutation);
                }
                if (mutationValue !== null) {
                    mutationNode.appendChild(mutationValue);
                }
                newMutation.appendChild(mutationNode);
            }
        }
        newBlock.appendChild(newMutation);
    }
    // Fields
    for (var field in fields) {
        var fieldValue = fields[field];
        var newField = document.createElement("field");
        newField.setAttribute("name", field);
        newField.appendChild(document.createTextNode(fieldValue));
        newBlock.appendChild(newField);
    }
    // Values
    for (var value in values) {
        var valueValue = values[value];
        var newValue = document.createElement("value");
        if (valueValue !== null) {
            newValue.setAttribute("name", value);
            newValue.appendChild(valueValue);
            newBlock.appendChild(newValue);
        }
    }
    // Statements
    if (statements !== undefined && Object.keys(statements).length > 0) {
        for (var statement in statements) {
            var statementValue = statements[statement];
            if (statementValue == null) {
                continue;
            } else {
                for (var i = 0; i < statementValue.length; i += 1) {
                    // In most cases, you really shouldn't ever have more than
                    //  one statement in this list. I'm not sure Blockly likes
                    //  that.
                    var newStatement = document.createElement("statement");
                    newStatement.setAttribute("name", statement);
                    newStatement.appendChild(statementValue[i]);
                    newBlock.appendChild(newStatement);
                }
            }
        }
    }
    return newBlock;
}

BlockMirrorTextToBlocks.raw_block = function (txt) {
    // TODO: lineno as second parameter!
    return BlockMirrorTextToBlocks.create_block("raw_block", 0, {"TEXT": txt});
}

BlockMirrorTextToBlocks.BLOCKS = [];

BlockMirrorTextToBlocks.prototype['ast_Module'] = function (node) {
    return this.convertBody(node.body, true);
};

BlockMirrorTextToBlocks.prototype['ast_Interactive'] = function (node) {
    return this.convertBody(node.body);
};

BlockMirrorTextToBlocks.prototype['ast_Expression'] = BlockMirrorTextToBlocks.prototype['ast_Interactive'];
BlockMirrorTextToBlocks.prototype['ast_Suite'] = BlockMirrorTextToBlocks.prototype['ast_Module'];

BlockMirrorTextToBlocks.prototype['ast_Pass'] = function () {
    return null; //block("controls_pass");
};


BlockMirrorTextToBlocks.prototype.convertElements = function (key, values) {
    var output = {};
    for (var i = 0; i < values.length; i++) {
        output[key + i] = this.convert(values[i]);
    }
    return output;
};

BlockMirrorTextToBlocks.prototype.FUNCTION_SIGNATURES = {
    'abs': {
        'returns': true,
        'full': ['x']
    },
    'setattr': {
        'returns': false,
        'full': ['object', 'name', 'value']
    },
    'sorted': {
        'full': ['iterable', '*', '**key', '**reverse'],
        'simple': ['iterable'],
        'returns': true,
    }
};

BlockMirrorTextToBlocks.prototype.METHOD_SIGNATURES = {
    'append': {
        'returns': false,
        'full': ['x']
    },
    'replace': {
        'returns': true,
        'full': ['old', 'new', 'count'],
        'simple': ['old', 'new']
    }
};

Blockly.Python['blank'] = '___';

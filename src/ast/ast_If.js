Blockly.Blocks['ast_If'] = {
    init: function () {
        this.orelse_ = 0;
        this.elifs_ = 0;
        this.appendValueInput('TEST')
            .appendField("if");
        this.appendStatementInput("BODY")
            .setCheck(null)
            .setAlign(Blockly.ALIGN_RIGHT);
        this.setInputsInline(false);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(BlockMirrorTextToBlocks.COLOR.LOGIC);
        this.updateShape_();
    },
    // TODO: Not mutable currently
    updateShape_: function () {
        let latestInput = "BODY";
        for (var i = 0; i < this.elifs_; i++) {
            if (!this.getInput('ELIF' + i)) {
                this.appendValueInput('ELIFTEST' + i)
                    .appendField('elif');
                this.appendStatementInput("ELIFBODY" + i)
                    .setCheck(null);
            }
        }
        // Remove deleted inputs.
        while (this.getInput('ELIFTEST' + i)) {
            this.removeInput('ELIFTEST' + i);
            this.removeInput('ELIFBODY' + i);
            i++;
        }

        if (this.orelse_ && !this.getInput('ELSE')) {
            this.appendDummyInput('ORELSETEST')
                .appendField("else:");
            this.appendStatementInput("ORELSEBODY")
                .setCheck(null);
        } else if (!this.orelse_ && this.getInput('ELSE')) {
            block.removeInput('ORELSETEST');
            block.removeInput('ORELSEBODY');
        }

        for (i = 0; i < this.elifs_; i++) {
            if (this.orelse_) {
                this.moveInputBefore('ELIFTEST' + i, 'ORELSETEST');
                this.moveInputBefore('ELIFBODY' + i, 'ORELSETEST');
            } else if (i+1 < this.elifs_) {
                this.moveInputBefore('ELIFTEST' + i, 'ELIFTEST' + (i+1));
                this.moveInputBefore('ELIFBODY' + i, 'ELIFBODY' + (i+1));
            }
        }
    },
    /**
     * Create XML to represent the (non-editable) name and arguments.
     * @return {!Element} XML storage element.
     * @this Blockly.Block
     */
    mutationToDom: function () {
        let container = document.createElement('mutation');
        container.setAttribute('else', this.orelse_);
        container.setAttribute('elseif', this.elifs_);
        return container;
    },
    /**
     * Parse XML to restore the (non-editable) name and parameters.
     * @param {!Element} xmlElement XML storage element.
     * @this Blockly.Block
     */
    domToMutation: function (xmlElement) {
        this.orelse_ = "true" === xmlElement.getAttribute('else');
        this.elifs_ = parseInt(xmlElement.getAttribute('elseif'), 10) || 0;
        this.updateShape_();
    },
};

Blockly.Python['ast_If'] = function (block) {
    // Test
    let test = "if " + (Blockly.Python.valueToCode(block, 'TEST',
        Blockly.Python.ORDER_NONE) || Blockly.Python.blank) + ":\n";
    // Body:
    let body = Blockly.Python.statementToCode(block, 'BODY') || Blockly.Python.PASS;
    // Elifs
    let elifs = new Array(block.elifs_);
    for (let i = 0; i < block.elifs_; i++) {
        let elif = block.elifs_[i];
        let clause = "elif " + (Blockly.Python.valueToCode(block, 'ELIFTEST' + i,
            Blockly.Python.ORDER_NONE) || Blockly.Python.blank);
        clause += ":\n" + (Blockly.Python.statementToCode(block, 'ELIFBODY' + i) || Blockly.Python.PASS);
        elifs[i] = clause;
    }
    // Orelse:
    let orelse = "";
    if (this.orelse_) {
        orelse = "else:\n" + (Blockly.Python.statementToCode(block, 'ORELSEBODY') || Blockly.Python.PASS);
    }
    return test + body + elifs.join("") + orelse;
};

BlockMirrorTextToBlocks.prototype['ast_If'] = function (node, parent) {
    let test = node.test;
    let body = node.body;
    let orelse = node.orelse;

    let hasOrelse = 0;
    let elifCount = 0;

    let values = {"IF0": this.convert(test, node)};
    let statements = {"DO0": this.convertBody(body, node)};

    while (orelse !== undefined && orelse.length > 0) {
        if (orelse.length === 1) {
            if (orelse[0]._astname === "If") {
                // This is an ELIF
                this.heights.shift();
                elifCount++;
                values['IF' + elifCount] = this.convert(orelse[0].test, node);
                statements['DO' + elifCount] = this.convertBody(orelse[0].body, node);
            } else {
                hasOrelse = 1;
                statements['ELSE'] = this.convertBody(orelse, node);
            }
        } else {
            hasOrelse = 1;
            statements['ELSE'] = this.convertBody(orelse, node);
        }
        orelse = orelse[0].orelse;
    }

    return BlockMirrorTextToBlocks.create_block("controls_if", node.lineno, {},
        values, {}, {
            "@else": hasOrelse,
            "@elseif": elifCount
        }, statements);
};
// TODO: Support stuff like "append" where the message is after the value input
// TODO: Handle updating function/method definition -> update call
// TODO: Do a pretraversal to determine if a given function returns

BlockMirrorTextToBlocks.prototype.getAsModule = function (node) {
    if (node._astname === 'Name') {
        return Sk.ffi.remapToJs(node.id);
    } else if (node._astname === 'Attribute') {
        let origin = this.getAsModule(node.value);
        if (origin !== null) {
            return origin + '.' + Sk.ffi.remapToJs(node.attr);
        }
    } else {
        return null;
    }
};

//                              messageBefore, message, name
// function call: print() -> "print" ([message]) ; print
// Module function: plt.show() -> "show plot" ([plot]) ; plt.show
// Method call: "test".title() -> "make" [str] "title case" () ; .title ; isMethod = true

BlockMirrorTextToBlocks.prototype['ast_Call'] = function (node, parent) {
    let func = node.func;
    let args = node.args;
    let keywords = node.keywords;

    // Can we make any guesses about this based on its name?
    let signature = null;
    let isMethod = false;
    let module = null;
    let premessage = "";
    let message = "";
    let name = "";
    let caller = null;
    let colour = BlockMirrorTextToBlocks.COLOR.FUNCTIONS;
    let mModule = ((node.func.attr!=undefined) ? node.func.value.id.v : undefined);
    let blockDataFunc;
    
    // constant infinity -> float('inf')
    if (Sk.ffi.remapToJs(func.id) === 'float' && Sk.ffi.remapToJs(args[0].s) === 'inf'){
        return BlockMirrorTextToBlocks.create_block("math_constant", node.lineno, {
            "CONSTANT": "INFINITY"
            },);
    }
   
    if(mModule === undefined){
        blockDataFunc = BlockMirrorTextToBlocks.prototype.FUNCTIONS_BLOCKS[node.func.id.v];
    }
    else{
        blockDataFunc = BlockMirrorTextToBlocks.prototype.FUNCTIONS_BLOCKS[node.func.attr.v];
    }
    if(blockDataFunc != undefined){
        let blockData = blockDataFunc(args, node);
        return BlockMirrorTextToBlocks.create_block(blockData.name, node.lineno, blockData.fields,
            blockData.values, {}, {}, blockData.statements);
    }

    
    if (func._astname === 'Name') {
        message = name = Sk.ffi.remapToJs(func.id);
        if (name in this.FUNCTION_SIGNATURES) {
            signature = this.FUNCTION_SIGNATURES[Sk.ffi.remapToJs(func.id)];
        }
    } 
    else if (func._astname === 'Attribute') {
        isMethod = true;
        caller = func.value;
        let potentialModule = this.getAsModule(caller);
        let attributeName = Sk.ffi.remapToJs(func.attr);
        message = "." + attributeName;
        if (potentialModule in this.MODULE_FUNCTION_SIGNATURES) {
            signature = this.MODULE_FUNCTION_SIGNATURES[potentialModule][attributeName];
            module = potentialModule;
            message = name = potentialModule + message;
            isMethod = false;
        } else if (attributeName in this.METHOD_SIGNATURES) {
            signature = this.METHOD_SIGNATURES[attributeName];
            name = message;
        } else {
            name = message;
        }
    } 
    else {
        isMethod = true;
        message = "";
        name = "";
        caller = func;
        // (lambda x: x)()
    }
    let returns = true;

    if (signature !== null && signature !== undefined) {
        if (signature.custom) {
            try {
                return signature.custom(node, parent, this)
            } catch (e) {
                console.error(e);
                // We tried to be fancy and failed, better fall back to default behavior!
            }
        }
        if ('returns' in signature) {
            returns = signature.returns;
        }
        if ('message' in signature) {
            message = signature.message;
        }
        if ('premessage' in signature) {
            premessage = signature.premessage;
        }
        if ('colour' in signature) {
            colour = signature.colour;
        }
    }

    returns = returns || (parent._astname !== 'Expr');

    let argumentsNormal = {};
    // TODO: do I need to be limiting only the *args* length, not keywords?
    let argumentsMutation = {
        "@arguments": (args !== null ? args.length : 0) +
            (keywords !== null ? keywords.length : 0),
        "@returns": returns,
        "@parameters": true,
        "@method": isMethod,
        "@name": name,
        "@message": message,
        "@premessage": premessage,
        "@colour": colour,
        "@module": module || ""
    };
    // Handle arguments
    let overallI = 0;
    if (args !== null) {
        for (let i = 0; i < args.length; i += 1, overallI += 1) {
            argumentsNormal["ARG" + overallI] = this.convert(args[i], node);
            argumentsMutation["UNKNOWN_ARG:" + overallI] = null;
        }
    }
    if (keywords !== null) {
        for (let i = 0; i < keywords.length; i += 1, overallI += 1) {
            let keyword = keywords[i];
            let arg = keyword.arg;
            let value = keyword.value;
            if (arg === null) {
                argumentsNormal["ARG" + overallI] = this.convert(value, node);
                argumentsMutation["KWARGS:" + overallI] = null;
            } else {
                argumentsNormal["ARG" + overallI] = this.convert(value, node);
                argumentsMutation["KEYWORD:" + Sk.ffi.remapToJs(arg)] = null;
            }
        }
    }
    // Build actual block
    let newBlock;
    if (isMethod) {
        argumentsNormal['FUNC'] = this.convert(caller, node);
        newBlock = BlockMirrorTextToBlocks.create_block("ast_Call", node.lineno,
            {}, argumentsNormal, {inline: true}, argumentsMutation);
    } else {
        newBlock = BlockMirrorTextToBlocks.create_block("ast_Call", node.lineno, {},
            argumentsNormal, {inline: true}, argumentsMutation);
    }
    // Return as either statement or expression
    if (returns) {
        return newBlock;
    } else {
        return [newBlock];
    }
};


// length of List or String
BlockMirrorTextToBlocks.prototype.FUNCTIONS_BLOCKS["len"] = function(args, node){
    let value_block  = BlockMirrorTextToBlocks.prototype.convert(args[0], node);
    if(BlockMirrorTextToBlocks.getVarType(value_block) === "Str")
        return{
            "name":"text_length", // block type="text_length"
            "fields":{},        // tag field of the block <field ...>
            "values":{          
                "VALUE": value_block// recursive conversion for args[0]
            },                  // tag value
            "statements":{}     //tag statement
        }
    else
        return {
            "name":"lists_length", // block type="text_length"
            "fields":{},        // tag field of the block <field ...>
            "values":{          
                "VALUE":value_block // recursive conversion for args[0]
            },                  // tag value
            "statements":{}     //tag statement
        };
}


// in list find first occurrence of item
BlockMirrorTextToBlocks.prototype.FUNCTIONS_BLOCKS["first_index"] = function(args, node){
    return {
        "name":"lists_indexOf",
        "fields":{
            "END":"FIRST"
        },        // tag field of the block <field ...>
        "values":{
            "VALUE":BlockMirrorTextToBlocks.prototype.convert(args[0], node) // recursive conversion for args[0]
            , "FIND":BlockMirrorTextToBlocks.prototype.convert(args[1], node) // recursive conversion for args[1]
        },                  // tag value
        "statements":{}     //tag statement
        , "returnType": "int"
    }
}

// in list find last occurence of item
BlockMirrorTextToBlocks.prototype.FUNCTIONS_BLOCKS["last_index"] = function(args, node){
    return {
        "name":"lists_indexOf",
        "fields":{
            "END":"LAST"
        },        // tag field of the block <field ...>
        "values":{
            "VALUE":BlockMirrorTextToBlocks.prototype.convert(args[0], node) // recursive conversion for args[0]
            , "FIND":BlockMirrorTextToBlocks.prototype.convert(args[1], node) // recursive conversion for args[1]
        },                  // tag value
        "statements":{}     //tag statement
        , "returnType": "int"
    }
}

// sort List
BlockMirrorTextToBlocks.prototype.FUNCTIONS_BLOCKS["lists_sort"] = function(args, node){
    var list = BlockMirrorTextToBlocks.prototype.convert(args[0], node);
    var type = args[1].s.v;
    var direction = (args[2].value.v == 0) ? 1 : -1;
    return {
        "name":"lists_sort",
        "fields":{
            "TYPE":type
            , "DIRECTION":direction
        },
        "values":{
            "LIST":list
        },
        "statements":{},
        "returnType":"list"
    }
}

// in list get and remove, args[0] is the list, args[1] is the index
BlockMirrorTextToBlocks.prototype.METHODS_BLOCKS["pop"] = function(args, node){
    var value = args;
    var mode = "REMOVE";
    var where = "FROM_START";
    var at = "true";
    var statement = "false";
    var values = {"VALUE":BlockMirrorTextToBlocks.prototype.convert(node.func.value, node)};
    if(node._parent != undefined && node._parent._astname === 'Assign'){
        mode = "GET_REMOVE";
    }

    if(args[1] != undefined && args[1].op != undefined && args[1].op.prototype._astname === 'USub'){
        where = "FROM_END";
        value = args[1].operand;
    }
    else if(args[1] != undefined && args[1].n != undefined && args[1].n.v == 0){
        where = "FIRST";
        at = "false";
    }
    else if(args[1] == undefined){
        where = "LAST";
        at = "false";
    }
    if(args[1] != undefined && where != "FROM_END"){
        value = args[1];
    }
    if(at == "true"){
        Object.assign(values, {"AT":BlockMirrorTextToBlocks.prototype.convert(value, node)})
    }
    return {
        "name":"lists_getIndex",
        "fields":{
            "MODE":mode,
            "WHERE":where
        },
        "values":values,
        "settings":{},
        "mutations":{
            "@statement":statement,
            "@at":at
        },
        "statements":{},
        "returnType": values['VALUE'].elementsType
    }
}

// in list insert at, args[0] is the list, args[1] is the index
BlockMirrorTextToBlocks.prototype.METHODS_BLOCKS["insert"] = function(args, node){
    var value = args;
    var where = "FROM_START";
    var at = "true";
    var values = {"LIST":BlockMirrorTextToBlocks.prototype.convert(node.func.value, node)};

    if(args[1] != undefined && args[1].op != undefined && args[1].op.prototype._astname === 'USub'){
        where = "FROM_END";
        value = args[1].operand;
    }
    else if(args[1] != undefined && args[1].n != undefined && args[1].n.v == 0){
        where = "FIRST";
        at = "false";
    }
    if(args[1] != undefined && where != "FROM_END"){
        value = args[1];
    }

    if(at == "true"){
        if(where == "FROM_START"){
            value.n.v += 1;
        }
        Object.assign(values, {"AT":BlockMirrorTextToBlocks.prototype.convert(value, node)});
    }
    Object.assign(values, {"TO":BlockMirrorTextToBlocks.prototype.convert(args[2], node)});

    return {
        "name":"lists_setIndex",
        "fields":{
            "MODE":"INSERT",
            "WHERE":where
        },
        "values":values,
        "settings":{},
        "mutations":{
            "@at":at
        },
        "statements":{},
        "returnType": undefined
    }
}

// in list insert at last, args[0] is the list
BlockMirrorTextToBlocks.prototype.METHODS_BLOCKS["append"] = function(args, node){
    var values = {
        "LIST":BlockMirrorTextToBlocks.prototype.convert(node.func.value, node)
    };
    if(args[1] != undefined){
        Object.assign(values, {"TO":BlockMirrorTextToBlocks.prototype.convert(args[1], node)});
    }

    return {
        "name":"lists_setIndex",
        "fields":{
            "MODE":"INSERT",
            "WHERE":"LAST"
        },
        "values":values,
        "settings":{},
        "mutations":{
            "@at":"false"
        },
        "statements":{},
        "returnType": undefined
    }
}

// make list from text args[0] with delimiter args[1]
BlockMirrorTextToBlocks.prototype.METHODS_BLOCKS["split"] = function(args, node){
    var values = {
        "INPUT":BlockMirrorTextToBlocks.prototype.convert(args[0], node)
    };
    if(args[1] != undefined){
        Object.assign(values, {"DELIM":BlockMirrorTextToBlocks.prototype.convert(args[1], node)});
    }

    return {
        "name":"lists_split",
        "fields":{
            "MODE":"SPLIT"
        },
        "values":values,
        "settings":{},
        "mutations":{
            "@mode":"SPLIT"
        },
        "statements":{},
        "returnType": "list"
    }
}

// make text from list args[1] with delimiter args[0]
BlockMirrorTextToBlocks.prototype.METHODS_BLOCKS["join"] = function(args, node){
    var values = {
        "INPUT":BlockMirrorTextToBlocks.prototype.convert(args[1], node)
    };
    if(args[0] != undefined){
        Object.assign(values, {"DELIM":BlockMirrorTextToBlocks.prototype.convert(args[0], node)});
    }

    return {
        "name":"lists_split",
        "fields":{
            "MODE":"JOIN"
        },
        "values":values,
        "settings":{},
        "mutations":{
            "@mode":"JOIN"
        },
        "statements":{},
        "returnType":"Str"
    }
}

// in list args[0] remove or get and remove at random index
BlockMirrorTextToBlocks.prototype.FUNCTIONS_BLOCKS['lists_remove_random_item'] = function(args, node){
    var mode = "REMOVE";

    if(node._parent != undefined && node._parent._astname === 'Assign'){
        mode = "GET_REMOVE";
    }

    return {
        "name":"lists_getIndex",
        "fields":{
            "MODE":mode,
            "WHERE":"RANDOM"
        },
        "values":{"VALUE":BlockMirrorTextToBlocks.prototype.convert(args[0], node)},
        "settings":{},
        "mutations":{
            "@statement":"false",
            "@at":"false"
        },
        "statements":{},
        "returnType": undefined
    }
}

BlockMirrorTextToBlocks.prototype['ast_List'] = function (node, parent) {
    var elts = node.elts;
    let block;
    
    let values = this.convertElements("ADD", elts, node);
    block = BlockMirrorTextToBlocks.create_block(
        "lists_create_with" // type
        , node.lineno // line_number
        , "list"
        , {} // fields
        , values //values
        , {} // settings
        , {
            "@items": elts.length // mutations
        }
        , {} // statements
        );
    block.elementsType = BlockMirrorTextToBlocks.getVarType((values["ADD0"]));
    return block;
}

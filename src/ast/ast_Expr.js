

PyBlock.prototype['ast_Expr'] = function (node, parent) {
    var value = node.value;
    var converted = this.convert(value, node);

    if (converted.constructor === Array) {
        return converted[0];
    } else{
        return converted;
    }
};

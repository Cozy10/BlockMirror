PyBlock.prototype['ast_NameConstant'] = function (node, parent) {
    let value = node.value;

    if (value === Sk.builtin.none.none$) {
        return null;
    }
};
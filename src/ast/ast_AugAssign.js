PyBlock.prototype['ast_AugAssign'] = function (node, parent) {
    let node_BinOp = {...node};
    node_BinOp.left = node.target;
    node_BinOp.right = node.value;
    node_BinOp._astname = "BinOp";
    node_BinOp._parent = node;
    node.value = node_BinOp;
    node.targets = [node.target];
    return PyBlock.prototype.ast_Assign(node, parent);
};

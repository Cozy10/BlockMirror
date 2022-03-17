// TODO: direct imports are not variables, because you can do stuff like:
//         import os.path
//       What should the variable be? Blockly will mangle it, but we should really be
//       doing something more complicated here with namespaces (probably make `os` the
//       variable and have some kind of list of attributes. But that's in the fading zone.

PyBlock.prototype['ast_Import'] = function (node, parent) {
    return null;
};

// Alias ImportFrom because of big overlap
PyBlock.prototype['ast_ImportFrom'] = PyBlock.prototype['ast_Import'];

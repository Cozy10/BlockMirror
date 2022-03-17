const path = require('path');
const fs = require('fs');
const MergeIntoSingleFilePlugin = require('webpack-merge-and-include-globally');
const babel = require("@babel/core");
const modules_path = [path.resolve(__dirname, "modules/numpy/import")];

// Blockly
const JS_BLOCKLY_FILES = [
    path.resolve(__dirname, 'ext_lib/blockly/blockly_compressed.js'),
    path.resolve(__dirname, 'ext_lib/blockly/blocks_compressed.js'),
    path.resolve(__dirname, 'ext_lib/blockly/msg/js/en.js'),
    path.resolve(__dirname, 'ext_lib/blockly/python_compressed.js')
];

// Skulpt
const JS_SKULPT_FILES = [
    path.resolve(__dirname, 'ext_lib/skulpt/dist/skulpt.js'),
    path.resolve(__dirname, 'ext_lib/skulpt/dist/skulpt-stdlib.js'),
];

// Skulpt Parser
const JS_SKULPT_PARSER_FILES = [
    path.resolve(__dirname, 'src/skulpt/skulpt_shim.js'),
    path.resolve(__dirname, 'src/skulpt/astnodes.js'),
    path.resolve(__dirname, 'src/skulpt/token.js'),
    path.resolve(__dirname, 'src/skulpt/parse_tables.js'),
    path.resolve(__dirname, 'src/skulpt/tokenize.js'),
    path.resolve(__dirname, 'src/skulpt/parser.js'),
    path.resolve(__dirname, 'src/skulpt/ast.js'),
];

// BlockMirror
const JS_BLOCKMIRROR_FILES = [
    path.resolve(__dirname, 'src/text_to_blocks.js'),

    // AST Handlers
    path.resolve(__dirname, 'src/ast/ast_functions.js'),
    path.resolve(__dirname, 'src/ast/cast_type.js'),
    path.resolve(__dirname, 'src/ast/ast_For.js'),
    path.resolve(__dirname, 'src/ast/ast_If.js'),
    path.resolve(__dirname, 'src/ast/ast_While.js'),
    path.resolve(__dirname, 'src/ast/ast_Num.js'),
    path.resolve(__dirname, 'src/ast/ast_BinOp.js'),
    path.resolve(__dirname, 'src/ast/ast_Name.js'),
    path.resolve(__dirname, 'src/ast/ast_Assign.js'),
    path.resolve(__dirname, 'src/ast/ast_AnnAssign.js'),
    path.resolve(__dirname, 'src/ast/ast_AugAssign.js'),
    path.resolve(__dirname, 'src/ast/ast_Str.js'),
    path.resolve(__dirname, 'src/ast/ast_Expr.js'),
    path.resolve(__dirname, 'src/ast/ast_UnaryOp.js'),
    path.resolve(__dirname, 'src/ast/ast_BoolOp.js'),
    path.resolve(__dirname, 'src/ast/ast_Compare.js'),
    path.resolve(__dirname, 'src/ast/ast_Assert.js'),
    path.resolve(__dirname, 'src/ast/ast_NameConstant.js'),
    path.resolve(__dirname, 'src/ast/ast_List.js'),
    path.resolve(__dirname, 'src/ast/ast_Tuple.js'),
    path.resolve(__dirname, 'src/ast/ast_Set.js'),
    path.resolve(__dirname, 'src/ast/ast_Dict.js'),
    path.resolve(__dirname, 'src/ast/ast_Starred.js'),
    path.resolve(__dirname, 'src/ast/ast_IfExp.js'),
    path.resolve(__dirname, 'src/ast/ast_Attribute.js'),
    path.resolve(__dirname, 'src/ast/ast_Call.js'),
    path.resolve(__dirname, 'src/ast/ast_Raise.js'),
    path.resolve(__dirname, 'src/ast/ast_Delete.js'),
    path.resolve(__dirname, 'src/ast/ast_Subscript.js'),
    path.resolve(__dirname, 'src/ast/ast_Comp.js'),
    path.resolve(__dirname, 'src/ast/ast_FunctionDef.js'),
    path.resolve(__dirname, 'src/ast/ast_Lambda.js'),
    path.resolve(__dirname, 'src/ast/ast_Return.js'),
    path.resolve(__dirname, 'src/ast/ast_Yield.js'),
    path.resolve(__dirname, 'src/ast/ast_YieldFrom.js'),
    path.resolve(__dirname, 'src/ast/ast_Global.js'),
    path.resolve(__dirname, 'src/ast/ast_Break.js'),
    path.resolve(__dirname, 'src/ast/ast_Continue.js'),
    path.resolve(__dirname, 'src/ast/ast_Try.js'),
    path.resolve(__dirname, 'src/ast/ast_ClassDef.js'),
    path.resolve(__dirname, 'src/ast/ast_Import.js'),
    path.resolve(__dirname, 'src/ast/ast_With.js'),
    path.resolve(__dirname, 'src/ast/ast_Comment.js'),
    path.resolve(__dirname, 'src/ast/ast_Raw.js'),
    path.resolve(__dirname,'src/ast/math.js'),
    path.resolve(__dirname,'src/ast/constants.js'),
    path.resolve(__dirname,'src/ast/random.js'),
    path.resolve(__dirname,'src/ast/pythonDef.js'),
    path.resolve(__dirname, 'src/ast/variable_type.js'),
].concat((() => { // Import modules files
    let modules_import_path;
    modules_path.forEach((module_path)=>{
        files = fs.readdirSync(module_path);
        modules_import_path = files.map(file => path.join(module_path, file));
    });
    return modules_import_path;
})());

const JS_FILES = [].concat(JS_BLOCKLY_FILES, JS_SKULPT_FILES,
    JS_BLOCKMIRROR_FILES)

const babelify = code =>
    babel.transform(code, {
        presets: ["@babel/preset-env"]
    }).code;

const config = {
    entry: [
        path.resolve(__dirname, 'src/main.js'),
    ],
    output: {
        path: __dirname + '/dist',
        filename: 'block_mirror.js',
        library: 'BlockMirror'
    },
    module: {
        rules: [
            {
                test: /(\.jsx|\.js)$/,
                loader: "babel-loader",
                exclude: /(node_modules|bower_components)/
            },
        ]
    },
    resolve: {
        extensions: ['.js']
    },
    plugins: [
        new MergeIntoSingleFilePlugin({
            files: {
                "skulpt_parser.js": JS_SKULPT_PARSER_FILES,
                "block_mirror.js": JS_BLOCKMIRROR_FILES
            },
            transform: {
                "skulpt_parser.js":babelify,
                "block_mirror.js":babelify
            }
        })
    ]
};
module.exports = config;

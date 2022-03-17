const fs = require('fs');
const path = require('path');
const create_block_func = "PyBlock.prototype.FUNCTIONS_BLOCKS";
const block_converter = "PyBlock.prototype.convert";
const modules_path = path.join(__dirname, 'modules');

fs.readdir(modules_path, (err, modules)=>{
    modules.forEach((module)=>{
        let module_path = path.join(modules_path, module);
        let json_path = path.join(module_path, 'json');
        let import_path = path.join(module_path, 'import');
        let content = genJSCreateModule(module)+'\n';
        files = fs.readdirSync(json_path);
        files.forEach((file) => {
            data = fs.readFileSync(path.join(json_path, file));
            let block = JSON.parse(data);
            let func_name = file.split('.')[0];
            let code = genJSCode(module_name, func_name, block);
            content += code+'\n';
        });
        fs.writeFile(path.join(import_path, module_name+'.js'), content,{flag: 'w'}, err => {
            if (err) throw err;
        });
    });
})
function genJSCreateModule(module_name){
    return create_block_func+'["'+module_name+'"]={};';
}
function genJSCode(module_name, func_name, block){
    let content = create_block_func+'["'+module_name+'"]'+'["'+func_name+'"]'+'=function(args,node){return{';
    content+='"name":"'+block.type+'",';
    content+=genValues(block.args0);
    
    content+="}};";
    return content;
}
function genValues(args){
    let code = '"values":{';
    args.forEach((arg, i) => {
        code+='"'+arg.name+'":'+block_converter+'(args['+i+'],node),';
    });
    code+='},';
    return code;
}

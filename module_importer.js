const fs = require('fs')
const path = require('path')
const create_block_func = "BlockMirrorTextToBlocks.prototype.FUNCTIONS_BLOCKS";
const block_converter = "BlockMirrorTextToBlocks.prototype.convert";
const func_name = "test";
const modules_path = path.join(__dirname, 'modules');

fs.readdir(modules_path, (err, modules)=>{
    modules.forEach((module)=>{
        let module_path = path.join(modules_path, module);
        let json_path = path.join(module_path, 'json');
        let import_path = path.join(module_path, 'import');
        fs.readdir(json_path, (err, files) => {
            if (err) throw err;
            files.forEach((file) => {
                // Do whatever you want to do with the file
                fs.readFile(path.join(json_path, file), (err, data) => {
                    if (err) throw err;
                    let block = JSON.parse(data);
                    console.log(block);
                    let content = create_block_func+'["'+func_name+'"]'+'=function(args,node){return{';
                    content+='"name":"'+block.type+'",';
                    content+='"values":{';
                    block.args0.forEach((arg, i) => {
                        content+='"'+arg.name+'":'+block_converter+'(args['+i+'],node),';
                    });
                    content+='},';
                    content+="}}";
                    fs.writeFile(path.join(import_path, file), content,{flag: 'w'}, err => {
                        if (err) throw err;
                    })
                });
            });
        })

    });
})

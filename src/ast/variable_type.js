// Array of dict like Variables for storing variables only inside their block (if/while/def)
BlockMirrorTextToBlocks.Local_Var = [{}];
BlockMirrorTextToBlocks.Lists = {};

BlockMirrorTextToBlocks.currentLevel = 0;

BlockMirrorTextToBlocks.getVariable = (varName) => {
    if(BlockMirrorTextToBlocks.Local_Var[BlockMirrorTextToBlocks.currentLevel][varName] === undefined){
        return undefined;
    }
    BlockMirrorTextToBlocks.Local_Var[BlockMirrorTextToBlocks.currentLevel][varName].used = true;
    return BlockMirrorTextToBlocks.Local_Var[BlockMirrorTextToBlocks.currentLevel][varName].type;
};
BlockMirrorTextToBlocks.setVariable = (varName, val) => {
    BlockMirrorTextToBlocks.Local_Var[BlockMirrorTextToBlocks.currentLevel][varName] = {"used":true , "type":val};
};
BlockMirrorTextToBlocks.isVariableUsed = (varName)=>{
    if(BlockMirrorTextToBlocks.Local_Var[BlockMirrorTextToBlocks.currentLevel][varName] === undefined){
        return false;
    }
    return BlockMirrorTextToBlocks.Local_Var[BlockMirrorTextToBlocks.currentLevel][varName].used;
}
BlockMirrorTextToBlocks.setVariableUsed = (varName, used)=>{
    if(BlockMirrorTextToBlocks.Local_Var[BlockMirrorTextToBlocks.currentLevel][varName] === undefined){
        BlockMirrorTextToBlocks.Local_Var[BlockMirrorTextToBlocks.currentLevel][varName] = {"used":used , "type":val};
    }
    else{
        BlockMirrorTextToBlocks.Local_Var[BlockMirrorTextToBlocks.currentLevel][varName].used = used;
    }
}
// Variable type after
// a = 0
// if test:
//   a = ""
// will be string
BlockMirrorTextToBlocks.incrementLevel = () =>{
    BlockMirrorTextToBlocks.Local_Var.push({"used":{}, "type":{}});
    BlockMirrorTextToBlocks.currentLevel += 1;
    // Copy reference to existing parameters (because they are objects) only so new created parameters will not propagate to subLevel
    BlockMirrorTextToBlocks.Local_Var[BlockMirrorTextToBlocks.currentLevel] = {...BlockMirrorTextToBlocks.Local_Var[BlockMirrorTextToBlocks.currentLevel-1]};
};
BlockMirrorTextToBlocks.decrementLevel = ()=>{
    BlockMirrorTextToBlocks.Local_Var.pop();
    BlockMirrorTextToBlocks.currentLevel-=1;
}
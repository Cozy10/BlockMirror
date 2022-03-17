// Array of dict like Variables for storing variables only inside their block (if/while/def)
PyBlock.Local_Var = [{}];
PyBlock.Lists = {};

PyBlock.currentLevel = 0;
PyBlock.reset = function(){
    PyBlock.Local_Var = [{}];
    PyBlock.Lists = {};
    PyBlock.currentLevel = 0;
}

PyBlock.getVariable = (varName) => {
    if(PyBlock.Local_Var[PyBlock.currentLevel][varName] === undefined){
        return undefined;
    }
    PyBlock.Local_Var[PyBlock.currentLevel][varName].used = true;
    return PyBlock.Local_Var[PyBlock.currentLevel][varName].type;
};
PyBlock.setVariable = (varName, val) => {
    PyBlock.Local_Var[PyBlock.currentLevel][varName] = {"used":true , "type":val};
};
PyBlock.isVariableUsed = (varName)=>{
    if(PyBlock.Local_Var[PyBlock.currentLevel][varName] === undefined){
        return false;
    }
    return PyBlock.Local_Var[PyBlock.currentLevel][varName].used;
}
PyBlock.setVariableUsed = (varName, used)=>{
    if(PyBlock.Local_Var[PyBlock.currentLevel][varName] === undefined){
        PyBlock.Local_Var[PyBlock.currentLevel][varName] = {"used":used , "type":val};
    }
    else{
        PyBlock.Local_Var[PyBlock.currentLevel][varName].used = used;
    }
}
// Variable type after
// a = 0
// if test:
//   a = ""
// will be string
PyBlock.incrementLevel = () =>{
    PyBlock.Local_Var.push({"used":{}, "type":{}});
    PyBlock.currentLevel += 1;
    // Copy reference to existing parameters (because they are objects) only so new created parameters will not propagate to subLevel
    PyBlock.Local_Var[PyBlock.currentLevel] = {...PyBlock.Local_Var[PyBlock.currentLevel-1]};
};
PyBlock.decrementLevel = ()=>{
    PyBlock.Local_Var.pop();
    PyBlock.currentLevel-=1;
}
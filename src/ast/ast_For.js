
PyBlock.prototype['ast_For'] = function (node, parent) {
    var target = node.target;
    var iter = node.iter;
    var body = node.body;
    var fields = {};
    
    var blockName;
    
    let bodies;
    
    var iter_val;
    // for i in range(...)
    if (iter.func != undefined && iter.func.id.v === "range"){
      let varUsedBefore = PyBlock.isVariableUsed(Sk.ffi.remapToJs(target.id));
      PyBlock.incrementLevel();
      PyBlock.setVariable(Sk.ffi.remapToJs(target.id), "int");
      PyBlock.setVariableUsed(Sk.ffi.remapToJs(target.id), false);
      bodies = {'DO': this.convertBody(body, node)};
      let varIsUsed = PyBlock.isVariableUsed(Sk.ffi.remapToJs(target.id));
      PyBlock.decrementLevel();
      // "for i in range(x)" block repeat x times
      if(!varUsedBefore && iter.args.length == 1 && !varIsUsed){
        blockName = "controls_repeat_ext";
        iter_val = {
          "TIMES": this.convert(iter.args[0], node)
        };
      }
      // for i in range(x, y, step)
      else{
        let from_block;
        let by_block;
        let to_block;
        // "for i in range(x, y)" or range(x) and i is used inside
        if(iter.args.length < 3){
          if(iter.args.length == 1){
            from_block = PyBlock.createNumBlock(0, "int", node);
            to_block = this.convert(iter.args[0], node);
          }
          else{
            from_block = this.convert(iter.args[0], node);
            to_block = this.convert(iter.args[1], node);
          }
          by_block = PyBlock.createNumBlock(1, "int", node);
        }
        else{
          from_block = this.convert(iter.args[0], node);
          to_block = this.convert(iter.args[1], node)
          by_block = this.convert(iter.args[2], node);
        }
        blockName = "controls_for";
        iter_val = {
          "FROM": from_block,
          "TO": to_block,
          "BY": by_block
        }
        fields['VAR'] = Sk.ffi.remapToJs(target.id);
      }
    }
    else{
      blockName = 'controls_forEach';
      PyBlock.incrementLevel();
      bodies = {'DO': this.convertBody(body, node)};
      PyBlock.decrementLevel();
      fields['VAR'] = Sk.ffi.remapToJs(target.id);
      iter_val = {
          "LIST": this.convert(iter, node)
      };
    }

    return PyBlock.create_block(blockName, node.lineno, undefined, fields,
      iter_val, {}, {}, bodies);
}
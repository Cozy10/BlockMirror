
BlockMirrorTextToBlocks.prototype['ast_For'] = function (node, parent) {
    var target = node.target;
    var iter = node.iter;
    var body = node.body;
    var fields = {};
    
    var blockName;
    
    let bodies;
    
    var iter_val;
    // for i in range(...)
    if (iter.func != undefined && iter.func.id.v === "range"){
      BlockMirrorTextToBlocks.incrementLevel();
      BlockMirrorTextToBlocks.setVariable(Sk.ffi.remapToJs(target.id), "int");
      BlockMirrorTextToBlocks.setVariableUsed(Sk.ffi.remapToJs(target.id), false);
      bodies = {'DO': this.convertBody(body, node)};
      let varIsUsed = BlockMirrorTextToBlocks.isVariableUsed(Sk.ffi.remapToJs(target.id));
      BlockMirrorTextToBlocks.decrementLevel();
      // "for i in range(x)" block repeat x times
      if(iter.args.length == 1 && !varIsUsed){
        blockName = "controls_repeat_ext";
        iter_val = {
          "TIMES": this.convert(iter.args[0], node)
        };
      }
      // for i in range(x, y, step)
      else{
        let by_block;
        let to_block;
        // "for i in range(x, y)" or range(x) and i is used inside
        if(iter.args.length < 3){
          if(iter.args.length == 1){
            to_block = BlockMirrorTextToBlocks.create_block("math_number", node.lineno, "int", {
              "NUM": 0
            });
          }
          else{
            to_block = this.convert(iter.args[1], node);
          }
          by_block = BlockMirrorTextToBlocks.create_block("math_number", node.lineno, "int", {
              "NUM": 1
            });
        }
        else{
          to_block = this.convert(iter.args[1], node)
          by_block = this.convert(iter.args[2], node);
        }
        blockName = "controls_for";
        iter_val = {
          "FROM": this.convert(iter.args[0], node),
          "TO": to_block,
          "BY": by_block
        }
        fields['VAR'] = Sk.ffi.remapToJs(target.id);
      }
    }
    else{
      blockName = 'controls_forEach';
      BlockMirrorTextToBlocks.incrementLevel();
      bodies = {'DO': this.convertBody(body, node)};
      BlockMirrorTextToBlocks.decrementLevel();
      fields['VAR'] = Sk.ffi.remapToJs(target.id);
      iter_val = {
          "LIST": this.convert(iter, node)
      };
    }

    return BlockMirrorTextToBlocks.create_block(blockName, node.lineno, undefined, fields,
      iter_val, {}, {}, bodies);
}
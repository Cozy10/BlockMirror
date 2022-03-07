
BlockMirrorTextToBlocks.prototype['ast_For'] = function (node, parent) {
    var target = node.target;
    var iter = node.iter;
    var body = node.body;
    var orelse = node.orelse;
    var fields = {};
    
    var blockName;
    var bodies = {'DO': this.convertBody(body, node)};
    var iter_val;
    // for i in range(...)
    if (iter.func != undefined && iter.func.id.v === "range"){
      // "for i in range(x)" block repeat x times
      if(iter.args.length == 1){
        blockName = "controls_repeat_ext";
        iter_val = {
          "TIMES": this.convert(iter.args[0], node)
        };
      }
      // for i in range(x, y, step)
      else{
        var by_block;
        // "for i in range(x, y)"
        if(iter.args.length == 2){
          by_block = BlockMirrorTextToBlocks.create_block("math_number", node.lineno, {
              "NUM": 1
            });
        }
        else{
          by_block = this.convert(iter.args[2], node);
        }
        blockName = "controls_for";
        iter_val = {
          "FROM": this.convert(iter.args[0], node),
          "TO": this.convert(iter.args[1], node),
          "BY": by_block
        }
      }
    }
    else{
      blockName = 'controls_forEach';
      fields['VAR'] = Sk.ffi.remapToJs(target.id);
      iter_val = {
          "LIST": this.convert(iter, node)
      };
    }

    return BlockMirrorTextToBlocks.create_block(blockName, node.lineno, fields,
      iter_val, {}, {}, bodies);
}
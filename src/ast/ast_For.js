
BlockMirrorTextToBlocks.prototype['ast_For'] = function (node, parent) {
    var target = node.target;
    var iter = node.iter;
    var body = node.body;
    var orelse = node.orelse;
    
    var blockName = 'controls_forEach';
    var bodies = {'DO': this.convertBody(body, node)};
    var iter_val;
    console.log("C'est moi===============================");
    // for i in range(...)
    if (iter.func != undefined && iter.func.id.v === "range"){
      console.log(node.iter)
      // "for i in range(x)" block repeat x times
      if(iter.args.length == 1){
        blockName = "controls_repeat_ext";
        iter_val = {
          "TIMES": this.convert(iter.args[0], node)
        };
      }
      // for i in range(x, y, step)
      else{
        // "for i in range(x, y)"
        var by_block;
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
      iter_val = {
          "ITER": this.convert(iter, node),
          "TARGET": this.convert(target, node)
      };
    }
    if (orelse.length > 0) {
        blockName = "ast_ForElse";
        bodies['ELSE'] = this.convertBody(orelse, node);
    }

    return BlockMirrorTextToBlocks.create_block(blockName, node.lineno, {
    }, iter_val, {}, {}, bodies);
}

BlockMirrorTextToBlocks.prototype['ast_ForElse'] = BlockMirrorTextToBlocks.prototype['ast_For'];

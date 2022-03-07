var toolbox = {
    "kind": "flyoutToolbox",
    "contents": [
      {
        "kind": "block",
        "type": "controls_if"
      },
      {
        "kind": "block",
        "type": "controls_repeat_ext"
      },
      {
        "kind": "block",
        "type": "logic_compare"
      },
      {
        "kind": "block",
        "type": "math_number"
      },
      {
        "kind": "block",
        "type": "math_arithmetic"
      },
      {
        "kind": "block",
        "type": "text"
      },
      {
        "kind": "block",
        "type": "text_print"
      },
    ]
  }
function outf(text) { 
  var mypre = document.getElementById("output"); 
  mypre.innerHTML = text;
}
function builtinRead(x) {
    if (Sk.builtinFiles === undefined || Sk.builtinFiles["files"][x] === undefined)
            throw "File not found: '" + x + "'";
    return Sk.builtinFiles["files"][x];
}



// Here's everything you need to run a python program in skulpt
// grab the code from your textarea
// get a reference to your pre element for output
// configure the output function
// call Sk.importMainWithBody()
var textToBlock = new BlockMirrorTextToBlocks();
function runit() { 
   var prog = document.getElementById("yourcode").value; 
   Sk.configure({
    __future__: Sk.python3,
    read: function (filename) {
        if (Sk.builtinFiles === undefined ||
            Sk.builtinFiles["files"][filename] === undefined) {
            throw "File not found: '" + filename + "'";
        }
        return Sk.builtinFiles["files"][filename];
    }
    });
    xml = textToBlock.convertSource("__main__.py", prog);
    document.getElementById("output").innerHTML = xml.xml;
    let xmlDom = Blockly.Xml.textToDom(xml.xml);
    Blockly.Xml.clearWorkspaceAndLoadFromXml(xmlDom, workspace);
}
var toolbox = {}
function outf(text) { 
  var mypre = document.getElementById("output"); 
  mypre.innerHTML = text;
}
function builtinRead(x) {
    if (Sk.builtinFiles === undefined || Sk.builtinFiles["files"][x] === undefined)
            throw "File not found: '" + x + "'";
    return Sk.builtinFiles["files"][x];
}


var pyBlock = new PyBlock();
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
function runit() {
    PyBlock.reset();
    var prog = document.getElementById("yourcode").value; 
    xml = pyBlock.convertSource("__main__.py", prog);
    document.getElementById("output").innerHTML = xml.xml;
    let xmlDom = Blockly.Xml.textToDom(xml.xml);
    Blockly.Xml.clearWorkspaceAndLoadFromXml(xmlDom, workspace);
}
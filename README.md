# Python2Blockly
Une librairie javascript pour convertir un code python en xml blockly (fork of blockmirror)

# Installation

Installer automatiquement les dépendances : `npm install` 
Pour les dépendances skulpt et blockly nous les incluons dans le dossier ext_lib cependant
vous devez pouvoir les remplacer par d'autres versions.

Compilation du projet dans dist : `npm run devbuild` (ou build).

# Test
See test/blockly_test.html

# Integration in your webPage
## Includes
Include blockly script and blocks

Same for skulpt skulpt and skulpt-sdlib

They ar both inside ext_lib folder but you can use yours too.

Include dist/pyblock.js which contain all parsing elements

## At the page loading
Init Pyblock : var pyBlock = new PyBlock()

Configure skulpt : Sk.cofigure

## Converting to Xml
pyBlock.convertSource("a name", python_source_code) gives you blockly blocks corresponding to your code

To make sure variables (function def and python variables) are reset between calls : PyBlock.reset()

## Convert Xml to Blockly
Blockly.Xml.textToDom(xml_raw_source) : give xml in dom format

Blockly.Xml.clearWorkspaceAndLoadFromXml(xmlDom, workspace): push you xml source code to the Blockly workspace stored in worspace

# Python2Blockly
Une librairie javascript pour convertir un code python en xml blockly (fork of blockmirror)

# Installation

Installer automatiquement les dépendances : `npm install` 
Pour les dépendances skulpt et blockly nous les incluons dans le dossier ext_lib cependant
vous devez pouvoir les remplacer par d'autres versions.

Compilation du projet dans dist : `npm run devbuild` (ou build).


# Hacking

Pour l'instant un certain nombre de blocks sont générés sous un mauvais nom/une mauvaise forme et ne respecte pas la forme des blocks standards blockly voir src/ast

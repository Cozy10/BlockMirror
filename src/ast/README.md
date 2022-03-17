# Étape pour ajouter une nouvelle fonctions
1. Insérer le code python dans la page test/index.html l'executer et voir quel est le type du bloc généré
2. Allez voir dans le fichier contenant la fonction PyBlock.prototype["type_du_bloc"]
si le bloc est de type ast_Call voir le paragraphe "Assigner une fonction à un bloc"
3. Sinon modifier la fonction pour que dans ce cas elle créé le bloc de type et de formevoulu 
via la fonction PyBlock.create_block (voir le paragraphe "Créer un bloc")

Astuce : Dans la fonction PyBlock.prototype["type_du_bloc"] un console.log du node peut vous aider pour savoir où récupérer les valeurs que vous souhaitez. Merci de les enlever avant de push votre code

# Inutile à supprimer
Toutes les fonctions Blockly.Python et PyBlock.BLOCKS car on ne crée pas
de nouveaux blocks Blockly on utilise ceux déjà existants

# Helpers pour créer des blocs
## Obtenir les blocs des noeuds suivants
PyBlock.prototype.convert(node, node_parent)
## Créer un bloc
PyBlock.create_block(type, line_number, python_type, fields, values, settings, mutations, statements)

type : le nom/type du bloc

line_number : numéro de ligne (=node.lineno)

python_type : type of the return value of the block (set to undefined if you don't know or their is no return value)

fields : un objet de la forme :

`{
    "example": 1
    "example2": "une_valeur"
}`

On obtient : 
`<field name="exemple">1</field>
<field name="example2">une_valeur</field>`

values : un objet de la forme :

`{
    "example": un_objet_block_en_xml
}`

On obtient : `<value name="example">un_objet_block_en_xml</value>`

settings : Pour rajouter des paramètres au block
un objet de la forme :

`{
    "example": 1
}`

On obtient : `<block type="un_type" example=1>`

mutations : un objet de la forme :

`{
    "example": un_objet_block_en_xml,
    "example2": null,
    "!example3": un_objet_block_en_xml,
    "@example4": 2,
    "example5": [1, "bonjour"],
}`

On obtient : 
`<mutation example4=2>
    <arg name="example">un_objet_block_en_xml</arg>
    <arg name="example2"></arg>
    <arg name="">un_objet_block_en_xml2</arg>
    <example5 name=1></example5>
    <example5 name="bonjour"></example5>
</mutation>`

statements : un objet de la forme :

`{
    "example": [un_objet_bloc_en_xml, un_autre_bloc_en_xml]
}`

On obtient : 
`<statement name="example">un_block_en_xml</statement>
<statement name="example">un_autre_bloc_en_xml</statement>`

## Assigner une fonction python à un bloc

Definir le champs "votre_fonction_python" à une fonction function(args, node) (merci de ne pas le mettre dans ast_function.js mais dans le fichier adapté)

args : corresponds à l'objet node.args

node : le noeud parent

Retourne un objet comportant les champs :

name: type_du_bloc

fields, values, settings, mutations et statements: (voir créer un bloc)


# Utile pour tester ses blocks
Visualisation du xml :
https://codebeautify.org/xmlviewer

Test des blocks générer + génération de xml via les blocks blockly
https://blockly-demo.appspot.com/static/demos/code/index.html

# Fonctions faites
String
if, compare, set, get, number
not, boolop
for (en cours)
math op


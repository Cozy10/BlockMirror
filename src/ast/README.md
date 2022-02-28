# A modifier
BlockMirrorTextToBlocks.prototype["<ancien_nom>"]


# Inutile à supprimer
Toutes les fonctions Blockly.Python et BlockMirrorTextToBlocks.BLOCKS car on ne crée pas
de nouveaux blocks Blockly on utilise ceux déjà existant

# Helpers pour créer des blocs
BlockMirrorTextToBlocks.create_block(type, line_number, fields, values, settings, mutations, statements)

type : le nom/type du bloc

line_number : numéro de ligne (=node.lineno)

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


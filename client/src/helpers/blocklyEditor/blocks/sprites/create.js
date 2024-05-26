import * as Blockly from "blockly/core";
import javascript from "blockly/javascript";

Blockly.Blocks["sprite_new"] = {
  init: function () {
    this.appendDummyInput()
      .appendField("Create a sprite")
      .appendField(new Blockly.FieldVariable("character"), "spriteName");
    this.appendValueInput("texture")
      .setCheck("String")
      .appendField("with texture");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour("#8c1c43");
    this.setTooltip(
      "Creates a new sprite given a texture. Use this with a variable"
    );
    this.setHelpUrl("https://pixijs.download/dev/docs/PIXI.Sprite.html");
  },
};

javascript.javascriptGenerator.forBlock["sprite_new"] = function (
  block,
  generator
) {
  var variable_spritename = generator.nameDB_.getName(
    block.getFieldValue("spriteName"),
    "VARIABLE"
  );
  var value_texture = generator.valueToCode(
    block,
    "texture",
    javascript.Order.ATOMIC
  );

  var code = `${variable_spritename} = new PIXI.Sprite(${value_texture});\napp.stage.addChild(character);\n`;
  return code;
};

import * as Blockly from "blockly/core";
import javascript from "blockly/javascript";
import utils from "../../../utils";

Blockly.Blocks["assets_add"] = {
  init: function () {
    this.appendDummyInput().appendField("Add an asset");
    this.appendDummyInput()
      .appendField("with name")
      .appendField(new Blockly.FieldTextInput("asset"), "assetName");
    this.appendValueInput("texture")
      .setCheck("String")
      .appendField("texture URL");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour("#729e26");
    this.setTooltip("Adds a new asset and loads it in the background.");
    this.setHelpUrl("");
  },
};

javascript.javascriptGenerator.forBlock["assets_add"] = function (
  block,
  generator
) {
  var text_assetname = utils.sanitizeInput(block.getFieldValue("assetName"));
  var value_texture = generator.valueToCode(
    block,
    "texture",
    javascript.Order.ATOMIC
  );

  var code = `PIXI.Assets.add('${text_assetname}', ${value_texture});\nPIXI.Assets.backgroundLoad(['${text_assetname}']);\n`;
  return code;
};

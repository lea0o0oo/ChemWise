import * as Blockly from "blockly/core";
import javascript from "blockly/javascript";
import utils from "../../../utils";

const blockData = {
  type: "sprite_set_texture",
  message0: "To element %1 %2 Set texture to asset %3",
  args0: [
    {
      type: "field_variable",
      name: "spriteVar",
      variable: "character",
    },
    {
      type: "input_dummy",
    },
    {
      type: "field_input",
      name: "assetName",
      text: "asset",
    },
  ],
  previousStatement: null,
  nextStatement: null,
  colour: "#104f9c",
  tooltip: "",
  helpUrl: "",
};

Blockly.Blocks[blockData.type] = {
  init: function () {
    this.jsonInit(blockData);
  },
};

javascript.javascriptGenerator.forBlock["sprite_set_texture"] = function (
  block,
  generator
) {
  var variable_spritevar = generator.nameDB_.getName(
    block.getFieldValue("spriteVar"),
    "VARIABLE"
  );
  var text_assetname = utils.sanitizeInput(block.getFieldValue("assetName"));

  var code = `${variable_spritevar}.texture = await PIXI.Assets.load("${text_assetname}");\n`;
  return code;
};

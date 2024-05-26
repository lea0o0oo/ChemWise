import * as Blockly from "blockly/core";
import javascript from "blockly/javascript";

const blockData = {
  type: "sprite_new_notexture",
  message0: "Create a sprite %1",
  args0: [
    {
      type: "field_variable",
      name: "spriteVar",
      variable: "character",
    },
  ],
  previousStatement: null,
  nextStatement: null,
  colour: "#8c1c43",
  tooltip: "Creates a sprite",
  helpUrl: "",
};

Blockly.Blocks[blockData.type] = {
  init: function () {
    this.jsonInit(blockData);
  },
};

javascript.javascriptGenerator.forBlock["sprite_new_notexture"] = function (
  block,
  generator
) {
  var variable_spritevar = generator.nameDB_.getName(
    block.getFieldValue("spriteVar"),
    "VARIABLE"
  );
  var code = `${variable_spritevar} = new PIXI.Sprite();\n${variable_spritevar}.anchor.set(0.5);\napp.stage.addChild(${variable_spritevar});\n${variable_spritevar}.zIndex = 0;\napp.stage.children.sort((a, b) => a.zIndex - b.zIndex);\n`;
  return code;
};

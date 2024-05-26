import * as Blockly from "blockly/core";
import javascript from "blockly/javascript";

const blockData = {
  type: "sprite_get_pos",
  message0: "%1 's %2 position",
  args0: [
    {
      type: "field_variable",
      name: "spriteVar",
      variable: "character",
    },
    {
      type: "field_dropdown",
      name: "axis",
      options: [
        ["x", "x"],
        ["y", "y"],
      ],
    },
  ],
  output: "Number",
  colour: "#0b376e",
  tooltip: "Returns the position of a sprite on the specified axis",
  helpUrl: "",
};

Blockly.Blocks[blockData.type] = {
  init: function () {
    this.jsonInit(blockData);
  },
};

javascript.javascriptGenerator.forBlock["sprite_get_pos"] = function (
  block,
  generator
) {
  var variable_spritevar = generator.nameDB_.getName(
    block.getFieldValue("spriteVar"),
    "VARIABLE"
  );
  var dropdown_axis = block.getFieldValue("axis");

  var code = `${variable_spritevar}.${dropdown_axis}`;
  return [code, javascript.Order.NONE];
};

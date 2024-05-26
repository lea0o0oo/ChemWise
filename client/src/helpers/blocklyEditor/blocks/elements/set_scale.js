import * as Blockly from "blockly/core";
import javascript from "blockly/javascript";

const blockData = {
  type: "sprite_set_scale",
  message0: "Set %1 scale of %2 to %3",
  args0: [
    {
      type: "field_dropdown",
      name: "axis",
      options: [
        ["x", "x"],
        ["y", "y"],
      ],
    },
    {
      type: "field_variable",
      name: "spriteVar",
      variable: "character",
    },
    {
      type: "input_value",
      name: "scale",
      check: "Number",
    },
  ],
  previousStatement: null,
  nextStatement: null,
  colour: "#104f9c",
  tooltip: "You can scale up or down a sprite with this block",
  helpUrl: "",
};

Blockly.Blocks[blockData.type] = {
  init: function () {
    this.jsonInit(blockData);
  },
};

javascript.javascriptGenerator.forBlock["sprite_set_scale"] = function (
  block,
  generator
) {
  var dropdown_axis = block.getFieldValue("axis");
  var variable_spritevar = generator.nameDB_.getName(
    block.getFieldValue("spriteVar"),
    "VARIABLE"
  );
  var value_scale = generator.valueToCode(
    block,
    "scale",
    javascript.Order.ATOMIC
  );

  var code = `${variable_spritevar}.scale.${dropdown_axis} = ${value_scale};\n`;
  return code;
};

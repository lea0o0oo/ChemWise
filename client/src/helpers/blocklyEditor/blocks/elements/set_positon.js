import * as Blockly from "blockly/core";
import javascript from "blockly/javascript";

const blockData = {
  type: "sprite_set_position",
  message0: "Set %1 's %2 position to %3",
  args0: [
    {
      type: "field_variable",
      name: "selSprite",
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
    {
      type: "input_value",
      name: "value",
      check: "Number",
    },
  ],
  previousStatement: null,
  nextStatement: null,
  colour: "#104f9c",
  tooltip: "Sets the position of a sprite",
  helpUrl: "",
};

Blockly.Blocks[blockData.type] = {
  init: function () {
    this.jsonInit(blockData);
  },
};

javascript.javascriptGenerator.forBlock["sprite_set_position"] = function (
  block,
  generator
) {
  var variable_selsprite = generator.nameDB_.getName(
    block.getFieldValue("selSprite"),
    "VARIABLE"
  );
  var dropdown_axis = block.getFieldValue("axis");
  var value_value = generator.valueToCode(
    block,
    "value",
    javascript.Order.ATOMIC
  );

  var code = `${variable_selsprite}.${dropdown_axis} = ${value_value};\n`;
  return code;
};

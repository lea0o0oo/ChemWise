import * as Blockly from "blockly/core";
import javascript from "blockly/javascript";

const blockData = {
  type: "sprite_skew_set",
  message0: "Set %1 's skew %2 to %3",
  args0: [
    {
      type: "field_variable",
      name: "elemVar",
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
  tooltip:
    "Set's a sprite skew. Note that by setting an opposite skew on both axis will result in a rotation.",
  helpUrl: "",
};

Blockly.Blocks[blockData.type] = {
  init: function () {
    this.jsonInit(blockData);
  },
};

javascript.javascriptGenerator.forBlock["sprite_skew_set"] = function (
  block,
  generator
) {
  var variable_elemvar = generator.nameDB_.getName(
    block.getFieldValue("elemVar"),
    "VARIABLE"
  );
  var dropdown_axis = block.getFieldValue("axis");
  var value_value = generator.valueToCode(
    block,
    "value",
    javascript.Order.ATOMIC
  );

  var code = `${variable_elemvar}.skew.${dropdown_axis} = ${value_value};\n`;
  return code;
};

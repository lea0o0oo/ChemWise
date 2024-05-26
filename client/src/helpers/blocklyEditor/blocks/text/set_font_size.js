import * as Blockly from "blockly/core";
import javascript from "blockly/javascript";

const blockData = {
  type: "set_font_size",
  message0: "Set font size of %1 to %2",
  args0: [
    {
      type: "field_variable",
      name: "varName",
      variable: "text",
    },
    {
      type: "input_value",
      name: "value",
      check: "Number",
    },
  ],
  previousStatement: null,
  nextStatement: null,
  colour: "#a81ab8",
  tooltip: "",
  helpUrl: "",
};

Blockly.Blocks[blockData.type] = {
  init: function () {
    this.jsonInit(blockData);
  },
};

javascript.javascriptGenerator.forBlock["set_font_size"] = function (
  block,
  generator
) {
  var variable_varname = generator.nameDB_.getName(
    block.getFieldValue("varName"),
    "VARIABLE"
  );
  var value_value = generator.valueToCode(
    block,
    "value",
    javascript.Order.ATOMIC
  );

  var code = `${variable_varname}.style.fontSize = ${value_value};\n`;
  return code;
};

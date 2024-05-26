import * as Blockly from "blockly/core";
import javascript from "blockly/javascript";

const blockData = {
  type: "text_set",
  message0: "Set text content of %1 to %2",
  args0: [
    {
      type: "field_variable",
      name: "varName",
      variable: "text",
    },
    {
      type: "input_value",
      name: "value",
      check: "String",
    },
  ],
  previousStatement: null,
  nextStatement: null,
  colour: "#a81ab8",
  tooltip: "Sets the text content to a specified value",
  helpUrl: "",
};

Blockly.Blocks[blockData.type] = {
  init: function () {
    this.jsonInit(blockData);
  },
};

javascript.javascriptGenerator.forBlock["text_set"] = function (
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

  var code = `${variable_varname}.text = ${value_value};\n`;
  return code;
};

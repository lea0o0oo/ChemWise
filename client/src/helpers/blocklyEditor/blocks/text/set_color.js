import * as Blockly from "blockly/core";
import javascript from "blockly/javascript";

const blockData = {
  type: "text_set_color",
  message0: "Set color of %1 to %2",
  args0: [
    {
      type: "field_variable",
      name: "varName",
      variable: "text",
    },
    {
      type: "input_value",
      name: "value",
      check: "Colour",
    },
  ],
  previousStatement: null,
  nextStatement: null,
  colour: "#a81ab8",
  tooltip: "Sets the text color of a text element",
  helpUrl: "",
};

Blockly.Blocks[blockData.type] = {
  init: function () {
    this.jsonInit(blockData);
  },
};

javascript.javascriptGenerator.forBlock["text_set_color"] = function (
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

  var code = `${variable_varname}.style.fill = PIXI.utils.string2hex(${value_value});\n`;
  return code;
};

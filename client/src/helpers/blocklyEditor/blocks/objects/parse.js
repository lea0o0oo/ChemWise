import * as Blockly from "blockly/core";
import javascript from "blockly/javascript";

Blockly.Blocks["object_parse"] = {
  init: function () {
    this.appendValueInput("string")
      .setCheck("String")
      .appendField("Parse string");
    this.appendDummyInput().appendField("into object");
    this.setInputsInline(true);
    this.setOutput(true, ["Object", "Array"]);
    this.setColour("#5d3fd3");
    this.setTooltip("The string can also be a list");
    this.setHelpUrl("");
  },
};

javascript.javascriptGenerator.forBlock["object_parse"] = function (
  block,
  generator
) {
  var value_string = generator.valueToCode(
    block,
    "string",
    javascript.Order.ATOMIC
  );
  // TODO: Assemble javascript into code variable.
  var code = `JSON.parse(${value_string})`;
  // TODO: Change ORDER_NONE to the correct strength.
  return [code, javascript.Order.NONE];
};

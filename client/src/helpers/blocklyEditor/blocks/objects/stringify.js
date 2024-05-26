import * as Blockly from "blockly/core";
import javascript from "blockly/javascript";

Blockly.Blocks["object_stringify"] = {
  init: function () {
    this.appendValueInput("object")
      .setCheck(["Array", "Object"])
      .appendField("Convert object");
    this.appendDummyInput().appendField("into string");
    this.setInputsInline(true);
    this.setOutput(true, "String");
    this.setColour("#5d3fd3");
    this.setTooltip("The object can also be a list.");
    this.setHelpUrl("");
  },
};

javascript.javascriptGenerator.forBlock["object_stringify"] = function (
  block,
  generator
) {
  var value_object = generator.valueToCode(
    block,
    "object",
    javascript.Order.ATOMIC
  );
  // TODO: Assemble javascript into code variable.
  var code = `JSON.stringify(${value_object})`;
  // TODO: Change ORDER_NONE to the correct strength.
  return [code, javascript.Order.NONE];
};

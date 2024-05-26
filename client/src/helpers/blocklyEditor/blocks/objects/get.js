import * as Blockly from "blockly/core";
import javascript from "blockly/javascript";

Blockly.Blocks["object_get"] = {
  init: function () {
    this.appendValueInput("object").setCheck("Object").appendField("In object");
    this.appendValueInput("key")
      .setCheck("String")
      .appendField("get value of key");
    this.setInputsInline(false);
    this.setOutput(true, null);
    this.setColour("#5d3fd3");
    this.setTooltip("");
    this.setHelpUrl("");
  },
};

javascript.javascriptGenerator.forBlock["object_get"] = function (
  block,
  generator
) {
  var value_object = generator.valueToCode(
    block,
    "object",
    javascript.Order.ATOMIC
  );
  var value_key = generator.valueToCode(block, "key", javascript.Order.ATOMIC);
  // TODO: Assemble javascript into code variable.
  var code = `${value_object}[${value_key}]`;
  // TODO: Change ORDER_NONE to the correct strength.
  return [code, javascript.Order.NONE];
};

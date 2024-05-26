import * as Blockly from "blockly/core";
import javascript from "blockly/javascript";

Blockly.Blocks["object_getkeys"] = {
  init: function () {
    this.appendValueInput("object")
      .setCheck("Object")
      .appendField("Get all keys as a list in object");
    this.setInputsInline(true);
    this.setOutput(true, "Array");
    this.setColour("#5d3fd3");
    this.setTooltip("");
    this.setHelpUrl("");
  },
};

javascript.javascriptGenerator.forBlock["object_getkeys"] = function (
  block,
  generator
) {
  var value_object = generator.valueToCode(
    block,
    "object",
    javascript.Order.ATOMIC
  );

  var code = `Object.keys(${value_object})`;

  return [code, javascript.Order.NONE];
};

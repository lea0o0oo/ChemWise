import * as Blockly from "blockly/core";
import javascript from "blockly/javascript";

Blockly.Blocks["object_delete"] = {
  init: function () {
    this.appendValueInput("object").setCheck("Object").appendField("In object");
    this.appendValueInput("key").setCheck("String").appendField("delete key");
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour("#5d3fd3");
    this.setTooltip(
      "Deletes a key from an object, assuming that the object is not freezed"
    );
    this.setHelpUrl("");
  },
};

javascript.javascriptGenerator.forBlock["object_delete"] = function (
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
  var code = `delete ${value_object}[${value_key}]\n`;
  return code;
};

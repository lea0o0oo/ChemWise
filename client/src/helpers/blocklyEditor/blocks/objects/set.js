import * as Blockly from "blockly/core";
import javascript from "blockly/javascript";

Blockly.Blocks["object_set"] = {
  init: function () {
    this.appendValueInput("object").setCheck("Object").appendField("In object");
    this.appendValueInput("key").setCheck("String").appendField("Set key");
    this.appendValueInput("value").setCheck(null).appendField("To value");
    this.setInputsInline(false);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour("#5d3fd3");
    this.setTooltip(
      "Sets a variable of type object a determined key, assuming that the object is a constant or isn't freezed"
    );
    this.setHelpUrl("");
  },
};

javascript.javascriptGenerator.forBlock["object_set"] = function (
  block,
  generator
) {
  var value_object = generator.valueToCode(
    block,
    "object",
    javascript.Order.ATOMIC
  );
  var value_key = generator.valueToCode(block, "key", javascript.Order.ATOMIC);
  var value_value = generator.valueToCode(
    block,
    "value",
    javascript.Order.ATOMIC
  );
  // TODO: Assemble javascript into code variable.
  var code = `${value_object}[${value_key}] = ${value_value}\n`;
  return code;
};

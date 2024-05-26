import * as Blockly from "blockly/core";
import javascript from "blockly/javascript";

Blockly.Blocks["object_has"] = {
  init: function () {
    this.appendValueInput("object").setCheck("Object").appendField("Object");
    this.appendValueInput("key").setCheck("String").appendField("has key");
    this.setInputsInline(true);
    this.setOutput(true, "Boolean");
    this.setColour("#5d3fd3");
    this.setTooltip(
      "Returns true if the object contains the key, false if not."
    );
    this.setHelpUrl("");
  },
};

javascript.javascriptGenerator.forBlock["object_has"] = function (
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
  var code = `${value_key} in ${value_object}`;
  // TODO: Change ORDER_NONE to the correct strength.
  return [code, javascript.Order.NONE];
};

import * as Blockly from "blockly/core";
import javascript from "blockly/javascript";

Blockly.Blocks["object_new_empty"] = {
  init: function () {
    this.appendDummyInput().appendField("Create an empty object");
    this.setOutput(true, ["object", "Object"]);
    this.setColour("#5d3fd3");
    this.setTooltip("");
    this.setHelpUrl("");
  },
};

javascript.javascriptGenerator.forBlock["object_new_empty"] = function (
  block,
  generator
) {
  // TODO: Assemble javascript into code variable.
  var code = "new Object()";
  // TODO: Change ORDER_NONE to the correct strength.
  return [code, javascript.Order.NONE];
};

// ---------------MAKE NON-EMPTY--------------------------

Blockly.Blocks["object_new_container"] = {
  init: function () {
    this.appendDummyInput().appendField("Create an object");
    this.appendStatementInput("values").setCheck(null);
    this.setOutput(true, ["object", "Object"]);
    this.setColour("#5d3fd3");
    this.setTooltip("");
    this.setHelpUrl("");
  },
};

javascript.javascriptGenerator.forBlock["object_new_container"] = function (
  block,
  generator
) {
  var statements_values = generator.statementToCode(block, "values");
  // TODO: Assemble javascript into code variable.
  var code = `{${statements_values}}`;
  // TODO: Change ORDER_NONE to the correct strength.
  return [code, javascript.Order.NONE];
};

// ----------------

Blockly.Blocks["object_new_value"] = {
  init: function () {
    this.appendValueInput("key").setCheck("String").appendField("Add key");
    this.appendValueInput("value").setCheck(null).appendField("with value");
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour("#5d3fd3");
    this.setTooltip("");
    this.setHelpUrl("");
  },
};

javascript.javascriptGenerator.forBlock["object_new_value"] = function (
  block,
  generator
) {
  var value_key = generator.valueToCode(block, "key", javascript.Order.ATOMIC);
  var value_value = generator.valueToCode(
    block,
    "value",
    javascript.Order.ATOMIC
  );
  // TODO: Assemble javascript into code variable.
  var code = `${value_key}: ${value_value},\n`;
  return code;
};

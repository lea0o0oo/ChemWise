// Block URL: https://blockly-demo.appspot.com/static/demos/blockfactory/index.html#ussue6

import * as Blockly from "blockly/core";
import javascript from "blockly/javascript";

Blockly.Blocks["typeof"] = {
  init: function () {
    this.appendValueInput("input").setCheck(null).appendField("Type of");
    this.setOutput(true, null);
    this.setColour("#982880");
    this.setTooltip("Given an input, it returns its type.");
    this.setHelpUrl("");
  },
};

javascript.javascriptGenerator.forBlock["typeof"] = function (
  block,
  generator
) {
  var value_input = generator.valueToCode(
    block,
    "input",
    javascript.Order.ATOMIC
  );
  var code = `typeof ${value_input}`;
  return [code, javascript.Order.NONE];
};

// -----------------------------------------

Blockly.Blocks["typeof_bol"] = {
  init: function () {
    this.appendValueInput("data").setCheck(null);
    this.appendDummyInput()
      .appendField("is")
      .appendField(
        new Blockly.FieldDropdown([
          ["Undefined", "undefined"],
          ["a String", "string"],
          ["a Number", "number"],
          ["a Function", "function"],
          ["an Object", "object"],
          ["a List", "array"],
        ]),
        "types"
      );
    this.setOutput(true, "Boolean");
    this.setColour("#8f067a");
    this.setTooltip("Returns true or false based on the condition");
    this.setHelpUrl("");
  },
};

javascript.javascriptGenerator.forBlock["typeof_bol"] = function (
  block,
  generator
) {
  var value_data = generator.valueToCode(
    block,
    "data",
    javascript.Order.ATOMIC
  );
  var dropdown_types = block.getFieldValue("types");
  // TODO: Assemble javascript into code variable.
  let code;

  if (dropdown_types == "array") {
    code = `Array.isArray(${value_data})`;
  } else if (dropdown_types == "undefined") {
    code = `${value_data} == undefined`;
  } else {
    code = `typeof ${value_data} == "${dropdown_types}"`;
  }
  // TODO: Change ORDER_NONE to the correct strength.
  return [code, javascript.Order.NONE];
};

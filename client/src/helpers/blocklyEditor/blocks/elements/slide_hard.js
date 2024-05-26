import * as Blockly from "blockly/core";
import javascript from "blockly/javascript";
import utils from "../../../utils";

const blockData = {
  type: "slide_sprite",
  message0:
    "Make %1 slide %2 initial X %3 initial Y %4 final X %5 final Y %6 in time %7 %8",
  args0: [
    {
      type: "field_variable",
      name: "spriteVar",
      variable: "character",
    },
    {
      type: "input_dummy",
    },
    {
      type: "input_value",
      name: "initX",
      check: "Number",
    },
    {
      type: "input_value",
      name: "initY",
      check: "Number",
    },
    {
      type: "input_value",
      name: "finalX",
      check: "Number",
    },
    {
      type: "input_value",
      name: "finalY",
      check: "Number",
    },
    {
      type: "field_dropdown",
      name: "timeFormat",
      options: [
        ["seconds", "seconds"],
        ["milliseconds", "milliseconds"],
      ],
    },
    {
      type: "input_value",
      name: "time",
      check: "Number",
    },
  ],
  inputsInline: false,
  previousStatement: null,
  nextStatement: null,
  colour: "#104f9c",
  tooltip: "Makes a character slide to a position",
  helpUrl: "",
};

Blockly.Blocks[blockData.type] = {
  init: function () {
    this.jsonInit(blockData);
  },
};

javascript.javascriptGenerator.forBlock["slide_sprite"] = function (
  block,
  generator
) {
  var variable_spritevar = generator.nameDB_.getName(
    block.getFieldValue("spriteVar"),
    "VARIABLE"
  );
  var value_initx = generator.valueToCode(
    block,
    "initX",
    javascript.Order.ATOMIC
  );
  var value_inity = generator.valueToCode(
    block,
    "initY",
    javascript.Order.ATOMIC
  );
  var value_finalx = generator.valueToCode(
    block,
    "finalX",
    javascript.Order.ATOMIC
  );
  var value_finaly = generator.valueToCode(
    block,
    "finalY",
    javascript.Order.ATOMIC
  );
  var dropdown_timeformat = block.getFieldValue("timeFormat");
  var value_time = generator.valueToCode(
    block,
    "time",
    javascript.Order.ATOMIC
  );

  var code = `await slideSprite(${variable_spritevar}, { startX: ${value_initx}, startY: ${value_inity}, endX: ${value_finalx}, endY: ${value_finaly}, duration: ${
    dropdown_timeformat == "milliseconds" ? value_time : value_time + " * 1000"
  }});\n`;
  return code;
};

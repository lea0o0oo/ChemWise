import * as Blockly from "blockly/core";
import javascript from "blockly/javascript";
import utils from "../../../utils";

const blockData = {
  type: "slide_sprite_easy",
  message0: "Make %1 slide to %2 X axis %3 Y axis %4 in time %5 %6",
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
      name: "x",
      check: "Number",
    },
    {
      type: "input_value",
      name: "y",
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

javascript.javascriptGenerator.forBlock["slide_sprite_easy"] = function (
  block,
  generator
) {
  var variable_spritevar = generator.nameDB_.getName(
    block.getFieldValue("spriteVar"),
    "VARIABLE"
  );
  var value_x = generator.valueToCode(block, "x", javascript.Order.ATOMIC);
  var value_y = generator.valueToCode(block, "y", javascript.Order.ATOMIC);
  var value_time = generator.valueToCode(
    block,
    "time",
    javascript.Order.ATOMIC
  );
  var dropdown_timeformat = block.getFieldValue("timeFormat");

  var code = `await slideSprite(${variable_spritevar}, { startX: ${variable_spritevar}.x, startY: ${variable_spritevar}.y, endX: ${value_x}, endY: ${value_y}, duration: ${
    dropdown_timeformat == "milliseconds" ? value_time : value_time + " * 1000"
  }});\n`;
  return code;
};

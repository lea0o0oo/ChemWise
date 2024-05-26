import * as Blockly from "blockly/core";
import javascript from "blockly/javascript";
import utils from "../../../utils";

const blockData = {
  type: "number_convert",
  message0: "Convert to number %1",
  args0: [
    {
      type: "input_value",
      name: "data",
    },
  ],
  output: "Number",
  colour: 230,
  tooltip: "Converts data into a number. Returns NaN if the input is invalid",
  helpUrl: "",
};

Blockly.Blocks[blockData.type] = {
  init: function () {
    this.jsonInit(blockData);
  },
};

javascript.javascriptGenerator.forBlock["number_convert"] = function (
  block,
  generator
) {
  var value_data = generator.valueToCode(
    block,
    "data",
    javascript.Order.ATOMIC
  );

  var code = `Number(${value_data})`;
  return [code, javascript.Order.NONE];
};

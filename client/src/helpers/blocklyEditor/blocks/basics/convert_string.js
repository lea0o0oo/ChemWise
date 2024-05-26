import * as Blockly from "blockly/core";
import javascript from "blockly/javascript";
import utils from "../../../utils";

const blockData = {
  type: "string_convert",
  message0: "Convert to string %1",
  args0: [
    {
      type: "input_value",
      name: "data",
    },
  ],
  output: "String",
  colour: 150,
  tooltip: "Converts data into a string",
  helpUrl: "",
};

Blockly.Blocks[blockData.type] = {
  init: function () {
    this.jsonInit(blockData);
  },
};

javascript.javascriptGenerator.forBlock["string_convert"] = function (
  block,
  generator
) {
  var value_data = generator.valueToCode(
    block,
    "data",
    javascript.Order.ATOMIC
  );

  var code = `String(${value_data})`;
  return [code, javascript.Order.NONE];
};

import * as Blockly from "blockly/core";
import javascript from "blockly/javascript";

const blockData = {
  type: "force",
  message0: "force %1",
  args0: [
    {
      type: "input_value",
      name: "block",
    },
  ],
  output: null,
  colour: "#8f067a",
  tooltip:
    "Forces a block into another. Please note that it may cause some problems",
  helpUrl: "",
};

Blockly.Blocks[blockData.type] = {
  init: function () {
    this.jsonInit(blockData);
  },
};

javascript.javascriptGenerator.forBlock["force"] = function (block, generator) {
  var value_block = generator.valueToCode(
    block,
    "block",
    javascript.Order.ATOMIC
  );

  return [value_block, javascript.Order.NONE];
};

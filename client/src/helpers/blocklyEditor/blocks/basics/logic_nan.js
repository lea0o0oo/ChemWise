import * as Blockly from "blockly/core";
import javascript from "blockly/javascript";
import utils from "../../../utils";

const blockData = {
  type: "logic_nan",
  message0: "NaN",
  output: "Number",
  colour: 210,
  tooltip:
    "NaN stands for Not a Number, but if I check it with typeof returns a number. I mean it's javascript, no wonder ¯\\_(ツ)_/¯",
  helpUrl: "",
};

Blockly.Blocks[blockData.type] = {
  init: function () {
    this.jsonInit(blockData);
  },
};

javascript.javascriptGenerator.forBlock["logic_nan"] = function (
  block,
  generator
) {
  var code = "NaN";
  return [code, javascript.Order.NONE];
};

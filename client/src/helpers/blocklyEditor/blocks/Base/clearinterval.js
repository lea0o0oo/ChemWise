import * as Blockly from "blockly/core";
import javascript from "blockly/javascript";
import utils from "../../../utils";

const blockData = {
  type: "clearinterval",
  message0: "Clear interval %1",
  args0: [
    {
      type: "field_input",
      name: "inerName",
      text: "interval",
    },
  ],
  previousStatement: null,
  nextStatement: null,
  colour: 230,
  tooltip: "Clears an interval",
  helpUrl: "",
};

Blockly.Blocks[blockData.type] = {
  init: function () {
    this.jsonInit(blockData);
  },
};

javascript.javascriptGenerator.forBlock["clearinterval"] = function (
  block,
  generator
) {
  var text_inername = utils.sanitizeInput(block.getFieldValue("inerName"), {
    allowNumbers: true,
  });

  var code = `clearInterval(${text_inername});\n`;
  return code;
};

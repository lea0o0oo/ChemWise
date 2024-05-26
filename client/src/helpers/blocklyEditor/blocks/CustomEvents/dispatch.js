import * as Blockly from "blockly/core";
import javascript from "blockly/javascript";
import values from "./values";
import utils from "../../../utils";

const blockData = {
  type: "cevents_dispatch",
  message0: "Emit event %1",
  args0: [
    {
      type: "field_input",
      name: "evName",
      text: "event",
    },
  ],
  previousStatement: null,
  nextStatement: null,
  colour: "#949218",
  tooltip: "Emits the event",
  helpUrl: "",
};

Blockly.Blocks[blockData.type] = {
  init: function () {
    this.jsonInit(blockData);
  },
};

javascript.javascriptGenerator.forBlock["cevents_dispatch"] = function (
  block,
  generator
) {
  var text_evname = utils.sanitizeInput(block.getFieldValue("evName"), {
    allowNumbers: true,
  });
  const evName = values.idkConst2 + text_evname + values.idkConst;

  var code = `document.dispatchEvent(${evName});\n`;
  return code;
};

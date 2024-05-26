import * as Blockly from "blockly/core";
import javascript from "blockly/javascript";
import values from "./values";
import utils from "../../../utils";

const blockData = {
  type: "simple_cevents_make_inblock",
  message0: "On event %1 triggered %2 do %3",
  args0: [
    {
      type: "field_input",
      name: "evName",
      text: "event",
    },
    {
      type: "input_dummy",
    },
    {
      type: "input_statement",
      name: "actions",
    },
  ],
  previousStatement: null,
  nextStatement: null,
  colour: "#949218",
  tooltip: "",
  helpUrl: "",
};

Blockly.Blocks[blockData.type] = {
  init: function () {
    this.jsonInit(blockData);
  },
};

javascript.javascriptGenerator.forBlock["simple_cevents_make_inblock"] =
  function (block, generator) {
    var text_evname = utils.sanitizeInput(block.getFieldValue("evName"), {
      allowNumbers: true,
    });
    var statements_actions = generator.statementToCode(block, "actions");

    const evName = values.idkConst2 + text_evname + values.idkConst;

    var code = `//cevents-inline-${text_evname}
document.addEventListener("${text_evname}", async () => {\n${statements_actions}});\n`;
    return code;
  };

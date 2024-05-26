import * as Blockly from "blockly/core";
import javascript from "blockly/javascript";

const blockData = {
  type: "on_mouseover",
  message0: "On %1 mouse over %2 %3",
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
      type: "input_statement",
      name: "actions",
    },
  ],
  colour: "#ab9916",
  tooltip: "Triggered when the mouse touches an element",
  helpUrl: "",
};

Blockly.Blocks[blockData.type] = {
  init: function () {
    this.jsonInit(blockData);
  },
};

javascript.javascriptGenerator.forBlock["on_mouseover"] = function (
  block,
  generator
) {
  var variable_spritevar = generator.nameDB_.getName(
    block.getFieldValue("spriteVar"),
    "VARIABLE"
  );
  var statements_actions = generator.statementToCode(block, "actions");

  var code = `//bottom
${variable_spritevar}.eventMode = 'static';
${variable_spritevar}.on("pointerover", async () => {\n${statements_actions}});
//end-bottom\n`;
  return code;
};

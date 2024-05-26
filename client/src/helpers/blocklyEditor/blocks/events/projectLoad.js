import * as Blockly from "blockly/core";
import javascript from "blockly/javascript";

Blockly.Blocks["project_loaded"] = {
  init: function () {
    this.appendDummyInput().appendField("On page load");
    this.appendStatementInput("actions").setCheck(null).appendField("do");
    this.setColour("#d6c333");
    this.setTooltip("Emitted when the project gets loaded");
    this.setHelpUrl("");
  },
};

javascript.javascriptGenerator.forBlock["project_loaded"] = function (
  block,
  generator
) {
  var statements_actions = generator.statementToCode(block, "actions");

  var code = statements_actions;
  return code;
};

import * as Blockly from "blockly/core";
import javascript from "blockly/javascript";
import utils from "../../../utils";

const eventVar = utils.generateRandomString(10);
let eventVarIdk;

const blockData = {
  type: "event_keydown",
  message0: "On key press %1 %2",
  args0: [
    {
      type: "input_dummy",
    },
    {
      type: "input_statement",
      name: "actions",
    },
  ],
  colour: "#ab9916",
  tooltip: "Triggered when a key gets pressed",
  helpUrl: "",
};

Blockly.Blocks[blockData.type] = {
  init: function () {
    this.jsonInit(blockData);
  },
};

javascript.javascriptGenerator.forBlock["event_keydown"] = function (
  block,
  generator
) {
  eventVarIdk = utils.generateRandomString(10);
  var statements_actions = generator.statementToCode(block, "actions");

  var code = `document.addEventListener('keydown', async function(${eventVarIdk}) {\n${statements_actions}});`;
  return code;
};

// KEYUP

const blockData2 = {
  type: "event_keyup",
  message0: "On key up %1 %2",
  args0: [
    {
      type: "input_dummy",
    },
    {
      type: "input_statement",
      name: "actions",
    },
  ],
  colour: "#ab9916",
  tooltip: "Triggered when a key gets released",
  helpUrl: "",
};

Blockly.Blocks[blockData2.type] = {
  init: function () {
    this.jsonInit(blockData2);
  },
};

javascript.javascriptGenerator.forBlock["event_keyup"] = function (
  block,
  generator
) {
  eventVarIdk = utils.generateRandomString(10);
  var statements_actions = generator.statementToCode(block, "actions");

  var code = `document.addEventListener('keyup', async function(${eventVarIdk}) {\n${statements_actions}});`;
  return code;
};

// ----------------------------------------------------------------

Blockly.Blocks["keypressevent"] = {
  init: function () {
    this.appendDummyInput().appendField(
      new Blockly.FieldDropdown([
        ["key", "key"],
        ["key code", "code"],
      ]),
      "drp"
    );
    this.setOutput(true, "String");
    this.setColour("#73670e");
    this.setTooltip(
      "key: returns the pressed key | key code: returns a string that represents the key on the keyboard"
    );
    this.setHelpUrl("");
  },
};

javascript.javascriptGenerator.forBlock["keypressevent"] = function (
  block,
  generator
) {
  var dropdown_drp = block.getFieldValue("drp");

  var code = eventVarIdk + "." + dropdown_drp;
  return [code, javascript.Order.NONE];
};

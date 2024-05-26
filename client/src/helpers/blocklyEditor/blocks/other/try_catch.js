import * as Blockly from "blockly/core";
import javascript from "blockly/javascript";

const blockData = {
  type: "try_catch",
  message0: "Try %1 %2 Catch %3 %4",
  args0: [
    {
      type: "input_dummy",
    },
    {
      type: "input_statement",
      name: "actionsTry",
    },
    {
      type: "input_value",
      name: "errorVar",
    },
    {
      type: "input_statement",
      name: "actionsCatch",
    },
  ],
  previousStatement: null,
  nextStatement: null,
  colour: "#8f067a",
  tooltip: "",
  helpUrl:
    "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/try...catch",
};

Blockly.Blocks[blockData.type] = {
  init: function () {
    this.jsonInit(blockData);
  },
};

javascript.javascriptGenerator.forBlock["try_catch"] = function (
  block,
  generator
) {
  var statements_actionstry = generator.statementToCode(block, "actionsTry");
  var value_errorvar = generator.valueToCode(
    block,
    "errorVar",
    javascript.Order.ATOMIC
  );
  var statements_actionscatch = generator.statementToCode(
    block,
    "actionsCatch"
  );

  var code = `try {\n${statements_actionstry}} catch (${
    value_errorvar || "error"
  })\n{\n${statements_actionscatch}}\n`;
  return code;
};

// TRY CATCH FINALLY

const blockData2 = {
  type: "try_catch_finally",
  message0: "Try %1 %2 Catch %3 %4 Finally %5 %6",
  args0: [
    {
      type: "input_dummy",
    },
    {
      type: "input_statement",
      name: "actionsTry",
    },
    {
      type: "input_value",
      name: "errorVar",
    },
    {
      type: "input_statement",
      name: "actionsCatch",
    },
    {
      type: "input_dummy",
    },
    {
      type: "input_statement",
      name: "actionsFinally",
    },
  ],
  previousStatement: null,
  nextStatement: null,
  colour: "#8f067a",
  tooltip: "",
  helpUrl:
    "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/try...catch",
};

Blockly.Blocks[blockData2.type] = {
  init: function () {
    this.jsonInit(blockData2);
  },
};

javascript.javascriptGenerator.forBlock["try_catch_finally"] = function (
  block,
  generator
) {
  var statements_actionstry = generator.statementToCode(block, "actionsTry");
  var value_errorvar = generator.valueToCode(
    block,
    "errorVar",
    javascript.Order.ATOMIC
  );
  var statements_actionscatch = generator.statementToCode(
    block,
    "actionsCatch"
  );
  var statements_actionsfinally = generator.statementToCode(
    block,
    "actionsFinally"
  );

  var code = `try {\n${statements_actionstry}} catch (${
    value_errorvar || "error"
  })\n{\n${statements_actionscatch}} finally {\n${statements_actionsfinally}}\n`;
  return code;
};

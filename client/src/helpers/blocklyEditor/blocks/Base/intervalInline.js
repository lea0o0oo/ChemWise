import * as Blockly from "blockly/core";
import javascript from "blockly/javascript";
import utils from "../../../utils";

const blockData = {
  type: "set_interval_inline",
  message0: "Create interval with name %1 %2 %3 run every %4 %5 %6 %7",
  args0: [
    {
      type: "field_input",
      name: "interName",
      text: "interval",
    },
    {
      type: "input_dummy",
    },
    {
      type: "input_end_row",
    },
    {
      type: "input_value",
      name: "timeout",
      check: "Number",
    },
    {
      type: "field_dropdown",
      name: "format",
      options: [
        ["milliseconds", "ms"],
        ["seconds", "s"],
      ],
    },
    {
      type: "input_end_row",
    },
    {
      type: "input_statement",
      name: "cb",
    },
  ],
  previousStatement: null,
  nextStatement: null,
  colour: 230,
  tooltip: "Runs code at specified intervals",
  helpUrl: "",
};

Blockly.Blocks[blockData.type] = {
  init: function () {
    this.jsonInit(blockData);
  },
};

javascript.javascriptGenerator.forBlock["set_interval_inline"] = function (
  block,
  generator
) {
  var text_intername = utils.sanitizeInput(block.getFieldValue("interName"), {
    allowNumbers: true,
  });
  var value_timeout = generator.valueToCode(
    block,
    "timeout",
    javascript.Order.ATOMIC
  );
  var dropdown_format = block.getFieldValue("format");
  var statements_cb = generator.statementToCode(block, "cb");

  var code = `const ${text_intername} = setInterval(async () => {\n${statements_cb}}, ${
    dropdown_format == "s" ? value_timeout + " * 1000" : value_timeout
  });\n`;
  return code;
};

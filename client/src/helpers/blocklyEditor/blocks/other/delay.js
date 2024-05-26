import * as Blockly from "blockly/core";
import javascript from "blockly/javascript";

const blockData = {
  type: "delay",
  message0: "Wait %1 %2",
  args0: [
    {
      type: "input_value",
      name: "time",
      check: "Number",
    },
    {
      type: "field_dropdown",
      name: "format",
      options: [
        ["seconds", "seconds"],
        ["milliseconds", "milliseconds"],
      ],
    },
  ],
  previousStatement: null,
  nextStatement: null,
  colour: "#8f067a",
  tooltip: "",
  helpUrl: "",
};

Blockly.Blocks[blockData.type] = {
  init: function () {
    this.jsonInit(blockData);
  },
};

javascript.javascriptGenerator.forBlock["delay"] = function (block, generator) {
  var value_time = generator.valueToCode(
    block,
    "time",
    javascript.Order.ATOMIC
  );
  var dropdown_format = block.getFieldValue("format");

  var code = `await delay(${value_time} ${
    dropdown_format == "seconds" ? "* 1000" : ""
  });\n`;
  return code;
};

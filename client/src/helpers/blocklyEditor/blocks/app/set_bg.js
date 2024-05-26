import * as Blockly from "blockly/core";
import javascript from "blockly/javascript";

const blockData = {
  type: "app_set_bg",
  message0: "Set app's background color to %1",
  args0: [
    {
      type: "input_value",
      name: "color",
      check: "Colour",
    },
  ],
  previousStatement: null,
  nextStatement: null,
  colour: "#652b87",
  tooltip: "",
  helpUrl: "",
};

Blockly.Blocks[blockData.type] = {
  init: function () {
    this.jsonInit(blockData);
  },
};

javascript.javascriptGenerator.forBlock[blockData.type] = function (
  block,
  generator
) {
  var value_color = generator.valueToCode(
    block,
    "color",
    javascript.Order.ATOMIC
  );
  // TODO: Assemble javascript into code variable.
  var code = `app.renderer.backgroundColor = ${value_color}\n`;
  return code;
};

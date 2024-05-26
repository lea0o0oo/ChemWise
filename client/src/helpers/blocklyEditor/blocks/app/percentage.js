import * as Blockly from "blockly/core";
import javascript from "blockly/javascript";

const blockData = {
  type: "percentage_screen",
  message0: "%1 %% of screen %2",
  args0: [
    {
      type: "input_value",
      name: "percentage",
      check: "Number",
    },
    {
      type: "field_dropdown",
      name: "axis",
      options: [
        ["width", "width"],
        ["height", "height"],
      ],
    },
  ],
  output: "Number",
  colour: "#652b87",
  tooltip:
    "Will return a number corresponding to the specified percentage of screen height / width.",
  helpUrl: "",
};

Blockly.Blocks[blockData.type] = {
  init: function () {
    this.jsonInit(blockData);
  },
};

javascript.javascriptGenerator.forBlock["percentage_screen"] = function (
  block,
  generator
) {
  var value_percentage = generator.valueToCode(
    block,
    "percentage",
    javascript.Order.ATOMIC
  );
  var dropdown_axis = block.getFieldValue("axis");
  var code = `(app.screen.${dropdown_axis} / 100) * ${value_percentage}`;

  return [code, javascript.Order.NONE];
};

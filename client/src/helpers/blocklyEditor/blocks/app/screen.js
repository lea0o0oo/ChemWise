import * as Blockly from "blockly/core";
import javascript from "blockly/javascript";

const blockData = {
  type: "app_data_get_screen",
  message0: "Screen %1",
  args0: [
    {
      type: "field_dropdown",
      name: "optType",
      options: [
        ["width", "width"],
        ["height", "height"],
      ],
    },
  ],
  output: "Number",
  colour: "#652b87",
  tooltip: "",
  helpUrl: "",
};

Blockly.Blocks[blockData.type] = {
  init: function () {
    this.jsonInit(blockData);
  },
};

javascript.javascriptGenerator.forBlock["app_data_get_screen"] = function (
  block,
  generator
) {
  var dropdown_opttype = block.getFieldValue("optType");
  var code = `app.screen.${dropdown_opttype}`;

  return [code, javascript.Order.NONE];
};

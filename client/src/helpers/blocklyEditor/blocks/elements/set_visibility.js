import * as Blockly from "blockly/core";
import javascript from "blockly/javascript";
import utils from "../../../utils";

const blockData = {
  type: "set_visibility",
  message0: "Set visibility of %1 to %2",
  args0: [
    {
      type: "field_variable",
      name: "varName",
      variable: "character",
    },
    {
      type: "field_dropdown",
      name: "action",
      options: [
        ["visible", "true"],
        ["hidden", "false"],
      ],
    },
  ],
  previousStatement: null,
  nextStatement: null,
  colour: "#104f9c",
  tooltip: "",
  helpUrl: "",
};

Blockly.Blocks[blockData.type] = {
  init: function () {
    this.jsonInit(blockData);
  },
};

javascript.javascriptGenerator.forBlock["set_visibility"] = function (
  block,
  generator
) {
  var dropdown_action = block.getFieldValue("action");
  var variable_varname = generator.nameDB_.getName(
    block.getFieldValue("varName"),
    "VARIABLE"
  );

  var code = `${variable_varname}.visible = ${dropdown_action};\n`;
  return code;
};

import * as Blockly from "blockly/core";
import javascript from "blockly/javascript";
import utils from "../../../utils";

const blockData = {
  type: "set_z_index",
  message0: "Set z-index of %1 to %2",
  args0: [
    {
      type: "field_variable",
      name: "varName",
      variable: "character",
    },
    {
      type: "input_value",
      name: "zValue",
      check: "Number",
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

javascript.javascriptGenerator.forBlock["set_z_index"] = function (
  block,
  generator
) {
  var variable_varname = generator.nameDB_.getName(
    block.getFieldValue("varName"),
    "VARIABLE"
  );
  var value_zvalue = generator.valueToCode(
    block,
    "zValue",
    javascript.Order.ATOMIC
  );

  var code = `${variable_varname}.zIndex = ${value_zvalue};\napp.stage.children.sort((a, b) => a.zIndex - b.zIndex);\n`;
  return code;
};

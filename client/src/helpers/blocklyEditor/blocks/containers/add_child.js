import * as Blockly from "blockly/core";
import javascript from "blockly/javascript";
import utils from "../../../utils";

const blockData = {
  type: "container_add_child",
  message0: "To container %1 %2 Add child %3",
  args0: [
    {
      type: "field_variable",
      name: "containerName",
      variable: "container",
    },
    {
      type: "input_dummy",
    },
    {
      type: "field_variable",
      name: "childName",
      variable: "character",
    },
  ],
  previousStatement: null,
  nextStatement: null,
  colour: "#6e2fad",
  tooltip: "Adds a child to a container",
  helpUrl: "",
};

Blockly.Blocks[blockData.type] = {
  init: function () {
    this.jsonInit(blockData);
  },
};

javascript.javascriptGenerator.forBlock["container_add_child"] = function (
  block,
  generator
) {
  var variable_containername = generator.nameDB_.getName(
    block.getFieldValue("containerName"),
    "VARIABLE"
  );
  var variable_childname = generator.nameDB_.getName(
    block.getFieldValue("childName"),
    "VARIABLE"
  );

  var code = `${variable_containername}.addChild(${variable_childname});\n`;
  return code;
};

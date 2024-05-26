import * as Blockly from "blockly/core";
import javascript from "blockly/javascript";
import utils from "../../../utils";

const blockData = {
  type: "container_create",
  message0: "Create a container %1",
  args0: [
    {
      type: "field_variable",
      name: "cName",
      variable: "container",
    },
  ],
  previousStatement: null,
  nextStatement: null,
  colour: "#6e2fad",
  tooltip: "Creates a container",
  helpUrl: "",
};

Blockly.Blocks[blockData.type] = {
  init: function () {
    this.jsonInit(blockData);
  },
};

javascript.javascriptGenerator.forBlock["container_create"] = function (
  block,
  generator
) {
  var variable_cname = generator.nameDB_.getName(
    block.getFieldValue("cName"),
    "VARIABLE"
  );

  var code = `${variable_cname} = new PIXI.Container();
${variable_cname}.x = app.screen.width / 2;
${variable_cname}.y = app.screen.height / 2;
app.stage.addChild(${variable_cname});\n`;
  return code;
};

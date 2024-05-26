import * as Blockly from "blockly/core";
import javascript from "blockly/javascript";

const blockData = {
  type: "text_create",
  message0: "Create a text %1",
  args0: [
    {
      type: "field_variable",
      name: "varName",
      variable: "text",
    },
  ],
  previousStatement: null,
  nextStatement: null,
  colour: "#a81ab8",
  tooltip: "Creates a new text element",
  helpUrl: "",
};

Blockly.Blocks[blockData.type] = {
  init: function () {
    this.jsonInit(blockData);
  },
};

javascript.javascriptGenerator.forBlock["text_create"] = function (
  block,
  generator
) {
  var variable_varname = generator.nameDB_.getName(
    block.getFieldValue("varName"),
    "VARIABLE"
  );

  var code = `${variable_varname} = new PIXI.Text();
${variable_varname}.anchor.set(0.5);
app.stage.addChild(text);
${variable_varname}.zIndex = 0;\napp.stage.children.sort((a, b) => a.zIndex - b.zIndex);\n`;
  return code;
};

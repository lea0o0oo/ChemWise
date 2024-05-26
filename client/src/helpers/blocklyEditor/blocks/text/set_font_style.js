import * as Blockly from "blockly/core";
import javascript from "blockly/javascript";

const blockData = {
  type: "text_set_font_style",
  message0: "Set font style of text %1 to %2",
  args0: [
    {
      type: "field_variable",
      name: "varName",
      variable: "text",
    },
    {
      type: "field_dropdown",
      name: "fontStyle",
      options: [
        ["normal", "normal"],
        ["italic", "italic"],
        ["oblique", "oblique"],
      ],
    },
  ],
  previousStatement: null,
  nextStatement: null,
  colour: "#a81ab8",
  tooltip: "Sets the font style of a text",
  helpUrl: "",
};

Blockly.Blocks[blockData.type] = {
  init: function () {
    this.jsonInit(blockData);
  },
};

javascript.javascriptGenerator.forBlock["text_set_font_style"] = function (
  block,
  generator
) {
  var variable_varname = generator.nameDB_.getName(
    block.getFieldValue("varName"),
    "VARIABLE"
  );
  var dropdown_fontstyle = block.getFieldValue("fontStyle");

  var code = `${variable_varname}.style.fontStyle = "${dropdown_fontstyle}";\n`;
  return code;
};

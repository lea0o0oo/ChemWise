import * as Blockly from "blockly/core";
import javascript from "blockly/javascript";

const blockData = {
  type: "text_set_font_weight",
  message0: "Set font weight of text %1 to %2",
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
        ["bold", "bold"],
        ["bolder", "bolder"],
        ["lighter", "lighter"],
        ["100", "100"],
        ["200", "200"],
        ["300", "300"],
        ["400", "400"],
        ["500", "500"],
        ["600", "600"],
        ["700", "700"],
        ["800", "800"],
        ["900", "900"],
      ],
    },
  ],
  previousStatement: null,
  nextStatement: null,
  colour: "#a81ab8",
  tooltip: "The font weight.",
  helpUrl: "",
};

Blockly.Blocks[blockData.type] = {
  init: function () {
    this.jsonInit(blockData);
  },
};

javascript.javascriptGenerator.forBlock["text_set_font_weight"] = function (
  block,
  generator
) {
  var variable_varname = generator.nameDB_.getName(
    block.getFieldValue("varName"),
    "VARIABLE"
  );
  var dropdown_fontstyle = block.getFieldValue("fontStyle");

  var code = `${variable_varname}.style.fontWeight = "${dropdown_fontstyle}";\n`;
  return code;
};

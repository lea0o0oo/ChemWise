import * as Blockly from "blockly/core";
import javascript from "blockly/javascript";

const blockData = {
  type: "usertheme_get",
  message0: "Player prefers %1 mode?",
  args0: [
    {
      type: "field_dropdown",
      name: "schemeSel",
      options: [
        ["dark", "dark"],
        ["light", "light"],
      ],
    },
  ],
  output: "Boolean",
  colour: "#148563",
  tooltip:
    "Returns true/false based on the color scheme of the user. You can adapt the color scheme of your game with this block",
  helpUrl: "",
};

Blockly.Blocks[blockData.type] = {
  init: function () {
    this.jsonInit(blockData);
  },
};

javascript.javascriptGenerator.forBlock["usertheme_get"] = function (
  block,
  generator
) {
  var dropdown_schemesel = block.getFieldValue("schemeSel");

  var code = `${
    dropdown_schemesel == "light" ? "!" : ""
  }(window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches)`;

  return [code, javascript.Order.NONE];
};

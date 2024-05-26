import * as Blockly from "blockly/core";
import javascript from "blockly/javascript";

const blockData = {
  type: "sprite_get_dimentions",
  message0: "%1 's %2",
  args0: [
    {
      type: "field_variable",
      name: "spriteVar",
      variable: "character",
    },
    {
      type: "field_dropdown",
      name: "idk",
      options: [
        ["width", "width"],
        ["height", "height"],
      ],
    },
  ],
  output: "Number",
  colour: "#0b376e",
  tooltip: "",
  helpUrl: "",
};

Blockly.Blocks[blockData.type] = {
  init: function () {
    this.jsonInit(blockData);
  },
};

javascript.javascriptGenerator.forBlock["sprite_get_dimentions"] = function (
  block,
  generator
) {
  var variable_spritevar = generator.nameDB_.getName(
    block.getFieldValue("spriteVar"),
    "VARIABLE"
  );
  var dropdown_idk = block.getFieldValue("idk");
  var code = `${variable_spritevar}.${dropdown_idk}`;

  return [code, javascript.Order.NONE];
};

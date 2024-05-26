import * as Blockly from "blockly/core";
import javascript from "blockly/javascript";

const blockData = {
  type: "sprite_set_dimentions",
  message0: "Set %1 's %2 to %3 pixels",
  args0: [
    {
      type: "field_variable",
      name: "sprite",
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
    {
      type: "input_value",
      name: "value",
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

javascript.javascriptGenerator.forBlock["sprite_set_dimentions"] = function (
  block,
  generator
) {
  var variable_sprite = generator.nameDB_.getName(
    block.getFieldValue("sprite"),
    "VARIABLE"
  );
  var dropdown_idk = block.getFieldValue("idk");
  var value_value = generator.valueToCode(
    block,
    "value",
    javascript.Order.ATOMIC
  );

  var code = `${variable_sprite}.${dropdown_idk} = ${value_value};\n`;
  return code;
};

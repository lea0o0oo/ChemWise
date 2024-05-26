import * as Blockly from "blockly/core";
import javascript from "blockly/javascript";

import { FieldColourHsvSliders } from "../../plugins/field-colour-hsv-sliders";

Blockly.Blocks["color_hsv"] = {
  init: function () {
    this.appendDummyInput()
      .appendField("")
      .appendField(new FieldColourHsvSliders("#ff0000"), "COLOUR");
    this.setOutput(true, "Colour");
    this.setStyle("colour_blocks");
  },
};
javascript.javascriptGenerator.forBlock["color_hsv"] = function (
  block,
  generator
) {
  const code = generator.quote_(block.getFieldValue("COLOUR"));
  return [code, javascript.Order.ATOMIC];
};

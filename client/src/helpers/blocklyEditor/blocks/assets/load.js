import * as Blockly from "blockly/core";
import javascript from "blockly/javascript";
import utils from "../../../utils";

function generateRandomString(length) {
  let result = "";
  const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
  const charactersLength = characters.length;
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

const textureCost = "fbekfbek";

Blockly.Blocks["assets_load"] = {
  init: function () {
    this.appendDummyInput()
      .appendField("Load asset")
      .appendField(new Blockly.FieldTextInput("asset"), "assetName");
    this.appendStatementInput("actions").setCheck(null).appendField("then");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour("#729e26");
    this.setTooltip("Forces an asset to load");
    this.setHelpUrl("https://pixijs.download/dev/docs/PIXI.Assets.html");
  },
};

javascript.javascriptGenerator.forBlock["assets_load"] = function (
  block,
  generator
) {
  var text_assetname = utils.sanitizeInput(block.getFieldValue("assetName"));
  var statements_actions = generator.statementToCode(block, "actions");
  const replacerStr = generateRandomString(10);

  var code = `PIXI.Assets.load('${text_assetname}').then(async (${textureCost}) => {
${statements_actions}});\n`;

  code = code.replaceAll(textureCost, replacerStr);
  return code;
};

// texture block

Blockly.Blocks["assets_load_texture"] = {
  init: function () {
    this.appendDummyInput().appendField("Texture");
    this.setOutput(true, null);
    this.setColour("#729e26");
    this.setTooltip("The loaded texture object");
    this.setHelpUrl("");
  },
};

javascript.javascriptGenerator.forBlock["assets_load_texture"] = function (
  block,
  generator
) {
  return [textureCost, javascript.Order.NONE];
};

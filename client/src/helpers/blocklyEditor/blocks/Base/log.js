import * as Blockly from "blockly/core";
import javascript from "blockly/javascript";
import utils from "../../../utils";

const blockData = {
  type: "console_log_uo",
  message0: "Log to console %1",
  args0: [
    {
      type: "input_value",
      name: "data",
    },
  ],
  previousStatement: null,
  nextStatement: null,
  colour: "#148563",
  tooltip: "Logs anything to the console, useful for debugging.",
  helpUrl: "",
};

Blockly.Blocks[blockData.type] = {
  init: function () {
    this.jsonInit(blockData);
  },
};

javascript.javascriptGenerator.forBlock["console_log_uo"] = function (
  block,
  generator
) {
  const tmpStr = utils.generateRandomString(10);
  var value_data = generator.valueToCode(
    block,
    "data",
    javascript.Order.ATOMIC
  );

  var code = `const ${tmpStr} = ${value_data}
console.log(${tmpStr});
document.getElementById("logLBL").innerHTML = typeof ${tmpStr} == 'object' ? (JSON.stringify(${tmpStr}, null, 2)).replaceAll("\\n", "<br />") : String(${tmpStr});
await delay(0.01);\n`;
  return code;
};

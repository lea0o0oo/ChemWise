<script setup>
import { onMounted, ref, shallowRef } from "vue";
import Blockly from "blockly";

import { CrossTabCopyPaste } from "@blockly/plugin-cross-tab-copy-paste";
import { WorkspaceSearch } from "@blockly/plugin-workspace-search";
import { Backpack } from "@blockly/workspace-backpack";
import "@blockly/toolbox-search";
import { Minimap } from "@blockly/workspace-minimap";

import { eventBus } from "../event-bus";

import "../helpers/blocklyEditor/customCategory";
import "../helpers/blocklyEditor/blocks";

const props = defineProps(["options"]);
const blocklyToolbox = ref();
const blocklyDiv = ref();
let workspace = shallowRef();

defineExpose({ workspace });

onMounted(() => {
  const options = props.options || {};
  if (!options.toolbox) {
    options.toolbox = blocklyToolbox.value;
  }
  workspace.value = Blockly.inject(blocklyDiv.value, options);
  workspace.value.addChangeListener(Blockly.Events.disableOrphans);

  const workspaceSearch = new WorkspaceSearch(workspace.value);
  const backpack = new Backpack(workspace.value, {
    allowEmptyBackpackOpen: false,
  });
  const minimap = new Minimap(workspace.value);
  const crossTabCopyPaste = new CrossTabCopyPaste();

  crossTabCopyPaste.init(options, (err) => {
    console.error(err);
  });
  //minimap.init();

  Blockly.ContextMenuRegistry.registry.unregister("blockDuplicate");

  workspaceSearch.init();
  backpack.init();

  function emitEvent(event) {
    if (
      event.type == "move" ||
      event.type == "change" ||
      event.type == "block_field_intermediate_change" ||
      event.type == "var_rename" ||
      event.type == "bubble_open"
    ) {
      eventBus.dispatchEvent(new Event("workspaceChange"));
    }
  }

  workspace.value.addChangeListener(emitEvent);
});
</script>

<template>
  <div style="height: calc(100% - 50px)" class="rounded-xl">
    <div
      class="blocklyDiv h-full rounded-xl"
      ref="blocklyDiv"
      id="blocksEditor"
      style="height: 100%"
    ></div>
    <!-- <xml ref="blocklyToolbox" style="display: none">
      <slot></slot>
    </xml> -->
  </div>
</template>

<style scoped>
.blocklyDiv {
  height: 300px;
  width: 100%;
  border-radius: 400px !important;
}
</style>

<style>
#blocksEditor {
  position: relative;
  /* other styles */
}

.blockly-minimap {
  position: absolute;
  top: 0;
  right: 0;
  box-shadow: none;
  width: 200px;
  height: 150px;
  margin-right: 100px;
  margin-top: 20px;
}

/* .blocklyWorkspace rect[class="blocklyMainBackground"] {
  fill: black !important;
} */

.blocklyTreeRow {
  border-radius: 5px;
  margin-bottom: 8px;
  height: 35px;
  display: flex;
  align-items: center;
}

.blocklyToolboxCategory {
  margin-left: 5px;
  margin-right: 5px;
}

.blocklyTreeLabel {
  color: white;
}

@media (prefers-color-scheme: dark) {
  .blockly-ws-search-input input[type="text"] {
    @apply input bg-neutral-700 text-white;
  }
  .blockly-ws-search {
    @apply bg-neutral-600 border-black shadow-xl;
  }
}
</style>

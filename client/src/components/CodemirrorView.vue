<script setup>
import { EditorView, basicSetup } from "codemirror";
import { javascript } from "@codemirror/lang-javascript";
import { syntaxHighlighting } from "@codemirror/language";
import { EditorState } from "@codemirror/state";
import { onMounted } from "vue";
import {
  oneDarkTheme,
  oneDarkHighlightStyle,
} from "@codemirror/theme-one-dark";
import utils from "../helpers/utils";
import { eventBus } from "../event-bus";
import beautifier from "js-beautify";

const beautifyOptions = {
  indent_size: 2,
  space_in_empty_paren: true,
  max_preserve_newlines: "2",
};

let view;

const fixedHeightEditor = EditorView.theme({
  ".cm-content, .cm-gutter": {
    minHeight: "40vh",
  },
  "&": {
    maxHeight: "40vh",
  },
  ".cm-scroller": { overflow: "auto" },
});

let extensions = [
  basicSetup,
  javascript(),
  fixedHeightEditor,
  EditorState.readOnly.of(true),
];
if (utils.getCurrentTheme(true) == "dark") {
  extensions.push(oneDarkTheme);
  extensions.push(syntaxHighlighting(oneDarkHighlightStyle));
}

onMounted(() => {
  view = new EditorView({
    extensions: extensions,
    parent: document.getElementById("editorDIV"),
  });
});

// Listening for an event and accessing the data
eventBus.addEventListener("updateCode", (event) => {
  let transaction = view.state.update({
    changes: {
      from: 0,
      to: view.state.doc.length,
      insert: beautifier.js_beautify(event.detail, beautifyOptions),
    },
  });
  view.dispatch(transaction);
});
</script>

<template>
  <div id="editorDIV"></div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import Blockly from "blockly";
import BlocklyComponent from "../Blockly.vue";
import blocksToolbox from "../../helpers/blocklyEditor/toolbox/toolbox";
import DarkTheme from "@blockly/theme-dark";
import utils from "../../helpers/utils";
import EditorActionNav from "../BlocksEditorActionNav.vue";
import { javascriptGenerator } from "blockly/javascript";
import compiler from "../../helpers/compiler";
import { eventBus } from "../../event-bus";
import templates from "../../helpers/templates";
import CodeMirroView from "../CodemirrorView.vue";
import beautifier from "js-beautify";

const props = defineProps({
  projectData: Object,
});

let currentTab = "console";
let workspace = ref();
let iframeView;
let innerIframe;

function handleXandY(x, y) {
  const containerW = document.getElementById("iframeContainer").clientWidth;
  const containerH = document.getElementById("iframeContainer").clientHeight;
  const percentageW = Math.round((x / containerW) * 100);
  const percentageH = Math.round((y / containerH) * 100);
  document.getElementById(
    "labelCoords"
  ).innerText = `x: ${x} (${percentageW}%) | y: ${y} (${percentageH}%)`;
}

onMounted(() => {
  iframeView = document.getElementById("previewIframe");
  const iframeContainer = document.getElementById("iframeContainer");

  iframeContainer.addEventListener("mouseenter", () => {
    document.getElementById("infoCoords").classList.remove("hidden");
  });
  iframeContainer.addEventListener("mouseleave", () => {
    document.getElementById("infoCoords").classList.add("hidden");
  });
  iframeView.addEventListener("load", function () {
    innerIframe =
      iframeView.contentDocument || iframeView.contentWindow.document;
    innerIframe
      .getElementById("contentDIV")
      .addEventListener("mousemove", function (event) {
        let rect = innerIframe
          .getElementById("contentDIV")
          .getBoundingClientRect();
        let x = event.clientX - rect.left; // x position within the parent container
        let y = event.clientY - rect.top; // y position within the parent container
        handleXandY(x, y);
      });
    innerIframe
      .getElementById("tmpDIV")
      .addEventListener("mousemove", function (event) {
        let rect = innerIframe.getElementById("tmpDIV").getBoundingClientRect();
        let x = event.clientX - rect.left; // x position within the parent container
        let y = event.clientY - rect.top; // y position within the parent container
        handleXandY(x, y);
      });
    iframeContainer.addEventListener("mousemove", function (event) {
      let rect = iframeContainer.getBoundingClientRect();
      let x = event.clientX - rect.left; // x position within the parent container
      let y = event.clientY - rect.top; // y position within the parent container
      handleXandY(x, y);
    });
  });
});

document.addEventListener("DOMContentLoaded", () => {
  iframeView.addEventListener("load", function () {
    var innerDoc =
      iframeView.contentDocument || iframeView.contentWindow.document;
    var erroLB = innerDoc.getElementById("erroLBL");
    let logsLB = innerDoc.getElementById("logLBL");

    let observer = new MutationObserver((mutationsList, observer) => {
      for (let mutation of mutationsList) {
        if (mutation.type === "childList") {
          log(erroLB.innerHTML, "error");
        }
      }
    });

    observer.observe(erroLB, { childList: true, subtree: true });

    let observerLogs = new MutationObserver((mutationsList, observer) => {
      for (let mutation of mutationsList) {
        if (mutation.type === "childList") {
          log(logsLB.innerHTML);
        }
      }
    });

    observerLogs.observe(logsLB, { childList: true, subtree: true });
  });
});

function log(text, type) {
  const fId = Math.random().toString(36).substring(2, 7);
  if (type == "error") {
    document.getElementById("logsDiv").innerHTML += templates.errorTemplate(
      text,
      fId
    );
  } else {
    document.getElementById("logsDiv").innerHTML += templates.logTemplate(
      text,
      fId
    );
  }
  document.getElementById(fId).scrollIntoView();
}

function clearConsole() {
  document.getElementById("logsDiv").innerHTML = "";
}

const options = {
  media: "https://blockly-demo.appspot.com/static/media/",
  grid: {
    spacing: 25,
    length: 3,
    colour: "#ccc",
    snap: true,
  },
  zoom: {
    controls: true,
    wheel: true,
    startScale: 1.0,
    maxScale: 3,
    minScale: 0.3,
    scaleSpeed: 1.2,
    pinch: true,
  },
  move: {
    scrollbars: {
      horizontal: true,
      vertical: true,
    },
    drag: true,
    wheel: true,
  },
  toolbox: blocksToolbox,
  renderer: "zelos",
  theme: utils.getCurrentTheme(true) == "dark" ? DarkTheme : "zelos",
};

function toggleDrawer(name) {
  let element = document.getElementById(`drawer-${name}`);
  if (element.classList.contains("show")) {
    element.classList.remove("show");
  } else {
    element.classList.add("show");
  }
}

function getCode(prod) {
  return compiler.finalize(
    javascriptGenerator.workspaceToCode(workspace.value.workspace),
    prod
  );
}

function printCode() {
  console.log(getCode(false));
}

function printWorkspace() {
  console.log(
    Blockly.Xml.domToPrettyText(
      Blockly.Xml.workspaceToDom(workspace.value.workspace)
    )
  );
}

eventBus.addEventListener("workspaceChange", () => {
  if (currentTab != "code") return;
  const compiledTestCode = getCode();
  eventBus.dispatchEvent(
    new CustomEvent("updateCode", { detail: compiledTestCode })
  );
});

//🤙 sweg
function testDaCode() {
  clearConsole();
  document.getElementById("testCodeBtn").classList.add("is-loading");
  document.getElementById("testCodeBtn").disabled = true;

  iframeView.addEventListener("load", function loadScript() {
    var iframeDocument =
      iframeView.contentDocument || iframeView.contentWindow.document;
    //iframeDocument.body.innerHTML = "";
    var script = iframeDocument.createElement("script");

    iframeDocument.getElementById("contentDIV").style.display = "flex";
    iframeDocument.getElementById("tmpDIV").style.display = "none";

    const compiledCode = getCode(true);
    const compiledTestCode = getCode();
    // eventBus.dispatchEvent(
    //   new CustomEvent("updateCode", { detail: compiledTestCode })
    // );

    script.innerHTML = beautifier.js_beautify(compiledCode, {
      indent_size: 2,
      space_in_empty_paren: true,
      max_preserve_newlines: "2",
    });
    script.type = "text/javascript";
    iframeDocument.body.appendChild(script);
    iframeView.removeEventListener("load", loadScript);
  });
  iframeView.contentWindow.location.reload();
  setTimeout(() => {
    document.getElementById("testCodeBtn").classList.remove("is-loading");
    document.getElementById("testCodeBtn").disabled = false;
  }, 1000);
}

eventBus.addEventListener("testCode", () => {
  testDaCode();
});

function delPrevCode() {
  localStorage.removeItem("prevCode");
}

function switchTabs(tab) {
  currentTab = tab;
  document.getElementById("codeDiv").classList.add("hidden");
  document.getElementById("consoleDiv").classList.add("hidden");

  document.getElementById("codeTab").classList.remove("tab-active");
  document.getElementById("consoleTab").classList.remove("tab-active");
  document.getElementById("codeTab").classList.add("tab-inactive");
  document.getElementById("consoleTab").classList.add("tab-inactive");

  if (tab == "code") {
    const compiledTestCode = getCode();
    eventBus.dispatchEvent(
      new CustomEvent("updateCode", { detail: compiledTestCode })
    );
    document.getElementById("codeDiv").classList.remove("hidden");
    document.getElementById("codeTab").classList.add("tab-active");
    document.getElementById("codeTab").classList.remove("tab-inactive");
  } else {
    document.getElementById("consoleDiv").classList.remove("hidden");
    document.getElementById("consoleTab").classList.add("tab-active");
    document.getElementById("consoleTab").classList.remove("tab-inactive");
  }
}

function ifxd() {
  const parser = new DOMParser();
  const xmlStr = document.getElementById("xmlDEV").value;
  const xmlDom = parser.parseFromString(xmlStr, "text/xml");
  Blockly.Xml.domToWorkspace(xmlDom.documentElement, workspace.value.workspace);
}
</script>

<template>
  <div class="editorContainer">
    <p class="hidden blue-950 blue-500"></p>
    <div
      class="w-full grid grid-cols-3 gap-3"
      style="height: calc(100vh - 70px)"
    >
      <div class="col-span-2 mt-3 mb-3 ml-3 h-auto">
        <div
          class="dark:bg-neutral-700 bg-neutral-100 rounded-xl mb-3"
          style="min-height: 40px; display: flex; align-items: center"
        >
          <EditorActionNav />
        </div>
        <BlocklyComponent
          :options="options"
          ref="workspace"
          class="h-full rounded-xl"
        />
      </div>
      <div class="flex flex-col">
        <div class="flex-1 mr-3 mb-3">
          <div
            class="rounded-b-xl"
            style="height: 100%; position: relative"
            id="iframeContainer"
          >
            <div
              class="bg-white h-5 text-black rounded-tr-xl rounded-bl-lg opacity-80 hidden"
              id="infoCoords"
              style="position: absolute; top: 0; right: 0"
            >
              <p class="mr-1 ml-1 text-black" id="labelCoords">x: 0 | y: 0</p>
            </div>
            <iframe
              class="w-full rounded-xl mt-3"
              style="height: 100%"
              src="/pixiViewBlocks.html"
              id="previewIframe"
            ></iframe>
          </div>
        </div>
        <div class="flex-1 rounded-xl mr-3 mb-3 h-full">
          <div
            class="dark:bg-neutral-700 bg-neutral-100 rounded-t-xl mt-3"
            style="min-height: 40px; display: flex; align-items: center"
          >
            <div class="border-b border-gray-200 dark:border-gray-700 ml-3">
              <ul
                class="flex flex-wrap -mb-px text-sm font-medium text-center text-gray-500 dark:text-gray-400"
              >
                <li class="me-2">
                  <a
                    href="#"
                    class="inline-flex items-center justify-center p-2 border-b-2 border-transparent rounded-t-lg group tab-active"
                    aria-current="page"
                    id="consoleTab"
                    @click="switchTabs('console')"
                  >
                    <svg
                      fill="currentColor"
                      xmlns="http://www.w3.org/2000/svg"
                      class="me-2"
                      style="height: 1.2rem; width: 1.2rem"
                      viewBox="0 0 24 24"
                      enable-background="new 0 0 24 24"
                      xml:space="preserve"
                    >
                      <path
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        d="M2 7C2 4.23858 4.23858 2 7 2H17C19.7614 2 22 4.23858 22 7V17C22 19.7614 19.7614 22 17 22H7C4.23858 22 2 19.7614 2 17V7ZM7 4C5.34315 4 4 5.34315 4 7V17C4 18.6569 5.34315 20 7 20H17C18.6569 20 20 18.6569 20 17V7C20 5.34315 18.6569 4 17 4H7ZM7 17C7 16.4477 7.44772 16 8 16H16C16.5523 16 17 16.4477 17 17C17 17.5523 16.5523 18 16 18H8C7.44772 18 7 17.5523 7 17ZM8.70709 7.29288C8.31656 6.90236 7.6834 6.90238 7.29288 7.29291C6.90236 7.68344 6.90238 8.3166 7.29291 8.70712L9.58588 11L7.29291 13.2929C6.90238 13.6834 6.90236 14.3166 7.29288 14.7071C7.6834 15.0976 8.31656 15.0976 8.70709 14.7071L11.7072 11.7071C11.8948 11.5196 12.0001 11.2652 12.0001 11C12.0001 10.7348 11.8948 10.4804 11.7072 10.2929L8.70709 7.29288Z"
                        fill="currentColor"
                      />
                    </svg>
                    Console
                  </a>
                </li>
                <li class="me-2">
                  <a
                    href="#"
                    class="inline-flex items-center justify-center p-2 border-b-2 border-transparent rounded-t-lg group tab-inactive"
                    id="codeTab"
                    @click="switchTabs('code')"
                  >
                    <svg
                      fill="currentColor"
                      xmlns="http://www.w3.org/2000/svg"
                      class="w-5 h-5 me-2"
                      viewBox="0 0 512 512"
                      enable-background="new 0 0 52 52"
                      xml:space="preserve"
                    >
                      <path
                        d="M48 256L192 112 224 144 112 256 224 368 192 400 48 256ZM288 368L400 256 288 144 320 112 464 256 320 400 288 368Z"
                      />
                    </svg>
                    Code
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div
            class="rounded-b-xl dark:bg-neutral-600 bg-neutral-300"
            style="height: calc(100% - 40px - 0.75rem)"
            id="consoleDiv"
          >
            <button class="btn ghost warn sm m-2" @click="clearConsole()">
              Clear console
            </button>
            <div
              id="logsDiv"
              class="bg-transparent"
              style="overflow-y: auto; height: calc(40vh - 32.63px - 1rem)"
            ></div>
          </div>
          <div
            class="rounded-b-xl dark:bg-neutral-600 bg-neutral-300 hidden"
            style="height: 40vh"
            id="codeDiv"
          >
            <CodeMirroView />
          </div>
        </div>
      </div>
    </div>

    <div>
      <label class="drawer-overlay" @click="toggleDrawer('right')"></label>
      <div class="drawer right" id="drawer-right">
        <div class="content flex flex-col h-full dark:bg-neutral-800">
          <h2 class="text-xl">DEV Tools</h2>
          <button class="btn light info mt-4" @click="printCode()">
            Print exported JavaScript
          </button>
          <button class="btn light info mt-4" @click="printWorkspace()">
            Print workspace as XML
          </button>
          <button class="btn light info mt-4" @click="delPrevCode()">
            Delete "prevCode" in localStorage
          </button>
          <textarea class="input mt-5" id="xmlDEV" placeholder="XML" />
          <button class="btn light info mt-4" @click="ifxd()">
            Import workspace from XML
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.editorContainer {
  overflow-y: hidden;
}
</style>

<style>
:root {
  --toolbox-width: 100px;
}
.blocklyToolboxCategory {
  min-width: var(--toolbox-width);
}

input[placeholder="Search"] {
  width: calc(var(--toolbox-width) + 15px);
}

@media (prefers-color-scheme: dark) {
  input[placeholder="Search"] {
    @apply bg-black;
  }
}

.tab-active {
  @apply text-blue-600 border-blue-600 dark:text-blue-500 dark:border-blue-500 active;
}

.tab-inactive {
  @apply hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300;
}
</style>
../components/EditorActionNavOld.vue

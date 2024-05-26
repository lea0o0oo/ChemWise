<script setup>
import * as monaco from "monaco-editor";
import utils from "../../helpers/utils";
import EditorActionNav from "../CodeEditorActionNav.vue";
import { eventBus } from "../../event-bus";
import "../../userWorker";
import templates from "../../helpers/templates";
import axios from "axios";
import { useRoute } from "vue-router";
import { Notyf } from "notyf";
import { onMounted } from "vue";

const route = useRoute();
let iframeView;
let projectData = {};
let editor;
const notyf = new Notyf({ position: { x: "right", y: "top" } });

const defaultCode = `// Check KaboomJS documentation at https://kaboomjs.com/ or try examples at https://kaboomjs.com/play
kaboom();

// load a sprite "bean" from an image
loadSprite("bean", "https://kaboomjs.com/sprites/bean.png");

// add something to screen
add([
    sprite("bean"),
    pos(80, 40),
]);`;

async function loadData() {
  utils.toggleModal("modal-loading");
  const response = (
    await axios.get(`/project/${route.params.projectId}`, {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    })
  ).data.data;
  if (!response.data) response.data = {};
  if (!response.data.code) response.data.code = defaultCode;
  projectData = response;
  editor.setValue(projectData.data.code);
  document.getElementById("projName").innerText = projectData.name;
  document.getElementById("projNameModify").value = projectData.name;
  utils.toggleModal("modal-loading");
}

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

onMounted(async () => {
  if (route.query.engine == "pixi7")
    document.getElementById("previewIframe").src = "/pixiCodeView.html";
  iframeView = document.getElementById("previewIframe");
  editor = monaco.editor.create(document.getElementById("editorDIV"), {
    value: "",
    language: "javascript",
    theme: utils.getCurrentTheme(true) == "dark" ? "vs-dark" : "vs-light",
  });
  setTimeout(() => {
    editor.layout({
      width: document.getElementById("editorDIV").offsetWidth,
      height: document.getElementById("editorDIV").offsetHeight,
    });
  }, 20);

  iframeView.addEventListener("load", function () {
    var iframeDocument =
      iframeView.contentDocument || iframeView.contentWindow.document;
    var script = iframeDocument.createElement("script");
    script.type = "text/javascript";

    let editorValue = editor.getValue();

    // Regular expression to find console.log statements
    const consoleLogRegex = /console\.log\((.*?)\)/g;
    const consoleErrorRegex = /console\.error\((.*?)\)/g;

    // Function to replace console.log with the specified code
    const replaceConsoleLog = (match, p1) => {
      const replacementCode = `try { document.getElementById("logLBL").innerHTML = typeof ${p1} == 'object' ? (JSON.stringify(${p1}, null, 2)).replaceAll("\\n", "<br />") : String(${p1}); console.log(${p1}) } catch (err) { console.log(${p1}); document.getElementById("logLBL").innerHTML = "[CONSOLE LOG] Unable to log here, open devtools" }`;
      return replacementCode;
    };
    const replaceConsoleError = (match, p1) => {
      const replacementCode = `try { document.getElementById("erroLBL").innerHTML = typeof ${p1} == 'object' ? (JSON.stringify(${p1}, null, 2)).replaceAll("\\n", "<br />") : String(${p1}); console.error(${p1}) } catch (err) { console.error(${p1}); document.getElementById("erroBL").innerHTML = "[CONSOLE ERROR] Unable to log here, open devtools" }`;
      return replacementCode;
    };

    // Replace all console.log occurrences
    editorValue = editorValue.replace(consoleLogRegex, replaceConsoleLog);
    editorValue = editorValue.replace(consoleErrorRegex, replaceConsoleError);
    script.innerHTML = editorValue;
    iframeDocument.body.appendChild(script);
    document.getElementById("testCodeBtn").classList.remove("is-loading");
    document.getElementById("testCodeBtn").disabled = false;

    // --------------------------

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
  await loadData();
  // document.getElementById("loader").style.display = "hidden";
  // document.getElementById("mainView").style.display = "grid";
});

addEventListener("resize", (event) => {
  // editor.layout({
  //   width: 100,
  //   height: 100,
  // });
  editor.layout({
    width: document.getElementById("editorDIV").offsetWidth,
    height: document.getElementById("editorDIV").offsetHeight,
  });
});

function testCodee() {
  console.clear();
  document.getElementById("testCodeBtn").classList.add("is-loading");
  document.getElementById("testCodeBtn").disabled = true;
  iframeView.contentWindow.location.reload();
  clearConsole();
  // After this clear the event listener
}

eventBus.addEventListener("testCode", () => {
  testCodee();
});

async function save() {
  document.getElementById("saveBtn").classList.add("is-loading");
  axios
    .post(
      `/project/${route.params.projectId}`,
      {
        code: editor.getValue(),
      },
      { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
    )
    .then((response) => {
      notyf.success("Salvato");
    })
    .catch((error) => {
      notyf.error("Errore");
      console.error(error);
    })
    .finally(() => {
      document.getElementById("saveBtn").classList.remove("is-loading");
    });
}

eventBus.addEventListener("save", async () => {
  save();
});

document.addEventListener("keydown", (event) => {
  if (event.ctrlKey && event.key === "s") {
    event.preventDefault();
    save();
  } else if (event.ctrlKey && event.key === "q") {
    event.preventDefault();
    testCodee();
  }
});
</script>

<template>
  <div
    id="loader"
    class="w-full flex justify-center items-center hidden"
    style="height: calc(100vh - 70px)"
  >
    <div class="loader bw">
      <div class="bar-bounce" />
    </div>
  </div>
  <div
    style="width: 100%; height: calc(100vh - 70px)"
    class="grid grid-cols-3 col-span-6"
    id="mainView"
  >
    <div
      class="col-span-2 bg-black"
      style="background-color: black; height: 100%"
    >
      <div class="w-full" style="height: 40px"><EditorActionNav /></div>
      <div
        id="editorDIV"
        style="background-color: orange; height: calc(100% - 40px); width: 100%"
      ></div>
    </div>
    <div>
      <div style="height: 50%; width: 100%">
        <iframe
          src="/kaboomCodeView.html"
          id="previewIframe"
          class="w-full h-full"
        ></iframe>
      </div>
      <div
        style="height: 50%; width: 100%"
        class="dark:bg-zinc-700 bg-zinc-300"
      >
        <div
          id="logsDiv"
          class="bg-transparent"
          style="overflow-y: auto; height: calc(45vh)"
        ></div>
      </div>
    </div>
  </div>

  <div>
    <label class="modal-overlay"></label>
    <div class="modal gap-5 lg:w-80 w-full" id="modal-loading">
      <div class="flex w-full justify-center">
        <div class="loader bw">
          <div class="bar-bounce" />
        </div>
      </div>

      <p style="text-align: center; width: 100%">Caricamento</p>
    </div>
  </div>
</template>

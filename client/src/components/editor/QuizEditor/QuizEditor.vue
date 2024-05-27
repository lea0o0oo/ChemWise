<script setup>
import { MdEditor } from "md-editor-v3";
import "md-editor-v3/lib/style.css";
import { ref, reactive, onMounted } from "vue";
import utils from "../../../helpers/utils";
import { marked } from "marked";
import AnswerButton from "./AnswerButton.vue";
import axios from "axios";
import { useRoute } from "vue-router";

let projectData = reactive([
  {
    question: "",
    answers: [],
    points: 10,
  },
]);
const currentIndex = ref(0);
const editorRef = ref();
const route = useRoute();

const currentTheme = utils.getCurrentTheme(true);
const id = "editorElement";
const text = ref("");
const scrollElement = document.getElementById("editorContainer");
let prevName = "";

onMounted(async () => {
  utils.toggleModal("load-proj-modal");
  const data = (
    await axios.get(`/project/${route.params.projectId}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
  ).data.data;
  if (data.data == null || data.data.questions.length == 0) {
    // boh è 00:01 sono stanchissimo e non so cosa sto facendo
  } else {
    data.data.questions.forEach((question, index) => {
      if (index != 0) projectData.push(question);
      else {
        projectData[0].question = question.question;
        projectData[0].answers = question.answers;
        projectData[0].points = question.points;
      }
    });
    text.value = projectData[currentIndex.value].question;
    document.getElementById("pointsInput").value =
      projectData[currentIndex.value].points;
    document.getElementById("answersArea").value =
      projectData[currentIndex.value].answers.join("\n");
  }
  prevName = data.name;
  utils.toggleModal("load-proj-modal");
  document.getElementById("projName").innerText = data.name;
});

function editorChange(value) {
  document.getElementById("questionDIV").innerHTML =
    marked.parse(value) + "<br />";
}

function parseAnswers() {
  const answers = document.getElementById("answersArea").value.split("\n");
  projectData[currentIndex.value].answers = [];
  answers.forEach((answer) => {
    projectData[currentIndex.value].answers.push(answer);
  });
}

function clear() {
  document.getElementById("questionDIV").innerHTML = "";
  document.getElementById("answersArea").value = "";
  text.value = "";
}
function changePage(action) {
  //console.log(currentIndex);
  projectData[currentIndex.value].question = text.value;
  projectData[currentIndex.value].points = Number(
    document.getElementById("pointsInput").value
  );
  const answers = document.getElementById("answersArea").value.split("\n");
  projectData[currentIndex.value].answers = answers;
  if (action == "next") {
    if (projectData.length == currentIndex.value + 1) {
      projectData.push({
        question: "",
        answers: [],
        points: 10,
      });
    }
    currentIndex.value++;
  } else if (action == "prev") {
    if (projectData.length == 1) return;
    if (currentIndex.value > 0) currentIndex.value--;
  }
  clear();

  text.value = projectData[currentIndex.value].question;
  document.getElementById("pointsInput").value =
    projectData[currentIndex.value].points;
  document.getElementById("answersArea").value =
    projectData[currentIndex.value].answers.join("\n");
  //console.log(projectData);
}

function delQuestion() {
  if (currentIndex.value == 0) return;
  changePage("prev");
  setTimeout(() => {
    projectData = projectData.slice(currentIndex.value + 1, 1);
  }, 100);
}

function editname() {
  prevName = document.getElementById("projName").innerText;
  document.getElementById("projNameModify").value =
    document.getElementById("projName").innerText;
  document.getElementById("projName").classList.add("hidden");
  document.getElementById("projNameModify").classList.remove("hidden");
  document.getElementById("projNameModify").focus();
}

function acutallyEditName() {
  document.getElementById("projName").innerText =
    document.getElementById("projNameModify").value;
  document.getElementById("projName").classList.remove("hidden");
  document.getElementById("projNameModify").classList.add("hidden");
  if (document.getElementById("projName").innerText == prevName) return;
  axios
    .post(
      `/projectInfo/${route.params.projectId}`,
      {
        name: document.getElementById("projName").innerText,
      },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    )
    .then(() => {
      utils.notyf("Nome cambiato", "success");
      prevName = document.getElementById("projName").innerText;
    })
    .catch((err) => {
      utils.notyf(err.response?.data?.error || "Errore", "error");
      document.getElementById("projName").innerText = prevName;
    });
}

function save() {
  projectData[currentIndex.value].question = text.value;
  projectData[currentIndex.value].points = Number(
    document.getElementById("pointsInput").value
  );
  const answers = document.getElementById("answersArea").value.split("\n");
  projectData[currentIndex.value].answers = answers;
  document.getElementById("save-btn").classList.add("is-loading");
  axios
    .post(
      `/project/${route.params.projectId}`,
      {
        questions: projectData,
      },
      { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
    )
    .then((response) => {
      utils.notyf("Salvato", "success");
    })
    .catch((err) => {
      console.error(err);
      utils.notyf(err.response?.data?.error || "Errore", "error");
    })
    .finally(() => {
      document.getElementById("save-btn").classList.remove("is-loading");
    });
}

document.addEventListener("keydown", (event) => {
  if (event.ctrlKey && event.key === "s") {
    event.preventDefault();
    save();
  }
});
</script>

<template>
  <div
    class="w-[calc(100vw-1.5rem)] rounded-xl dark:bg-black bg-neutral-200 mt-2 ml-2 flex items-center p-2"
    style="height: 50px"
  >
    <div class="w-full flex">
      <p
        class="font-bold text-2xl hover:opacity-60 w-50"
        id="projName"
        @click="editname()"
      ></p>
      <input
        id="projNameModify"
        @focusout="acutallyEditName()"
        class="hidden dark:bg-black h-7"
        autocomplete="off"
      />
    </div>
    <div class="flex h-full items-center">
      <button
        class="btn solid sm danger mr-2 hidden"
        @click="doRenderPreview()"
      >
        Anteprima
      </button>
      <button class="btn solid sm info" id="save-btn" @click="save()">
        Salva
      </button>
    </div>
  </div>

  <div
    class="w-full grid lg:grid-cols-3 grid-cols-1 p-3 h-[calc(100vh-70px)] max-h-[calc(100vh-70px-60px)] gap-2"
  >
    <div
      class="lg:col-span-2 rounded-xl dark:bg-neutral-900 bg-neutral-200 p-8"
    >
      <div class="">
        <article
          class="prose lg:prose-xl dark:prose-invert w-full max-h-[calc(100vh-70px-8px-8px-50px)]"
          id="questionDIV"
          style="
            max-width: 100%;
            max-height: 100%;
            line-break: auto;
            word-break: break-all;
            overflow-y: hidden;
          "
        ></article>
      </div>
      <div class="w-full grid lg:grid-cols-2 grid-cols-1 mt-2 gap-7">
        <AnswerButton
          v-for="i in projectData[currentIndex].answers"
          :text="i"
          :isDev="true"
        />
      </div>
    </div>
    <div>
      <div class="flex">
        <div class="w-full flex items-center">
          <button class="btn bw ghost sm mr-2" @click="changePage('prev')">
            &lt;
          </button>
          <p class="font-bold text-xl">
            Domanda {{ currentIndex + 1 }}/{{ projectData.length }}
          </p>
          <button class="btn bw ghost sm ml-2" @click="changePage('next')">
            >
          </button>
        </div>
        <button
          class="hover:opacity-50"
          @click="utils.toggleModal('modal-del-slide')"
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 16 16"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            stroke="red"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="1.5"
          >
            <path d="M5.75 4.25v-2.5h4.5v2.5m-6.5 1v9h8.5v-9m-9.5-.5h10.5" />
          </svg>
        </button>
      </div>
      <div class="w-full dark:bg-neutral-700 bg-neutral-300 h-[2px] my-2"></div>
      <div class="flex items-baseline mb-1">
        <h3 class="font-bold text-3xl">Domanda</h3>
        <p class="ml-2">⚠️ HTML NON VIENE SANITIZZATO!</p>
      </div>
      <div id="editorContainer">
        <MdEditor
          ref="editorRef"
          v-model="text"
          language="en-US"
          :editorId="id"
          :scrollElement="scrollElement"
          :preview="false"
          :noUploadImg="true"
          :theme="currentTheme"
          :onChange="editorChange"
          value=""
        />
      </div>
      <div class="flex items-baseline mt-10">
        <h3 class="font-bold text-3xl">Risposte</h3>
        <p class="ml-2">✅ HTML viene sanitizzato</p>
      </div>
      <textarea
        class="input h-[200px]"
        id="answersArea"
        @input="parseAnswers()"
      ></textarea>
      Punti risposta
      <input
        type="number"
        class="dark:bg-black"
        id="pointsInput"
        :value="projectData[currentIndex].points"
      />
    </div>
  </div>
  <button
    class="hidden bg-red-500 bg-blue-500 bg-green-500 bg-yellow-500"
  ></button>
  <div>
    <label
      class="modal-overlay"
      @click="utils.toggleModal('modal-del-slide')"
    ></label>
    <div class="modal flex flex-col gap-5" id="modal-del-slide">
      <button
        class="absolute right-4 top-3"
        @click="utils.toggleModal('modal-del-slide')"
      >
        ✕
      </button>
      <h2 class="text-xl">Elimina domanda</h2>
      <span
        >Sicuro di voler eliminare questa domanda? Questa azione non è
        reversibile</span
      >
      <div class="flex gap-3">
        <button
          class="btn solid danger flex-1"
          @click="
            delQuestion();
            utils.toggleModal('modal-del-slide');
          "
        >
          Elimina
        </button>
        <button
          class="btn solid bw flex-1"
          @click="utils.toggleModal('modal-del-slide')"
        >
          Annulla
        </button>
      </div>
    </div>
  </div>
  <div>
    <label class="modal-overlay"></label>
    <div
      class="modal flex flex-col gap-5 justify-center items-center"
      style="min-width: 300px"
      id="load-proj-modal"
    >
      <div class="loader bw">
        <div class="spin" />
      </div>
      <p>Caricamento</p>
    </div>
  </div>
</template>

<style scoped>
#editorElement {
  height: 250px;
}
</style>

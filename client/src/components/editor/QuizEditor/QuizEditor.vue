<script setup>
import { MdEditor } from "md-editor-v3";
import "md-editor-v3/lib/style.css";
import { ref } from "vue";
import utils from "../../../helpers/utils";
import { marked } from "marked";
import { sanitize } from "isomorphic-dompurify";
import AnswerButton from "./AnswerButton.vue";
import { reactive } from "vue";

let projectData = reactive([
  {
    question: "",
    answers: [],
    points: 10,
  },
]);
const currentIndex = ref(0);
const editorRef = ref();

const currentTheme = utils.getCurrentTheme(true);
const id = "editorElement";
const text = ref("");
const scrollElement = document.getElementById("editorContainer");

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
  console.log(projectData);
}
</script>

<template>
  <div
    class="w-full grid lg:grid-cols-3 grid-cols-1 p-3 h-[calc(100vh-70px)] max-h-[calc(100vh-70px)] gap-2"
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
        />
      </div>
    </div>
    <div>
      <div class="flex">
        <div class="w-full flex items-center">
          <button class="btn bw ghost sm mr-2" @click="changePage('prev')">
            &lt;
          </button>
          <p class="font-bold text-xl">Domanda {{ currentIndex + 1 }}</p>
          <button class="btn bw ghost sm ml-2" @click="changePage('next')">
            >
          </button>
        </div>
        <button class="hover:opacity-50">
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
</template>

<style scoped>
#editorElement {
  height: 250px;
}
</style>

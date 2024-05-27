<script setup>
import AnswerButton from "../editor/QuizEditor/AnswerButton.vue";
import { onMounted, nextTick, ref } from "vue";
import { marked } from "marked";
import { eventBus } from "../../event-bus";
import utils from "../../helpers/utils";
import axios from "axios";

const props = defineProps({
  questions: Array,
});
let dataQuestions = [];
let currentIndex = 0;
const renderComponent = ref(true);
const progresso = ref(null);
const correctCount = ref(0);
const coinsCount = ref(0);

const forceRerender = async () => {
  renderComponent.value = false;
  await nextTick();
  renderComponent.value = true;
};

function shuffleArray(originalArray) {
  let array = [...originalArray]; // Copy the original array
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]]; // Swap elements
  }
  return array;
}

dataQuestions = shuffleArray(props.questions);
dataQuestions.forEach((question) => {
  question.answers = shuffleArray(question.answers);
});

onMounted(async () => {
  await nextTick();
  document.getElementById("questionDIV").innerHTML = marked.parse(
    dataQuestions[currentIndex].question
  );
  let gridH = document.getElementById("gridContainer").offsetHeight;
  document.getElementById(
    "questionDIV"
  ).style.height = `calc(100% - ${gridH}px - 1rem - 20px)`;
});

const colors = ["success", "info", "warn", "danger", "bw"];

const currentColor = colors[Math.floor(Math.random() * colors.length)];

async function next() {
  if (currentIndex + 1 != dataQuestions.length) {
    currentIndex++;
    await forceRerender();
    document.getElementById("questionDIV").innerHTML = marked.parse(
      dataQuestions[currentIndex].question
    );
    let gridH = document.getElementById("gridContainer").offsetHeight;
    document.getElementById(
      "questionDIV"
    ).style.height = `calc(100% - ${gridH}px - 1rem - 20px)`;
  } else {
    renderComponent.value = false;
    currentIndex = dataQuestions.length;
    document.getElementById("questionDIV").innerHTML = "";
    utils.hide("questionDIV");
    utils.hide("gridContainer");
    utils.show("resultsDIV");
    if (coinsCount.value < 0) coinsCount.value = 0;
    if (localStorage.getItem("token") == null) utils.show("loggapls");
    if (coinsCount.value < 0) return;

    axios
      .post(
        "/user/addCoins",
        { coins: coinsCount.value },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      )
      .catch((err) => {
        console.log(err);
        utils.notyf(err.response?.data?.error || "Errore", "error");
      });
  }
}
eventBus.addEventListener("showAnswers", (correct) => {
  if (correct.detail) {
    correctCount.value++;
    coinsCount.value += dataQuestions[currentIndex].points;
  }
  setTimeout(() => {
    next();
  }, 1000);
});
</script>

<template>
  <div class="w-full h-full dark:bg-neutral-900 bg-neutral-200 rounded-xl p-2">
    <progress
      ref="progresso"
      :class="'progress colored xl ' + currentColor"
      :value="currentIndex"
      :max="dataQuestions.length"
    />
    <div id="resultsDIV" class="hidden none">
      <h2 class="font-bold text-4xl">Resoconto</h2>
      <p class="text-lg mt-2">🌏 Domande totali: {{ dataQuestions.length }}</p>
      <p class="text-lg mt-2">✅ Risposte corrette: {{ correctCount }}</p>
      <p class="text-lg mt-2">
        ❌ Risposte errate: {{ dataQuestions.length - correctCount }}
      </p>
      <p class="text-lg mt-2">🪙 Gettoni guadagnati: {{ coinsCount }}</p>
      <p id="loggapls" class="hidden mt-2 font-bold text-xl">
        Effettua il login per ottenere i gettoni
      </p>
    </div>
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
    <div
      class="w-full grid lg:grid-cols-2 grid-cols-1 mt-2 gap-4 px-1"
      id="gridContainer"
    >
      <AnswerButton
        v-for="i in dataQuestions[currentIndex].answers"
        :text="i"
        v-if="renderComponent"
      />
    </div>
  </div>
</template>

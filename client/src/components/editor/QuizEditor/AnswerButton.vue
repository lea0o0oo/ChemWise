<script setup>
import { sanitize } from "isomorphic-dompurify";
import { ref } from "vue";
import { eventBus } from "../../../event-bus";

const colors = ["bg-red-500", "bg-blue-500", "bg-green-500", "bg-yellow-500"];

const currentColor = colors[Math.floor(Math.random() * colors.length)];

const props = defineProps({
  text: String,
  isDev: {
    type: Boolean,
    default: false,
  },
});
const correctElem = ref(null);
const wrongElem = ref(null);
const currentElem = ref(null);

function handleAnswer() {
  if (props.isDev) return;
  if (!props.text.includes("--correct")) {
    currentElem.value.classList.add("opacity-50");
    wrongElem.value.classList.remove("hidden");
  } else {
    correctElem.value.classList.remove("hidden");
  }
  currentElem.value.classList.remove("hover:scale-105");
  currentElem.value.disabled = true;
  eventBus.removeEventListener("showAnswers", handleAnswer);
}
eventBus.addEventListener("showAnswers", handleAnswer);
function validateAnswer() {
  if (props.isDev) return;
  eventBus.dispatchEvent(
    new CustomEvent("showAnswers", { detail: props.text.includes("--correct") })
  );
}
</script>

<template>
  <div class="none">
    <button
      ref="currentElem"
      :class="
        'rounded-xl w-full h-[60px] shadow-xl transition-all hover:scale-105 ' +
        currentColor
      "
      @click="validateAnswer()"
    >
      <div class="flex items-center justify-center w-full">
        <svg
          ref="correctElem"
          width="32"
          height="32"
          viewBox="0 0 24 24"
          class="mr-3 hidden"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill="none"
            stroke="currentColor"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M3.7 14.3 9.6 19 20.3 5"
          />
        </svg>
        <svg
          width="32"
          height="32"
          viewBox="0 0 16 16"
          class="mr-3 hidden"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          ref="wrongElem"
        >
          <path
            fill="currentColor"
            d="M12.78 4.28a.75.75 0 0 0-1.06-1.06L8 6.94 4.28 3.22a.75.75 0 0 0-1.06 1.06L6.94 8l-3.72 3.72a.75.75 0 1 0 1.06 1.06L8 9.06l3.72 3.72a.75.75 0 1 0 1.06-1.06L9.06 8z"
          />
        </svg>
        <p class="font-bold text-xl">
          {{ sanitize(text.replace("--correct", "")) }}
        </p>
      </div>
    </button>
  </div>
</template>

<script setup>
import utils from "../../../helpers/utils";
import Layouts from "./Layouts.vue";
import SvgLoader from "../../../components/SvgLoader.vue";
import { eventBus } from "../../../event-bus";
import { ref } from "vue";

const props = defineProps({
  selected: Boolean,
  layoutUrl: String,
  name: String,
  index: Number,
});
const currentBtn = ref(null);

function selectSlide() {
  eventBus.dispatchEvent(
    new CustomEvent("selectSlide", {
      detail: { name: props.name, index: props.index },
    })
  );
}

eventBus.addEventListener("slideScrollView", (event) => {
  try {
    if (event.detail == props.index) currentBtn.value.scrollIntoView();
  } catch (error) {}
});
</script>

<template>
  <button
    @click="selectSlide()"
    ref="currentBtn"
    style="height: 20%; width: 100%; min-height: 170px; margin-bottom: 8px"
    :class="
      'dark:bg-neutral-900 bg-gray-200 rounded-xl ' +
      (selected
        ? 'dark:border-white border-black border-2'
        : 'hover:opacity-60')
    "
  >
    <div class="flex w-full justify-center mt-2">
      <SvgLoader :src="layoutUrl" style="height: 130px; padding: 5px" />
    </div>
    <p class="mt-1">{{ name }}</p>
  </button>
</template>

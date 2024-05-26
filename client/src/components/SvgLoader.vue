<script setup>
import { onMounted, ref } from "vue";
const props = defineProps({
  src: String,
  style: {
    type: Object,
    default: {},
  },
});

const svgContainer = ref(null);
const parser = new DOMParser();

onMounted(async () => {
  const response = await fetch(props.src);
  const blob = await response.blob();
  const svg = await blob.text();
  let svgDoc = parser.parseFromString(svg, "text/xml");
  let finalStyleStr = "";
  Object.keys(props.style).forEach((key) => {
    finalStyleStr += `${key}: ${props.style[key]};`;
  });
  svgDoc.getElementsByTagName("svg")[0].setAttribute("style", finalStyleStr);
  svgContainer.value.innerHTML =
    svgDoc.getElementsByTagName("svg")[0].outerHTML;
});
</script>
<template>
  <div class="none" ref="svgContainer"></div>
  <svg
    class="fill-neutral-300 fill-neutral-100 fill-neutral-200 fill-neutral-400 fill-neutral-500 fill-neutral-600 fill-neutral-700 dark:fill-neutral-800 hidden"
  ></svg>
</template>

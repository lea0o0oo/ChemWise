<script setup>
const colors = ["bg-red-500", "bg-blue-500", "bg-green-500", "bg-yellow-500"];

const currentColor = colors[Math.floor(Math.random() * colors.length)];

const props = defineProps({
  text: String,
});
</script>

<template>
  <div class="none">
    <button
      :class="
        'rounded-xl w-full h-[100px] shadow-xl transition-all hover:scale-105 ' +
        currentColor
      "
    >
      <p class="font-bold text-xl">{{ text.replace("--correct", "") }}</p>
    </button>
  </div>
</template>

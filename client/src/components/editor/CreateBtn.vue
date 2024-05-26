<script setup>
const props = defineProps({
  img: String,
  text: String,
  subtitle: String,
  disabled: Boolean,
});
</script>
<template>
  <button class="w-full text-left" :disabled="props.disabled">
    <div
      class="w-full mt-2 hover:opacity-80 cursor-pointer dark:bg-neutral-800 bg-neutral-200 border-neutral-300 dark:border-neutral-700 border-2 rounded-2xl shadow-xl h-[4rem] flex items-center"
      :style="disabled ? 'pointer-events: none; opacity: 0.67' : ''"
    >
      <img :src="props.img" class="h-10 w-auto ml-2" />
      <div class="ml-3 w-full">
        <p class="text-xl w-full">{{ props.text }}</p>
        <p class="w-full text-xs lg:text-sm md:text-sm">{{ subtitle }}</p>
      </div>

      <div class="flex justify-end">
        <svg
          class="h-7 w-7 opacity-75 mr-3"
          viewBox="-5 0 25 25"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="m3.454.57 10.848 10.424.09.08c.363.35.576.813.608 1.364l-.002.185c-.03.49-.243.954-.664 1.354l.005-.008L3.454 24.431a2.06 2.06 0 0 1-2.845 0 1.964 1.964 0 0 1 0-2.844l9.403-9.03L.609 3.413a1.964 1.964 0 0 1 0-2.844 2.06 2.06 0 0 1 2.845 0"
            fill="currentColor"
          />
        </svg>
      </div>
    </div>
  </button>
</template>

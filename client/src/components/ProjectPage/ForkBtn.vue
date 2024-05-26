<script setup>
import { useLikesStore } from "../../stores/ProjectPageStore";

const props = defineProps({
  liked: Boolean,
  count: Number,
});

const store = useLikesStore();
</script>

<template>
  <button
    class="opacity-65 ml-1 dark:bg-neutral-700 bg-white rounded-xl hover:opacity-30"
  >
    <div class="flex justify-center items-center ml-3 mr-3 mt-1 mb-1">
      <svg
        width="35"
        height="35"
        viewBox="-4 -2 24 24"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="xMinYMin"
        fill="currentColor"
      >
        <path
          d="M8 18a1 1 0 1 0 0-2 1 1 0 0 0 0 2m1.033-3.817A3.001 3.001 0 1 1 7 14.17v-1.047q0-.111.008-.221a1 1 0 0 0-.462-.637L3.46 10.42A3 3 0 0 1 2 7.845V5.829a3.001 3.001 0 1 1 2 0v2.016a1 1 0 0 0 .487.858l3.086 1.846a3 3 0 0 1 .443.324 3 3 0 0 1 .444-.324l3.086-1.846a1 1 0 0 0 .487-.858V5.841A3.001 3.001 0 0 1 13 0a3 3 0 0 1 1.033 5.817v2.028a3 3 0 0 1-1.46 2.575l-3.086 1.846a1 1 0 0 0-.462.637q.008.11.008.22zM3 4a1 1 0 1 0 0-2 1 1 0 0 0 0 2m10 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2"
        />
      </svg>
      <p class="ml-2 font-bold text-lg">{{ store.forks }}</p>
    </div>
  </button>
</template>

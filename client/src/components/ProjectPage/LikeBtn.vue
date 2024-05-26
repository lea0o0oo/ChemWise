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
    class="opacity-75 ml-1 dark:bg-neutral-700 bg-white rounded-xl hover:opacity-30"
  >
    <div class="flex justify-center items-center ml-3 mr-3 mt-1 mb-1">
      <svg
        width="35"
        height="35"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g stroke="currentColor" stroke-width="1.5">
          <path
            d="m7.66 10.102 4.1-6.1c.4-.6 1.4-1 2.2-.7.9.3 1.5 1.3 1.3 2.2l-.5 3.2c-.1.7.4 1.2 1 1.2h4c1.5 0 2.42 1.15 1.9 2.6s-.98 4.05-2.4 6.3c-.65 1.03-1.363 1.75-2.58 1.75H6.66"
            stroke-miterlimit="10"
            :fill="liked ? 'gray' : 'none'"
          />
          <path
            d="M2.18 10.552a1 1 0 0 1 1-1h3.5a1 1 0 0 1 1 1v10h-4.5a1 1 0 0 1-1-1z"
            :fill="liked ? 'gray' : 'none'"
          />
        </g>
      </svg>
      <p class="ml-2 font-bold text-lg">{{ store.likes }}</p>
    </div>
  </button>
</template>

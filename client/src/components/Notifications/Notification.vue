<script setup>
defineProps({
  type: String, // like, follow, comment, reply
  content: String,
  link: String,
  project: Object,
  createdAt: Date,
});
</script>

<template>
  <div
    class="w-full dark:border-neutral-700 border-2 min-h-[50px] rounded-xl mb-3 flex items-center p-2"
    v-if="type === 'like'"
  >
    <p class="w-full">
      <a class="link text-danger-800 font-bold">ciao</a> ha lasciato mi piace al
      tuo progetto
      <strong>we</strong>
    </p>
    <p class="font-bold">{{ createdAt.toLocaleDateString() }}</p>
  </div>
</template>

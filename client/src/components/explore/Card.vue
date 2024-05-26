<script setup>
defineProps({
  author: String,
  date: String,
  thumbnail: String,
  title: String,
  id: String,
});
</script>

<template>
  <button class="text-left w-full h-full">
    <a :href="'/project/' + id" class="w-full h-full">
      <div
        class="overflow-hidden rounded-2xl has-shadow w-full h-full relative m-5 group hover:scale-105 hover:cursor-pointer transition-all"
        style="min-height: 250px"
      >
        <div class="w-full h-full">
          <img
            :src="thumbnail != '' ? thumbnail : '/no_thumbnail.png'"
            class="aspect-video w-full h-full"
            style="object-fit: cover"
            alt=""
          />
        </div>
        <div
          class="absolute inset-0 z-10 bg-gradient-to-t from-black group-hover:hidden"
        />
        <div
          class="absolute inset-x-0 bottom-0 z-20 p-4 text-white group-hover:hidden"
        >
          <div class="text-xs">{{ author }} • {{ date }}</div>
          <h3 class="text-xl font-semibold">{{ title }}</h3>
        </div>
      </div>
    </a>
  </button>
</template>

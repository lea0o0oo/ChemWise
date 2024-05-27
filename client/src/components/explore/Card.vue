<script setup>
const props = defineProps({
  thumbnail: String,
  title: String,
  id: String,
  type: String,
});

//console.log(props.type);
let badgeData = {};
if (props.type == "slideshow") {
  badgeData.type = "Appunti";
  badgeData.color = "success";
} else if (props.type == "code") {
  badgeData.type = "Simulazione";
  badgeData.color = "info";
} else if (props.type == "quiz") {
  badgeData.type = "Quiz";
  badgeData.color = "danger";
}
</script>

<template>
  <button class="text-left w-full h-full">
    <a :href="'/project/' + id" class="w-full h-full">
      <div
        class="overflow-hidden rounded-2xl has-shadow w-full h-full relative group hover:scale-105 hover:cursor-pointer transition-all"
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
          <div class="flex gap-2">
            <div class="text-xs">
              <div :class="'badge solid sm ' + badgeData.color">
                {{ badgeData.type }}
              </div>
            </div>
            <div class="text-xs hidden">
              <div class="badge solid bw sm">Moli</div>
            </div>
          </div>

          <h3 class="text-xl font-semibold">{{ title }}</h3>
        </div>
      </div>
    </a>
  </button>
</template>

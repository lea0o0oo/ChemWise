<script setup>
import Card from "../components/explore/Card.vue";
import axios from "axios";
import utils from "../helpers/utils";
import { useRoute } from "vue-router";
import { onMounted, reactive } from "vue";

let projects = reactive([]);
const route = useRoute();

onMounted(async () => {
  let url = "/explore";
  if (route.query.q) url += `/?q=${route.query.q}`;
  const response = (await axios.get(url)).data;
  response.data.docs.forEach((doc) => {
    projects.push(doc);
  });
  document.getElementById("loader").classList.add("hidden");
  document.getElementById("mainDIV").classList.add("grid");
  document.getElementById("mainDIV").classList.remove("hidden");
  document.getElementById("bgContainer").classList.remove("hidden");
});
</script>

<template>
  <div
    id="loader"
    class="flex w-full items-center justify-center dark:bg-neutral-800"
    style="min-height: calc(100vh - 70px)"
  >
    <div class="loader bw">
      <div class="bar-bounce" />
    </div>
  </div>
  <div class="w-full min-h-[calc(100vh-70px)] hidden" id="bgContainer">
    <div
      class="grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 xl:w-full w-[calc(100%-2.5rem)] hidden"
      id="mainDIV"
    >
      <Card
        v-for="i in projects"
        :thumbnail="i.thumbnail"
        :title="i.name"
        :date="new Date(i.createdAt).toLocaleDateString()"
        :author="i.owner.username"
        :id="i._id"
      />
    </div>
  </div>
</template>

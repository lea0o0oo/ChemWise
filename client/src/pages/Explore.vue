<script setup>
import Card from "../components/explore/Card.vue";
import axios from "axios";
import utils from "../helpers/utils";
import { useRoute } from "vue-router";
import { onMounted, reactive, ref, nextTick } from "vue";

let projects = reactive([]);
const route = useRoute();
const renderComponent = ref(true);

const forceRerender = async () => {
  renderComponent.value = false;
  await nextTick();
  renderComponent.value = true;
};
onMounted(async () => {
  let url = "/explore";
  const params = new URLSearchParams();
  // url += `/?q=${route.query.q || ""}`;
  // url += `&type=${route.query.type || ""}`;
  if (route.query.q) params.append("q", route.query.q);
  if (route.query.type) params.append("type", route.query.type);

  const response = (await axios.get(url, { params })).data;
  response.data.docs.forEach((doc) => {
    projects.push(doc);
  });
  document.getElementById("loader").classList.add("hidden");
  document.getElementById("mainDIV").classList.add("grid");
  document.getElementById("mainDIV").classList.remove("hidden");
  document.getElementById("bgContainer").classList.remove("hidden");
});

async function loadSorted(type) {
  projects = [];
  document.getElementById("loader").classList.remove("hidden");
  document.getElementById("mainDIV").classList.add("grid");
  document.getElementById("mainDIV").classList.add("hidden");
  document.getElementById("bgContainer").classList.remove("hidden");
  let url = "/explore";
  const params = new URLSearchParams();
  // url += `/?q=${route.query.q || ""}`;
  // url += `&type=${route.query.type || ""}`;
  if (route.query.q) params.append("q", route.query.q);
  params.append("type", type);

  const response = (await axios.get(url, { params })).data;
  response.data.docs.forEach((doc) => {
    projects.push(doc);
  });
  console.log(projects);
  document.getElementById("loader").classList.add("hidden");
  document.getElementById("mainDIV").classList.add("grid");
  document.getElementById("mainDIV").classList.remove("hidden");
  document.getElementById("bgContainer").classList.remove("hidden");
  forceRerender();
}
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
    <div class="flex w-full justify-end px-5 pt-3 items-center">
      <h3 class="font-bold text-xl w-full hidden">Risultati per: x</h3>
      <div class="dropdown bw hidden">
        <label class="btn solid sm pill" tabindex="0"
          >Tutti gli argomenti
          <svg
            width="20"
            height="20"
            viewBox="0 0 48 48"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path fill="currentColor" fill-opacity=".01" d="M0 0h48v48H0z" />
            <path
              d="M37 18 25 30 13 18"
              stroke="currentColor"
              stroke-width="4"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </label>
        <div class="menu bottom-left">
          <a class="item text-sm" tabindex="-1">Stati di aggregazione</a>
          <a class="item text-sm" tabindex="-1">Moli</a>
          <a class="item text-sm" tabindex="-1">Polarità</a>
        </div>
      </div>
      <div class="dropdown bw ml-3">
        <label class="btn solid sm pill" tabindex="0"
          >Tutti i tipi
          <svg
            width="20"
            height="20"
            viewBox="0 0 48 48"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path fill="currentColor" fill-opacity=".01" d="M0 0h48v48H0z" />
            <path
              d="M37 18 25 30 13 18"
              stroke="currentColor"
              stroke-width="4"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </label>
        <div class="menu bottom-left">
          <a
            class="item text-sm success"
            tabindex="-1"
            @click="loadSorted('slideshow')"
            >Appunti</a
          >
          <a
            class="item text-sm danger"
            tabindex="-1"
            @click="loadSorted('quiz')"
            >Quiz</a
          >
          <a class="item text-sm info" tabindex="-1" @click="loadSorted('code')"
            >Simulazioni</a
          >
        </div>
      </div>
    </div>
    <div
      class="grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 xl:w-full w-[calc(100%-2.5rem)] hidden"
      id="mainDIV"
    >
      <Card
        v-if="renderComponent"
        v-for="i in projects"
        :thumbnail="i.thumbnail"
        :title="i.name"
        :type="i.type"
        :id="i._id"
      />
    </div>
  </div>
</template>

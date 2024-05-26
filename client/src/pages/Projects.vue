<script setup>
import checkAuth from "../helpers/checkAuth";
import Card from "../components/projects/Card.vue";
import utils from "../helpers/utils";
import axios from "axios";
import { nextTick, ref } from "vue";
const renderComponent = ref(true);

const forceRerender = async () => {
  // Remove MyComponent from the DOM
  renderComponent.value = false;

  // Wait for the change to get flushed to the DOM
  await nextTick();

  // Add the component back in
  renderComponent.value = true;
};

checkAuth();

let projectsList = [];
let sortedList = [];

utils.onLoad(async () => {
  const response = await axios.get("/projects", {
    headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
  });
  projectsList = response.data.data;
  sortedList = projectsList;
  document.getElementById("loader").classList.add("hidden");
  document.getElementById("content").classList.remove("hidden");
  document.getElementById("content").classList.add("grid");
  console.log(projectsList);
  forceRerender();
  if (projectsList.length == 0) {
    document.getElementById("content").classList.add("flex");
    document.getElementById("content").classList.remove("grid");
    document.getElementById("content").innerHTML = "Nessun progetto :(";
    document.getElementById("content").style.height =
      "calc(100vh - 70px - 0.75rem)";
  }
});

function sortProjects(filter) {
  if (filter == "all") sortedList = projectsList;
  else if (filter == "forked")
    sortedList = projectsList.filter((project) => project.forked);
  else if (filter == "public")
    sortedList = projectsList.filter((project) => project.public);
  else if (filter == "private")
    sortedList = projectsList.filter((project) => !project.public);
  forceRerender();
}
</script>

<template>
  <div
    class="lg:flex md:flex dark:bg-neutral-900 bg-neutral-200"
    style="height: calc(100vh - 70px)"
  >
    <div
      class="dark:bg-neutral-900 bg-neutral-200 lg:h-full overflow-x-auto lg:block md:block flex lg:w-[300px] md:w-[300px]"
    >
      <div class="ml-3 mr-3 lg:block md:block flex lg:gap-0 gap-2">
        <button
          style="width: 100%; height: 50px"
          class="text-left dark:bg-neutral-800 bg-neutral-100 rounded-xl hover:opacity-75 mb-2 p-3"
          @click="sortProjects('all')"
        >
          <p class="flex items-center">
            <svg
              width="20"
              height="20"
              viewBox="0 0 52 52"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              class="opacity-75 mr-2"
              xml:space="preserve"
            >
              <path
                d="M31.6 21.6c-1.2 0-2.2-1-2.2-2.2V5.5c0-1.2 1-2.2 2.2-2.2h14.2c1.2 0 2.2 1 2.2 2.2v13.9c0 1.2-1 2.2-2.2 2.2zm6.1 8.2-8.2 8.9c-.5.5-.5 1.3 0 1.9l8.2 8.9c.5.6 1.5.6 2 0l8.2-8.9c.5-.5.5-1.3 0-1.9l-8.2-8.9c-.5-.6-1.4-.6-2 0"
              />
              <circle cx="13" cy="39.4" r="9.3" />
              <path
                d="M4.8 6.5 12 2.4c.7-.4 1.5-.4 2.1 0l7.1 4.1c.7.4 1.1 1.1 1.1 1.9v8.2c0 .8-.4 1.5-1.1 1.9l-7.1 4.1c-.7.4-1.5.4-2.1 0l-7.2-4.1c-.7-.4-1.1-1.1-1.1-1.9V8.4c0-.8.4-1.5 1.1-1.9"
              />
            </svg>
            Tutti
          </p>
        </button>
        <button
          @click="sortProjects('forked')"
          style="width: 100%; height: 50px"
          class="text-left dark:bg-neutral-800 bg-neutral-100 rounded-xl hover:opacity-75 mb-2 p-3"
        >
          <p class="flex items-center">
            <svg
              width="20"
              height="20"
              viewBox="-4 -2 24 24"
              xmlns="http://www.w3.org/2000/svg"
              preserveAspectRatio="xMinYMin"
              class="opacity-75 mr-2"
              fill="currentColor"
            >
              <path
                d="M8 18a1 1 0 1 0 0-2 1 1 0 0 0 0 2m1.033-3.817A3.001 3.001 0 1 1 7 14.17v-1.047q0-.111.008-.221a1 1 0 0 0-.462-.637L3.46 10.42A3 3 0 0 1 2 7.845V5.829a3.001 3.001 0 1 1 2 0v2.016a1 1 0 0 0 .487.858l3.086 1.846a3 3 0 0 1 .443.324 3 3 0 0 1 .444-.324l3.086-1.846a1 1 0 0 0 .487-.858V5.841A3.001 3.001 0 0 1 13 0a3 3 0 0 1 1.033 5.817v2.028a3 3 0 0 1-1.46 2.575l-3.086 1.846a1 1 0 0 0-.462.637q.008.11.008.22zM3 4a1 1 0 1 0 0-2 1 1 0 0 0 0 2m10 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2"
              />
            </svg>
            Biforcati
          </p>
        </button>
        <button
          style="width: 100%; height: 50px"
          @click="sortProjects('public')"
          class="text-left dark:bg-neutral-800 bg-neutral-100 rounded-xl hover:opacity-75 mb-2 p-3"
        >
          <p class="flex items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              fill="currentColor"
              height="20"
              viewBox="0 0 52 52"
              xml:space="preserve"
              class="opacity-75 mr-2"
            >
              <path
                d="M26 2C12.7 2 2 12.7 2 26s10.7 24 24 24 24-10.7 24-24S39.3 2 26 2m2 5.1h-.2zM26 45C15.5 45 7 36.5 7 26c0-1 .1-2.1.3-3 1.3.2 2.9.7 3.7 1.5 1.7 1.8 3.6 3.9 5.4 4.3 0 0-.2.1-.4.4s-.4.9-.4 1.9c0 4.7 4.4 1.9 4.4 6.6s5.3 6.6 5.3 2.8 3.5-5.6 3.5-8.5-2.7-2.8-4.4-3.8c-1.8-.9-2.7-2.4-6.1-1.9-1.8-1.7-2.8-3.1-2-4.7.9-1.7 4.6-2 4.6-4.6s-2.5-3.1-4.3-3.1c-.8 0-2.5-.6-3.9-1.3 1.7-1.7 3.8-3.1 6-4.1 1.6.7 4.3 1.8 6.6 1.8 2.7 0 4.1-1.9 3.7-3.1 4.5.7 8.5 3 11.4 6.2-1.5.9-3.5 1.9-7 1.9-4.6 0-4.6 4.7-1.9 5.6 2.8.9 5.6-1.8 6.5 0s-6.5 1.8-4.6 6.4 3.7-.1 5.6 4.5 5.6-.7 2.8-4.3c-1.2-1.6-.9-6.5 1.9-6.5h.9c.4 1.6.7 3.3.7 5C45 36.5 36.5 45 26 45"
              />
            </svg>
            Pubblicati
          </p>
        </button>
        <button
          @click="sortProjects('private')"
          style="width: 100%; height: 50px"
          class="text-left dark:bg-neutral-800 bg-neutral-100 rounded-xl hover:opacity-75 mb-2 p-3"
        >
          <p class="flex items-center">
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              class="mr-2 opacity-75"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M12 4c1.648 0 3 1.352 3 3v3H9V7c0-1.648 1.352-3 3-3m5 6V7c0-2.752-2.248-5-5-5S7 4.248 7 7v3H6a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8a2 2 0 0 0-2-2zM6 12h12v8H6z"
                fill="currentColor"
              />
            </svg>
            Privati
          </p>
        </button>
      </div>
    </div>
    <div class="w-full dark:bg-neutral-800 bg-neutral-100 h-full rounded-tl-xl">
      <div
        id="loader"
        class="flex w-full items-center justify-center"
        style="height: calc(100vh - 70px)"
      >
        <div class="loader bw">
          <div class="bar-bounce" />
        </div>
      </div>
      <div
        class="xl:grid-cols-5 lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-6 col-span-6 m-3 hidden items-center justify-center"
        id="content"
      >
        <Card
          v-for="i in sortedList"
          v-if="renderComponent"
          :title="i.name"
          :description="i.description"
          :date="new Date(i.createdAt)"
          :updated="new Date(i.lastUpdate)"
          :thumbnail="i.thumbnail"
          :id="i._id"
          :type="i.type"
          :engine="i.engine"
        />
      </div>
    </div>
  </div>
  <div class="border-white border-2 hidden"></div>
</template>

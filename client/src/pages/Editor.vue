<script setup>
import { useRoute } from "vue-router";
import { onMounted, nextTick } from "vue";
import utils from "../helpers/utils";
import NewProject from "../components/editor/NewProject.vue";
import EditorBlocks from "../components/editor/EditorBlocks.vue";
import CodeEditor from "../components/editor/CodeEditor.vue";
import SlideshowEditor from "./slideshowEditor/SlideshowEditor.vue";
import axios from "axios";

const route = useRoute();
let projectType = route.query.type;
let projectData = {};
const showLogin = localStorage.getItem("token") === null;

const isLogged = localStorage.getItem("token") != null;
onMounted(async () => {
  await nextTick();
  if (showLogin)
    return document.getElementById("loader").classList.add("hidden");
  if (localStorage.getItem("token") === null) utils.toggleModal("modal-login");
  else if (route.params.projectId == "new")
    document.getElementById("loader").classList.add("hidden");
  else if (!route.query.type) {
    const response = (
      await axios.get(`/project/${route.params.projectId}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      })
    ).data.data;
    projectType = response.type;
    let engine = response.engine;
    window.location.href =
      window.location.href + `?type=${response.type}&engine=${engine}`;
  } else {
    document.getElementById("loader").classList.add("hidden");
  }
});
</script>

<template>
  <div
    id="loading"
    class="hidden w-full justify-center items-center dark:bg-neutral-800"
    style="height: calc(100vh - 70px)"
  >
    <div class="loader bw xl info">
      <div class="flow-cross" />
    </div>
  </div>
  <!-- LOGIN MODAL -->
  <div
    class="w-full h-[calc(100vh-70px)] flex justify-center items-center"
    v-if="showLogin"
  >
    <div
      class="flex flex-col gap-5 dark:bg-black p-4 rounded-xl max-w-[500px]"
      style="min-width: 250px"
      id="modal-login"
    >
      <h2 class="text-xl">Login necessario</h2>
      <span>È necessario effettuare il login per creare un progetto</span>
      <div class="flex gap-3">
        <a href="/login" class="w-full">
          <button class="btn solid info flex-1 w-full">Login</button></a
        >
        <a class="w-full" href="/register">
          <button class="btn solid bw flex-1 w-full">Registrati</button>
        </a>
      </div>
    </div>
  </div>

  <!-- END LOGIN MODAL -->
  <div
    class="flex w-full justify-center items-center dark:bg-neutral-800"
    style="height: calc(100vh - 70px)"
    id="loader"
  >
    <div class="loader bw">
      <div class="bar-bounce" />
    </div>
  </div>
  <NewProject v-if="route.params.projectId == 'new' && isLogged" />
  <EditorBlocks v-if="projectType == 'blocks'" :projectData="projectData" />
  <CodeEditor v-if="projectType == 'code'" :projectData="projectData" />
  <SlideshowEditor v-if="projectType == 'slideshow'" />
</template>

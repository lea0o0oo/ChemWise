<script setup lang="ts">
import utils from "../../helpers/utils";
import CreateBtn from "./CreateBtn.vue";
import axios from "axios";

let projectData = {
  name: "",
  description: "",
  type: "", // quiz, iframe, blocks, code
  data: {},
  engine: "",
};
let isCreating: boolean = false;

function showAdvanced() {
  utils.hide("premade");
  utils.show("advanced");
}

function step2(projectType: string, engine?: string) {
  if (projectType) projectData.type = projectType;
  if (engine) projectData.engine = engine;
  utils.hide("step1");
  utils.show("step2");
}

function create() {
  event.preventDefault();
  document.getElementById("errordiv").classList.add("hidden");
  if (isCreating) return;
  projectData.name = (
    document.getElementById("name-input") as HTMLInputElement
  ).value;
  document.getElementById("create-btn").classList.add("is-loading");
  axios
    .post("/project/create", projectData, {
      headers: { Authorization: "Bearer " + localStorage.getItem("token") },
    })
    .then((response) => {
      window.location.assign("/projects");
    })
    .catch((response) => {
      document.getElementById("err-content").innerText =
        response.response.data.error;
      document.getElementById("errordiv").classList.remove("hidden");
      document.getElementById("create-btn").classList.remove("is-loading");
      isCreating = false;
    });
}
</script>

<template>
  <div class="h-[calc(100vh-70px)] w-full flex justify-center items-center">
    <div
      class="flex flex-col gap-5 w-full max-w-lg rounded-xl dark:bg-black bg-neutral-100 p-5"
      style="min-width: 350px"
    >
      <h2 class="text-xl">Crea progetto</h2>
      <div id="step1" class="none">
        <span>Seleziona il tipo di progetto</span>

        <div class="gap-3 mt-2">
          <div id="premade" class="none">
            <CreateBtn
              img="https://upload.wikimedia.org/wikipedia/commons/thumb/1/11/Blue_question_mark_icon.svg/2048px-Blue_question_mark_icon.svg.png"
              text="Slideshow"
              subtitle="Slideshows interattive"
              @click="step2('slideshow')"
            />
            <CreateBtn
              img="/iframe.png"
              text="Incorpora"
              subtitle="Incorpora un sito"
              :disabled="true"
            />
            <CreateBtn
              img="/code-icon.png"
              text="Opzioni avanzate"
              @click="showAdvanced()"
            />
          </div>
          <div id="advanced" class="none hidden">
            <CreateBtn
              img="/blockly-icon.png"
              text="Blocchi"
              subtitle="PixyJS v7, Potrai convertire a codice"
              @click="step2('blocks')"
              :disabled="true"
            />
            <CreateBtn
              img="/code-icon.png"
              text="Codice"
              subtitle="PixiJS v7"
              @click="step2('code', 'pixi7')"
              :disabled="true"
            />
            <CreateBtn
              img="/code-icon.png"
              text="Codice"
              subtitle="KaboomJS v3000.0"
              @click="step2('code', 'kaboom3000')"
            />
          </div>
        </div>
      </div>
      <div id="step2" class="none hidden">
        <div class="prompt danger ghost mb-2 hidden" id="errordiv">
          <div class="content">
            <p id="err-content">err</p>
          </div>
        </div>
        <span>Nome del progetto</span>
        <form @submit="create()">
          <input
            class="input bw mt-2 mb-2"
            required
            id="name-input"
            minlength="3"
            maxlength="40"
            autocomplete="off"
          />
          <button
            class="btn solid success w-full"
            type="submit"
            id="create-btn"
          >
            Crea
          </button>
        </form>
      </div>
    </div>
  </div>
</template>

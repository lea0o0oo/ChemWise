<script setup>
import utils from "../../../helpers/utils";
import Layouts from "./Layouts.vue";
</script>

<template>
  <button
    style="height: 20%; width: 100%; min-height: 170px"
    @click="utils.toggleModal('modal-new-slide')"
    class="dark:bg-neutral-900 bg-gray-200 hover:opacity-60 rounded-xl"
    id="newSlideBtn"
  >
    <div class="flex w-full justify-center">
      <svg
        width="100"
        height="100"
        viewBox="0 0 24 24"
        data-name="Line Color"
        xmlns="http://www.w3.org/2000/svg"
        class="icon line-color opacity-75"
      >
        <path
          d="M5 12h14m-7-7v14"
          stroke="currentColor"
          style="
            fill: none;
            stroke-linecap: round;
            stroke-linejoin: round;
            stroke-width: 2;
          "
        />
      </svg>
    </div>
    <p>Nuova slide</p>
  </button>

  <div>
    <label
      class="modal-overlay"
      @click="utils.toggleModal('modal-new-slide')"
    ></label>
    <div
      class="modal flex flex-col gap-5 w-full customStyle max-w-4xl"
      id="modal-new-slide"
    >
      <button
        class="absolute right-4 top-3"
        @click="utils.toggleModal('modal-new-slide')"
      >
        ✕
      </button>
      <h2 class="text-xl">Layout</h2>
      <span>Seleziona il tipo di slide e layout</span>
      <Layouts />
      <div class="flex gap-3 hidden">
        <button class="btn solid info flex-1">Seleziona</button>
        <button
          class="btn solid bw flex-1"
          @click="utils.toggleModal('modal-new-slide')"
        >
          Chiudi
        </button>
      </div>
    </div>
  </div>
</template>

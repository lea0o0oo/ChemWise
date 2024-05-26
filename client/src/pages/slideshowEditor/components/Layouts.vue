<script setup>
import SvgLoader from "../../../components/SvgLoader.vue";
import utils from "../../../helpers/utils";
import { eventBus } from "../../../event-bus";

function selectSlide(type) {
  utils.toggleModal("modal-new-slide");
  eventBus.dispatchEvent(new CustomEvent("createSlide", { detail: type }));
}

function select() {
  event.preventDefault();
}
</script>

<template>
  <form @click="select()">
    <p class="mb-1">Sezioni informative</p>
    <div
      class="grid w-full gap-10"
      style="grid-template-columns: repeat(auto-fit, minmax(100px, 1fr))"
    >
      <div class="none">
        <button
          style="width: 150px; height: 107px"
          class="hover:border-2 p-2 pb-5 rounded-xl"
          @click="selectSlide('info_1')"
        >
          <SvgLoader src="/slideshowLayouts/info_1.svg" />
        </button>
      </div>
      <div class="none">
        <button
          style="width: 150px; height: 107px"
          class="hover:border-2 p-2 pb-5 rounded-xl"
          @click="selectSlide('info_2')"
        >
          <SvgLoader src="/slideshowLayouts/info_2.svg" />
        </button>
      </div>
      <div class="none">
        <button
          style="width: 150px; height: 107px"
          class="hover:border-2 p-2 pb-5 rounded-xl"
          @click="selectSlide('info_3')"
        >
          <SvgLoader src="/slideshowLayouts/info_3.svg" />
        </button>
      </div>
      <div class="none">
        <button
          style="width: 150px; height: 107px"
          class="hover:border-2 p-2 pb-5 rounded-xl"
          @click="selectSlide('info_4')"
        >
          <SvgLoader src="/slideshowLayouts/info_4.svg" />
        </button>
      </div>
      <div class="none">
        <button
          style="width: 150px; height: 107px"
          class="hover:border-2 p-2 pb-5 rounded-xl"
          @click="selectSlide('info_5')"
        >
          <SvgLoader src="/slideshowLayouts/info_5.svg" />
        </button>
      </div>
    </div>
    <p class="mt-3 mb-1">Quiz - <i class="opacity-50">in arrivo</i></p>
    <div
      class="grid w-full gap-6 opacity-70"
      style="grid-template-columns: repeat(auto-fit, minmax(100px, 1fr))"
    >
      <div class="none">
        <button
          disabled
          style="width: 150px; height: 107px"
          class="hover:boorder-2 p-2 pb-5 rounded-xl"
          @click="selectSlide('quiz_1')"
        >
          <SvgLoader src="/slideshowLayouts/quiz_1.svg" />
        </button>
      </div>
      <div class="none">
        <button
          disabled
          style="width: 150px; height: 107px"
          class="hover:boorder-2 p-2 pb-5 rounded-xl"
          @click="selectSlide('quiz_2')"
        >
          <SvgLoader src="/slideshowLayouts/quiz_2.svg" />
        </button>
      </div>
      <div class="none">
        <button
          disabled
          style="width: 150px; height: 107px"
          class="hover:boorder-2 p-2 pb-5 rounded-xl"
          @click="selectSlide('quiz_3')"
        >
          <SvgLoader src="/slideshowLayouts/quiz_3.svg" />
        </button>
      </div>
    </div>
  </form>
</template>

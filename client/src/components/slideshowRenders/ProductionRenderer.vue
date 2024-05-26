<script setup>
import InfoRenders from "./InfoRenders.vue";
import { eventBus } from "../../event-bus";
import { reactive, ref, onMounted, nextTick } from "vue";

const props = defineProps({
  slides: Array,
});
let currentSlideType = props.slides[0].layoutType;
let currentIndex = reactive(0);
const shouldRender = ref(true);

//console.log(props.slides);
const forceRender = async () => {
  shouldRender.value = false;
  await nextTick();
  shouldRender.value = true;
};

function checkDisabled() {
  if (currentIndex + 1 == props.slides.length) {
    document.getElementById("nextBTN").disabled = true;
    document.getElementById("nextBTN").classList.add("opacity-50");
  } else {
    document.getElementById("nextBTN").disabled = false;
    document.getElementById("nextBTN").classList.remove("opacity-50");
  }
  if (currentIndex == 0) {
    document.getElementById("prevBTN").disabled = true;
    document.getElementById("prevBTN").classList.add("opacity-50");
  } else {
    document.getElementById("prevBTN").disabled = false;
    document.getElementById("prevBTN").classList.remove("opacity-50");
  }
}

function loadSlide(index) {
  Object.keys(props.slides[index].elements).forEach((key) => {
    let finalHTML;
    let imgURL;
    const elementType = props.slides[index].elements[key].elemType;
    if (elementType == "text")
      finalHTML = props.slides[index].elements[key].elemValue;
    else if (elementType == "iframe")
      finalHTML = `<iframe src="${props.slides[index].elements[key].elemValue}" class="w-full h-full rounded-xl" />`;
    else if (elementType == "image") {
      imgURL = props.slides[index].elements[key].elemValue;
      finalHTML = `<img src="${imgURL}" class="rounded-xl slideshowIMG" />`;
    }
    eventBus.dispatchEvent(
      new CustomEvent("updateSlidePreview", {
        detail: {
          type: currentSlideType,
          elemType: props.slides[index].elements[key].elemType,
          value: finalHTML,
          elementNum: props.slides[index].elements[key].elemNum,
        },
      })
    );
  });
  checkDisabled();
}
onMounted(() => {
  loadSlide(currentIndex);
});

function next() {
  currentIndex++;
  currentSlideType = props.slides[currentIndex].layoutType;
  forceRender();
  setTimeout(() => {
    loadSlide(currentIndex);
  }, 5);
}
async function previus() {
  currentIndex--;
  currentSlideType = props.slides[currentIndex].layoutType;
  forceRender();
  await nextTick();
  setTimeout(() => {
    loadSlide(currentIndex);
  }, 5);
}
</script>

<template>
  <div class="w-full h-full slideshow-container bg-white dark:bg-black">
    <div class="overflow-y-auto h-full">
      <InfoRenders
        :type="currentSlideType"
        :usePadding="false"
        v-if="shouldRender"
      />
    </div>

    <div
      class="backdrop-blur-xl rounded-xl slideshow-controls flex items-center p-2 m-2"
      style="width: 100%; height: 50px; max-width: 200px"
    >
      <button style="width: 50%" @click="previus()" id="prevBTN">
        <svg
          width="20"
          height="20"
          viewBox="-4.5 0 19 19"
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
        >
          <path
            d="M8.4 17.269a1.03 1.03 0 0 1-.727-.302l-6.801-6.8a1.03 1.03 0 0 1 0-1.456l6.8-6.8a1.03 1.03 0 0 1 1.456 1.455L3.055 9.439l6.073 6.073A1.03 1.03 0 0 1 8.4 17.27z"
          />
        </svg>
      </button>
      <p class="font-bold text-xl">
        {{ currentIndex + 1 }}/{{ props.slides.length }}
      </p>
      <button
        style="width: 50%"
        class="flex justify-end"
        @click="next()"
        id="nextBTN"
      >
        <svg
          width="20"
          height="20"
          viewBox="-4.5 0 19 19"
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
        >
          <path
            d="M1.6 17.262a1.03 1.03 0 0 1-.728-1.757l6.073-6.073L.872 3.36a1.03 1.03 0 0 1 1.455-1.455l6.8 6.8a1.03 1.03 0 0 1 0 1.456l-6.8 6.8a1.02 1.02 0 0 1-.727.302z"
          />
        </svg>
      </button>
    </div>
  </div>
</template>

<style scoped>
.slideshow-container {
  position: relative;
}

.slideshow-controls {
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  margin-bottom: 10px;
  /* border: 2px solid black; */
}
</style>

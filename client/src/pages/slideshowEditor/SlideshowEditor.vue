<script setup>
import CreateSlide from "./components/CreateSlide.vue";
import SlideshowBtn from "./components/SlideshowBtn.vue";
import SlideshowSidebar from "./components/SlideshowSidebar.vue";
import InfoRenders from "../../components/slideshowRenders/InfoRenders.vue";
import { onMounted, reactive, ref, nextTick } from "vue";
import axios from "axios";
import utils from "../../helpers/utils";
import { useRoute } from "vue-router";
import { eventBus } from "../../event-bus";
import { useSlideshowStore } from "../../stores/SlideshowDataStore";
import Elements from "../../components/Elements.vue";

let layouts = []; // { selected: bool, layoutUrl: string }
const route = useRoute();
let projectData = { slides: [] };
const newSlideBtn = ref(null);
let projectSlides = reactive([
  // {
  //   slideshowName: "Slide 1",
  //   layoutUrl: "/slideshowLayouts/info_1.svg",
  //   current: false,
  //   index: 0,
  //   layoutType: "info_1",
  //   elements: {}
  // },
]); // { layoutUrl: str, slideshowName: str, current: bool }
const renderComponent = ref(true);
const renderComponentPreview = ref(true);
const slideshowStore = useSlideshowStore();
let currentSlideType = "none";
let prevName = "";
let renderPreview = ref(false);

const forceRender = async () => {
  // Here, we'll remove MyComponent
  renderComponent.value = false;

  // Then, wait for the change to get flushed to the DOM
  await nextTick();

  // Add MyComponent back in
  renderComponent.value = true;
};
const forceRenderPreview = async () => {
  // Here, we'll remove MyComponent
  renderComponentPreview.value = false;

  // Then, wait for the change to get flushed to the DOM
  await nextTick();

  // Add MyComponent back in
  renderComponentPreview.value = true;
};

function array_move(arr, old_index, new_index) {
  if (new_index >= arr.length) {
    var k = new_index - arr.length + 1;
    while (k--) {
      arr.push(undefined);
    }
  }
  arr.splice(new_index, 0, arr.splice(old_index, 1)[0]);
  return arr; // for testing
}

onMounted(async () => {
  utils.toggleModal("load-proj-modal");
  const data = (
    await axios.get(`/project/${route.params.projectId}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
  ).data.data;
  prevName = data.name;
  document.getElementById("projName").innerText = data.name;
  projectSlides = data?.data?.slides || [];
  projectSlides.forEach((slide) => {
    slide.current = false;
  });
  utils.toggleModal("load-proj-modal");
  slideshowStore.setData(data);
  forceRender();

  //console.log(data);
  if (data.data) projectData = data.data;
  document.getElementById("select-slide-info-div").classList.remove("hidden");
  document.getElementById("slideActionNav").classList.add("hidden");
});

eventBus.addEventListener("createSlide", (event) => {
  projectSlides.forEach((slide) => {
    slide.current = false;
  });
  projectSlides.push({
    slideshowName: `Slide ${projectSlides.length + 1}`,
    layoutUrl: `/slideshowLayouts/${event.detail}.svg`,
    current: true,
    index: projectSlides.length,
    layoutType: event.detail,
  });
  document.getElementById("select-slide-info-div").classList.add("hidden");
  document.getElementById("slideActionNav").classList.remove("hidden");
  currentSlideType = event.detail;
  forceRenderPreview();
  eventBus.dispatchEvent(
    new CustomEvent("slideData", {
      detail: {
        top: projectSlides.length == 1, // is slide at the top of the list
        bottom: true, // is slide at the bottom of the list
        index: projectSlides.length - 1,
        name: `Slide ${projectSlides.length}`,
        layoutType: event.detail,
      },
    })
  );
  setTimeout(() => {
    document.getElementById("newSlideBtn").scrollIntoView();
  }, 100);
});

eventBus.addEventListener("selectSlide", (event) => {
  projectSlides.forEach((slide) => {
    if (slide.slideshowName != event.detail.name) slide.current = false;
    else slide.current = true;
  });
  document.getElementById("select-slide-info-div").classList.add("hidden");
  document.getElementById("slideActionNav").classList.remove("hidden");
  currentSlideType = projectSlides[event.detail.index].layoutType;
  forceRenderPreview();
  eventBus.dispatchEvent(
    new CustomEvent("slideData", {
      detail: {
        top: event.detail.index == 0, // is slide at the top of the list
        bottom: event.detail.index == projectSlides.length - 1, // is slide at the bottom of the list
        index: event.detail.index,
        name: event.detail.name,
        layoutType: projectSlides[event.detail.index].layoutType,
        elements: projectSlides[event.detail.index].elements,
      },
    })
  );
});

eventBus.addEventListener("moveSlide", (event) => {
  const currentElement =
    projectSlides[projectSlides.find((element) => element.current).index];
  const prevIndex = currentElement.index;
  if (event.detail == "up") {
    array_move(projectSlides, prevIndex, prevIndex - 1);
  } else if (event.detail == "down") {
    array_move(projectSlides, prevIndex, prevIndex + 1);
  }
  projectSlides.forEach((element, index) => {
    element.index = index;
  });
  const newCurrentElement = projectSlides.find((element) => element.current);
  forceRender();
  eventBus.dispatchEvent(
    new CustomEvent("slideData", {
      detail: {
        top: newCurrentElement.index == 0, // is slide at the top of the list
        bottom: newCurrentElement.index == projectSlides.length - 1, // is slide at the bottom of the list
        index: newCurrentElement.index,
        name: newCurrentElement.slideshowName,
        layoutType: newCurrentElement.layoutType,
      },
    })
  );
  eventBus.dispatchEvent(
    new CustomEvent("slideScrollView", {
      detail: newCurrentElement.index,
    })
  );
});

eventBus.addEventListener("editComponents", (event) => {
  console.log(event.detail);
  if (!projectSlides[event.detail.index].elements)
    projectSlides[event.detail.index].elements = {};
  projectSlides[event.detail.index].elements[event.detail.elemNum] =
    event.detail; // how do I remove the index key in it?
  console.log(projectSlides);
});

function save() {
  document.getElementById("save-btn").classList.add("is-loading");
  axios
    .post(
      `/project/${route.params.projectId}`,
      {
        slides: projectSlides,
      },
      { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
    )
    .then((response) => {
      utils.notyf("Salvato", "success");
    })
    .catch((err) => {
      console.error(err);
      utils.notyf(err.response?.data?.error || "Errore", "error");
    })
    .finally(() => {
      document.getElementById("save-btn").classList.remove("is-loading");
    });
}

eventBus.addEventListener("delSlide", (event) => {
  projectSlides.splice(event.detail, 1);
  projectSlides.forEach((slide, index) => {
    slide.index = index;
  });
  forceRender();
  currentSlideType = "none";
  forceRenderPreview();
  utils.hide("slideActionNav");
  utils.show("select-slide-info-div");
});

eventBus.addEventListener("changeSlideName", (event) => {
  // check if the name is already taken
  if (
    projectSlides.find(
      (slide) =>
        slide.slideshowName == event.detail.name &&
        slide.index != event.detail.index
    )
  ) {
    utils.notyf("Esiste già una slide con questo nome", "error");
    eventBus.dispatchEvent(new Event("slideChangeFail"));
    return;
  }
  projectSlides[event.detail.index].slideshowName = event.detail.name;
  forceRender();
  eventBus.dispatchEvent(new Event("slideChangeSuccess"));
});

document.addEventListener("keydown", (event) => {
  if (event.ctrlKey && event.key === "s") {
    event.preventDefault();
    save();
  }
});

function editname() {
  prevName = document.getElementById("projName").innerText;
  document.getElementById("projNameModify").value =
    document.getElementById("projName").innerText;
  document.getElementById("projName").classList.add("hidden");
  document.getElementById("projNameModify").classList.remove("hidden");
  document.getElementById("projNameModify").focus();
}

function acutallyEditName() {
  document.getElementById("projName").innerText =
    document.getElementById("projNameModify").value;
  document.getElementById("projName").classList.remove("hidden");
  document.getElementById("projNameModify").classList.add("hidden");
  if (document.getElementById("projName").innerText == prevName) return;
  axios
    .post(
      `/projectInfo/${route.params.projectId}`,
      {
        name: document.getElementById("projName").innerText,
      },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    )
    .then(() => {
      utils.notyf("Nome cambiato", "success");
      prevName = document.getElementById("projName").innerText;
    })
    .catch((err) => {
      utils.notyf(err.response?.data?.error || "Errore", "error");
      document.getElementById("projName").innerText = prevName;
    });
}

function doRenderPreview() {
  renderPreview.value = true;
  utils.toggleModal("preview-modal");
}
</script>

<template>
  <div
    class="w-[calc(100vw-1rem)] rounded-xl dark:bg-black bg-neutral-200 mt-2 ml-2 flex items-center p-2"
    style="height: 50px"
  >
    <div class="w-full flex">
      <p
        class="font-bold text-2xl hover:opacity-60 w-50"
        id="projName"
        @click="editname()"
      ></p>
      <input
        id="projNameModify"
        @focusout="acutallyEditName()"
        class="hidden dark:bg-black h-7"
        autocomplete="off"
      />
    </div>
    <div class="flex h-full items-center">
      <button
        class="btn solid sm danger mr-2 hidden"
        @click="doRenderPreview()"
      >
        Anteprima
      </button>
      <button class="btn solid sm info" id="save-btn" @click="save()">
        Salva
      </button>
    </div>
  </div>
  <div
    class="grid lg:grid-cols-7 grid-cols-1 w-full gap-2 p-2"
    style="height: calc(100vh - 70px - 50px - 0.5rem); min-height: 400px"
  >
    <div style="overflow-y: auto; min-height: 400px" class="rounded-xl h-full">
      <SlideshowBtn
        v-if="renderComponent"
        v-for="i in projectSlides"
        :layoutUrl="i.layoutUrl"
        :name="i.slideshowName"
        :selected="i.current"
        :index="i.index"
      />
      <CreateSlide />
    </div>
    <div
      class="bg-neutral-200 dark:bg-neutral-950 lg:col-span-5 lg:h-[calc(93vh-68px-1rem)] h-[930px] rounded-xl dropzone overflow-y-auto"
    >
      <InfoRenders :type="currentSlideType" v-if="renderComponentPreview" />
    </div>
    <div id="select-slide-info-div" class="hidden">Seleziona una slide</div>
    <div style="overflow-y: auto; min-height: 400px" id="slideActionNav">
      <SlideshowSidebar />
    </div>
  </div>
  <Elements class="hidden" />
  <div>
    <label class="modal-overlay"></label>
    <div
      class="modal flex flex-col gap-5 justify-center items-center"
      style="min-width: 300px"
      id="load-proj-modal"
    >
      <div class="loader bw">
        <div class="spin" />
      </div>
      <p>Caricamento</p>
    </div>
  </div>

  <div>
    <label
      class="modal-overlay"
      @click="utils.toggleModal('preview-modal')"
    ></label>
    <div
      class="modal flex flex-col gap-5 justify-center items-center"
      style="width: 100%; height: 100%"
      id="preview-modal"
    >
      <button
        class="absolute right-4 top-3"
        @click="utils.toggleModal('preview-modal')"
      >
        ✕
      </button>
    </div>
  </div>
</template>

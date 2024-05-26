import { ref } from "vue";
import { defineStore } from "pinia";

/* 
  {
    slideshowName: "Slide 1",
    layoutUrl: "/slideshowLayouts/info_1.svg",
    current: false,
    index: 0,
    layoutType: "info_1",
    elements: {}
  },
*/

export const useSlideshowStore = defineStore("slideshowData", () => {
  const projectData = ref({});

  function setData(newData: object) {
    projectData.value = newData;
  }

  return { projectData, setData };
});

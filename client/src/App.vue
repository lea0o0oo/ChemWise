<script setup>
import Navbar from "./components/Navbar.vue";
import { onMounted, nextTick } from "vue";
import utils from "./helpers/utils";

onMounted(async () => {
  await nextTick();

  const targetNode = document.documentElement;

  const config = { attributes: true, childList: false, subtree: false };

  // Callback function to execute when mutations are observed
  const callback = (mutationList, observer) => {
    for (const mutation of mutationList) {
      if (
        mutation.type === "attributes" &&
        mutation.attributeName == "data-theme"
      ) {
        if (document.documentElement.getAttribute("data-theme") == "dark") {
          document.documentElement.style.backgroundColor = "rgb(38 38 38)";
        } else {
          document.documentElement.removeAttribute("style");
        }
      }
    }
  };
  const observer = new MutationObserver(callback);

  observer.observe(targetNode, config);

  if (utils.getCurrentTheme(true) == "dark") {
    document.documentElement.style.backgroundColor = "rgb(38 38 38)";
  }
});
</script>

<template><Navbar /><router-view /></template>

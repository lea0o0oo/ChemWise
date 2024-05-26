<script setup>
import { useSlideshowStore } from "../../../stores/SlideshowDataStore.ts";
import templateInterfaces from "./templateInterfaces";
import { eventBus } from "../../../event-bus";
import elementsReturner from "../../../helpers/elementsReturner";
import axios from "axios";
import utils from "../../../helpers/utils.js";

const props = defineProps({
  type: String,
});
let selectIds = [];
let currentType = "";
let currentIndex = 0;

const slideshowStore = useSlideshowStore();

/**
 * Given a type, returns the corresponding HTML element.
 * @param type string
 */
function insertElement(type) {}

function handleSelectClick(id, selectNum) {
  //console.log(id);
  applyElementInput(id, selectNum);
}
function applyElementInput(id, iteration, elements) {
  console.log(elements);
  if (document.getElementById(id + "_value"))
    document
      .getElementById(id + "_value")
      .removeEventListener("change", handleElemInput);
  document.getElementById(id + "-div").innerHTML = "";
  if (document.getElementById(id).value == "text") {
    document.getElementById(
      id + "-div"
    ).innerHTML = `<textarea id="${id}_value" style="width: 100%; min-height: 100px" class="input"></textarea>`;
  } else if (document.getElementById(id).value == "image") {
    document.getElementById(
      id + "-div"
    ).innerHTML = `<input id="${id}_value" type="file" accept="image/png, image/jpeg, image/gif, image/webp" style="width: 100%;" class="input"></input>`;
  } else if (document.getElementById(id).value == "iframe") {
    document.getElementById(
      id + "-div"
    ).innerHTML = `<input id="${id}_value" style="width: 100%; height: 30px" placeholder="URL iframe qui" class="rounded-xl input"></input>`;
  }
  document
    .getElementById(id + "_value")
    .addEventListener(
      "change",
      handleElemInput.bind(null, id, iteration + 1 || null)
    );
  if (elements?.[String(iteration + 1)]) {
    if (elements[String(iteration + 1)].elemType != "image") {
      document.getElementById(id + "_value").value =
        elements[String(iteration + 1)].elemValue;
      setTimeout(() => {
        handleElemInput(id, iteration + 1 || null);
      }, 50);
    } else {
      let html = `<img src="${
        elements[String(iteration + 1)].elemValue
      }" class="w-full h-full rounded-xl" style="object-fit: cover" />`;
      setTimeout(() => {
        eventBus.dispatchEvent(
          new CustomEvent("updateSlidePreview", {
            detail: {
              type: currentType,
              elementNum: elements[String(iteration + 1)].elemNum,
              elemType: document.getElementById(id).value,
              value: html,
            },
          })
        );
      }, 10);
    }
  }
}

function uploadImg(input) {
  return new Promise(async (resolve, reject) => {
    const file = input.files[0];
    const reader = new FileReader();

    reader.onload = async (e) => {
      const base64Image = e.target.result;
      if (
        !input.value.endsWith("jpeg") &&
        !input.value.endsWith("png") &&
        !input.value.endsWith("webp") &&
        !input.value.endsWith("jpg")
      ) {
        reject(new Error("Unsupported format"));
        return;
      }
      let extension;
      if (input.value.split(".")[input.value.split(".").length - 1] == "jpg")
        extension = "jpeg";
      else
        extension = input.value.split(".")[input.value.split(".").length - 1];
      try {
        const response = await axios.post(
          `/image/upload`,
          {
            image:
              typeof base64Image === "string"
                ? base64Image.replace(`data:image/${extension};base64,`, "")
                : base64Image,
          },
          {
            headers: {
              authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        resolve(response.data); // Resolve the promise with the response data
      } catch (err) {
        console.error(err);
        reject(err); // Reject the promise with the error
      }
    };

    reader.readAsDataURL(file);
  });
}

async function handleElemInput(id, num) {
  //console.log(document.getElementById(id + "_value").value);
  let finalHTML;
  let imgURL;
  if (document.getElementById(id).value == "text")
    finalHTML = document.getElementById(id + "_value").value;
  else if (document.getElementById(id).value == "iframe")
    finalHTML = `<iframe src="${
      document.getElementById(id + "_value").value
    }" class="w-full h-full rounded-xl" />`;
  else if (document.getElementById(id).value == "image") {
    utils.toggleModal("uploading-img");
    imgURL = (await uploadImg(document.getElementById(id + "_value"))).data;
    utils.toggleModal("uploading-img");
    finalHTML = `<img src="${imgURL}" class="rounded-xl slideshowIMG" />`;
  }
  const isImg = document.getElementById(id).value == "image";
  //console.log("fatto", id, num);
  eventBus.dispatchEvent(
    new CustomEvent("updateSlidePreview", {
      detail: {
        type: currentType,
        elementNum: String(num),
        elemType: document.getElementById(id).value,
        value: finalHTML,
      },
    })
  );
  eventBus.dispatchEvent(
    new CustomEvent("editComponents", {
      detail: {
        index: currentIndex,
        elemType: document.getElementById(id).value,
        elemValue: isImg
          ? imgURL
          : document.getElementById(id + "_value").value,
        elemNum: String(num),
      },
    })
  );
}

eventBus.addEventListener("slideData", (event) => {
  selectIds.forEach((id) => {
    document
      .getElementById(id)
      .removeEventListener("click", handleSelectClick.bind(null, id));
    document
      .getElementById(id + "_value")
      .removeEventListener("change", handleElemInput);
  });
  selectIds = [];
  const componentsDIV = document.getElementById("components_editor");
  //console.log(slideshowStore.projectData);
  //console.log(event.detail);
  currentIndex = event.detail.index;
  currentType = event.detail.layoutType;
  componentsDIV.innerHTML = "";
  templateInterfaces[event.detail.layoutType].forEach((element, index) => {
    const selectId = Math.random().toString(36).substring(2, 15);
    selectIds.push(selectId);
    let selectValue = "";
    if (event.detail.elements) {
      if (event.detail.elements[String(index + 1)]) {
        selectValue = event.detail.elements[String(index + 1)].elemType;
        console.log(selectValue);
      }
    }
    let selectElement = `<select id="${selectId}" class="bg-neutral-50 border border-neutral-300 text-neutral-900 text-sm rounded-lg focus:ring-neutral-500 focus:border-neutral-500 block w-full p-2.5 dark:bg-neutral-700 dark:border-neutral-600 dark:placeholder-neutral-400 dark:text-white dark:focus:ring-neutral-500 dark:focus:border-neutral-500">`;
    let finalInnerDOM;
    element.types.split(" ").forEach((part) => {
      if (part == "image")
        selectElement += `<option ${
          selectValue == "image" ? "selected" : ""
        } value='image'>Immagine</option>`;
      else if (part == "text")
        selectElement += `<option ${
          selectValue == "text" ? "selected" : ""
        } value='text'>Testo</option>`;
      else if (part == "iframe")
        selectElement += `<option ${
          selectValue == "iframe" ? "selected" : ""
        } value='iframe'>Incorpora</option>`;
    });
    finalInnerDOM = `<div class="mt-2 w-full" id="${selectId}-div"></div>`;
    //finalInnerDOM = "";

    selectElement += "</select>";
    finalInnerDOM = selectElement + finalInnerDOM;

    componentsDIV.innerHTML += elementsReturner.sidebarAccordion(
      `Elemento ${index + 1}`,
      finalInnerDOM
    );
  });
  selectIds.forEach((id, index) => {
    document
      .getElementById(id)
      .addEventListener("change", handleSelectClick.bind(null, id, index));
    applyElementInput(id, index, event.detail.elements);
  });
});
</script>
<template>
  <div>
    <div class="accordion-group bordered bw" id="components_editor"></div>
  </div>
  <div>
    <label class="modal-overlay"></label>
    <div
      class="modal flex flex-col gap-5 justify-center items-center"
      style="min-width: 300px"
      id="uploading-img"
    >
      <div class="loader bw">
        <div class="spin" />
      </div>
      <p>Caricando l'immagine</p>
    </div>
  </div>
</template>

<style scoped>
@media (prefers-color-scheme: dark) {
  select:focus {
    color: black;
  }
  select {
    color: white;
  }
}
</style>

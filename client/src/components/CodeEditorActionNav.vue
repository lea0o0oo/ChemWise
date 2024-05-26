<script>
import { eventBus } from "../event-bus";
import axios from "axios";
import utils from "../helpers/utils";
import { useRoute } from "vue-router";

let prevName = "";
export default {
  methods: {
    test() {
      eventBus.dispatchEvent(new Event("testCode"));
    },
    save() {
      document.getElementById("saveBtn").classList.add("is-loading");
      eventBus.dispatchEvent(new Event("save"));
    },
    editName() {
      prevName = document.getElementById("projName").innerText;
      document.getElementById("projNameModify").value =
        document.getElementById("projName").innerText;
      document.getElementById("projName").classList.add("hidden");
      document.getElementById("projNameModify").classList.remove("hidden");
      document.getElementById("projNameModify").focus();
    },
  },
};
</script>

<script setup>
const route = useRoute();
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
</script>

<template>
  <div
    class="flex dark:bg-zinc-700 bg-zinc-300 h-full"
    style="align-items: center"
  >
    <div class="flex w-full">
      <div class="flex items-center w-full">
        <h4
          class="font-bold text-xl ml-2 hover:opacity-60"
          id="projName"
          @click="editName()"
        >
          [PROJECT NAME]
        </h4>
        <input
          id="projNameModify"
          class="hidden ml-2 dark:bg-black h-7"
          @focusout="acutallyEditName()"
          autocomplete="off"
        />
      </div>

      <div class="flex justify-end mr-2 gap-2" style="width: 200px">
        <button
          class="btn solid warn compact light sm ml-3"
          @click="test()"
          id="testCodeBtn"
        >
          Compile & test
        </button>
        <button class="btn solid info sm" @click="save()" id="saveBtn">
          Save
        </button>
      </div>
    </div>
  </div>
</template>

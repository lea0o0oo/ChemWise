<script setup>
import axios from "axios";
import utils from "../../helpers/utils";
import { useRoute } from "vue-router";
import { eventBus } from "../../event-bus";

const sendSVG = `<svg class="icon line-color" data-name="Line Color" height=24 viewBox="0 0 24 24" width=24 xmlns=http://www.w3.org/2000/svg><path d="M7 12h4" stroke=currentColor style=stroke-linecap:round;stroke-linejoin:round;stroke-width:2 /><path d="m5.44 4.15 14.65 7a1 1 0 0 1 0 1.8l-14.65 7a1 1 0 0 1-1.34-1.41l2.72-6.13a1.06 1.06 0 0 0 0-.82L4.1 5.46a1 1 0 0 1 1.34-1.31" stroke=currentColor style=fill:none;stroke-linecap:round;stroke-linejoin:round;stroke-width:2 /></svg>`;

const route = useRoute();
let username = JSON.parse(localStorage.getItem("userData"))?.username;
const avatarUrl = JSON.parse(localStorage.getItem("userData"))?.avatarUrl;

defineProps({
  avatar: String,
});

function updateInputCounter() {
  const textarea = document.querySelector("#inputArea");
  const counter = document.querySelector("#counter");
  counter.innerText = textarea.value.length + "/250";
  if (textarea.value.length >= 1 && !utils.isEmpty(textarea.value))
    document.getElementById("send-btn").disabled = false;
  else document.getElementById("send-btn").disabled = true;
}

function sendComment() {
  event.preventDefault();
  const textarea = document.getElementById("inputArea");
  document.getElementById("send-btn").classList.add("is-loading");
  document.getElementById("send-btn").innerHTML = "<p>Invia</p>";
  axios
    .post(
      `/comments/${route.params.projectId}`,
      {
        content: textarea.value,
      },
      { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
    )
    .then((response) => {
      document.getElementById("send-btn").classList.remove("is-loading");
      document.getElementById("send-btn").innerHTML = sendSVG + "<p>Invia</p>";
      textarea.value = "";
      eventBus.dispatchEvent(new Event("rerenderComments"));
      updateInputCounter();
    });
}
</script>

<template>
  <div class="flex">
    <img
      :src="avatarUrl"
      style="height: 50px; width: 50px; object-fit: cover"
    />
    <div class="ml-3" style="max-width: 500px; width: 100%">
      <form @submit="sendComment()">
        <textarea
          id="inputArea"
          class="input bw w-full"
          style="min-height: 100px; max-height: 200px"
          @input="updateInputCounter()"
          maxlength="250"
        />
        <div class="flex mt-2 items-center">
          <button class="btn solid info" disabled id="send-btn">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              data-name="Line Color"
              xmlns="http://www.w3.org/2000/svg"
              class="icon line-color"
            >
              <path
                style="
                  stroke-linecap: round;
                  stroke-linejoin: round;
                  stroke-width: 2;
                "
                d="M7 12h4"
                stroke="currentColor"
              />
              <path
                d="m5.44 4.15 14.65 7a1 1 0 0 1 0 1.8l-14.65 7a1 1 0 0 1-1.34-1.41l2.72-6.13a1.06 1.06 0 0 0 0-.82L4.1 5.46a1 1 0 0 1 1.34-1.31"
                style="
                  fill: none;
                  stroke-linecap: round;
                  stroke-linejoin: round;
                  stroke-width: 2;
                "
                stroke="currentColor"
              />
            </svg>
            <p>Invia</p>
          </button>
          <p class="w-full text-right" id="counter">0/250</p>
        </div>
      </form>
    </div>
  </div>
</template>

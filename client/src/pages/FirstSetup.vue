<script setup>
import checkAuth from "../helpers/checkAuth";
import { DotLottie } from "@lottiefiles/dotlottie-web";
import utils from "../helpers/utils";
import AvatarMaker from "../components/AvatarMaker.vue";
import { eventBus } from "../event-bus";
import axios from "axios";
import html2canvas from "html2canvas";
checkAuth();

const lottieSteps = [
  "https://assets-v2.lottiefiles.com/a/dd13b484-1161-11ee-9d4c-cb11cd77cdea/lBNoyqqCAB.lottie",
  "https://assets-v2.lottiefiles.com/a/5d1bcc18-1179-11ee-a331-430e1aefe1a1/0dL42BnGLC.lottie",
];

let animationPlayer;
let avatarData = {};
let base64Avatar = "";

eventBus.addEventListener("avatarData", (event) => {
  avatarData = event.detail;
});

async function uploadAvatar(base64) {
  const response = await axios.post(
    `/image/upload`,
    {
      image: base64.replace("data:image/png;base64,", ""),
    },
    {
      headers: {
        authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    }
  );
  return response.data.data;
}

utils.onLoad(() => {
  animationPlayer = new DotLottie({
    autoplay: true,
    loop: false,
    canvas: document.querySelector("#dotlottie-canvas"),
    src: lottieSteps[0], // or .json file
  });
});

async function apply(imgData) {
  let lStorage = JSON.parse(localStorage.getItem("userData"));
  lStorage.avatarUrl = imgData;
  localStorage.setItem("userData", JSON.stringify(lStorage));
  const avatarURL = await uploadAvatar(imgData);
  axios
    .post(
      `/user/update`,
      {
        avatar: avatarData,
        avatarUrl: avatarURL,
        completedSetup: true,
      },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    )
    .then(() => {
      window.open("/", "_self");
    })
    .catch((err) => {
      utils.notyf(err.response?.data?.error || "Errore", "error");
    });
}

async function nextStep(currentStep) {
  if (currentStep == 2) {
    document.getElementById("dotlottie-canvas").classList.add("hidden");
    document.getElementById("applying-spinner").classList.remove("hidden");
    document.getElementById("hair_back").classList.remove("rounded-t-xl");
    const canvas = await html2canvas(document.getElementById("avatarSvgs"));
    const imgData = canvas.toDataURL("image/png");
    apply(imgData);
  }
  document.getElementById("sep" + currentStep).classList.add("hidden");
  document.getElementById("sep" + (currentStep + 1)).classList.remove("hidden");
  animationPlayer.destroy();
  animationPlayer = new DotLottie({
    autoplay: true,
    loop: false,
    canvas: document.querySelector("#dotlottie-canvas"),
    src: lottieSteps[currentStep], // or .json file
  });
}
</script>

<template>
  <div
    class="justify-center align-middle flex w-full"
    style="height: calc(100vh - 70px)"
  >
    <div>
      <div class="flex justify-center items-center mb-2">
        <canvas id="dotlottie-canvas" style="height: 150px"></canvas>
        <div class="loader bw hidden mt-5 mb-5" id="applying-spinner">
          <div class="spin" />
        </div>
      </div>

      <div id="sep1" class="w-full" style="height: 250px">
        <div class="flex justify-center w-full">
          <div>
            <h1 class="text-3xl font-bold text-center">
              Registrazione effettuata
            </h1>
            <p class="text-lg">
              Prima di continuare, è necessario completare la configurazione
            </p>
            <div class="w-full flex justify-center mt-4">
              <button
                class="btn light bw"
                style="width: 300px"
                @click="nextStep(1)"
              >
                Prossimo
              </button>
            </div>
          </div>
        </div>
      </div>
      <div
        id="sep2"
        class="w-full hidden dark:bg-neutral-800 h-[100vh]"
        style="height: 250px"
      >
        <div class="flex justify-center w-full dark:bg-neutral-800">
          <div
            class="grid lg:grid-cols-2 grid-cols-1 gap-6 dark:bg-neutral-800 w-full"
          >
            <div>
              <h1 class="text-3xl font-bold text-center">Avatar</h1>
              <p class="text-lg">‎</p>
              <p>Crea il tuo avatar</p>
              <p class="text-sm">Potrai cambiarlo in qualsiasi momento</p>
              <button
                class="btn light bw"
                style="width: 300px"
                @click="nextStep(2)"
              >
                Prossimo
              </button>
            </div>
            <div><AvatarMaker :startRandom="true" /></div>
          </div>
        </div>
      </div>
      <div id="sep3" class="w-full hidden" style="height: 250px">
        <h1 class="text-3xl font-bold text-center">Applicando i cambiamenti</h1>
        <p class="text-center">Non richiederà molto</p>
      </div>
    </div>
  </div>
</template>

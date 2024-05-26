<script setup lang="ts">
import axios from "axios";
import AvatarMaker from "../components/AvatarMaker.vue";
import { onMounted, ref } from "vue";
import utils from "../helpers/utils";
import { eventBus } from "../event-bus";
import html2canvas from "html2canvas";

const usernameInput = ref(null);
const showAvatarMaker = ref(false);
const btnSave = ref(false);
let avatarData = {};

onMounted(() => {
  usernameInput.value.value = JSON.parse(
    localStorage.getItem("userData")
  ).username;
  axios
    .get(`/user/${JSON.parse(localStorage.getItem("userData")).id}`)
    .then((res) => {
      avatarData = res.data.data.avatar;
      showAvatarMaker.value = true;
    })
    .catch((err) => {
      utils.notyf(err.response?.data?.error || "Errore", "error");
    });
});

eventBus.addEventListener("avatarData", (event) => {
  //@ts-ignore typescript sempre a scassare alla fine finisce sempre con ts-ignore
  avatarData = event.detail;
});

function changePassword() {
  event.preventDefault();
  let currentPass = (document.getElementById("currentPass") as HTMLInputElement)
    .value;
  let newPass = (document.getElementById("newPass") as HTMLInputElement).value;
  let confirmPass = (
    document.getElementById("repeatNewPass") as HTMLInputElement
  ).value;

  if (newPass != confirmPass) {
    utils.notyf("Le password non corrispondono", "error");
    return;
  }

  document.getElementById("change-pass-bt").classList.add("is-loading");
  axios
    .post(
      `/changePassword`,
      {
        oldPassword: currentPass,
        newPassword: newPass,
      },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    )
    .then(() => {
      utils.notyf("Password cambiata con successo", "success");
    })
    .catch((err) => {
      utils.notyf(err.response?.data?.error || "Errore", "error");
    })
    .finally(() => {
      utils.toggleModal("change-password-modal");
      document.getElementById("change-pass-bt").classList.remove("is-loading");
      (document.getElementById("newPass") as HTMLInputElement).value = "";
      (document.getElementById("currentPass") as HTMLInputElement).value = "";
      (document.getElementById("repeatNewPass") as HTMLInputElement).value = "";
    });
}

async function uploadAvatar(base64: string) {
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
async function save() {
  //@ts-ignore
  btnSave.value.classList.add("is-loading");

  document.getElementById("hair_back").classList.remove("rounded-t-xl");
  const canvas = await html2canvas(document.getElementById("avatarSvgs"));
  const imgData = canvas.toDataURL("image/png");
  document.getElementById("hair_back").classList.add("rounded-t-xl");
  const avatarURL = await uploadAvatar(imgData);
  axios
    .post(
      `/user/update`,
      {
        username: usernameInput.value.value,
        avatar: avatarData,
        avatarUrl: avatarURL,
      },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    )
    .then(() => {
      localStorage.setItem(
        "userData",
        JSON.stringify({
          username: usernameInput.value.value,
          id: JSON.parse(localStorage.getItem("userData")).id,
        })
      );
      utils.notyf("Cambiamenti salvaiti", "success");
    })
    .catch((err) => {
      utils.notyf(err.response?.data?.error || "Errore", "error");
    })
    .finally(() => {
      //@ts-ignore
      btnSave.value.classList.remove("is-loading");
    });
}

document.addEventListener("keydown", (event) => {
  if (event.ctrlKey && event.key === "s") {
    event.preventDefault();
    save();
  }
});
</script>

<template>
  <div class="h-[calc(100vh-70px)] w-full">
    <div class="w-full grid lg:grid-cols-2 grid-cols-1 gap-2 p-2 pt-10">
      <div
        class="flex w-full h-full items-center justify-center"
        style="height: 460px"
      >
        <AvatarMaker v-if="showAvatarMaker" :avatar="avatarData" />
        <div class="loader bw" v-if="!showAvatarMaker">
          <div class="spin" />
        </div>
      </div>
      <div>
        <div class="w-full h-[calc(100%-40.78px)]">
          <h2 class="font-bold text-2xl">Username</h2>
          <label
            for="Username"
            class="lg:w-[50%] relative block rounded-md border border-gray-200 shadow-sm focus-within:border-blue-600 focus-within:ring-1 focus-within:ring-blue-600"
          >
            <input
              type="text"
              id="Username"
              class="peer border-none bg-transparent placeholder-transparent focus:border-transparent focus:outline-none focus:ring-0"
              placeholder="Username"
              ref="usernameInput"
            />

            <span
              class="pointer-events-none absolute start-2.5 top-0 -translate-y-1/2 p-0.5 text-xs text-gray-700 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-0 peer-focus:text-xs"
            >
            </span>
          </label>

          <!-- ...-->

          <h2 class="font-bold text-2xl mt-3">Password</h2>
          <button
            class="btn solid warn"
            @click="utils.toggleModal('change-password-modal')"
          >
            Cambia password
          </button>
        </div>
        <button
          class="btn solid info lg:mt-0 mt-10"
          ref="btnSave"
          @click="save()"
        >
          Salva cambiamenti
        </button>
      </div>
    </div>
  </div>

  <div>
    <label
      class="modal-overlay"
      @click="utils.toggleModal('change-password-modal')"
    ></label>
    <div
      class="modal flex flex-col gap-5 w-full max-w-xl"
      id="change-password-modal"
    >
      <button
        class="absolute right-4 top-3"
        @click="utils.toggleModal('change-password-modal')"
      >
        ✕
      </button>
      <h2 class="text-xl">Cambia password</h2>
      <form @submit="changePassword()">
        <p>Password attuale</p>
        <input class="input mt-1" type="password" id="currentPass" />
        <p class="mt-4">Nuova password</p>
        <input class="input mt-1" type="password" id="newPass" />
        <p class="mt-4">Ripeti nuova password</p>
        <input
          class="input mt-1 form-password"
          type="password"
          id="repeatNewPass"
        />
        <div class="flex gap-3 mt-4">
          <button
            class="btn solid warn flex-1"
            type="submit"
            id="change-pass-bt"
          >
            Cambia password
          </button>
          <button
            class="btn solid bw flex-1"
            type="button"
            @click="utils.toggleModal('change-password-modal')"
          >
            Annulla
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

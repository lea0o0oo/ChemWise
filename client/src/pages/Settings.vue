<script setup lang="ts">
import axios from "axios";
import AvatarMaker from "../components/AvatarMaker.vue";
import { onMounted, ref, nextTick, reactive } from "vue";
import utils from "../helpers/utils";
import { eventBus } from "../event-bus";
import html2canvas from "html2canvas";
import DecButton from "../components/settings/DecButton.vue";

const usernameInput = ref(null);
const showAvatarMaker = ref(false);
const btnSave = ref(false);
let avatarData = {};
const avatarUrl = ref("");
const roboIMG = ref(null);
const currentBalance = ref(0);

onMounted(() => {
  usernameInput.value.value = JSON.parse(
    localStorage.getItem("userData")
  ).username;
  axios
    .get(`/user/${JSON.parse(localStorage.getItem("userData")).id}`)
    .then((res) => {
      avatarData = res.data.data.avatar;
      avatarUrl.value = res.data.data.avatarUrl;
      showAvatarMaker.value = true;
      currentBalance.value = res.data.data.balance;
    })
    .catch((err) => {
      console.error(err);
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
      let oldLstorage = JSON.parse(localStorage.getItem("userData"));
      oldLstorage.username = usernameInput.value.value;
      oldLstorage.id = JSON.parse(localStorage.getItem("userData")).id;
      localStorage.setItem("userData", JSON.stringify(oldLstorage));
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
      <div class="w-full h-full items-center justify-center">
        <div class="max-w-xl flex justify-center">
          <div class="w-full">
            <div class="flex w-full justify-center mb-2" v-if="showAvatarMaker">
              <img
                v-if="showAvatarMaker"
                :src="avatarUrl"
                id="avatarImg"
                class="w-[128px] h-[128px] rounded-full cursor-pointer hover:opacity-70"
                @click="utils.toggleModal('modal-edit-avatar')"
              />
            </div>
            <div
              class="w-full flex justify-center h-[128px] items-center mb-2"
              v-if="!showAvatarMaker"
            >
              <div class="loader bw">
                <div class="spin" />
              </div>
            </div>

            <h2 class="font-bold text-2xl">Username</h2>
            <label
              for="Username"
              class="w-full relative block rounded-md border border-gray-200 shadow-sm focus-within:border-blue-600 focus-within:ring-1 focus-within:ring-blue-600"
            >
              <input
                type="text"
                id="Username"
                class="peer border-none bg-transparent placeholder-transparent focus:border-transparent focus:outline-none focus:ring-0 w-full"
                placeholder="Username"
                ref="usernameInput"
              />

              <span
                class="pointer-events-none absolute start-2.5 top-0 -translate-y-1/2 p-0.5 text-xs text-gray-700 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-0 peer-focus:text-xs"
              >
              </span>
            </label>
            <h2 class="font-bold text-2xl mt-3">Password</h2>
            <button
              class="btn solid warn"
              @click="utils.toggleModal('change-password-modal')"
            >
              Cambia password
            </button>
            <br />
            <button class="btn solid info mt-10" ref="btnSave" @click="save()">
              Salva cambiamenti
            </button>
          </div>
        </div>
        <div class="flex max-w-xl">
          <h3 class="text-2xl font-bold mt-5 w-full">Extra</h3>
          <p class="flex items-center gap-2"></p>
          <p id="balanceNum">{{ currentBalance }}</p>
          <svg
            width="28"
            height="28"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            class="opacity-75"
          >
            <path
              d="M8.5 23a9.1 9.1 0 0 0 3.5-.68 8.9 8.9 0 0 0 3.5.68c3.645 0 6.5-1.945 6.5-4.429v-4.142C22 11.945 19.145 10 15.5 10q-.253.002-.5.017V5.333C15 2.9 12.145 1 8.5 1S2 2.9 2 5.333v13.334C2 21.1 4.855 23 8.5 23M20 18.571C20 19.72 18.152 21 15.5 21S11 19.72 11 18.571v-.925a8.33 8.33 0 0 0 4.5 1.211 8.33 8.33 0 0 0 4.5-1.211ZM15.5 12c2.652 0 4.5 1.28 4.5 2.429s-1.848 2.428-4.5 2.428-4.5-1.28-4.5-2.428S12.848 12 15.5 12m-7-9C11.152 3 13 4.23 13 5.333s-1.848 2.334-4.5 2.334S4 6.437 4 5.333 5.848 3 8.5 3M4 8.482a8.47 8.47 0 0 0 4.5 1.185A8.47 8.47 0 0 0 13 8.482v1.848a6.47 6.47 0 0 0-2.9 1.607 7.7 7.7 0 0 1-1.6.174c-2.652 0-4.5-1.23-4.5-2.333Zm0 4.445a8.5 8.5 0 0 0 4.5 1.184c.178 0 .35-.022.525-.031a3 3 0 0 0-.025.349v2.085c-.168.01-.33.042-.5.042-2.652 0-4.5-1.23-4.5-2.334Zm0 4.444a8.47 8.47 0 0 0 4.5 1.185c.168 0 .333-.013.5-.021v.036a3.47 3.47 0 0 0 .919 2.293A8 8 0 0 1 8.5 21C5.848 21 4 19.77 4 18.667Z"
            />
          </svg>
        </div>
        <div
          class="mt-2 bg-neutral-950 rounded-xl w-full max-w-xl p-4 min-h-[104px]"
        >
          <h4 class="font-bold text-xl">Decorazioni avatar</h4>
          <div class="flex flex-wrap gap-2">
            <!-- stella -->
            <button>
              <svg
                width="42"
                height="42"
                viewBox="0 0 24 24"
                data-name="Line Color"
                class="icon line-color opacity-75"
              >
                <path
                  stroke="currentColor"
                  style="
                    fill: none;
                    stroke-linecap: round;
                    stroke-linejoin: round;
                    stroke-width: 2;
                  "
                  d="M12 4 9.22 9.27 3 10.11l4.5 4.1L6.44 20 12 17.27 17.56 20l-1.06-5.79 4.5-4.1-6.22-.84z"
                />
              </svg>
            </button>
            <!-- cuore -->
            <button>
              <svg
                width="42"
                height="42"
                viewBox="0 0 24 24"
                class="opacity-75"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill="currentColor"
                  d="M20.16 5A6.29 6.29 0 0 0 12 4.36a6.27 6.27 0 0 0-8.16 9.48l6.21 6.22a2.78 2.78 0 0 0 3.9 0l6.21-6.22a6.27 6.27 0 0 0 0-8.84m-1.41 7.46-6.21 6.21a.76.76 0 0 1-1.08 0l-6.21-6.24a4.29 4.29 0 0 1 0-6 4.27 4.27 0 0 1 6 0 1 1 0 0 0 1.42 0 4.27 4.27 0 0 1 6 0 4.29 4.29 0 0 1 .08 6Z"
                />
              </svg>
            </button>
            <!-- spada -->
            <button>
              <svg
                width="42"
                height="42"
                viewBox="0 0 16 16"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                class="opacity-75"
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="1.5"
              >
                <path
                  d="m2.75 9.25 1.5 2.5 2 1.5m-4.5 0 1 1m1.5-2.5-1.5 1.5m3-1 8.5-8.5v-2h-2l-8.5 8.5"
                />
              </svg>
            </button>
            <!-- beuta -->
            <button>
              <svg
                width="42"
                height="42"
                viewBox="0 0 24 24"
                class="opacity-75"
                fill="currentColor"
                xmlns="http://www.w3.org/2000/svg"
                data-name="Layer 1"
              >
                <path
                  d="M20.11 17.49 15 8.73V4h1a1 1 0 0 0 0-2H8a1 1 0 0 0 0 2h1v4.73l-5.11 8.76A3 3 0 0 0 6.48 22h11a3 3 0 0 0 2.59-4.51Zm-9.25-8A1 1 0 0 0 11 9V4h2v5a1 1 0 0 0 .14.5L14 11h-4Zm7.52 10a1 1 0 0 1-.86.5h-11a1 1 0 0 1-.86-.5 1 1 0 0 1 0-1L8.83 13h6.35l3.2 5.5a1 1 0 0 1 0 1ZM10 15a1 1 0 1 0 1 1 1 1 0 0 0-1-1m4 1a1 1 0 1 0 1 1 1 1 0 0 0-1-1"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
      <div>
        <div class="w-full h-[calc(100%-40.78px)]">
          <!-- ...-->
        </div>
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
  <div>
    <label
      class="modal-overlay"
      @click="utils.toggleModal('modal-edit-avatar')"
    ></label>
    <div class="modal flex flex-col gap-5" id="modal-edit-avatar">
      <button
        class="absolute right-4 top-3"
        @click="utils.toggleModal('modal-edit-avatar')"
      >
        ✕
      </button>
      <h2 class="text-xl">Modifica avatar</h2>
      <AvatarMaker v-if="showAvatarMaker" :avatar="avatarData" />
      <button
        class="btn solid info mt-10"
        @click="
          save();
          utils.toggleModal('modal-edit-avatar');
        "
      >
        Salva
      </button>
    </div>
  </div>
</template>

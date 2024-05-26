<script setup>
import { ref } from "vue";
import utils from "../../helpers/utils";
import axios from "axios";
import { Notyf } from "notyf";
const modal = ref(null);
const notyf = new Notyf({ position: { x: "right", y: "top" } });

const randId = Math.floor(Math.random() * 1000);

const props = defineProps({
  thumbnail: String,
  date: Date,
  updated: Date,
  title: String,
  description: String,
  id: String,
  type: String,
  engine: String,
});

function toggleModal(modal) {
  const ele = document.getElementById(modal);
  let show = ele.classList.contains("show");
  if (show) {
    ele.classList.remove("show");
  } else {
    ele.classList.add("show");
  }
}

function deleteProject() {
  document.getElementById(randId + "-delbtn").classList.add("is-loading");
  axios
    .delete(`/project/${props.id}`, {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    })
    .then((response) => {
      window.location.reload();
    })
    .catch((err) => {
      document
        .getElementById(randId + "-delbtn")
        .classList.remove("is-loading");
      console.error(err);
      notyf.error(err.response.data.error);
    });
}

function badgeColor(badge) {
  console.log(badge == "slideshow");
  if (badge === "blocks") return "danger";
  else if (badge === "code") return "info";
  else if (badge === "slideshow") return "success";
}
</script>
<script>
export default {
  props: ["id", "type"],
  methods: {
    redirectToEditor() {
      // window.location.assign(
      //   `/editor/${this.id}/?type=${this.type}${
      //     this.engine ? "&engine=" + this.engine : ""
      //   }`
      // );

      // this.$router.push(
      //   `/editor/${this.id}/?type=${this.type}${
      //     this.engine ? "&engine=" + this.engine : ""
      //   }`
      // );
      window.open(
        `/editor/${this.id}/?type=${this.type}${
          this.engine ? "&engine=" + this.engine : ""
        }`,
        "_self"
      );
    },
    projectPage() {
      this.$router.push(`/project/${this.id}`);
      //window.location.assign(`/project/${this.id}`);
    },
  },
};
</script>

<template>
  <div style="height: 100%">
    <button
      class="text-left hover:opacity-80 rounded-lg h-full"
      @click="toggleModal(randId)"
    >
      <div
        class="overflow-hidden rounded-lg has-shadow w-full dark:bg-neutral-900 h-full"
      >
        <img
          :src="thumbnail == '' ? '/no_thumbnail.png' : thumbnail"
          class="aspect-video rounded-b-none"
          style="object-fit: cover"
          alt=""
        />
        <div class="p-4 flex flex-col gap-2">
          <div class="text-xs">
            {{
              "Creato " +
              date.toLocaleDateString() +
              "・Aggiornato " +
              updated.toLocaleDateString()
            }}
          </div>
          <h3 class="text-xl font-semibold">{{ title }}</h3>
          <div class="text-sm">
            <p>
              {{
                description == ""
                  ? "No description"
                  : description.slice(0, 90) +
                    (description.length > 90 ? "..." : "")
              }}
            </p>
            <div :class="'badge solid mt-2 ' + badgeColor(type)">
              {{ type.charAt(0).toUpperCase() + type.slice(1) }}
            </div>
            <div
              :class="
                'badge mt-2 ml-2 ' +
                (type === 'code' ? 'info' : 'danger') +
                (engine == '' ? ' hidden' : '')
              "
            >
              {{ engine.charAt(0).toUpperCase() + engine.slice(1) }}
            </div>
          </div>
        </div>
      </div>
    </button>

    <div class="w-full">
      <label class="modal-overlay" @click="toggleModal(randId)"></label>
      <div class="modal flex flex-col gap-5 w-full max-w-[500px]" :id="randId">
        <button class="absolute right-4 top-3" @click="toggleModal(randId)">
          ✕
        </button>
        <h2 class="text-xl">{{ title }}</h2>
        <span>Scegli una azione</span>
        <div class="gap-3 grid lg:grid-cols-3 grid-cols-1">
          <div class="none">
            <button
              class="btn solid success flex-1 w-full"
              @click="redirectToEditor"
            >
              Modifica
            </button>
          </div>
          <div class="none">
            <button class="btn solid info flex-1 w-full" @click="projectPage">
              Pubblica
            </button>
          </div>
          <div class="none">
            <button
              class="btn solid danger flex-1 w-full"
              @click="
                toggleModal(randId);
                toggleModal(randId + '-del');
              "
            >
              Elimina
            </button>
          </div>
        </div>
      </div>
    </div>

    <div>
      <label
        class="modal-overlay"
        @click="toggleModal(randId + '-del')"
      ></label>
      <div
        class="modal flex flex-col gap-5 w-full max-w-xl"
        :id="randId + '-del'"
      >
        <button
          class="absolute right-4 top-3"
          @click="toggleModal(randId + '-del')"
        >
          ✕
        </button>
        <h2 class="text-xl">Elimina {{ title }}</h2>
        <span>Questa azione non può essere annullata</span>
        <div class="flex gap-3">
          <button
            class="btn solid danger flex-1"
            :id="randId + '-delbtn'"
            @click="deleteProject()"
          >
            Elimina
          </button>
          <button
            class="btn solid bw flex-1"
            @click="toggleModal(randId + '-del')"
          >
            Annulla
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

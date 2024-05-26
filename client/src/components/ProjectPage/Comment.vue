<script setup>
import DOMPurify from "isomorphic-dompurify";
import utils from "../../helpers/utils";
import { eventBus } from "../../event-bus";
import axios from "axios";
import { useRoute } from "vue-router";

const props = defineProps({
  username: String,
  avatar: String,
  userId: String,
  comment: String,
  id: String,
  totalReplies: Number,
  replies: Array,
  isProjectOwner: Boolean,
});

const route = useRoute();
const isLogged = localStorage.getItem("token") ? true : false;

let customId = Math.floor(Math.random() * 100000000000000);
const showDelBtn =
  props.userId == JSON.parse(localStorage.getItem("userData"))?.id;
function updateInputCounter() {
  const textarea = document.getElementById("replyInput" + customId);
  const counter = document.getElementById("counter-reply" + customId);
  counter.innerText = textarea.value.length + "/250";
  if (textarea.value.length >= 1 && !utils.isEmpty(textarea.value))
    document.getElementById("reply-btn" + customId).disabled = false;
  else document.getElementById("reply-btn" + customId).disabled = true;
}

function reply() {
  event.preventDefault();
  document.getElementById("reply-btn" + customId).classList.add("is-loading");

  const textarea = document.getElementById("replyInput" + customId);
  console.log(props.comment);
  axios
    .post(
      `/comments/${route.params.projectId}`,
      {
        content: textarea.value,
        replyTo: props.id,
      },
      { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
    )
    .then((response) => {
      document
        .getElementById("reply-btn" + customId)
        .classList.remove("is-loading");
      textarea.value = "";
      eventBus.dispatchEvent(new Event("rerenderComments"));
      utils.toggleModal("replyModal" + customId);
    });
}

async function deleteComment() {
  document.getElementById("delBtn" + customId).classList.add("is-loading");
  try {
    await axios.delete(`/comments/${props.id}`, {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    });
    document.getElementById("delBtn" + customId).classList.remove("is-loading");
    utils.notyf("Commento eliminato", "success");
    eventBus.dispatchEvent(new Event("rerenderComments"));
  } catch (err) {
    console.error(err);
    document.getElementById("delBtn" + customId).classList.remove("is-loading");
    utils.notyf(err.response.data.error || "Errore", "error");
  } finally {
    utils.toggleModal("deleteModal" + customId);
  }
}
</script>

<template>
  <div class="flex mt-4">
    <a :href="`/profile/${userId}`"
      ><img
        :src="avatar == '' ? '/no-icon.png' : avatar"
        style="height: 50px; min-width: 50px; object-fit: cover"
    /></a>
    <div
      class="ml-3 rounded-b-xl rounded-tr-xl dark:bg-neutral-800 bg-neutral-100"
      style="width: 100%; max-width: 500px"
    >
      <a :href="`/profile/${userId}`"
        ><h5 class="font-bold text-lg m-2 w-full">
          {{ DOMPurify.sanitize(username) }}
        </h5></a
      >
      <div class="w-full" style="max-height: 200px; overflow-y: auto">
        <p
          class="m-2"
          style="
            word-wrap: break-word;
            overflow-wrap: break-word;
            white-space: pre-wrap;
          "
        >
          {{ DOMPurify.sanitize(comment) }}
        </p>
      </div>
      <div style="height: 2px" class="dark:bg-neutral-700 bg-neutral-400 m-3" />
      <div class="flex ml-2 mb-2 flex-wrap gap-1">
        <button
          class="flex items-center dark:hover:bg-neutral-700 hover:bg-neutral-300 rounded-lg mr-2"
          @click="utils.toggleModal('replyModal' + customId)"
          v-if="isLogged"
        >
          <div class="flex items-center m-1">
            <svg
              width="24"
              height="24"
              fill="currentColor"
              class="opacity-75"
              viewBox="0 0 32 32"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="m4.687 11.119 9.287 8.933V14.64c2.813 0 9.973.062 9.973 7.426a7.98 7.98 0 0 1-6.369 7.816c5.842-.792 10.359-5.747 10.359-11.806 0-11.256-12.026-11.352-13.963-11.352V2.118z"
              />
            </svg>
            <p class="ml-2">Rispondi</p>
          </div>
        </button>
        <button
          class="flex items-center dark:hover:bg-neutral-700 hover:bg-neutral-300 rounded-lg"
        >
          <div class="flex items-center m-1">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              class="opacity-75"
            >
              <path
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="3"
                d="M13.253 5.98 12 13.5l-1.253-7.52a1.27 1.27 0 1 1 2.506 0"
              />
              <circle
                cx="12"
                cy="19"
                r="1"
                stroke="currentColor"
                stroke-width="2"
              />
            </svg>
            <p>Segnala</p>
          </div>
        </button>
        <button
          class="flex items-center dark:hover:bg-neutral-700 hover:bg-neutral-300 rounded-lg ml-2"
          @click="utils.toggleModal('deleteModal' + customId)"
          v-if="showDelBtn || isProjectOwner"
        >
          <div class="flex items-center m-1">
            <svg
              width="20"
              height="20"
              viewBox="0 0 16 16"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              class="opacity-75"
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="1.5"
            >
              <path d="M5.75 4.25v-2.5h4.5v2.5m-6.5 1v9h8.5v-9m-9.5-.5h10.5" />
            </svg>
            <p class="ml-1">Elimina</p>
          </div>
        </button>
      </div>
    </div>
  </div>
  <div style="margin-left: calc(50px + 0.75rem)">
    <slot></slot>
  </div>

  <div>
    <label
      class="modal-overlay"
      @click="utils.toggleModal('replyModal' + customId)"
    ></label>
    <div class="modal flex flex-col gap-5" :id="'replyModal' + customId">
      <button
        class="absolute right-4 top-3"
        @click="utils.toggleModal('replyModal' + customId)"
      >
        ✕
      </button>
      <h2 class="text-xl">Rispondi</h2>
      <form @submit="reply()">
        <p>Testo</p>
        <textarea
          class="input bw w-full"
          style="min-height: 100px; max-height: 200px"
          @input="updateInputCounter()"
          maxlength="250"
          :id="'replyInput' + customId"
        />
        <p class="w-full text-right mt-2" :id="'counter-reply' + customId">
          0/250
        </p>

        <div class="flex gap-3 mt-3">
          <button
            class="btn solid info flex-1"
            :id="'reply-btn' + customId"
            disabled
            type="submit"
          >
            Invia
          </button>
          <button
            class="btn solid bw flex-1"
            type="button"
            @click="utils.toggleModal('replyModal' + customId)"
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
      @click="utils.toggleModal('deleteModal' + customId)"
    ></label>
    <div class="modal flex flex-col gap-5" :id="'deleteModal' + customId">
      <button
        class="absolute right-4 top-3"
        @click="utils.toggleModal('deleteModal' + customId)"
      >
        ✕
      </button>
      <h2 class="text-xl">Elimina commento</h2>
      <span>Sei sicuro? Questa azione non potrà essere annullata</span>
      <div class="flex gap-3">
        <button
          class="btn solid danger flex-1"
          @click="deleteComment()"
          :id="'delBtn' + customId"
        >
          Elimina
        </button>
        <button
          class="btn solid bw flex-1"
          @click="utils.toggleModal('deleteModal' + customId)"
        >
          Annulla
        </button>
      </div>
    </div>
  </div>
</template>

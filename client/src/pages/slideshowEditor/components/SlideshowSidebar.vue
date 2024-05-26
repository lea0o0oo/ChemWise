<script setup>
import { ref } from "vue";
import { eventBus } from "../../../event-bus";
import utils from "../../../helpers/utils";

import SidebarComponentsEditor from "./SidebarComponentsEditor.vue";

const slideNameInput = ref(null);
let prevSlideName = "";
let currentIndex = 0;
eventBus.addEventListener("slideData", (event) => {
  //console.log(event.detail);
  currentIndex = event.detail.index;
  slideNameInput.value.value = event.detail.name;
  prevSlideName = slideNameInput.value.value;
  document.getElementById("up_btn").disabled = event.detail.top;
  document.getElementById("down_btn").disabled = event.detail.bottom;
  if (event.detail.top) {
    document.getElementById("up_btn").classList.remove("hover:opacity-60");
    document.getElementById("up_btn").classList.add("opacity-60");
  } else {
    document.getElementById("up_btn").classList.add("hover:opacity-60");
    document.getElementById("up_btn").classList.remove("opacity-60");
  }
  if (event.detail.bottom) {
    document.getElementById("down_btn").classList.remove("hover:opacity-60");
    document.getElementById("down_btn").classList.add("opacity-60");
  } else {
    document.getElementById("down_btn").classList.add("hover:opacity-60");
    document.getElementById("down_btn").classList.remove("opacity-60");
  }
});

function move(direction) {
  eventBus.dispatchEvent(
    new CustomEvent("moveSlide", {
      detail: direction,
    })
  );
}

function deleteSlide() {
  eventBus.dispatchEvent(new CustomEvent("delSlide", { detail: currentIndex }));
}

function changeSlideName() {
  eventBus.dispatchEvent(
    new CustomEvent("changeSlideName", {
      detail: { index: currentIndex, name: slideNameInput.value.value },
    })
  );
}

eventBus.addEventListener("slideChangeFail", () => {
  slideNameInput.value.value = prevSlideName;
});
eventBus.addEventListener("slideChangeSuccess", () => {
  prevSlideName = slideNameInput.value.value;
});
</script>

<template>
  <div>
    <div class="flex">
      <div class="flex w-full">
        <button
          class="mr-2 hover:opacity-60"
          aria-label="Sposta in alto"
          title="Sposta in alto"
          id="up_btn"
          @click="move('up')"
        >
          <svg
            width="35"
            height="35"
            viewBox="-1 0 19 19"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            class="opacity-90"
          >
            <path
              d="M15.3 15.32a1.03 1.03 0 0 1-.727-.302L8.5 8.946l-6.073 6.072a1.03 1.03 0 0 1-1.456-1.455l6.801-6.8a1.03 1.03 0 0 1 1.456 0l6.8 6.8a1.03 1.03 0 0 1-.727 1.757z"
            />
          </svg>
        </button>
        <button
          class="hover:opacity-60"
          aria-label="Sposta in baso"
          title="Sposta in baso"
          id="down_btn"
          @click="move('down')"
        >
          <svg
            width="35"
            height="35"
            viewBox="-1 0 19 19"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            class="opacity-90"
          >
            <path
              d="M8.5 15.313a1.03 1.03 0 0 1-.728-.302l-6.8-6.8a1.03 1.03 0 0 1 1.455-1.456L8.5 12.828l6.073-6.073a1.03 1.03 0 0 1 1.455 1.456l-6.8 6.8a1.03 1.03 0 0 1-.728.302"
            />
          </svg>
        </button>
      </div>
      <button
        aria-label="Elimina slide"
        title="Elimina slide"
        @click="utils.toggleModal('modal-delete-slide')"
      >
        <svg
          width="23"
          height="23"
          viewBox="0 0 24 24"
          class="fill-red-500 hover:fill-red-900"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M1.5 3.75a.75.75 0 0 0 0 1.5zm21 1.5a.75.75 0 0 0 0-1.5zm-21 0h21v-1.5h-21z"
          />
          <path
            d="M9.75 1.5V.75zM8.25 3H7.5zM7.5 4.5a.75.75 0 0 0 1.5 0zm7.5 0a.75.75 0 0 0 1.5 0zm.75-1.5h.75zM14.25.75h-4.5v1.5h4.5zm-4.5 0a2.25 2.25 0 0 0-1.591.659l1.06 1.06a.75.75 0 0 1 .531-.219zm-1.591.659A2.25 2.25 0 0 0 7.5 3H9a.75.75 0 0 1 .22-.53zM7.5 3v1.5H9V3zm9 1.5V3H15v1.5zm0-1.5a2.25 2.25 0 0 0-.659-1.591l-1.06 1.06c.14.141.219.332.219.531zm-.659-1.591A2.25 2.25 0 0 0 14.25.75v1.5a.75.75 0 0 1 .53.22zM9 17.25a.75.75 0 0 0 1.5 0zm1.5-7.5a.75.75 0 0 0-1.5 0zm0 7.5v-7.5H9v7.5zm3 0a.75.75 0 0 0 1.5 0zm1.5-7.5a.75.75 0 0 0-1.5 0zm0 7.5v-7.5h-1.5v7.5zm3.865 3.874-.747-.062zM17.37 22.5v-.75zm-10.739 0v-.75zm-1.495-1.376.747-.062zM4.497 4.438a.75.75 0 0 0-1.494.124zm16.5.124a.75.75 0 1 0-1.494-.124zm-2.88 16.5a.75.75 0 0 1-.239.49l1.016 1.104a2.25 2.25 0 0 0 .718-1.47zm-.239.49a.75.75 0 0 1-.508.198v1.5a2.25 2.25 0 0 0 1.524-.594zm-.508.198H6.631v1.5H17.37zm-10.74 0a.75.75 0 0 1-.507-.198l-1.016 1.104c.416.382.96.594 1.524.594zm-.507-.198a.75.75 0 0 1-.24-.49l-1.494.124a2.25 2.25 0 0 0 .718 1.47zm-.24-.49L4.497 4.438l-1.494.124 1.386 16.624zm13.62-16.624-1.385 16.624 1.494.124 1.385-16.624z"
          />
        </svg>
      </button>
    </div>
    <!-- ... -->
    <p class="mt-5">Nome slide</p>
    <input
      class="input bw"
      minlength="1"
      maxlength="24"
      ref="slideNameInput"
      @change="changeSlideName()"
    />
    <div class="divider" />
    <div class="h-full w-full" style="overflow-y: auto">
      <SidebarComponentsEditor />
    </div>
  </div>

  <div>
    <label
      class="modal-overlay"
      @click="utils.toggleModal('modal-delete-slide')"
    ></label>

    <div
      class="modal flex flex-col gap-5 lg:w-auto w-full"
      style="max-width: 500px"
      id="modal-delete-slide"
    >
      <button
        class="absolute right-4 top-3"
        @click="utils.toggleModal('modal-delete-slide')"
      >
        ✕
      </button>
      <h2 class="text-xl">Elimina slide</h2>
      <span>Non potrai annullare questa azione</span>
      <div class="flex gap-3">
        <button
          class="btn solid danger flex-1"
          @click="
            deleteSlide();
            utils.toggleModal('modal-delete-slide');
          "
        >
          Elimina
        </button>
        <button
          class="btn solid bw flex-1"
          @click="utils.toggleModal('modal-delete-slide')"
        >
          Annulla
        </button>
      </div>
    </div>
  </div>
</template>

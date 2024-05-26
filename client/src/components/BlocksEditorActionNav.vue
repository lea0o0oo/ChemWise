<script setup>
import { eventBus } from "../event-bus";

function toggleDrawer(name) {
  let element = document.getElementById(`drawer-${name}`);
  if (element.classList.contains("show")) {
    element.classList.remove("show");
  } else {
    element.classList.add("show");
  }
}

function testCode() {
  eventBus.dispatchEvent(new Event("testCode"));
}
</script>

<template>
  <div class="flex" style="width: 100%">
    <div class="flex" style="width: 80%">
      <p class="font-bold text-xl ml-5">[PROJECT NAME]</p>
      <label class="btn solid info w-fit sm ml-6" @click="toggleDrawer('right')"
        >Dev options</label
      >
      <button class="btn solid success sm ml-3">Snippets</button>
      <div class="dropdown info ml-5 hidden">
        <label class="btn solid sm" tabindex="0"
          >Scene 1
          <svg
            width="15px"
            height="15px"
            viewBox="0 0 48 48"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect width="48" height="48" fill="white" fill-opacity="0.01" />
            <path
              d="M37 18L25 30L13 18"
              stroke="currentColor"
              stroke-width="4"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </label>
        <div class="menu bottom-right">
          <a class="item text-sm">Scene 2</a>
          <a class="item text-sm">Scene 3</a>
          <a class="item text-sm">
            <svg
              fill="currentColor"
              width="17px"
              height="17px"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M19,11H13V5a1,1,0,0,0-2,0v6H5a1,1,0,0,0,0,2h6v6a1,1,0,0,0,2,0V13h6a1,1,0,0,0,0-2Z"
              />
            </svg>
            Create scene</a
          >
        </div>
      </div>
    </div>
    <div class="flex mr-1 w-full justify-end">
      <span
        class="tooltip bw bottom"
        data-tooltip="Compiles project into Javascript"
      >
        <button
          class="btn warn sm mr-3 light"
          id="testCodeBtn"
          @click="testCode()"
        >
          Compile & test
        </button>
      </span>
      <span class="tooltip bw bottom" data-tooltip="Saves the project">
        <button class="btn solid info sm">Save project</button>
      </span>
    </div>
  </div>
</template>

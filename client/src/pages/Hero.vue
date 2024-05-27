<script setup>
import projectConfig from "../../projectConfig";
import Card from "../components/explore/Card.vue";

function exploreIDK(type) {
  window.location.href = `/explore?type=${type}`;
}
</script>
<template>
  <div class="w-full min-h-[calc(100vh-70px)] pt-10 lg:px-20 px-5">
    <!-- component -->
    <div class="grid lg:grid-cols-2 grid-cols-1 w-full mb-[100px]">
      <div>
        <div class="flex gap-2">
          <button class="btn solid success sm" @click="exploreIDK('slideshow')">
            Esplora appunti
          </button>
          <button class="btn solid danger sm" @click="exploreIDK('quiz')">
            Esplora quiz
          </button>
          <button class="btn solid info sm" @click="exploreIDK('code')">
            Esplora simulazioni
          </button>
        </div>
        <h1 class="mt-10 font-bold text-3xl">
          Cos'è {{ projectConfig.name }}?
        </h1>
        <!-- yapping -->
        <p class="mt-3">
          ChemWise è un sito dove è possibile trovare appunti, simulazioni e
          quiz sulla chimica, aiutandoti a fissare concetti chiave in modo più
          semplice
        </p>
        <a href="https://github.com/lea0o0oo/ChemWise"
          ><svg
            width="32"
            height="32"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
            data-name="Layer 1"
            fill="currentColor"
            class="opacity-90"
          >
            <path
              d="M12 2.247a10 10 0 0 0-3.162 19.487c.5.088.687-.212.687-.475 0-.237-.012-1.025-.012-1.862-2.513.462-3.163-.613-3.363-1.175a3.64 3.64 0 0 0-1.025-1.413c-.35-.187-.85-.65-.013-.662a2 2 0 0 1 1.538 1.025 2.137 2.137 0 0 0 2.912.825 2.1 2.1 0 0 1 .638-1.338c-2.225-.25-4.55-1.112-4.55-4.937a3.9 3.9 0 0 1 1.025-2.688 3.6 3.6 0 0 1 .1-2.65s.837-.262 2.75 1.025a9.43 9.43 0 0 1 5 0c1.912-1.3 2.75-1.025 2.75-1.025a3.6 3.6 0 0 1 .1 2.65 3.87 3.87 0 0 1 1.025 2.688c0 3.837-2.338 4.687-4.562 4.937a2.37 2.37 0 0 1 .674 1.85c0 1.338-.012 2.413-.012 2.75 0 .263.187.575.687.475A10.005 10.005 0 0 0 12 2.247"
            />
          </svg>
        </a>
      </div>
      <div class="none px-2">
        <h1 class="text-center font-bold text-3xl">Progetti in primo piano</h1>
        <div class="grid lg:grid-cols-2 grid-cols-1 gap-6 mt-5">
          <Card
            thumbnail="https://i.ibb.co/BNCLjJZ/9493118f3ea4.jpg"
            title="Proprietà perdiche"
            id="6653f5b872e2f6df13ac4516"
            type="quiz"
          />
          <Card
            thumbnail="https://i.ibb.co/BNCLjJZ/9493118f3ea4.jpg"
            title="Proprietà perdiche"
            id="665400ab6fe2dadfeb84103a"
            type="slideshow"
          />
        </div>
      </div>
    </div>
    <!-- Icon Blocks -->
    <div class="lg:py-14 mx-auto">
      <div class="grid sm:grid-cols-2 lg:grid-cols-3 items-center gap-12">
        <!-- Icon Block -->
        <div>
          <div
            class="relative flex justify-center items-center size-12 bg-white rounded-xl before:absolute before:-inset-px before:-z-[1] before:bg-gradient-to-br before:from-blue-600 before:via-transparent before:to-violet-600 before:rounded-xl dark:bg-neutral-900"
          >
            <svg
              class="flex-shrink-0 size-6 text-blue-600 dark:text-blue-500"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <rect width="10" height="14" x="3" y="8" rx="2" />
              <path
                d="M5 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v16a2 2 0 0 1-2 2h-2.4"
              />
              <path d="M8 18h.01" />
            </svg>
          </div>
          <div class="mt-5">
            <h3 class="text-lg font-semibold text-gray-800 dark:text-white">
              Responsive
            </h3>
            <p class="mt-1 text-gray-600 dark:text-neutral-400">
              Con un design responsive, crea e modifica progetti dove e quando
              vuoi
            </p>
          </div>
        </div>
        <!-- End Icon Block -->

        <!-- Icon Block -->
        <div>
          <div
            class="relative flex justify-center items-center size-12 bg-white rounded-xl before:absolute before:-inset-px before:-z-[1] before:bg-gradient-to-br before:from-blue-600 before:via-transparent before:to-violet-600 before:rounded-xl dark:bg-neutral-900"
          >
            <svg
              class="flex-shrink-0 size-6 text-blue-600 dark:text-blue-500"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 32 32"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <path
                fill="none"
                d="M16 5.559c-6.118 0-11.078 4.96-11.078 11.079 0 4.749 2.989 8.799 7.188 10.374l2.553-6.808a3.808 3.808 0 1 1 2.674 0l2.553 6.808c4.199-1.575 7.188-5.625 7.188-10.374 0-6.119-4.96-11.079-11.079-11.079z"
              />
            </svg>
          </div>
          <div class="mt-5">
            <h3 class="text-lg font-semibold text-gray-800 dark:text-white">
              Open source
            </h3>
            <p class="mt-1 text-gray-600 dark:text-neutral-400">
              Questo progetto è open source, il che significa che tutto il
              codice sorgente è libero sotto licenza MIT
            </p>
          </div>
        </div>
        <!-- End Icon Block -->

        <!-- Icon Block -->
        <div>
          <div
            class="relative flex justify-center items-center size-12 bg-white rounded-xl before:absolute before:-inset-px before:-z-[1] before:bg-gradient-to-br before:from-blue-600 before:via-transparent before:to-violet-600 before:rounded-xl dark:bg-neutral-900"
          >
            <svg
              class="flex-shrink-0 size-6 text-blue-600 dark:text-blue-500"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <path
                d="M14 9a2 2 0 0 1-2 2H6l-4 4V4c0-1.1.9-2 2-2h8a2 2 0 0 1 2 2v5Z"
              />
              <path d="M18 9h2a2 2 0 0 1 2 2v11l-4-4h-6a2 2 0 0 1-2-2v-1" />
            </svg>
          </div>
          <div class="mt-5">
            <h3 class="text-lg font-semibold text-gray-800 dark:text-white">
              Guidato dalla community
            </h3>
            <p class="mt-1 text-gray-600 dark:text-neutral-400">
              Questo progetto viene portato avanti dalla community
            </p>
          </div>
        </div>
        <!-- End Icon Block -->
      </div>
    </div>
    <!-- End Icon Blocks -->
  </div>
</template>

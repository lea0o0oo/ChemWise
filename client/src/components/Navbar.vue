<script setup>
import { onMounted } from "vue";
import config from "../../projectConfig";
import checkAuth from "../helpers/checkAuth";
import { useRouter } from "vue-router";

document.addEventListener("DOMContentLoaded", () => {
  if (localStorage.getItem("token") != null) {
    document.getElementById("acc-opts").classList.remove("hidden");
    document.getElementById("acc-login").classList.add("hidden");
    checkAuth();
  }
});

function logout() {
  localStorage.removeItem("token");
  localStorage.removeItem("userData");
  window.location.reload();
}
const router = useRouter();

// In your main JavaScript file or a component
onMounted(() => {
  // On page load or when changing themes, best to add inline in `head` to avoid FOUC
  if (
    localStorage.getItem("color-theme") === "dark" ||
    (!("color-theme" in localStorage) &&
      window.matchMedia("(prefers-color-scheme: dark)").matches)
  ) {
    document.documentElement.classList.add("dark");
    document.documentElement.setAttribute("data-theme", "dark");
  } else {
    document.documentElement.classList.remove("dark");
  }

  var themeToggleDarkIcon = document.getElementById("theme-toggle-dark-icon");
  var themeToggleLightIcon = document.getElementById("theme-toggle-light-icon");

  // Change the icons inside the button based on previous settings
  if (
    localStorage.getItem("color-theme") === "dark" ||
    (!("color-theme" in localStorage) &&
      window.matchMedia("(prefers-color-scheme: dark)").matches)
  ) {
    themeToggleLightIcon.classList.remove("hidden");
  } else {
    themeToggleDarkIcon.classList.remove("hidden");
  }

  var themeToggleBtn = document.getElementById("theme-toggle");

  themeToggleBtn.addEventListener("click", function () {
    // toggle icons inside button
    themeToggleDarkIcon.classList.toggle("hidden");
    themeToggleLightIcon.classList.toggle("hidden");

    // if set via local storage previously
    if (localStorage.getItem("color-theme")) {
      if (localStorage.getItem("color-theme") === "light") {
        document.documentElement.classList.add("dark");
        document.documentElement.setAttribute("data-theme", "dark");
        localStorage.setItem("color-theme", "dark");
      } else {
        document.documentElement.classList.remove("dark");
        document.documentElement.removeAttribute("data-theme");
        localStorage.setItem("color-theme", "light");
      }

      // if NOT set via local storage previously
    } else {
      if (document.documentElement.classList.contains("dark")) {
        document.documentElement.classList.remove("dark");
        localStorage.setItem("color-theme", "light");
      } else {
        document.documentElement.classList.add("dark");
        localStorage.setItem("color-theme", "dark");
      }
    }
  });

  document.querySelector("#searchbox").addEventListener("keyup", function (e) {
    if (e.key === "Enter" || e.keyCode === 13) {
      router.push(`/explore/?q=${this.value}`);
      if (window.location.pathname == "/explore/")
        window.open(`/explore/?q=${this.value}`, "_self");
    }
  });
});
</script>

<template>
  <nav class="bg-zinc-200 border-gray-200 dark:bg-neutral-900">
    <div
      class="max-w-screen flex flex-wrap items-center justify-between mx-auto p-4"
    >
      <a href="/" class="flex items-center space-x-3 rtl:space-x-reverse">
        <img src="/icon.png" class="h-8" alt="Flowbite Logo" />
        <span
          class="self-center text-2xl font-semibold whitespace-nowrap dark:text-white"
          >{{ config.name }}</span
        >
      </a>
      <button
        data-collapse-toggle="navbar-default"
        type="button"
        class="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 zinc-200 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
        aria-controls="navbar-default"
        aria-expanded="false"
      >
        <span class="sr-only">Open main menu</span>
        <svg
          class="w-5 h-5"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 17 14"
        >
          <path
            stroke="currentColor"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M1 1h15M1 7h15M1 13h15"
          />
        </svg>
      </button>
      <div class="hidden w-full md:block md:w-auto" id="navbar-default">
        <ul
          class="font-medium flex flex-col p-4 md:p-0 mt-4 border rounded-lg md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 md:bg-gr-200 bg-zinc-200 border-gray-200 dark:bg-neutral-900 md:dark:bg-neutral-900 dark:border-gray-700"
        >
          <li>
            <label
              for="UserEmail"
              class="cursor-text relative block overflow-hidden rounded-md border border-gray-200 px-3 pt-3 shadow-sm focus-within:border-blue-600 focus-within:ring-1 focus-within:ring-blue-600 dark:border-gray-700 dark:bg-neutral-800 bg-gray-100"
            >
              <input
                type="email"
                id="searchbox"
                placeholder="Cerca..."
                class="peer w-full border-none bg-transparent p-0 placeholder-transparent focus:border-transparent focus:outline-none focus:ring-0 dark:text-white sm:text-sm bg-gray-100"
              />

              <span
                class="absolute start-3 top-3 -translate-y-1/2 text-xs text-gray-700 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-3 peer-focus:text-xs dark:text-gray-200"
              >
                🔍 Cerca
              </span>
            </label>
          </li>
          <li>
            <button id="theme-toggle" type="button" class="btn sm lg:mt-0 mt-2">
              <svg
                id="theme-toggle-dark-icon"
                class="hidden w-5 h-5"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z"
                ></path>
              </svg>
              <svg
                id="theme-toggle-light-icon"
                class="hidden w-5 h-5"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z"
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                ></path>
              </svg>
            </button>
          </li>
          <li>
            <RouterLink
              to="/"
              class="block lg:mb-0 mb-2 text-gray-900 text-center rounded hover:bg-gray-100 md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-gray-100"
              style="height: 35px; width: 70px; line-height: 35px"
              aria-current="page"
              >Home</RouterLink
            >
          </li>
          <li>
            <RouterLink
              to="/explore"
              class="block lg:mb-0 mb-2 text-gray-900 text-center rounded hover:bg-gray-100 md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-gray-100"
              style="height: 35px; width: 80px; line-height: 35px"
              aria-current="page"
              >Esplora</RouterLink
            >
          </li>
          <li>
            <RouterLink
              to="/editor/new"
              class="block lg:mb-0 mb-2 lg:text-center text-left text-gray-900 rounded hover:bg-gray-100 md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-gray-100"
              style="height: 35px; width: 80px; line-height: 35px"
              aria-current="page"
              ><p class="lg:ml-0 ml-[14px]">Crea</p></RouterLink
            >
          </li>
          <li id="acc-login">
            <RouterLink
              to="/login"
              class="block lg:mb-0 mb-2 text-gray-900 text-center rounded hover:bg-gray-100 md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-gray-100"
              style="height: 35px; width: 80px; line-height: 35px"
              aria-current="page"
            >
              <div class="flex">
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 48 48"
                  xmlns="http://www.w3.org/2000/svg"
                  class="mt-2 mr-2"
                  style="margin-left: 0.35rem"
                >
                  <path d="M0 0h48v48H0z" fill="none" />
                  <path
                    fill="currentColor"
                    d="M31.278 25.525C34.144 23.332 36 19.887 36 16c0-6.627-5.373-12-12-12S12 9.373 12 16c0 3.887 1.856 7.332 4.722 9.525C9.84 28.531 5 35.665 5 44h38c0-8.335-4.84-15.469-11.722-18.475M16 16c0-4.411 3.589-8 8-8s8 3.589 8 8-3.589 8-8 8-8-3.589-8-8m8 12c6.977 0 12.856 5.107 14.525 12H9.475C11.144 33.107 17.023 28 24 28"
                  />
                </svg>
                Login
              </div>
            </RouterLink>
          </li>
          <li id="acc-opts" class="hidden">
            <button
              class="block cursor-pointer text-gray-900 text-center rounded hover:bg-gray-100 md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-gray-100"
              style="height: 35px; width: 120px; line-height: 35px"
              aria-current="page"
              data-dropdown-toggle="dropdownHover"
              data-dropdown-trigger="hover"
              type="button"
            >
              <div class="flex">
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 48 48"
                  xmlns="http://www.w3.org/2000/svg"
                  class="mt-2 mr-2"
                  style="
                    margin-left: 0.35rem;
                    min-width: 18px;
                    min-height: 18px;
                  "
                >
                  <path d="M0 0h48v48H0z" fill="none" />
                  <path
                    fill="currentColor"
                    d="M31.278 25.525C34.144 23.332 36 19.887 36 16c0-6.627-5.373-12-12-12S12 9.373 12 16c0 3.887 1.856 7.332 4.722 9.525C9.84 28.531 5 35.665 5 44h38c0-8.335-4.84-15.469-11.722-18.475M16 16c0-4.411 3.589-8 8-8s8 3.589 8 8-3.589 8-8 8-8-3.589-8-8m8 12c6.977 0 12.856 5.107 14.525 12H9.475C11.144 33.107 17.023 28 24 28"
                  />
                </svg>
                Account
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 48 48"
                  xmlns="http://www.w3.org/2000/svg"
                  class="mt-[0.55rem] mr-2"
                  style="margin-left: 0.35rem"
                >
                  <path
                    d="M37 18 25 30 13 18"
                    stroke="currentColor"
                    stroke-width="4"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
              </div>
            </button>

            <!-- Dropdown menu -->
            <div
              id="dropdownHover"
              class="z-10 hidden bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700"
            >
              <ul
                class="py-2 text-sm text-gray-700 dark:text-gray-200"
                aria-labelledby="dropdownHoverButton"
              >
                <li>
                  <RouterLink
                    to="/settings"
                    class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                    >Impostazioni</RouterLink
                  >
                </li>
                <li>
                  <RouterLink
                    to="/projects"
                    class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                    >Progetti</RouterLink
                  >
                </li>
                <li>
                  <RouterLink
                    to="/editor/new"
                    class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                    >Crea</RouterLink
                  >
                </li>
                <li>
                  <RouterLink
                    to="/notifications"
                    class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                    >Notifiche</RouterLink
                  >
                </li>
                <li>
                  <RouterLink
                    to="#"
                    @click="logout()"
                    class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                    >Esci</RouterLink
                  >
                </li>
              </ul>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

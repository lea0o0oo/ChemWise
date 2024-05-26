<script setup>
import axios from "axios";
import checkAuth from "../helpers/checkAuth";
function showAlert(message) {
  document.getElementById("err-duv").classList.remove("hidden");
  document.getElementById("err-content").innerHTML = message;
}
function hideAlert() {
  document.getElementById("err-duv").classList.add("hidden");
}

function login() {
  event.preventDefault();
  document.getElementById("loginBtn").classList.add("is-loading");
  hideAlert();
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;
  const userData = {
    username: username,
    password: password,
  };
  axios
    .post("/login", userData)
    .then((response) => {
      localStorage.setItem("token", response.data.data.token);
      localStorage.setItem(
        "userData",
        JSON.stringify({
          username: response.data.data.username,
          id: response.data.data.userId,
          avatarUrl: response.data.data.avatarUrl,
        })
      );
      if (!response.data.data.completedSetup) {
        window.location.href = "/firstSetup";
      } else {
        window.location.href = "/projects";
      }
    })
    .catch((err) => {
      console.error(err);
      showAlert(err.response.data.error);
      document.getElementById("loginBtn").classList.remove("is-loading");
    });
}
</script>

<template>
  <div
    style="height: calc(100vh - 70px); align-items: center"
    class="flex justify-center"
  >
    <div class="dark:bg-neutral-800 bg-white flex h-full items-center py-16">
      <main class="w-full lg:max-w-md mx-auto p-6">
        <div
          class="mt-7 bg-white border border-gray-200 rounded-xl shadow-sm dark:bg-zinc-800 dark:border-gray-700"
        >
          <div
            class="p-4 sm:p-7 rounded-xl lg:w-[400px] w-full"
            style="border: 2px solid white"
          >
            <div class="text-center">
              <h1
                class="block text-2xl font-bold text-gray-800 dark:text-white"
              >
                Entra
              </h1>
              <p class="mt-2 text-sm text-gray-600 dark:text-gray-400">
                Non hai un account?
                <a
                  class="text-blue-600 decoration-2 hover:underline font-medium dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
                  href="/register"
                >
                  Registrati qui
                </a>
              </p>
            </div>

            <div class="prompt danger ghost mt-5 hidden" id="err-duv">
              <div class="content">
                <p id="err-content">Err</p>
              </div>
            </div>

            <div class="mt-5">
              <!-- Form -->
              <form @submit="login()">
                <div class="grid gap-y-4">
                  <!-- Form Group -->
                  <div class="none">
                    <label
                      for="email"
                      class="block text-sm mb-2 dark:text-white"
                      >Username</label
                    >
                    <div class="relative">
                      <input
                        id="username"
                        name="email"
                        maxlength="24"
                        onkeydown="return /[a-z]|[0-9]/i.test(event.key)"
                        class="py-3 lowercase px-4 block w-full border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 bg-gray-200 dark:border-gray-700 dark:text-gray-400 dark:focus:ring-gray-600"
                        required
                        placeholder="farter84"
                        aria-describedby="email-error"
                      />
                    </div>
                  </div>
                  <!-- End Form Group -->

                  <!-- Form Group -->
                  <div class="none">
                    <label
                      for="password"
                      class="block text-sm mb-2 dark:text-white"
                      >Password</label
                    >
                    <div class="relative">
                      <input
                        type="password"
                        id="password"
                        name="password"
                        class="py-3 px-4 block w-full border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 bg-gray-200 dark:border-gray-700 dark:text-gray-400 dark:focus:ring-gray-600"
                        required
                        aria-describedby="password-error"
                      />
                      <div
                        class="hidden absolute inset-y-0 end-0 pointer-events-none pe-3"
                      >
                        <svg
                          class="size-5 text-red-500"
                          width="16"
                          height="16"
                          fill="currentColor"
                          viewBox="0 0 16 16"
                          aria-hidden="true"
                        >
                          <path
                            d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8 4a.905.905 0 0 0-.9.995l.35 3.507a.552.552 0 0 0 1.1 0l.35-3.507A.905.905 0 0 0 8 4zm.002 6a1 1 0 1 0 0 2 1 1 0 0 0 0-2z"
                          />
                        </svg>
                      </div>
                    </div>
                    <p
                      class="hidden text-xs text-red-600 mt-2"
                      id="password-error"
                    >
                      8+ characters required
                    </p>
                  </div>
                  <!-- End Form Group -->

                  <button
                    type="submit"
                    class="btn info solid w-full"
                    id="loginBtn"
                  >
                    Log in
                  </button>
                </div>
              </form>
              <!-- End Form -->
            </div>
          </div>
        </div>
      </main>
    </div>
  </div>
</template>

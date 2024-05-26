<script setup lang="ts">
import Notification from "../components/Notifications/Notification.vue";
import axios from "axios";
import { onMounted } from "vue";
import utils from "../helpers/utils";

onMounted(async () => {
  const data = (
    await axios.get("/notifications", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
  ).data.data;
});
</script>

<template>
  <div class="h-[calc(100vh-70px)] dark:bg-neutral-800">
    <h1 class="font-bold text-5xl text-center p-5">Notifiche</h1>
    <p class="opacity-60 text-center">
      Work in progress... puoi provare a contribuire
      <a class="link text-info-800" href="https://github.com/idkProj">qui</a> ;)
    </p>
    <div class="flex w-full justify-center p-2">
      <div class="lg:max-w-[50vw] w-full rounded-xl">
        <Notification
          type="like"
          v-if="false"
          :createdAt="new Date(Date.now())"
        />
      </div>
    </div>
  </div>
</template>

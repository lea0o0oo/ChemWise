import { createApp } from "vue";
import "./tailwind.css";
import "./style.css";
import App from "./App.vue";
import { router } from "./router";
import axios from "axios";
import config from "../projectConfig";
import "notyf/notyf.min.css";
import { createPinia } from "pinia";

axios.defaults.baseURL = config.baseAPIUrl;

const eventBus = new EventTarget();
const pinia = createPinia();
const app = createApp(App);

app.config.globalProperties.eventBus = eventBus;
app.use(router).use(pinia).mount("#app");

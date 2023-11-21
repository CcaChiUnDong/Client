import { createApp } from "vue";
import { createPinia } from "pinia";
import { useAuthStore } from "./stores/pinia";
import App from "./App.vue";
import router from "./router";
import axios from "axios";

const app = createApp(App);
const pinia = createPinia();
app.use(pinia);
app.use(router);

const authStore = useAuthStore();
axios.defaults.baseURL = "http://localhost:8080";
axios.defaults.withCredentials = true;

app.mount("#app");

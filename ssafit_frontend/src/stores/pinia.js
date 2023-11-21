import { defineStore } from "pinia";
import axios from "axios";

export const useAuthStore = defineStore("auth", {
  state: () => ({
    token: null,
    id: null,
    name: null,
    email: null,
  }),
  getters: {
    token: (state) => state.token,
    id: (state) => state.id,
    email: (state) => state.email,
    nickname: (state) => state.name,
  },
  actions: {
    async login(user) {
      try {
        const params = {
          email: user.email,
          password: user.password,
        };

        const response = await axios.post(
          "http://localhost:8080/login",
          JSON.stringify(params),
          {
            headers: { "content-type": "application/json" },
          }
        );

        this.loginAction(response);
        router.push({ name: "home" });
      } catch (error) {
        console.error("Error during login:", error);
        alert("로그인 요청에 문제가 발생했습니다.");
      }
    },
    logout() {
      this.logoutAction();
      router.push({ name: "login" });
    },
    loginAction(item) {
      this.token = item.headers["access-token"];
      this.id = item.data.id;
      this.email = item.data.email;
      this.name = item.data.name;
    },
    logoutAction() {
      this.token = null;
      this.id = null;
      this.email = null;
      this.name = null;
    },
  },
});

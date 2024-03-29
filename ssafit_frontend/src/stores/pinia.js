import { defineStore } from "pinia";
import axios from "axios";
import instance from "../global/request";
import { deleteCookie, setCookie } from "../global/cookie";

export const useAuthStore = defineStore("auth", {
  state: () => ({
    isLogin: false,
    user: { name: null, id: null },
  }),

  actions: {
    // loadUser() {
    //   const savedUser = sessionStorage.getItem("loginUser");
    //   if (savedUser) {
    //     this.user = JSON.parse(savedUser) || null;
    //   }
    // },
    loadUser() {
      instance.get("/user", {}).then((res) => {
        this.setUser(res.data);
      });
    },

    setUser(user) {
      this.user = { ...user };
      this.isLogin = true;
    },

    // Logout user
    logout() {
      this.user = { name: null, id: null };
      this.isLogin = false;
      deleteCookie("ccachiToken");
    },

    // Login user
    async loginUser(user) {
      try {
        const response = await axios.post(
          `http://localhost:8080/user/login`,
          user
        );

        const token = response.headers.get("Authorization");
        setCookie("ccachiToken", token);
        this.setUser(response.data);
        alert("로그인 성공");
      } catch (error) {
        console.log(error);
        alert("로그인 실패");
      }
    },
  },
});

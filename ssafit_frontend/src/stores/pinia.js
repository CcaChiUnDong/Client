import { defineStore } from "pinia";
import axios from "axios";

export const useAuthStore = defineStore("auth", {
  state: () => ({
    user: null,
  }),

  actions: {
    loadUser() {
      const savedUser = sessionStorage.getItem("loginUser");
      if (savedUser) {
        this.user = JSON.parse(savedUser) || null;
      }
    },

    setUser(user) {
      this.user = user;
      sessionStorage.setItem("loginUser", JSON.stringify(user));
    },

    // Logout user
    logout() {
      this.user = null;
      sessionStorage.removeItem("loginUser");
    },

    // Login user
    async loginUser(user) {
      try {
        const response = await axios.post(
          `http://localhost:8080/user/login`,
          user
        );

        const matchedUser = response.data;

        if (matchedUser) {
          this.setUser(matchedUser);
          alert("로그인 성공_pinia");
        } else {
          alert("로그인 실패_pinia");
        }
      } catch (error) {
        console.error(error);
        alert("로그인 실패: 서버 에러_pinia");
      }
    },
  },
});

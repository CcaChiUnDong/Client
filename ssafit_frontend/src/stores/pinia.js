import { defineStore } from "pinia";
import axios from "axios";

export const useAuthStore = defineStore("auth", {
  state: () => ({
    user: null,
    token: null,
  }),

  actions: {
    loadUser() {
      const savedUser = sessionStorage.getItem("loginUser");
      if (savedUser) {
        this.user = JSON.parse(savedUser) || null;
      }
    },
    // loadUser() {
    //   axios
    //     .get("http://localhost:8080/user/", {
    //       headers: {
    //         Authorization: `Bearer ${this.token}`,
    //       },
    //     })
    //     .then((res) => {
    //       console.log(res.data);
    //     })
    //     .catch((err) => console.log(err.response));
    // },
    setUser(user) {
      this.user = user;
      sessionStorage.setItem("loginUser", JSON.stringify(user));
    },

    // Logout user
    logout() {
      this.user = null;
      sessionStorage.removeItem("loginUser");
      sessionStorage.removeItem("accessToken");
    },

    // Login user
    async loginUser(user) {
      try {
        const response = await axios.post(
          `http://localhost:8080/user/login`,
          user
        );

        this.token = response.headers.get("Authorization");
        console.log(this.token);
        sessionStorage.setItem("accessToken", this.token);
        console.log(response.data);
        this.setUser(response.data);
      } catch (error) {
        console.log(error);
        alert("로그인 실패");
      }
    },
  },
});

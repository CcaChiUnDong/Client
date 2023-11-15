import { defineStore } from "pinia";
import axios from "axios";

export const useAuthStore = defineStore("auth", {
  state: () => ({
    user: null,
  }),

  actions: {
    // Load user from localStorage
    loadUser() {
      const savedUser = localStorage.getItem("loginUser");
      if (savedUser) {
        this.user = JSON.parse(savedUser) || null;
      }
    },

    // Set the current user
    setUser(user) {
      this.user = user;
      localStorage.setItem("loginUser", JSON.stringify(user));
    },

    // Logout user
    logout() {
      this.user = null;
      localStorage.removeItem("loginUser");
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

    // Create user
    async createUser(user) {
      try {
        await axios.post(`http://localhost:8080/user/signup`, user);
        alert("회원가입이 완료되었습니다._pinia");
      } catch (error) {
        console.error(error);
      }
    },

    // Update user
    async updateUser(user) {
      try {
        await axios.put(`http://localhost:8080/user/${user.id}`, user);
        alert("사용자 정보가 업데이트되었습니다.");
      } catch (error) {
        console.error(error);
      }
    },

    // Delete user
    async deleteUser(user) {
      try {
        await axios.delete(`http://localhost:8080/user/${user.id}`);
        alert("사용자 정보가 삭제되었습니다.");
        this.logout();
      } catch (error) {
        console.error(error);
      }
    },
  },
});

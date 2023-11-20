import { defineStore } from "pinia";
import axios from "axios";

export const useAuthStore = defineStore("auth", {
  state: () => ({
    user: null,
  }),

  actions: {
    // Load user from sessionStorage
    loadUser() {
      try {
        const savedUser = sessionStorage.getItem("loginUser");
        console.log("Saved user data:", savedUser);

        if (savedUser) {
          this.user = JSON.parse(savedUser) || null;
        }
      } catch (error) {
        console.error("Error parsing user data:", error);
        // Handle the error, e.g., clear sessionStorage or set user to null
        sessionStorage.removeItem("loginUser");
        this.user = null;
      }
    },

    // Set the current user
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
        const jwtToken = response.data; // 서버에서 jwt를 받아옴
        console.log(jwtToken);

        if (jwtToken) {
          const decodedUser = decodeJwtToken(jwtToken);
          this.setUser(decodedUser);

          // 또는 토큰을 그대로 저장할 수 있습니다.
          sessionStorage.setItem("loginUser", JSON.stringify(jwtToken));

          alert("로그인 성공");
        } else {
          alert("로그인 실패");
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

function decodeJwtToken(token) {
  return {};
}

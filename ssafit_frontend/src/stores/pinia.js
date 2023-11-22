import { defineStore } from "pinia";
import axios from "axios";
import instance from "../global/request";
import { deleteCookie, setCookie } from "../global/cookie";


export const useAuthStore = defineStore("auth", {
  state: () => ({
    isLogin : false,
    user: {name : null, id :null},
  }),

  actions: {
    loadUser() {
      
      instance.get("/user",{
        
      }).then((res)=>{
        this.setUser(res.data);
      });

    },

    setUser(user) {
      this.user = {...user};
      this.isLogin = true;
    },

    // Logout user
    logout() {
      this.user = {name : null, id :null};
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
        setCookie("ccachiToken",token);
        this.setUser(response.data);
      } catch (error) {
        console.log(error);
        alert("로그인 실패");
      }
    },
  },
});

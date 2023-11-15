<template>
  <div>
    <!-- <THeHeaderNav :user="user" @logout-user="logout" />
    <RouterView @login-user="loginUser" /> -->
    <THeHeaderNav />
    <RouterView />
  </div>
</template>

<script setup>
import THeHeaderNav from "./components/common/THeHeaderNav.vue";
import { ref, onMounted } from "vue";
import axios from "axios";
import { useRouter } from "vue-router";
import { useAuthStore } from "./stores/pinia";

const router = useRouter();
const authStore = useAuthStore(); // Pinia 스토어 사용

// const logout = () => {
//   authStore.logout();
//   router.push("/login");
// };

// const loginUser = (loginUser) => {
//   axios({
//     url: `http://localhost:8080/user/login`,
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     data: loginUser,
//   })
//     .then((res) => {
//       let matchedUser = res.data;
//       if (matchedUser) {
//         authStore.setUser(matchedUser);
//         alert("로그인 성공_app.vue");
//         router.push("/");
//       } else {
//         alert("로그인 실패_app.vue");
//       }
//     })
//     .catch((err) => {
//       console.log(err);
//       alert("로그인 실패: 서버 에러_app.vue");
//     });
// };

onMounted(() => {
  authStore.loadUser();
});
</script>

<style scoped></style>

<template>
  <div class="container">
    <h2>로그인</h2>
    <fieldset class="center">
      <label for="email">이메일</label>
      <input type="email" id="email" v-model="email" class="view" /><br />
      <label for="password">비밀번호</label>
      <input
        type="password"
        id="password"
        v-model="password"
        class="view"
      /><br />
      <CustomButton @click="loginUser" text="로그인" ></CustomButton>
    </fieldset>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useAuthStore } from "@/stores/pinia";
import CustomButton from "../elements/CustomButton.vue";
import router from "../router";

const email = ref("");
const password = ref("");

const loginUser = () => {
  // 아이디와 패스워드 입력 여부 확인
  if (email.value && password.value) {
    const user = {
      email: email.value,
      password: password.value,
    };
    useAuthStore.loginUser(user);
    router.push({ name: "home" });
  } else {
    alert("아이디 또는 비밀번호가 입력되지 않았습니다.");
  }
};
</script>

<style>
.container{
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: calc(100vh - 70px);
}
.center {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: fit-content;
  height: fit-content;
}
</style>

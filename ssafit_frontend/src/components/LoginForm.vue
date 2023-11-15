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
      <button class="btn" @click="login">로그인</button>
    </fieldset>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useAuthStore } from "@/stores/pinia";
import { useRouter } from "vue-router";

const authStore = useAuthStore();
const router = useRouter();
const email = ref("");
const password = ref("");

const login = () => {
  let user = {
    email: email.value,
    password: password.value,
  };
  authStore.loginUser(user);
  router.push("/");
};
</script>

<style>
.center {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: fit-content;
  height: fit-content;
}
</style>

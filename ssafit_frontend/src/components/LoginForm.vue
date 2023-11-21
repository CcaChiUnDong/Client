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
      <CustomButton @click="login" text="로그인"></CustomButton>
    </fieldset>
  </div>
</template>

<script setup>
import { ref } from "vue";
import CustomButton from "../elements/CustomButton.vue";
import { useAuthStore } from "../stores/pinia";
import { useRouter } from "vue-router";
import { globalColor } from "../global/rootColor";

const primaryColorBabyBlue = ref(globalColor.primaryColorBabyBlue);

const email = ref("");
const password = ref("");

const router = useRouter();
const authStore = useAuthStore();

const login = () => {
  const user = {
    email: email.value,
    password: password.value,
  };
  authStore.loginUser(user);
  router.push({ name: "home" });
};
</script>

<style>
.container {
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
.view {
  padding: 12px 20px;
  margin: 8px 0;
  display: inline-block;
  border: 1px solid v-bind(primaryColorBabyBlue);
  border-radius: 4px;
  box-sizing: border-box;
  color: #787878;
  font-size: medium;
}
</style>

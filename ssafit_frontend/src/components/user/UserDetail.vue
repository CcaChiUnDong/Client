<template>
  <div class="container">
    <h2>회원 정보</h2>
    <fieldset class="text-center">
      <label for="email">이메일</label>
      <input
        readonly
        type="email"
        id="email"
        v-model="user.email"
        class="view"
      /><br />
      <label for="password">비밀번호</label>
      <input
        type="password"
        id="password"
        v-model="user.password"
        class="view"
      /><br />
      <label for="name">이름</label>
      <input
        readonly
        type="text"
        id="name"
        v-model="user.name"
        class="view"
      /><br />
      <button class="btn" @click="updateUser">수정</button>
      <button class="btn" @click="deleteUser">회원 탈퇴</button>
    </fieldset>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import axios from "axios";
import { useAuthStore } from "../../stores/pinia";
const user = useAuthStore().user;

const updateUser = () => {
  emit("update-user", user);
};

const deleteUser = () => {
  emit("delete-user", user);
};

onMounted(() => {});
</script>

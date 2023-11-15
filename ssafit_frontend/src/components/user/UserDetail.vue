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
      <input type="text" id="name" v-model="user.name" class="view" /><br />
      <button class="btn" @click="updateUser">수정</button>
      <button class="btn" @click="deleteUser">삭제</button>
    </fieldset>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import axios from "axios";

const emit = defineEmits();

const user = ref({
  password: "",
  name: "",
  email: "",
});

const updateUser = () => {
  emit("update-user", user.value);
};

const deleteUser = () => {
  emit("delete-user", user.value);
};

onMounted(() => {
  const pathName = new URL(document.location).pathname.split("/");
  const userId = pathName[pathName.length - 1];
  const API_URL = `http://localhost:8080/user/${userId}`;
  axios({
    url: API_URL,
    method: "GET",
  })
    .then((res) => {
      user.value.password = res.data.password;
      user.value.name = res.data.name;
      user.value.email = res.data.email;
    })
    .catch((err) => {
      console.log(err);
    });
});
</script>

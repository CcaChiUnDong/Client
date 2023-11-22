<template>
  <div class="container">
    <fieldset class="text-center">
      <h2>회원 정보</h2>
      <label for="email">이메일</label>
      <input
        readonly
        type="email"
        id="email"
        v-model="user.email"
        class="view"
      /><br />
      <!-- <label for="password">비밀번호</label>
      <input
        type="password"
        id="password"
        v-model="user.password"
        class="view"
      /><br /> -->
      <label for="name">이름</label>
      <input
        readonly
        type="text"
        id="name"
        v-model="user.name"
        class="view"
      /><br />
      <CustomButton
        class="btn"
        @click="deleteUser(user)"
        text="회원 탈퇴"
      ></CustomButton>
    </fieldset>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import axios from "axios";
import CustomButton from "../../elements/CustomButton.vue";
import { useAuthStore } from "@/stores/pinia";
import { useRouter } from "vue-router";
import instance from "../../global/request";

const userString = sessionStorage.getItem("loginUser");
const user = userString ? JSON.parse(userString) : null;
const router = useRouter();

// Delete user
const deleteUser = () => {
  try {
    instance.delete("/user",{}).then((res)=>{
      useAuthStore().logout();
      alert("사용자 정보가 삭제되었습니다.");
      router.push({ name: "home" });
    });
  } catch (error) {
    console.error(error);
  }
};
// Update user
const updateUser = (user) => {
  try {
    axios.put(`http://localhost:8080/user/${user.id}`, user);
    alert("사용자 정보가 업데이트되었습니다.");
  } catch (error) {
    console.error(error);
  }
};

onMounted(() => {});
</script>

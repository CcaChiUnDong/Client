<template>
  <div>
    <!-- <THeHeaderNav :user="user" @logout-user="logout" />
    <RouterView @login-user="loginUser" /> -->
    <THeHeaderNav />
    <RouterView />
  </div>
</template>

<script setup>
import THeHeaderNav from "./components/common/TheHeaderNav.vue";
import { ref, onMounted } from "vue";
import axios from "axios";
import { useRouter } from "vue-router";
import { useAuthStore } from "./stores/pinia";

const router = useRouter();
const authStore = useAuthStore();

onMounted(() => {
  authStore.loadUser();
});
</script>

<style scoped></style>

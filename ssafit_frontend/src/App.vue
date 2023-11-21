<template>
  <div>
    <!-- <THeHeaderNav :user="user" @logout-user="logout" />
    <RouterView @login-user="loginUser" /> -->
    <TheHeaderNav />
    <RouterView />
  </div>
</template>

<script setup>
import TheHeaderNav from "./components/common/TheHeaderNav.vue";
import { ref, onMounted } from "vue";
import axios from "axios";
import { useRouter } from "vue-router";
import { useAuthStore } from "./stores/pinia";
</script>

<style scoped></style>

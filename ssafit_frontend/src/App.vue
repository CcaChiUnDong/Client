<template>
  <div>
    <THeHeaderNav />
    <RouterView />
  </div>
</template>

<script setup>
import THeHeaderNav from "./components/common/THeHeaderNav.vue";
import { ref, onMounted } from "vue";
import axios from "axios";
import { useRouter } from "vue-router";

const router = useRouter();
const user = ref(null);

const logout = () => {
  user.value = null;
  localStorage.removeItem("loginUser");
};
</script>

<style scoped></style>

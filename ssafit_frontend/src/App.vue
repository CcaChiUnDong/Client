<template>
  <div class="totalBody">
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

<style>
  body {
  margin: 0px;
  }
  @font-face {
  font-family:'KoPubDotumBold.ttf';
  src: url('asset/font/KoPubDotumBold.ttf') format('truetype');
  font-weight: 700;
  }
  @font-face {
  font-family:'KoPubDotumBold.ttf';
  src: url('asset/font/KoPubDotumMedium.ttf') format('truetype');
  font-weight: 500;
  }
  @font-face {
  font-family:'KoPubDotumLight.ttf';
  src: url('asset/font/KoPubDotumLight.ttf') format('truetype');
  font-weight: 300;
  }
  *{
    font-family :'KoPubDotumBold.ttf';
  }
  .totalBody{
    margin: 0px;
  }
</style>

<template>
  <header>
    <nav class="header-nav">
      <div>
        <RouterLink to="/">Home</RouterLink>
        <RouterLink :to="{ name: 'boardList' }">게시판</RouterLink>
      </div>
      <div>
        <span v-if="isLoggedIn">{{ authStore.loginUser }} 님</span>
        <a href="/" v-if="isLoggedIn" @click="authStore.logout()">로그아웃</a>
        <RouterLink to="/login" v-else>로그인 </RouterLink>
        <RouterLink :to="userProfileLink" v-if="isLoggedIn"
          >마이페이지</RouterLink
        >
        <RouterLink :to="{ name: 'Regist' }" v-else>회원가입</RouterLink>
      </div>
    </nav>
  </header>
</template>

<script setup>
import { ref, computed } from "vue";
import { useRouter } from "vue-router";
const router = useRouter();

const isLoggedIn = computed(() => !!sessionStorage.getItem("access-token"));
console.log(isLoggedIn.value);
const userProfileLink = computed(() =>
  isLoggedIn.value ? `/user/${authStore.loginUser}` : ""
);
</script>

<style scoped>
#container {
  text-align: center;
}

nav a {
  font-weight: bold;
  text-decoration: none;
  color: black;
}

nav a.router-link-exact-active {
  color: #42b983;
}

header {
  height: 70px;
  background-color: #53e3a6;
  line-height: 70px;
  padding: 0px 30px;
}

header a {
  margin: 10px;
  text-decoration: none;
  color: white;
}

header span {
  margin: 10px;
  text-decoration: none;
  color: white;
}

.header-nav {
  display: flex;
  justify-content: space-between;
}

.logo {
  display: inline-block;
  font-size: 2rem;
  font-weight: bold;
  color: white;
  margin: 0;
}
</style>

<template>
  <header>
    <nav class="header-nav">
      <div>
        <RouterLink to="/">Home</RouterLink>
        <RouterLink :to="{ name: 'boardList' }">BoardList</RouterLink>
        <RouterLink :to="{ name: 'boardCreate' }">BoardCreate</RouterLink>
      </div>
      <div>
        <a href="#" v-if="getUser" @click="logout">로그아웃</a>
        <RouterLink to="/login" v-else>로그인 </RouterLink>
        <RouterLink :to="{ name: 'Regist' }">회원가입</RouterLink>
      </div>
    </nav>
  </header>
</template>

<script setup>
import { computed } from "vue";

const props = defineProps(["user"]);
const emits = defineEmits(["logout"]);

const getUser = computed(() => !!props.user);

const logout = () => {
  emits("logout");
};
</script>

<style scoped>
#container {
  text-align: center;
}
/* 
nav {
  padding: 30px;
} */

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

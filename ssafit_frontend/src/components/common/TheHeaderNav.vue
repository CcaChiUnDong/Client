<template>
  <header>
    <nav class="header-nav">
      <div>
        <RouterLink to="/">Home</RouterLink>
        <RouterLink :to="{ name: 'boardList' }">게시판</RouterLink>
      </div>
      <div>
        <span v-if="userState.$state.isLogin">{{ userState.$state.user.name }} 님</span>
        <a href="/" v-if="userState.$state.isLogin" @click="logoutUser">로그아웃</a>
        <RouterLink to="/login" v-else>로그인 </RouterLink>
        <RouterLink :to="`/user/${userState.$state.user.id}`" v-if="userState.$state.isLogin"
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
import { onMounted } from "vue";
import { useAuthStore } from "../../stores/pinia";
import { globalColor } from "../../global/rootColor";
import { getCookie } from "../../global/cookie";

const primaryColor = ref(globalColor.primaryColor);
const primaryColorBabyBlue = ref(globalColor.primaryColorBabyBlue);
const primaryColorTiffanyBlue = ref(globalColor.primaryColorTiffanyBlue);
const primaryColorBlueGreen = ref(globalColor.primaryColorBlueGreen);

const userState = useAuthStore();

const logoutUser = () => {
  useAuthStore().logout();
};

onMounted(() => {
  const token = getCookie('ccachiToken');
  if(token){
    useAuthStore().loadUser();
  }
});
</script>

<style scoped>
#container {
  text-align: center;
}
* {
  font-size: 20px;
}

nav a {
  font-weight: bold;
  text-decoration: none;
  color: black;
}

nav a.router-link-exact-active {
  color: v-bind(primaryColorBabyBlue);
}

header {
  height: 70px;
  background-color: v-bind(primaryColorTiffanyBlue);
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

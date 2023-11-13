<template>
  <div class="container">
    <h2>회원 가입</h2>
    <fieldset class="text-center">
      <label for="id">아이디</label>
      <input type="text" id="id" v-model="id" class="view" /><br />
      <label for="password">비밀번호</label>
      <input
        type="password"
        id="password"
        v-model="password"
        class="view"
      /><br />
      <label for="password2">비밀번호 확인</label>
      <input
        type="password"
        id="password2"
        v-model="password2"
        class="view"
      /><br />
      <label for="name">이름</label>
      <input type="text" id="name" v-model="name" class="view" /><br />
      <label for="email">이메일</label>
      <input type="email" id="email" v-model="email" class="view" /><br />
      <label for="age">나이</label>
      <input type="number" id="age" v-model="age" class="view" /><br />
      <button class="btn" @click="regist">등록</button>
    </fieldset>
  </div>
</template>

<script setup>
import { ref } from "vue";
import axios from "axios";
import { useRouter } from "vue-router";

const router = useRouter();
const emit = defineEmits(["create-user"]);

const id = ref("");
const password = ref("");
const password2 = ref("");
const name = ref("");
const email = ref("");
const age = ref(0);
const users = ref([]);

const getUserList = () => {
  // 이거 수정해야합니다~
  const API_URL = `http://localhost:8080/userapi/user`;
  axios({
    url: API_URL,
    method: "GET",
  })
    .then((res) => {
      users.value = Array.isArray(res.data) ? res.data : [];
    })
    .catch((err) => {
      console.log(err);
    });
};

// email에 @의 포함 여부
// 비밀번호가 8자리 이상이며 특수문자를 포함했는지 여부
// password와 password2의 일치 여부
// id 중복 여부를 확인해 유효성을 검토하고, 이상이 있을 시 alert로 경고한다.
const regist = () => {
  const user = {
    id: id.value,
    password: password.value,
    name: name.value,
    email: email.value,
    age: age.value,
  };

  const rule = /[!@#$%^&*\(\),.?\":{}|<>]/gi;

  if (password.value !== password2.value) {
    alert("비밀번호가 일치하지 않습니다.");
  } else if (users.value.includes((user) => user.id === id)) {
    alert("이미 존재하는 아이디입니다.");
  } else if (!email.value.includes("@")) {
    alert("올바른 이메일 형식을 입력해주세요.");
  } else if (!rule.test(password.value) || password.value.length < 8) {
    alert("비밀번호는 8자리 이상이며, 특수문자를 포함해야 합니다.");
  } else {
    emit("create-user", user);
  }
};

getUserList();
</script>

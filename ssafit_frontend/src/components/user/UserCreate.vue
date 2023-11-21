<template>
  <div class="container">
    <h2>회원 가입</h2>
    <fieldset class="text-center">
      <label for="name">이름</label>
      <input type="text" id="name" v-model="name" class="view" /><br />
      <label for="email">이메일</label>
      <input type="email" id="email" v-model="email" class="view" />
      <br />
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
      <button class="btn" @click="regist">등록</button>
    </fieldset>
  </div>
</template>

<script setup>
import { ref } from "vue";
import axios from "axios";
import { useRouter } from "vue-router";

const REST_USER_API = `http://localhost:8080/user`;

const router = useRouter();
const emit = defineEmits();

const password = ref("");
const password2 = ref("");
const name = ref("");
const email = ref("");
const users = ref([]);

// email에 @의 포함 여부
// 비밀번호가 8자리 이상이며 특수문자를 포함했는지 여부
// password와 password2의 일치 여부
// id 중복 여부를 확인해 유효성을 검토하고, 이상이 있을 시 alert로 경고한다.
const regist = () => {
  const user = {
    password: password.value,
    name: name.value,
    email: email.value,
  };

  const rule = /[!@#$%^&*\(\),.?\":{}|<>]/gi;

  const checkEmail = () => {
    axios({
      url: `${REST_USER_API}/check`,
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      data: email.value,
    })
      .then((check) => {
        const isAvailable = check.data.available;
        if (isAvailable === true) {
          console.log(email.value);
          createUser(user);
          router.push({ name: "Login" });
        } else {
          alert("중복되는 이메일입니다. 다시 입력해주세요.");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  if (password.value !== password2.value) {
    alert("비밀번호가 일치하지 않습니다.");
  } else if (!email.value.includes("@")) {
    alert("올바른 이메일 형식을 입력해주세요.");
  } else if (!rule.test(password.value) || password.value.length < 8) {
    alert("비밀번호는 8자리 이상이며, 특수문자를 포함해야 합니다.");
  } else {
    checkEmail();
  }
};

// Create user
const createUser = (user) => {
  try {
    axios.post(`http://localhost:8080/user/signup`, user);
    alert("회원가입이 완료되었습니다._pinia");
  } catch (error) {
    console.error(error);
  }
};
</script>

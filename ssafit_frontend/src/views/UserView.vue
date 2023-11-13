<template>
  <div>
    <RouterView
      :users="users"
      @create-user="createUser"
      @update-user="updateUser"
      @delete-user="deleteUser"
      @login-user="loginUser"
    />
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import http from "@/components/util/http-common";

const router = useRouter();
const users = ref([]);

// 사용자 목록 조회
const getUserList = () => {
  http
    .get("user")
    .then((resp) => {
      users.value = resp.data;
    })
    .catch(() => {
      console.log("getUserList() 오류 발생");
    });
};

// 사용자 등록
const createUser = (user) => {
  http
    .put("user", user)
    .then(() => {
      getUserList();
      router.push({ name: "List" });
    })
    .catch(() => {
      console.log("createUser() 오류 발생");
    });
};

// 사용자 수정 (유효성 검토)
const updateUser = (user) => {
  const rule = /[!@#$%^&*\(\),.?\":{}|<>]/gi;

  if (!user.email.includes("@")) {
    alert("올바른 이메일 형식을 입력해주세요.");
  } else if (!rule.test(user.password) || user.password < 8) {
    alert("비밀번호는 8자리 이상이며, 특수문자를 포함해야 합니다.");
  } else {
    http({
      method: "PUT",
      url: "user",
      data: user,
    })
      .then(() => {
        getUserList();
        router.push({ name: "List" });
      })
      .catch(() => {
        console.log("updateUser() 오류 발생");
      });
  }
};

// 사용자 삭제
const deleteUser = (user) => {
  http
    .delete(`user/${user.id}`)
    .then(() => {
      getUserList();
      router.push({ name: "List" });
    })
    .catch(() => {
      console.log("deleteUser() 오류 발생");
    });
};

// 사용자 로그인
const loginUser = (loginUser) => {
  console.log("why not??");

  // user 정보 요청 api 주소
  const API_URL = `http://localhost:8080/user/login`;

  // axios 요청
  axios
    .post(API_URL, loginUser) // post 메서드로 수정
    .then((res) => {
      let matchedUser = res.data;

      if (matchedUser) {
        // matchedUser를 사용자 정보로 사용
        users.value = [matchedUser]; // 배열로 감싸서 할당
        localStorage.setItem("loginUser", JSON.stringify(matchedUser));
        alert("로그인 성공");
        router.push("/");
      } else {
        alert("로그인 실패");
      }
    })
    .catch((err) => {
      console.log(err);
      alert("로그인 실패: 서버 에러");
    });
};

onMounted(() => {
  getUserList();
  const savedUser = localStorage.getItem("loginUser");
  if (savedUser) {
    user.value = JSON.parse(savedUser);
  }
});
</script>

<style>
.user-link {
  color: black;
}

.view {
  width: 80%;
  padding: 12px 20px;
  margin: 8px 0;
  display: inline-block;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
  color: #787878;
  font-size: medium;
}

label {
  display: inline-block;
  width: 130px;
}

.btn {
  width: 8%;
  background-color: #d0d3d0;
  color: rgb(80, 82, 79);
  padding: 14px 20px;
  margin: 8px;
  border: 1px solid #787878;
  border-radius: 4px;
  font-size: large;
  cursor: pointer;
}

/* 테이블 CSS */
.user-list {
  border-collapse: collapse;
  width: 100%;
  text-align: center;
  margin: auto;
}

.user-list td,
.user-list th {
  border: 1px solid black;
}
</style>

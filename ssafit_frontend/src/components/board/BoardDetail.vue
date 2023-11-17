<template>
  <div>
    <h4>게시글 상세</h4>
    <fieldset class="text-center">
      <label for="title">제목</label>
      <input
        readonly
        type="text"
        id="title"
        v-model="store.board.title"
        class="view"
      /><br />
      <label for="user">작성자</label>
      <input
        readonly
        type="text"
        id="user"
        v-model="store.board.user.name"
        class="view"
      /><br />
      <label for="contents">내용</label>
      <input
        readonly
        type="text"
        id="contents"
        v-model="store.board.contents"
        class="view"
      /><br />
      <label for="createdAt">작성일</label>
      <input
        readonly
        type="text"
        id="createdAt"
        v-model="formattedCreatedAt"
        class="view"
      /><br />
      <div style="float: right">
        <RouterLink
          :to="`/board/${store.board.id}/update`"
          v-if="store.board.user.id == user.id"
          >수정</RouterLink
        >
        <button
          style="margin: 10px"
          @click="deleteBoard"
          v-if="store.board.user.id == user.id"
        >
          삭제
        </button>
      </div>
    </fieldset>
    <CommentList />
    <CommentCreate />
    <button class="btn" onclick="location.href='/board'">목록</button>
  </div>
</template>

<script setup>
import { useRoute, useRouter } from "vue-router";
import { useBoardStore } from "@/stores/board";
import { computed, ref, onMounted } from "vue";
import { useAuthStore } from "../../stores/pinia";
import CommentCreate from "../boardComment/CommentCreate.vue";
import CommentList from "../boardComment/CommentList.vue";
import axios from "axios";

const store = useBoardStore();
const user = useAuthStore().user;

console.log(user.id);

const route = useRoute();
const router = useRouter();

const formattedCreatedAt = computed(() => {
  const date = new Date(store.board.createdAt);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");

  return `${year}/${month}/${day} ${hours}시 ${minutes}분`;
});

onMounted(() => {
  store.getBoard(route.params.id);
});

const deleteBoard = function () {
  axios.delete(`http://localhost:8080/board/${route.params.id}`).then(() => {
    router.push({ name: "boardList" });
  });
};

const updateBoard = function () {
  router.push({ name: "boardUpdate" });
};
</script>

<style scoped></style>

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
      <label for="url">URL</label>
      <div v-if="isYouTubeVideo(store.board.url)">
        <iframe
          width="560"
          height="315"
          :src="getYouTubeEmbedUrl(store.board.url)"
          frameborder="0"
          allowfullscreen
        ></iframe>
      </div>
      <div v-else-if="isYouTubeVideoId(store.board.url)">
        <iframe
          width="560"
          height="315"
          :src="getYouTubeEmbedUrlById(store.board.url)"
          frameborder="0"
          allowfullscreen
        ></iframe>
      </div>
      <input
        v-else
        readonly
        type="text"
        id="url"
        v-model="store.board.url"
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
      <div v-if="store.board.userId && user" style="float: right">
        <RouterLink
          v-if="store.board.userId == user.id"
          :to="`/board/${store.board.id}/update`"
          >수정</RouterLink
        >
        <button
          style="margin: 10px"
          @click="deleteBoard"
          v-if="store.board.userId == user.id"
        >
          삭제
        </button>
      </div>
    </fieldset>
    <CommentList />
    <CommentCreate />
    <button class="btn" @click="goToList">목록</button>
  </div>
</template>

<script setup>
import { useRoute, useRouter } from "vue-router";
import { useBoardStore } from "@/stores/board";
import { computed, onMounted } from "vue";
import { useAuthStore } from "../../stores/pinia";
import CommentCreate from "../boardComment/CommentCreate.vue";
import CommentList from "../boardComment/CommentList.vue";
import axios from "axios";

const store = useBoardStore();
const user = useAuthStore().$state.user;
const route = useRoute();
const router = useRouter();
console.log(store.board);

const isYouTubeVideo = (url) => url && url.includes("youtube.com");

const getYouTubeEmbedUrl = (url) => {
  const videoId = url.split("v=")[1];
  return `https://www.youtube.com/embed/${videoId}`;
};

const isYouTubeVideoId = (url) => url;

const getYouTubeEmbedUrlById = () => {
  return `https://www.youtube.com/embed/${store.board.url}`;
};

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

const deleteBoard = () => {
  axios.delete(`http://localhost:8080/board/${route.params.id}`).then(() => {
    router.push({ name: "boardList" });
  });
};

const goToList = () => {
  router.push({ name: "boardList" });
};
</script>

<style scoped></style>

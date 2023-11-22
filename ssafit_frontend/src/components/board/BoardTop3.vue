<template>
  <div class="video-container">
    <h2>인기 동영상</h2>
    <div
      v-for="(board, index) in store.top3BoardList"
      :key="board.id"
      class="video-card"
      @click="goToBoardDetail(board.id)"
    >
      <h3>{{ board.title }}</h3>
      <p>{{ board.videoTitle }}</p>
      <img :src="board.thumbnail" alt="videoThumbnail" />
    </div>
  </div>
</template>

<script setup>
import { useYoutubeStore } from "@/stores/youtube";
import { useBoardStore } from "@/stores/board";
import { useRouter } from "vue-router";
import { ref, onMounted, watch } from "vue";

const store = useBoardStore();
const router = useRouter();
onMounted(async () => {
  store.getTop3BoardList();
});

const goToBoardDetail = (boardId) => {
  router.push({ path: `board/${boardId}` });
};
</script>

<style scoped>
.video-container {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.video-card {
  display: inline-block;
  width: 80%;
  margin: 10px;
  padding: 10px;
  border: 1px solid #ddd;
  cursor: pointer;
}
</style>

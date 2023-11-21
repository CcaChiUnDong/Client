<template>
  <div>
    <h2>상위 3개 동영상</h2>
    <div
      v-for="(board, index) in store.top3BoardList"
      :key="board.id"
      class="video-card"
      @click="goToBoardDetail(board.id)"
    >
      <h3>{{ board.title }}</h3>
      <p>{{ board.videoTitle }}</p>
      <img
        :src="board.thumbnail"
        alt="videoThumbnail"
      />
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
console.log( store.top3BoardList)
onMounted(async () => {
  await store.getTop3BoardList();
});

const goToBoardDetail = (boardId) => {
  console.log(boardId);
  router.push({ path: `board/${boardId}` });
};
</script>

<style scoped>
.video-card {
  display: inline-block;
  margin: 10px;
  padding: 10px;
  border: 1px solid #ddd;
  cursor: pointer;
}
</style>

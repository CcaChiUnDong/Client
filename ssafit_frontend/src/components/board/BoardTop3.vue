<template>
  <div>
    <h2>상위 3개 동영상</h2>
    <div
      v-for="(board, index) in top3BoardList"
      :key="board.id"
      class="video-card"
      @click="goToBoardDetail(board.id)"
    >
      <h3>{{ board.title }}</h3>
      <p>{{ youtubeStore.state.top3Videos[index]?.title }}</p>
      <img
        :src="youtubeStore.state.top3Videos[index]?.thumbnail"
        alt="videoThumbnail"
      />
    </div>
  </div>
</template>

<script setup>
import { useYoutubeStore } from "@/stores/youtube";
import { useBoardStore } from "@/stores/board";
import { useRouter } from "vue-router";
import { ref, onMounted } from "vue";

const youtubeStore = useYoutubeStore();
const store = useBoardStore();
const router = useRouter();
const top3BoardList = ref([]);

onMounted(async () => {
  await store.getTop3BoardList();
  const videoIds = store.top3BoardList.map((item) => item.url);
  await youtubeStore.getTop3Videos(videoIds);
  top3BoardList.value = store.top3BoardList;
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

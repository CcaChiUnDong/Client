<template>
  <div style="padding-bottom:  30px;">
    <div class="container">
      <span
        class="title"
      >{{ store.board.title }}</span>
      <div class="boardInfo">
        <span
        class="writer"
        >{{ store.board.user.name }}</span>
        <span class="writer">{{ formattedCreatedAt }}</span>
      </div>
      

      <div class="Line"></div>
      
      <div v-if="isYouTubeVideo(store.board.url)">
        <iframe
          class="video"
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

      <pre class="contents">{{ store.board.contents }}</pre>
      
      
      <div v-if="isMine" class="boardManager">
        <CustomButton
          text = "수정"
          height="30"
          width="45"
          @click="updateBoard(store.board.id)"
          />
        <CustomButton
          text="삭제"
          height="30"
          width="45"
          @click="deleteBoard"
        />
      </div>

      <div class="Line"></div>


      <div class="boardInfo">
        <span class="writer">댓글 {{ store.board.comment_count }}</span>
      </div>

      <CommentList />
      <CommentCreate />
    </div>
    
    <div class="boardManager" style="margin-top: 10px;"><CustomButton text = "목록"  @click="goToList"/></div>
  </div>
</template>

<script setup>
import { useRoute, useRouter } from "vue-router";
import { useBoardStore } from "@/stores/board";
import { computed, onMounted, ref } from "vue";
import { useAuthStore } from "../../stores/pinia";
import CommentCreate from "../boardComment/CommentCreate.vue";
import CommentList from "../boardComment/CommentList.vue";
import axios from "axios";
import { globalColor } from "../../global/rootColor";
import CustomButton from "../../elements/CustomButton.vue";

const store = useBoardStore();
const userStore = useAuthStore().$state;
const route = useRoute();
const router = useRouter();
const colors = globalColor;
const primaryColor = globalColor.primaryColor;
const primaryColorBabyBlue = globalColor.primaryColorBabyBlue;
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
const isMine = computed({
  get(){
    return userStore.user.id === store.board.userId;
  }
  ,set(){
    isMine.value = userStore.user.id === store.board.userId;
  }
})


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
const updateBoard = (id) => {
  router.push({ path : `/board/${id}/update` });
};

const goToList = () => {
  router.push({ name: "boardList" });
};
</script>

<style scoped>

  .container {
    display: flex;
    gap: 5px;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;

    padding: 20px;

    border-radius: 5px;
    border: 1px v-bind(primaryColorBabyBlue) solid;
    width: 70vw;
    height: auto;
  }
  .title{
    font-size: 30px;

  }
  .writer{
    font-size: 15px;
    color : gray;
    margin-left: 5px;
  }
  .Line{
    width: 100%;
    height: 0px;
    border-top: 0.1px rgba(155, 155, 155, 0.486) solid;
    margin-bottom: 10px;
  }
  .video{
    width: 70vw;
    height: calc(70vw / 16 * 9);
  }
  .contents{
    white-space:pre-wrap;
    word-wrap:break-word;
    word-break: break-all;
    width: 100%;
    height: auto;
  }
  .boardInfo{
    width: 100%;
    display: flex;
    justify-content: space-between;
  }
  .boardManager{
    width: 100%;
    display: flex;
    justify-content: end;
    gap : 10px
  }

</style>

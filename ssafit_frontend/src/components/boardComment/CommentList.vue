<template>
  <div class="container1">
    <div class="table">
      <div class="comment" v-for="comment in commentList" :key="comment.id"> 
      <div class="commentContainer">
        <div class="comment" >
          <span class="user">{{ comment.user.name }}</span>
          <span class="content">{{ comment.content }}</span>
          <span class="createdAt">{{ formatCreatedAt(comment.create_at) }}</span>


          
        </div>

        <CustomButton
            text="삭제"
            v-if="userStore.isLogin && comment.user.id == userStore.user.id"
            @click="deleteComment(comment.id)"
          />
      </div>
      <div class="Line"></div>

    </div>
    </div>
  </div>
</template>

<script setup>
import { useRoute, useRouter } from "vue-router";
import { computed, ref, onMounted } from "vue";
import { useAuthStore } from "../../stores/pinia";
import axios from "axios";
import CustomButton from "../../elements/CustomButton.vue";

const route = useRoute();
const router = useRouter();
const REST_COMMENT_API = `http://localhost:8080/comment`;


const commentList = ref([]);
const user = useAuthStore().$state.user;
const userStore = useAuthStore().$state;

const getCommentList = function () {
  axios
    .get(`${REST_COMMENT_API}/${route.params.id}`)
    .then((response) => {
      // console.log(response.data);
      commentList.value = response.data;
    })
    .catch((err) => {
      console.log(err);
    });
};

const deleteComment = function (commentId) {
  axios.delete(`http://localhost:8080/comment/${commentId}`).then(() => {
    router.go(0);
  });
};

const formatCreatedAt = (create_at) => {
  const date = new Date(create_at);
  const currentDate = new Date();
  const timeDifference = currentDate.getTime() - date.getTime();
  const seconds = Math.floor(timeDifference / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  if (days > 0) {
    return `${days}일 전`;
  } else if (hours > 0) {
    return `${hours}시간 전`;
  } else {
    return `${minutes}분 전`;
  }
};

onMounted(() => {
  getCommentList();
});
</script>

<style scoped>
  .container1{
    padding: 0px;
    width: 100%;
  }
  .table{
    width: 100%;
    display: flex;
    flex-direction: column;
  }
  .comment{
    margin: 10px 15px 10px 15px;
    display: flex;
    flex-direction: column;
    justify-content: start;
    gap : 7px;
  }
  .user{
    font-weight: 700;
  }
  .contents{

  }
  .createdAt{
    color : gray;
    font-size : 12px;
  }.Line{
    width: 100%;
    height: 0px;
    border-top: 0.1px rgba(155, 155, 155, 0.164) solid;
    margin-bottom: 10px;
  }
  .commentContainer{
    display: flex;
    justify-content:space-between;
    align-items: center;
  }
</style>

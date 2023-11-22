<template>
  <div class="container">
    
  </div>
</template>

<script setup>
import { useRoute, useRouter } from "vue-router";
import { computed, ref, onMounted } from "vue";
import { useAuthStore } from "../../stores/pinia";
import axios from "axios";

const route = useRoute();
const router = useRouter();
const REST_COMMENT_API = `http://localhost:8080/comment`;

const commentList = ref([]);
const user = useAuthStore().$state.user;
const isLoggedIn = computed(() => !!user);

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
  .container{
    padding: 0px;
    width: 100%;
  }
  .table{
    width: 100%;
    display: flex;
    flex-direction: column;
  }
</style>

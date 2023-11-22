<template>
    <div class="InputContainer">
      <input
        type="text"
        v-model="commentContent"
        class="commentInput"
      />
      <CustomButton text="등록" height="50" @click="createComment"/>
      
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

const commentContent = ref("");
const userStore = useAuthStore().$state;

const createComment = () => {
  const comment = {
    content: commentContent.value,
    user_id: userStore.user.id,
    board_id: `${route.params.id}`,
  };
  axios({
    url: `${REST_COMMENT_API}`,
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    data: comment,
  })
    .then(() => {
      console.log(comment);
      window.location.reload();
    })
    .catch((err) => {
      console.log(err);
    });
};
</script>

<style scoped>
  .commentInput{
    border : 1px solid rgba(165, 165, 165, 0.486);
  }
  .InputContainer{
    margin : 10px;
    width: 100%;
    
    display: flex;
    align-items: center;
    justify-content: space-evenly;
  }
  .commentInput{
    width: 85%;
    height: 50px;
    border-radius: 5px;
  }
</style>

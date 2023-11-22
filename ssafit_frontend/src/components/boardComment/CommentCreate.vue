<template>
  <div>
    <fieldset class="text-center">
      <label for="commentContent">댓글</label>
      <input
        type="text"
        id="commentContent"
        v-model="commentContent"
        class="view"
        style="width: 70%"
      />
      <button class="btn-sm" style="margin-left: 30px" @click="createComment">
        등록
      </button>
    </fieldset>
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

<style scoped></style>

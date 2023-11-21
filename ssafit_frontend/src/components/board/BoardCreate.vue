<template>
  <div>
    <h4>게시글 작성</h4>
    <fieldset>
      <legend>등록</legend>
      <div>
        <label for="title">제목 : </label>
        <input type="text" id="title" v-model="board.title" />
      </div>
      <div>
        <label for="writer">작성자 : </label>
        <input
          readonly
          type="text"
          id="name"
          v-model="user.name"
          class="view"
        />
      </div>
      <div>
        <label for="writer">URL : </label>
        <input type="text" id="url" v-model="board.url" />
      </div>
      <div>
        <label for="contents">내용 : </label>
        <textarea
          id="contents"
          cols="30"
          rows="10"
          v-model="board.contents"
        ></textarea>
      </div>
      <div>
        <button @click="createBoard">등록</button>
      </div>
    </fieldset>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useBoardStore } from "@/stores/board";

const user = useAuthStore().user;
const store = useBoardStore();
const board = ref({
  title: "",
  contents: "",
  url: "",
});

const createBoard = function () {
  store.createBoard(board.value);
};
</script>

<style scoped></style>

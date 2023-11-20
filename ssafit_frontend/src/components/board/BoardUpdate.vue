<template>
  <div>
    <h4>게시글 수정</h4>
    <fieldset>
      <legend>등록</legend>
      <div>
        <label for="title">제목 : </label>
        <input
          style="width: 50%"
          type="text"
          id="title"
          v-model="store.board.title"
        />
      </div>
      <div>
        <label for="writer">작성자 : </label>
        <input
          type="text"
          id="writer"
          readonly
          v-model="store.board.user.name"
        />
      </div>
      <div>
        <label for="writer">URL : </label>
        <input
          style="width: 50%"
          type="text"
          id="writer"
          readonly
          v-model="store.board.url"
        />
      </div>
      <div>
        <label for="contents">내용 : </label>
        <textarea
          id="contents"
          style="width: 50%"
          rows="10"
          v-model="store.board.contents"
        ></textarea>
      </div>
      <div>
        <button @click="updateBoard">수정</button>
      </div>
    </fieldset>
  </div>
</template>

<script setup>
import { useBoardStore } from "@/stores/board";
import { useRoute } from "vue-router";
import { onMounted } from "vue";
const store = useBoardStore();
const route = useRoute();

const updateBoard = function () {
  console.log(route.params.id, store.board);
  store.updateBoard(route.params.id, store.board);
};

onMounted(() => {
  store.getBoard(route.params.id);
});
</script>

<style scoped></style>

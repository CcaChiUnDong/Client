<template>
  <div class="container">
    <div class="con">
      <div class="text-center">
        <h3 class="title">게시글 작성</h3>
        <label for="title">제목</label>
        <input type="text" id="title" v-model="board.title" class="view" />
        <label for="writer">작성자</label>
        <input
          readonly
          type="text"
          id="name"
          v-model="user.name"
          class="view writer"
        />
        <label for="writer">URL</label>
        <input type="text" id="url" v-model="board.url" class="view" />
        <label for="contents">내용</label>
        <textarea
          id="contents"
          cols="30"
          rows="10"
          v-model="board.contents"
          class="view"
        ></textarea>
      </div>
      <div class="regist-container">
        <CustomButton @click="createBoard" text="등록" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useBoardStore } from "@/stores/board";
import { useAuthStore } from "../../stores/pinia";
import { globalColor } from "../../global/rootColor";
import CustomButton from "../../elements/CustomButton.vue";

const color = ref(globalColor.primaryColorTiffanyBlue);
const colors = globalColor;
const primaryColor = globalColor.primaryColor;
const primaryColorBabyBlue = globalColor.primaryColorBabyBlue;

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

<style scoped>
.container {
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 5px;
}
.text-center {
  display: flex;
  width: 100%;
  flex-direction: column;
  justify-content: center;
}
.con {
  width: 60%;
  padding: 30px;
  border: 1px v-bind(color) solid;
  border-radius: 10px;
}

.regist-container {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
}

.title {
  display: flex;
  flex-direction: column;
  align-items: center;
  color: v-bind(primaryColor);
}

.view {
  padding: 12px 20px;
  margin: 8px 0;
  display: inline-block;
  border: 1px solid v-bind(primaryColorBabyBlue);
  border-radius: 4px;
  box-sizing: border-box;
  color: #787878;
  font-size: medium;
}
</style>

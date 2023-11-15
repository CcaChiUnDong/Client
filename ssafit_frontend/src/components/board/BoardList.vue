<template>
  <div>
    <h4>게시글 목록</h4>
    <hr />
    <table>
      <tr>
        <th>번호</th>
        <th>제목</th>
        <th>작성자</th>
        <th>조회수</th>
        <th>등록일</th>
      </tr>
      <tr v-for="board in store.boardList" :key="board.no">
        <td>{{ board.no }}</td>
        <td>
          <RouterLink :to="`/board/${board.no}`">{{ board.title }}</RouterLink>
        </td>
        <td>{{ board.type }}</td>
        <td>{{ board.memberNo }}</td>
        <td>{{ board.createdTime }}</td>
      </tr>
    </table>
    <hr />
    <br />
    <BoardSearchInput />
  </div>
</template>

<script setup>
import { useBoardStore } from "@/stores/board";
import { onMounted } from "vue";
import BoardSearchInput from "./BoardSearchInput.vue";
const store = useBoardStore();
console.log(store.boardList.list);
onMounted(() => {
  store.getBoardList();
});
</script>

<style scoped></style>

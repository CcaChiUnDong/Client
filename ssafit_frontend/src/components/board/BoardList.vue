<template>
  <div>
    <h4>게시글 목록</h4>
    <hr />
    <table>
      <tr>
        <th>번호</th>
        <th>제목</th>
        <th>내용</th>
        <th>작성자</th>
        <th>등록일</th>
      </tr>
      <tr v-for="board in store.boardList" :key="board.id">
        <td>{{ board.id }}</td>
        <td>
          <RouterLink :to="`/board/${board.id}`">{{ board.title }}</RouterLink>
        </td>
        <td>
          {{ board.contents.slice(0, 15)
          }}{{ board.contents.length > 15 ? "..." : "" }} ({{
            board.comment_count
          }})
        </td>
        <td>{{ board.user.name }}</td>
        <td>{{ formatCreatedAt(board.createdAt) }}</td>
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

const formatCreatedAt = (createdAt) => {
  const date = new Date(createdAt);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  const hours = String(date.getHours()).padStart(2, "0");

  return `${year}/${month}/${day} ${hours}시`;
};

onMounted(() => {
  store.getBoardList();
});
</script>

<style scoped></style>

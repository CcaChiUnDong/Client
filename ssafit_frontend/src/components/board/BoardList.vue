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

const formatCreatedAt = (createAt) => {
  const date = new Date(createAt);
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
  store.getBoardList();
});
</script>

<style scoped></style>

<template>
  <div>
    <table class="custom-table">
      <tr>
        <th>번호</th>
        <th>제목</th>
        <th>내용</th>
        <th>작성자</th>
        <th>등록일</th>
        <th>조회수</th>
      </tr>
      <tr v-for="board in store.boardList" :key="board.id">
        <td style="text-align: center">{{ board.id }}</td>
        <td>
          <RouterLink :to="`/board/${board.id}`" style="text-decoration: none"
            >{{ board.title }} ({{ board.comment_count }})</RouterLink
          >
        </td>
        <td>
          {{ board.contents.slice(0, 25)
          }}{{ board.contents.length > 25 ? "..." : "" }}
        </td>
        <td style="text-align: center">{{ board.user.name }}</td>
        <td style="text-align: center">
          {{ formatCreatedAt(board.createdAt) }}
        </td>
        <td style="text-align: center">{{ board.visited }}</td>
      </tr>
    </table>
    <p>add pagination</p>
    <hr />
    <div>
      <RouterLink
        :to="{ name: 'boardCreate' }"
        style="text-decoration: none"
        v-if="authStore.user"
        >게시글 작성</RouterLink
      >
    </div>
    <br />
    <BoardSearchInput />
  </div>
</template>

<script setup>
import { useBoardStore } from "@/stores/board";
import { useAuthStore } from "../../stores/pinia";
import { ref, onMounted } from "vue";
import BoardSearchInput from "./BoardSearchInput.vue";
import { globalColor } from "../../global/rootColor";

const colors = ref(globalColor);
const authStore = useAuthStore();
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
  store.searchBoardList();
});
</script>

<style scoped>
.custom-table {
  width: 80vw;
  border-collapse: collapse;
  margin: 20px auto; /* Center the table */
}

.custom-table th,
.custom-table td {
  border: 1px solid #ddd;
  padding: 8px;
  text-align: left;
}

.custom-table th {
  background-color: v-bind(colors.primaryColorBabyBlue);
  text-align: center;
}
</style>

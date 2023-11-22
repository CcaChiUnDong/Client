<template>
  <div>
    <table class="custom-table">
      <tr>
        <th style="width: 7%">번호</th>
        <th style="width: 25%">제목</th>
        <th style="width: 35%">내용</th>
        <th style="width: 13%">작성자</th>
        <th style="width: 10%">등록일</th>
        <th style="width: 10%">조회수</th>
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
    <div class="pagination-container">
      <CustomButton
        @click="changePage(-1)"
        v-if="currentPage > 1"
        text="이전"
      />
      <span>{{ currentPage }} 페이지</span>
      <CustomButton
        @click="changePage(1)"
        v-if="currentPage * pageSize < store.totalBoard"
        text="다음"
      />
    </div>
    <hr />
    <div class="pagination-container">
      <CustomButton
        style="width: 30%"
        v-if="!!authStore.user.id"
        text="글 작성"
        @click="goToBoardCreate"
      />
    </div>
    <br />
    <BoardSearchInput
      :searchCondition="store.searchCondition"
      @search="performSearch"
    />
  </div>
</template>

<script setup>
import { useBoardStore } from "@/stores/board";
import { useAuthStore } from "../../stores/pinia";
import { ref, onMounted } from "vue";
import BoardSearchInput from "./BoardSearchInput.vue";
import { globalColor } from "../../global/rootColor";
import axios from "axios";
import CustomButton from "../../elements/CustomButton.vue";
import { useRouter } from "vue-router";

const colors = ref(globalColor);
const authStore = useAuthStore();
const store = useBoardStore();
const router = useRouter();

const goToBoardCreate = () => {
  router.push({ name: "boardCreate" });
};

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
let currentPage = store.currentPage;
const pageSize = 10; // 페이지당 아이템 수

// 검색 및 페이징 로직
const performSearch = () => {
  store.setPage("1"); // 검색이 새로 시작되면 페이지를 1로 초기화
  fetchBoardList();
};

const changePage = (delta) => {
  store.setPage(currentPage + delta);
  currentPage = currentPage + delta;
  fetchBoardList();
};

const fetchBoardList = () => {
  const objectStartNum = (currentPage - 1) * pageSize;
  const objectEndNum = 10;
  const newSearchCondition = {
    ...store.searchCondition,
  };
  newSearchCondition.objectStartNum = objectStartNum;
  store.setCondition(newSearchCondition);
  store.searchBoardList(); // store의 searchBoardList 액션 호출
};

// 컴포넌트가 마운트되면 초기 검색 수행
onMounted(() => {
  fetchBoardList();
  store.setTotalPage();
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

.pagination-container {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
}

span {
  margin: 0 10px;
  font-weight: bold;
}
</style>

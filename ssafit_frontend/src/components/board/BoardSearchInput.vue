<template>
  <div class="search-form">
    <div class="form-group">
      <label>검색 기준 :</label>
      <select v-model="searchInfo.key">
        <option value="none">없음</option>
        <option value="user_id">작성자</option>
        <option value="title">제목</option>
        <option value="contents">내용</option>
      </select>
    </div>
    <div class="form-group">
      <label>검색 내용 :</label>
      <input type="text" v-model="searchInfo.word" />
    </div>
    <div class="form-group">
      <label>정렬 기준 :</label>
      <select v-model="searchInfo.orderBy">
        <option value="none">없음</option>
        <option value="title">제목</option>
        <option value="visited">조회수</option>
        <option value="comment_count">댓글수</option>
        <option value="created_at">등록/수정일</option>
      </select>
    </div>
    <div class="form-group">
      <label>정렬 방향 :</label>
      <select v-model="searchInfo.orderByDir">
        <option value="asc">오름차순</option>
        <option value="desc">내림차순</option>
      </select>
    </div>
    <div class="form-group">
      <CustomButton text="검색" @click="searchBoardList" />
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useBoardStore } from "@/stores/board";
import CustomButton from "../../elements/CustomButton.vue";
import { globalColor } from "../../global/rootColor";

const colors = ref(globalColor);

const store = useBoardStore();

const searchInfo = ref({
  key: "none",
  word: "",
  orderBy: "none",
  orderByDir: "asc",
});

const searchBoardList = () => {
  const objectStartNum = 0;
  const objectEndNum = 10;
  const newSearchCondition = {
    ...searchInfo.value,
    objectStartNum,
    objectEndNum,
  };

  store.setCondition(newSearchCondition);
  store.searchBoardList(); // store의 searchBoardList 액션 호출
};
</script>
<style scoped>
.search-form {
  margin: 20px;
  padding: 15px;
  border: 1px solid #ddd;
  border-radius: 5px;
  background-color: v-bind(colors.primaryColorBabyBlue);
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
}

.form-group {
  margin-bottom: 10px;
}

label {
  display: inline-block;
  width: 80px;
  text-align: right;
  margin-right: 10px;
}

input,
select {
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 3px;
  width: 150px;
}

button {
  padding: 10px;
  background-color: #4caf50;
  color: white;
  border: none;
  border-radius: 3px;
  cursor: pointer;
}

button:hover {
  background-color: #45a049;
}
</style>

import { ref, computed } from "vue";
import { defineStore } from "pinia";
import router from "@/router";
import axios from "axios";
import { useAuthStore } from "./pinia";

const REST_BOARD_API = `http://localhost:8080/board`;

export const useBoardStore = defineStore("board", () => {
  //게시글 전체
  const boardList = ref([]);
  const getBoardList = function () {
    axios.get(REST_BOARD_API).then((response) => {
      console.log(response.data);
      boardList.value = response.data;
    });
  };

  //게시글 조회수 상위 3개
  const top3BoardList = ref([]);
  const getTop3BoardList = function () {
    axios.get(`${REST_BOARD_API}/top3`).then((response) => {
      console.log(response.data);
      top3BoardList.value = response.data;
    });
  };

  //게시글 한개
  const board = ref({ user: {} });
  const getBoard = function (id) {
    axios.get(`${REST_BOARD_API}/${id}`).then((response) => {
      console.log(response.data);
      board.value = response.data;
    });
  };

  //게시글 등록
  const createBoard = function (board) {
    const currentUser = useAuthStore().user;
    console.log(currentUser.id);
    const boardWithUser = {
      ...board,
      user_id: currentUser.id,
    };

    axios({
      url: `${REST_BOARD_API}`,
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      data: boardWithUser,
    })
      .then(() => {
        console.log(boardWithUser);
        router.push({ name: "boardList" });
      })
      .catch((err) => {
        console.log(boardWithUser);
        console.log(err);
      });
  };

  const updateBoard = function (id, board) {
    const newBoard = {
      id: board.id,
      user_id: board.userId,
      title: board.title,
      contents: board.contents,
      url: board.url,
    };
    axios({
      url: `${REST_BOARD_API}/${id}`,
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      data: newBoard,
    })
      .then(() => {
        router.push({ name: "boardList" });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const searchBoardList = function (searchCondition) {
    axios.post(`${REST_BOARD_API}/search`, searchCondition).then((res) => {
      boardList.value = res.data;
      console.log(searchCondition);
      console.log(boardList.value);
    });
  };

  return {
    boardList,
    getBoardList,
    top3BoardList,
    getTop3BoardList,
    board,
    getBoard,
    createBoard,
    updateBoard,
    searchBoardList,
  };
});

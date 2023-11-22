import { ref, computed } from "vue";
import { defineStore } from "pinia";
import router from "@/router";
import axios from "axios";
import config from "@/apiKey";

const REST_BOARD_API = `http://localhost:8080/board`;
const apiKey = config.apiKey;

export const useBoardStore = defineStore("board", () => {
  //게시글 전체
  const boardList = ref([]);
  const getBoardList = function () {
    axios.get(REST_BOARD_API).then((response) => {
      boardList.value = response.data;
    });
  };

  //게시글 조회수 상위 3개
  const top3BoardList = ref([]);
  const getTop3BoardList = async function () {
    top3BoardList.value = (await axios.get(`${REST_BOARD_API}/top3`)).data;
    let count = 0;
    // console.log(top3BoardList.value);
    top3BoardList.value.forEach(async (v, i) => {
      const videoId = isYouTubeVideoId(v.url)
        ? v.url
        : extractYouTubeVideoId(v.url);

      const response = fetch(
        `https://www.googleapis.com/youtube/v3/videos?part=snippet&id=${videoId}&key=${apiKey}`
      ).then(async (res) => {
        const data = await res.json();
        if (data.items && data.items.length > 0 && data.items[0].snippet) {
          const videoInfo = data.items[0].snippet;
          top3BoardList.value[i] = {
            ...top3BoardList.value[i],
            videoId: videoId,
            videoTitle: videoInfo.title,
            description: videoInfo.description,
            thumbnail: videoInfo.thumbnails.default.url,
          };
        } else {
          console.error(`Invalid response data for video ID: ${videoId}`);
          return null;
        }
      });
    });

    // console.log(top3BoardList.value);
  };

  const extractYouTubeVideoId = (url) => {
    const videoIdMatch = url.match(
      /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/
    );

    return videoIdMatch ? videoIdMatch[1] : null;
  };
  const isYouTubeVideoId = (input) => /^[a-zA-Z0-9_-]{11}$/.test(input);

  //게시글 한개
  const board = ref({ user: {} });
  const getBoard = async function (id) {
    const response = await axios.get(`${REST_BOARD_API}/${id}`);
    board.value = { ...response.data };
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

  const searchBoardList = function (searchCondition = {key: 'none', word: '', orderBy: 'none', orderByDir: 'asc'}) {
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

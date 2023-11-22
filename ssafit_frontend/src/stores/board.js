import { ref } from "vue";
import { defineStore } from "pinia";
import { useAuthStore } from "./pinia";
import { useYoutubeStore } from "./youtube";
import axios from "axios";
import router from "@/router";
import config from "@/apiKey";

const REST_BOARD_API = `http://localhost:8080/board`;
const apiKey = config.apiKey;

export const useBoardStore = defineStore({
  id: "board",
  state: () => ({
    boardList: [],
    top3BoardList: [],
    board: { user: {} },
    searchCondition: {
      key: "none",
      word: "",
      orderBy: "none",
      orderByDir: "asc",
      objectStartNum: "",
      objectEndNum: "10",
    },
    currentPage: 1,
    totalBoard: 1,
  }),

  actions: {
    async getBoardList() {
      const response = await axios.get(REST_BOARD_API);
      this.boardList = response.data;
    },

    setPage(delta) {
      this.currentPage = delta;
    },

    async setTotalPage() {
      //검색 조건을 끼워넣은 count 반환하도록 수정
      const response = await axios.get(`${REST_BOARD_API}/count`);
      this.totalBoard = response.data;
      console.log(this.totalBoard);
    },

    async getTop3BoardList() {
      const extractYouTubeVideoId = (url) => {
        const videoIdMatch = url.match(
          /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/
        );
        return videoIdMatch ? videoIdMatch[1] : null;
      };

      const isYouTubeVideoId = (input) => /^[a-zA-Z0-9_-]{11}$/.test(input);

      const response = await axios.get(`${REST_BOARD_API}/top3`);
      this.top3BoardList = response.data;
      this.top3BoardList.forEach(async (v, i) => {
        const videoId = isYouTubeVideoId(v.url)
          ? v.url
          : extractYouTubeVideoId(v.url);

        const response = await fetch(
          `https://www.googleapis.com/youtube/v3/videos?part=snippet&id=${videoId}&key=${apiKey}`
        );
        const data = await response.json();

        if (data.items && data.items.length > 0 && data.items[0].snippet) {
          const videoInfo = data.items[0].snippet;
          this.top3BoardList[i] = {
            ...this.top3BoardList[i],
            videoId: videoId,
            videoTitle: videoInfo.title,
            description: videoInfo.description,
            thumbnail: videoInfo.thumbnails.default.url,
          };
        } else {
          console.error(`Invalid response data for video ID: ${videoId}`);
        }
      });
    },

    async getBoard(id) {
      const response = await axios.get(`${REST_BOARD_API}/${id}`);
      this.board = { ...response.data };
    },

    async createBoard(board) {
      const currentUser = useAuthStore().user;
      const boardWithUser = {
        ...board,
        user_id: currentUser.id,
      };

      try {
        await axios.post(`${REST_BOARD_API}`, boardWithUser, {
          headers: { "Content-Type": "application/json" },
        });

        router.push({ name: "boardList" });
      } catch (err) {
        console.log(err);
      }
    },

    async updateBoard(id, board) {
      const newBoard = {
        id: board.id,
        user_id: board.userId,
        title: board.title,
        contents: board.contents,
        url: board.url,
      };

      try {
        await axios.patch(`${REST_BOARD_API}/${id}`, newBoard, {
          headers: { "Content-Type": "application/json" },
        });

        router.push({ name: "boardList" });
      } catch (err) {
        console.log(err);
      }
    },

    setCondition(newSearchCondition) {
      this.searchCondition = newSearchCondition;
      // console.log(this.searchCondition);
    },

    async searchBoardList() {
      // console.log(this.searchCondition);
      this.setTotalPage();
      try {
        const response = await axios.post(
          `${REST_BOARD_API}/search`,
          this.searchCondition,
          {
            headers: { "Content-Type": "application/json" },
          }
        );

        this.boardList = response.data;
      } catch (err) {
        console.log(err);
      }
    },
  },
});

import axios from 'axios';

const BOARDCOMMENT_API_BASE_URL = "http://localhost:8080/api/boardComment";

class BoardCommentService {
    createBoardComment(boardComment) {
        return axios.post(BOARDCOMMENT_API_BASE_URL, boardComment);
    }

    getBoardCommentsWithBoardNo(BoardNo) {
        return axios.get(BOARDCOMMENT_API_BASE_URL + "/" + BoardNo);
    }

    deleteBoardComment(no) {
        return axios.delete(BOARDCOMMENT_API_BASE_URL + "/" + no);
    }
}

let boardCommentService = new BoardCommentService;
export default boardCommentService;
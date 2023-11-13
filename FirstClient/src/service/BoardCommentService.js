import instance from '../utils/axios';

class BoardCommentService {
    async createBoardComment(boardComment) {
        const res = await instance({
            method : "post",
            url : `/api/boardComment`,
            data : {...boardComment},
            headers : {
                "Content-Type": "application/json;charset-UTF-8"
            }
        })
        return res;
    }

    async getBoardCommentsWithBoardNo(boardNo) {
        const res = await instance({
            method : "get",
            url : `/api/boardComment/${boardNo}`,
            data : {},
            headers : {
                "Content-Type": "application/json;charset-UTF-8"
            }
        })
        return res;
    }

    async deleteBoardComment(no) {
        const res = await instance({
            method : "delete",
            url : `/api/boardComment/${no}`,
            data : {},
            headers : {
                "Content-Type": "application/json;charset-UTF-8"
            }
        })
        return res;
    }
    
}

let boardCommentService = new BoardCommentService();
export default boardCommentService;
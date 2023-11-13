import instance from '../utils/axios';

class BoardService {

    async getBoards(p_num) {
        const res = await instance({
            method : "get",
            url : `/api/board?p_num=${p_num}`,
            data : {},
            headers : {
                "Content-Type": "application/json;charset-UTF-8"
            }
        })
        return res;
    }
    
    async createBoard(board) {
        const res = await instance({
            method : "post",
            url : `/api/board`,
            data : {...board},
            headers : {
                "Content-Type": "application/json;charset-UTF-8"
            }
        })
        return res;
    }

    async getOneBoard(no) {
        const res = await instance({
            method : "get",
            url : `/api/board/${no}`,
            data : {},
            headers : {
                "Content-Type": "application/json;charset-UTF-8"
            }
        })
        return res;
    }
    
    async updateBoard(no, board) {
        const res = await instance({
            method : "put",
            url : `/api/board/${no}`,
            data : {...board},
            headers : {
                "Content-Type": "application/json;charset-UTF-8"
            }
        })
        return res;
    }

    async deleteBoard(no) {
        const res = await instance({
            method : "delete",
            url : `/api/board/${no}`,
            data : {},
            headers : {
                "Content-Type": "application/json;charset-UTF-8"
            }
        })
        return res;
    }
}

let boardService = new BoardService();
export default boardService;
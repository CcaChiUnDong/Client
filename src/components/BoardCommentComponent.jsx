import React, {useState, useEffect} from 'react';
import BoardCommentService from '../service/BoardCommentService';
import {useNavigate, useParams} from 'react-router-dom';
import BoardService from "../service/BoardService";

function BoardCommentComponent() {
    const navigate = useNavigate();
    const {no} = useParams();
    const [state, setState] = useState({
        comments: [],
    });

    useEffect(() => {
        listBoardComments(no);
    }, [no]);


    const listBoardComments = (boardNo) => {
        BoardCommentService.getBoardCommentsWithBoardNo(boardNo).then((res) => {
            if (!res.data) return;
            const formattedBoardComments = res.data.list.map((boardComment) => ({
                ...boardComment,
                createdTime: boardComment.createdTime
                    ? new Date(boardComment.createdTime).toLocaleString('ko-KR', {
                        year: 'numeric',
                        month: '2-digit',
                        day: '2-digit',
                        hour: '2-digit',
                        minute: '2-digit',
                    })
                    : null,
            }));
            setState({
                comments: formattedBoardComments,
            });
        }).catch((err) => {
            console.log(err)
        });
    };

    const [newComment, setComment] = useState({
        boardNo: no,
        comment: '',
        createTime: '',
        userId: '',
        no: state.no,
    });

    const changeCommentHandler = (event) => {
        setComment({...newComment, comment: event.target.value});
    };

    const changeUserIdHandler = (event) => {
        setComment({...newComment, userId: event.target.value});
    };

    const createBoardComment = (event) => {
        event.preventDefault();
        let boardComment = {
            comment: newComment.comment,
            userId: newComment.userId,
            boardNo: no,
        };
        console.log("board => " + JSON.stringify(boardComment));
        BoardCommentService.createBoardComment(boardComment).then(() => {
            window.location.reload();
        });
    };

    const deleteBoardComment = async function (commentNo) {
        if (window.confirm("정말로 글을 삭제하시겠습니까?\n삭제된 글은 복구 할 수 없습니다.")) {
            BoardCommentService.deleteBoardComment(commentNo).then((res) => {
                if (res.status === 200) {
                    listBoardComments(no);
                    window.location.reload();
                } else {
                    alert("글 삭제가 실패했습니다.");
                }
            });
        }
    };

    return (
        <div className="card col-md-10 offset-md-1">
            <div className="card-body">
                <table className="table table-striped table-bordered">
                    <thead>
                    <tr>
                        <th>작성자</th>
                        <th>댓글</th>
                        <th>작성일</th>
                    </tr>
                    </thead>
                    <tbody>
                    {
                        state.comments.map(
                            comment =>
                                <tr key={comment.no}>
                                    <td> {comment.userId} </td>
                                    <td> {comment.comment} </td>
                                    <td> {comment.createdTime} </td>
                                    <td> <button className="btn btn-success" onClick={() => deleteBoardComment(comment.no)}>
                                        삭제
                                    </button></td>
                                </tr>
                        )
                    }
                    </tbody>
                </table>
                <form>
                    <div className="form-group">
                        <label> MemberNo </label>
                        <input
                            placeholder="userId"
                            name="userId"
                            className="form-control"
                            value={newComment.userId}
                            onChange={changeUserIdHandler}
                        />
                    </div>
                    <div className="form-group">
                        <label> Contents </label>
                        <textarea
                            placeholder="contents"
                            name="contents"
                            className="form-control"
                            value={state.contents}
                            onChange={changeCommentHandler}
                        />
                    </div>
                    <button className="btn btn-success" onClick={createBoardComment}>
                        등록
                    </button>
                </form>
            </div>
        </div>
    );
}

export default BoardCommentComponent;
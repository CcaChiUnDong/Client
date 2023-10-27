import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import BoardService from '../service/BoardService';
import BoardCommentComponent from "./BoardCommentComponent";

function ReadBoardComponent() {
    const { no } = useParams();
    const navigate = useNavigate();
    const [board, setBoard] = useState({});

    useEffect(() => {
        BoardService.getOneBoard(no).then((res) => {
            setBoard(res.data);
        });
    }, [no]);

    const returnBoardType = (typeNo) => {
        let type = null;
        if (typeNo === 1) {
            type = "자유게시판";
        } else if (typeNo === 2) {
            type = "질문과 답변 게시판";
        } else {
            type = "타입 미지정";
        }

        return (
            <div className="row">
                <label> Board Type : {type}</label>
            </div>
        );
    };

    const returnDate = (cTime, uTime) => {
        const formatTime = (time) => {
            if (time) {
                return new Date(time).toLocaleString('ko-KR', {
                    year: 'numeric',
                    month: '2-digit',
                    day: '2-digit',
                    hour: '2-digit',
                    minute: '2-digit',
                });
            } else {
                return 'N/A'; // 혹은 다른 원하는 메시지
            }
        };

        return (
            <div className="row">
                <label>
                    생성일 : [ {formatTime(cTime)} ] / 최종 수정일 : [ {formatTime(uTime)} ]
                </label>
            </div>
        );
    };


    const goToList = () => {
        navigate('/board');
    };

    const goToUpdate = () => {
        navigate(`/create-board/${no}`);
    };

    const deleteView = async function () {
        if (window.confirm("정말로 글을 삭제하시겠습니까?\n삭제된 글은 복구 할 수 없습니다.")) {
            BoardService.deleteBoard(no).then((res) => {
                if (res.status === 200) {
                    navigate('/board');
                } else {
                    alert("글 삭제가 실패했습니다.");
                }
            });
        }
    };

    return (
        <div>
            <div className="card col-md-10 offset-md-1">
                <h3 className="text-center"> Read Detail</h3>
                <div className="card-body"> {returnBoardType(board.type)}
                    <div className="row">
                        <label> Title : {board.title}</label>
                    </div>
                    <div className="row">
                        <label> Contents : </label><br></br>
                        <textarea value={board.contents} readOnly />
                    </div>
                    <div className="row">
                        <label> MemberNo : {board.memberNo}</label>
                    </div>
                    {returnDate(board.createdTime, board.updatedTime)}

                    <button className="btn btn-primary" onClick={goToList} style={{ marginLeft: "10px" }}>
                        목록
                    </button>
                    <button className="btn btn-info" onClick={goToUpdate} style={{ marginLeft: "10px" }}>
                        수정
                    </button>
                    <button className="btn btn-danger" onClick={deleteView} style={{ marginLeft: "10px" }}>
                        삭제
                    </button>
                </div>
            </div>
            <div><BoardCommentComponent/></div>
        </div>
    );
}

export default ReadBoardComponent;

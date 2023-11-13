import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import BoardService from '../service/BoardService';

function CreateBoardComponent() {
    const { no } = useParams();
    const navigate = useNavigate();
    const [state, setState] = useState({
        no: no,
        type: '',
        title: '',
        contents: '',
        memberNo: '',
    });

    const changeTypeHandler = (event) => {
        setState({ ...state, type: event.target.value });
    };

    const changeTitleHandler = (event) => {
        setState({ ...state, title: event.target.value });
    };

    const changeContentsHandler = (event) => {
        setState({ ...state, contents: event.target.value });
    };

    const changeMemberNoHandler = (event) => {
        setState({ ...state, memberNo: event.target.value });
    };

    const createBoard = (event) => {
        event.preventDefault();
        let board = {
            type: state.type,
            title: state.title,
            contents: state.contents,
            memberNo: state.memberNo,
        };
        console.log("board => " + JSON.stringify(board));
        if (state.no === '_create') {
            BoardService.createBoard(board).then(() => {
                navigate('/board');
            });
        } else {
            BoardService.updateBoard(state.no, board).then(() => {
                navigate(`/read-board/${no}`);
            });
        }
    };

    const cancel = () => {
        navigate('/board');
    };

    const getTitle = () => {
        if (state.no === '_create') {
            return <h3 className="text-center">새글을 작성해주세요</h3>;
        } else {
            return <h3 className="text-center">{state.no}글을 수정 합니다.</h3>;
        }
    };

    useEffect(() => {
        if (state.no === '_create') {
            return;
        } else {
            BoardService.getOneBoard(state.no).then((res) => {
                let board = res.data;
                console.log("board => " + JSON.stringify(board));

                setState({
                    ...state,
                    type: board.type,
                    title: board.title,
                    contents: board.contents,
                    memberNo: board.memberNo,
                });
            });
        }
    }, [state.no]);

    return (
        <div>
            <div className="container">
                <div className="row">
                    <div className="card col-md-6 offset-md-3 offset-md-3">
                        {getTitle()}
                        <div className="card-body">
                            <form>
                                <div className="form-group">
                                    <label> Type </label>
                                    <select
                                        placeholder="type"
                                        name="type"
                                        className="form-control"
                                        value={state.type}
                                        onChange={changeTypeHandler}
                                    >
                                        <option value="1">자유게시판</option>
                                        <option value="2">질문과 답변</option>
                                    </select>
                                </div>
                                <div className="form-group">
                                    <label> Title </label>
                                    <input
                                        type="text"
                                        placeholder="title"
                                        name="title"
                                        className="form-control"
                                        value={state.title}
                                        onChange={changeTitleHandler}
                                    />
                                </div>
                                <div className="form-group">
                                    <label> Contents </label>
                                    <textarea
                                        placeholder="contents"
                                        name="contents"
                                        className="form-control"
                                        value={state.contents}
                                        onChange={changeContentsHandler}
                                    />
                                </div>
                                <div className="form-group">
                                    <label> MemberNo </label>
                                    <input
                                        placeholder="memberNo"
                                        name="memberNo"
                                        className="form-control"
                                        value={state.memberNo}
                                        onChange={changeMemberNoHandler}
                                    />
                                </div>
                                <button className="btn btn-success" onClick={createBoard}>
                                    Save
                                </button>
                                <button
                                    className="btn btn-danger"
                                    onClick={cancel}
                                    style={{ marginLeft: "10px" }}
                                >
                                    Cancel
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CreateBoardComponent;

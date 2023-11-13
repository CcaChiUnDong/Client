import React, { useState, useEffect } from 'react';
import BoardService from '../service/BoardService';
import { useNavigate } from 'react-router-dom';

function ListBoardComponent() {
    const [state, setState] = useState({
        p_num: 1,
        paging: {},
        boards: [],
    });

    const navigate = useNavigate();

    useEffect(() => {
        listBoard(state.p_num);
    }, [state.p_num]);

    const createBoard = () => {
        navigate('/create-board/_create');
    };

    const readBoard = (no) => {
        navigate(`/read-board/${no}`);
    };

    const listBoard = (p_num) => {
        BoardService.getBoards(p_num).then((res) => {
            const formattedBoards = res.data.list.map((board) => ({
                ...board,
                createdTime: board.createdTime
                    ? new Date(board.createdTime).toLocaleString('ko-KR', {
                        year: 'numeric',
                        month: '2-digit',
                        day: '2-digit',
                        hour: '2-digit',
                        minute: '2-digit',
                    })
                    : null,
                updatedTime: board.updatedTime
                    ? new Date(board.updatedTime).toLocaleString('ko-KR', {
                        year: 'numeric',
                        month: '2-digit',
                        day: '2-digit',
                        hour: '2-digit',
                        minute: '2-digit',
                    })
                    : null,
            }));
            setState({
                p_num: res.data.pagingData.currentPageNum,
                paging: res.data.pagingData,
                boards: formattedBoards,
            });
        });
    };

    const viewPaging = () => {
        const pageNums = [];

        for (let i = state.paging.pageNumStart; i <= state.paging.pageNumEnd; i++) {
            pageNums.push(i);
        }

        return pageNums.map((page) => (
            <li className="page-item" key={page.toString()}>
                <a className="page-link" onClick={() => listBoard(page)}>
                    {page}
                </a>
            </li>
        ));
    };

    const isPagingPrev = () => {
        if (state.paging.prev) {
            return (
                <li className="page-item">
                    <a
                        className="page-link"
                        onClick={() => listBoard(state.paging.currentPageNum - 1)}
                        tabIndex="-1"
                    >
                        Previous
                    </a>
                </li>
            );
        }
    };

    const isPagingNext = () => {
        if (state.paging.next) {
            return (
                <li className="page-item">
                    <a
                        className="page-link"
                        onClick={() => listBoard(state.paging.currentPageNum + 1)}
                        tabIndex="-1"
                    >
                        Next
                    </a>
                </li>
            );
        }
    };

    const isMoveToFirstPage = () => {
        if (state.p_num !== 1) {
            return (
                <li className="page-item">
                    <a
                        className="page-link"
                        onClick={() => listBoard(1)}
                        tabIndex="-1"
                    >
                        Move to First Page
                    </a>
                </li>
            );
        }
    };

    const isMoveToLastPage = () => {
        if (state.p_num !== state.paging.pageNumCountTotal) {
            return (
                <li className="page-item">
                    <a
                        className="page-link"
                        onClick={() => listBoard(state.paging.pageNumCountTotal)}
                        tabIndex="-1"
                    >
                        LastPage({state.paging.pageNumCountTotal})
                    </a>
                </li>
            );
        }
    };

    return (
        <div>
            <h2 className="text-center">Boards List</h2>
            <div className="row">
                <table className="table table-striped table-bordered">
                    <thead>
                    <tr>
                        <th>글 번호</th>
                        <th>타이틀</th>
                        <th>작성자</th>
                        <th>작성일</th>
                        <th>갱신일</th>
                        <th>좋아요수</th>
                        <th>조회수</th>
                    </tr>
                    </thead>
                    <tbody>
                    {state.boards.map((board) => (
                        <tr key={board.no}>
                            <td> {board.no} </td>
                            <td>
                                <button
                                    onClick={() => readBoard(board.no)}
                                    className="link-button"
                                >
                                    {board.title}
                                </button>
                            </td>
                            <td> {board.memberNo} </td>
                            <td> {board.createdTime || 'N/A'} </td>
                            <td> {board.updatedTime || 'N/A'} </td>
                            <td> {board.likes} </td>
                            <td> {board.counts} </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
            <div className="row">
                <nav aria-label="Page navigation example">
                    <ul className="pagination justify-content-center">
                        {isMoveToFirstPage()}
                        {isPagingPrev()}
                        {viewPaging()}
                        {isPagingNext()}
                        {isMoveToLastPage()}
                    </ul>
                </nav>
                <button className="btn btn-primary" onClick={createBoard}>
                    글 작성
                </button>
            </div>
        </div>
    );
}

export default ListBoardComponent;

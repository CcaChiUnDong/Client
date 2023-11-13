import React from 'react';
import { useNavigate } from 'react-router-dom';

function MainComponent() {
    const navigate = useNavigate();

    const goToBoard = () => {
        navigate('/board');
    }


    return (
        <div>
            <button className="btn btn-primary" onClick={goToBoard} style={{width:"50%", height:"60vh"}}>
                게시판
            </button>
        </div>
    );
}

export default MainComponent;
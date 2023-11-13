import React from "react";
import { useNavigate } from "react-router-dom"; // useNavigate 훅 import
// import { useDispatch } from "react-redux";
import userService from "../service/UserService";

function 
LandingComponent() {
  // const dispatch = useDispatch();
  const navigate = useNavigate(); // useNavigate 훅을 사용하여 navigate 함수를 가져옵니다.

  const onClickHandler = () => {
    userService.logoutUser().then((res) => {
        console.log(res);
        if (res.payload.success) {
          navigate("/login"); // navigate 함수를 사용하여 페이지 이동
        } else {
          alert("로그아웃에 실패하였습니다");
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "right",
        alignItems: "right",
      }}
    >
      <a className="nav-link" onClick={onClickHandler}>LOGOUT</a>
    </div>
  );
}

export default LandingComponent;

import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // useNavigate 훅 import
// import { useDispatch } from "react-redux";
import UserService from "../service/UserService";

function LoginComponent() {
  const [UserId, setUserId] = useState("");
  const [Password, setPassword] = useState("");
  // const dispatch = useDispatch();
  const navigate = useNavigate();

  const onUserIdHandler = (event) => {
    setUserId(event.target.value);
  };
  const onPasswordHandler = (event) => {
    setPassword(event.target.value);
  };

  const onSubmitHandler = (event) => {
    event.preventDefault();
    const body = {
      userId: UserId,
      password: Password,
    };
    console.log("body => " + JSON.stringify(body));
    UserService.loginUser(body).then((res) => {

        console.log(res);
        if (res.payload.loginSuccess) {
          navigate("/");
        } else {
          alert(res.payload.message);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const navigateToRegist = () => {
    navigate("/register");
  }

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        height: "100vh",
      }}
    >
      <form
        onSubmit={onSubmitHandler}
        style={{ display: "flex", flexDirection: "column" }}
      >
        <label>UserId</label>
        <input type="text" value={UserId} onChange={onUserIdHandler} />
        <label>Password</label>
        <input type="password" value={Password} onChange={onPasswordHandler} />
        <br/>
        <button type="submit">Login</button>
        <button onClick={navigateToRegist}>회원가입</button>
      </form>
    </div>
  );
}

export default LoginComponent;

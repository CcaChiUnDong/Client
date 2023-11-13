import React, { useState } from "react";
// import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom"; // useNavigate를 추가
import UserService from "../service/UserService";

function RegisterComponent() {
  const [UserId, setUserId] = useState("");
  const [Email, setEmail] = useState("");
  const [Phone, setPhone] = useState("");
  const [Password, setPassword] = useState("");
  const [Name, setName] = useState("");
  const [ConfirmPasword, setConfirmPasword] = useState("");
  // const dispatch = useDispatch();
  const navigate = useNavigate();

  const onUserIdHandler = (event) => {
    setUserId(event.currentTarget.value);
  }

  const onEmailHandler = (event) => {
    setEmail(event.currentTarget.value);
  };

  const onNameHandler = (event) => {
    setName(event.currentTarget.value);
  };

  const onPasswordHanlder = (event) => {
    setPassword(event.currentTarget.value);
  };

  const onConfirmPasswordHandler = (event) => {
    setConfirmPasword(event.currentTarget.value);
  };

  const onPhoneHandler = (event) =>{
    setPhone(event.currentTarget.value);
  }

  const onSubmitHandler = (event) => {
    event.preventDefault();
    if (Password === ConfirmPasword) {
      let body = {
        userId : UserId,
        email: Email,
        phone: Phone,
        name: Name,
        password: Password,
      };
      console.log("body => " + JSON.stringify(body));
      UserService.registerUser(body).then(res => {
        alert("가입이 정상적으로 완료되었습니다");
        navigate("/login");
      });
    } else {
      alert("비밀번호가 일치하지 않습니다");
    }
  };

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
        <label>Name</label>
        <input type="text" value={Name} onChange={onNameHandler} />

        <label>ID</label>
        <input type="text" value={UserId} onChange={onUserIdHandler} />

        <label>Email</label>
        <input type="email" value={Email} onChange={onEmailHandler} />

        <label>Phone</label>
        <input type="text" value={Phone} onChange={onPhoneHandler}/>

        <label>Password</label>
        <input type="password" value={Password} onChange={onPasswordHanlder} />

        <label>Confirm Password</label>
        <input
          type="password"
          value={ConfirmPasword}
          onChange={onConfirmPasswordHandler}
        />
        <br />
        <button type="submit">가입하기</button>
      </form>
    </div>
  );
}

export default RegisterComponent;

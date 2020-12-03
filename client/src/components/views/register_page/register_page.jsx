import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { registerUser } from "../../../_actions/user_actions";

const RegisterPage = props => {
  const dispath = useDispatch();
  const history = useHistory();
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [comfirmPassword, setConfirmPassword] = useState("");
  const onEmail = event => {
    setEmail(event.currentTarget.value);
  };
  const onName = event => {
    setName(event.currentTarget.value);
  };
  const onPassword = event => {
    setPassword(event.currentTarget.value);
  };
  const onConfirmPassword = event => {
    setConfirmPassword(event.currentTarget.value);
  };
  const onSubmit = event => {
    event.preventDefault();
    if (password !== comfirmPassword) {
      alert("비밀번호 확인이 일치 하지 않습니다.");
    }
    let registerInfo = {
      email: email,
      name: name,
      password: password,
    };
    dispath(registerUser(registerInfo)) //
      .then(response => {
        if (response.payload.success) {
          history.push("/login");
        } else {
          alert("fail");
        }
      });
  };
  return (
    <div>
      <form onSubmit={onSubmit}>
        <label>email</label>
        <input type="eamil" value={email} onChange={onEmail} />
        <label>name</label>
        <input type="text" value={name} onChange={onName} />
        <label>password</label>
        <input type="password" value={password} onChange={onPassword} />
        <label>password 확인</label>
        <input
          type="password"
          value={comfirmPassword}
          onChange={onConfirmPassword}
        />
        <button type="submit">login</button>
      </form>
    </div>
  );
};

export default RegisterPage;

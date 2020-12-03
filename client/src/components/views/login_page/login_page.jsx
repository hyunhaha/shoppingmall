import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { loginUser } from "../../../_actions/user_actions";

const LoginPage = props => {
  const dispath = useDispatch();
  const history = useHistory();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const onEmail = event => {
    setEmail(event.currentTarget.value);
  };
  const onPassword = event => {
    setPassword(event.currentTarget.value);
  };
  const onSubmit = event => {
    event.preventDefault();

    let loginInfo = {
      email: email,
      password: password,
    };
    dispath(loginUser(loginInfo)) //
      .then(response => {
        if (response.payload.loginSuccess) {
          history.push("/");
        } else {
          alert("error");
        }
      });
  };
  return (
    <div>
      <form onSubmit={onSubmit}>
        <label>email</label>
        <input
          type="eamil"
          value={email}
          onChange={onEmail}
          autoComplete="on"
        />
        <label>password</label>
        <input
          type="password"
          value={password}
          onChange={onPassword}
          autoComplete="on"
        />
        <button type="submit">login</button>
      </form>
    </div>
  );
};

export default LoginPage;

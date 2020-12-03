import React, { useState } from "react";
import { useDispatch } from "react-redux";

const LoginPage = props => {
  const dispath = useDispatch();
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
    console.log(email, password);
  };
  return (
    <div>
      <form onSubmit={onSubmit}>
        <label>email</label>
        <input type="eamil" value={email} onChange={onEmail} />
        <label>password</label>
        <input type="password" value={password} onChange={onPassword} />
        <button type="submit">login</button>
      </form>
    </div>
  );
};

export default LoginPage;

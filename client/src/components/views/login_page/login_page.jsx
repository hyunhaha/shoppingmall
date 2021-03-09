import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { loginUser } from "../../../_actions/user_actions";
import styles from "./login_page.module.css";
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
    <div className={styles.login}>
      <form className={styles.form} onSubmit={onSubmit}>
        <label className={styles.label}>email</label>
        <input
          className={styles.input}
          type="eamil"
          value={email}
          onChange={onEmail}
          autoComplete="on"
        />
        <label className={styles.label}>password</label>
        <input
          className={styles.input}
          type="password"
          value={password}
          onChange={onPassword}
          autoComplete="on"
        />
        <button className={styles.button} type="submit">
          login
        </button>
      </form>
    </div>
  );
};

export default LoginPage;

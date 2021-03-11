import React from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import styles from "./right_section.module.css";
import { useHistory } from "react-router-dom";
const RightSection = props => {
  const user = useSelector(state => state.user);
  const history = useHistory();
  const onClick = () => {
    axios
      .get("/api/users/logout") //
      .then(response => {
        console.log(response.data);
        if (response.data.logoutSuccess) {
          history.push("/login");
        }
      });
  };

  if (user.userData && !user.userData.isAuth) {
    return (
      <div className={styles.right}>
        <a className={styles.link} href="/login">
          Signin
        </a>

        <a className={styles.link} href="/register">
          Signup
        </a>
      </div>
    );
  } else {
    return (
      <div>
        <a href="/product/upload" className={styles.link}>
          Upload
        </a>
        <a className={styles.link} onClick={onClick}>
          Logout
        </a>
      </div>
    );
  }
};

export default RightSection;

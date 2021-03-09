import React from "react";
import styles from "./left_section.module.css";

const LeftSection = props => {
  return (
    <div>
      <a className={styles.link} href="/">
        home
      </a>
    </div>
  );
};

export default LeftSection;

import React from "react";
import styles from "./nav_bar.module.css";
import LeftSection from "./section/left_section/left_section";
import RightSection from "./section/right_section/right_section";
const NavBar = props => {
  return (
    <nav className={styles.nav}>
      <div className={styles.logo}>
        <a href="/">Logo</a>
      </div>
      <div className={styles.menuContainer}>
        <div className={styles.left}>
          <LeftSection />
        </div>
        <div className={styles.right}>
          <RightSection />
        </div>
      </div>
    </nav>
  );
};

export default NavBar;

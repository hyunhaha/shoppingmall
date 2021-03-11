import React from "react";
import styles from "./upload_product_page.module.css";
const UploadProductPage = props => {
  return (
    <div className="app">
      <div>
        <h2>상품 업로드</h2>
      </div>
      <form className={styles.form} action="">
        <label className={styles.label}>이름</label>
        <input className={styles.input} type="text" />
        <label className={styles.label}>설명</label>
        <textarea className={styles.textarea} cols="30" rows="3"></textarea>
        <label className={styles.label}>가격</label>
        <input className={styles.input} type="text" />
        <select className={styles.select} name="" id="">
          <option value=""></option>
        </select>
        <button className={styles.button}>업로드</button>
      </form>
    </div>
  );
};

export default UploadProductPage;

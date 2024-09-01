import React from "react";
import logo from "../images/logo/ảnh-1.png";
import styles from "./Tele.module.css";

export default function Tele() {
  return (
    <div className={`${styles["tele-container"]} text-white`}>
      <img src={logo} alt="logo" className={styles.logo} />

      <div className="d-flex flex-column justify-content-center align-items-center gap-3">
        <a href="https://" className="btn btn-primary d-block">
          Follow our X fanpage
        </a>
        <a href="https://" className="btn btn-primary d-block">
          Follow our X fanpage
        </a>
      </div>
    </div>
  );
}

import React from "react";
import AsideNav from "./AsideNav";
import styles from "./Aside.module.scss";

const Aside = ({ children }) => {
  return <div className={styles.aside}>{children}</div>;
};

export default Aside;

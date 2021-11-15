import React from "react";
import AsideNav from "./AsideNav";
import styles from "./Aside.module.scss";

const Aside = () => {
  return (
    <div className={styles.aside}>
      <AsideNav />
    </div>
  );
};

export default Aside;

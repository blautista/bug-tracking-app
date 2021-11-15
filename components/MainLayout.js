import React from "react";
import styles from './MainLayout.module.scss'
import Header from "../components/Header/Header";
import Aside from "./Aside/Aside";

const MainLayout = ({ children }) => {
  return (
    <>
      <Header />
      <div className={styles.container}>
        <Aside/>
        <main className={styles.main}>{children}</main>
      </div>
      <footer></footer>
    </>
  );
};

export default MainLayout;

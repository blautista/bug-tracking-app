import React from "react";
import styles from "./MainLayout.module.scss";
import Header from "../components/Header/Header";
import Aside from "./Aside/Aside";
import AsideNav from "./Aside/AsideNav";
import TopNav from "./Aside/TopNav";
const MainLayout = ({ children }) => {
  return (
    <>
      <Header />
      <div className={styles.container}>
        <Aside>
          <AsideNav></AsideNav>
        </Aside>
        <main className={styles.main}>
          <TopNav />
          {children}
        </main>
      </div>
      <footer></footer>
    </>
  );
};

export default MainLayout;

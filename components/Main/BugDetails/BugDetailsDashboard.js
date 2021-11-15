import React from "react";
import styles from "./BugDetailsDashboard.module.scss";
import Head from "next/head";
import BugDetails from "./BugDetails";
import BugComments from "./BugComments";

const BugDetailsDashboard = (props) => {
  return (
    <>
      <Head>
        <title>
          {props.data.number} | {props.data.title}
        </title>
      </Head>
      <div className={styles.container}>
        <BugDetails
          data={props.data}
        />
      </div>
    </>
  );
};

export default BugDetailsDashboard;

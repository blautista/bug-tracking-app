import React from "react";
import styles from "./BugListStats.module.scss";
import { brightenColor } from "../../../functions/utils";

const BugListStats = ({issues}) => {

  let openIssues = 0;
  let closedIssues = 0;
  let totalIssues = 0;

  for (const issue of issues) {
    if (issue.status == 'UNCONFIRMED' || issue.status == 'INPROGRESS') openIssues++;
    else closedIssues++;

    totalIssues++;
  }

  const discreteStats = [
    {
      title: "Issues",
      text: totalIssues,
      bg: '#84bc00',
    },
    {
      title: "Open issues",
      text: openIssues,
      bg: '#D56F3E',
    },
    {
      title: "Closed issues",
      text: closedIssues,
      bg: '#3C787E',
    },
  ];

  return <div className={styles.container}>
    {discreteStats.map((stat) => {
      return (
        <div className={styles.statItem} style={{backgroundColor: stat.bg}}>
          <div className={styles.statNumber} style={{backgroundColor: brightenColor(stat.bg, 'hex', 2)}}>
            {stat.text}
          </div>
          <div className={styles.statText}>
            {stat.title}
          </div>
        </div>
      )
    })}
  </div>;
};

export default BugListStats;

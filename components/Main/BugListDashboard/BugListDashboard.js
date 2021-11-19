import React, { useState, useEffect } from "react";
import Table from "../../Table/Table";
import styles from "./BugListDashboard.module.css";
import BugListPanel from "./HeaderPanel/BugListPanel";
import BugListStats from "./BugListStats";
import Tag from "../../UI/Tag";
import Head from "next/head";
import { useRouter } from "next/router";

import { priorityToColor } from "../../../functions/utils"; 

const BugListDashboard = (props) => {
  const router = useRouter();

  const [issues, setIssues] = useState(props.issues);
  const [filteredIssues, setFilteredIssues] = useState([]);
  const [isLoading, setIsLoading] = useState(null);
  const [fetchingError, setFetchingError] = useState(null);

  const data = issues;
  const columns = [
    "number",
    { key: "priority", component: <Tag />, customProps: ["text", "priority"] },
    "title",
    "createdBy",
    "status",
  ];
  const labels = ["Issue", "Priority", "Summary", "Created By", "Status"];

  const overwriteBugsHandler = (newBugs) => {
    setFilteredIssues([...newBugs]);
    setIssues([...newBugs]);
  };

  const filterBugsHandler = (filterTerm) => {
    if (filterTerm.length > 0) {
      console.log(filterTerm);
      setFilteredIssues(
        issues.filter((bug) => {
          return bug.name.toLowerCase().includes(filterTerm.toLowerCase());
        })
      );
    } else {
      setFilteredIssues([...issues]);
    }
  };

  const handleTableRowClick = (rowData) => {
    router.push({
      pathname: router.pathname + `/${rowData.number}`,
      query: {projectTitle: router.query.projectTitle},
    });
  };

  const handleNewIssue = (data) => {
    setIssues(oldData => [...oldData, data]);
  }

  console.log(data);

  return (
    <>
      <Head>
        <title>Issues for {router.query.projectTitle}</title>
      </Head>
      <div className={styles["dashboard-container"]}>
        <BugListStats 
          issues = {issues}
        />
        <BugListPanel
          filteredIssues={filteredIssues}
          onFilterChange={filterBugsHandler}
          onNewIssue={handleNewIssue}
        />
        <Table
          isLoading={isLoading}
          onRowClick={handleTableRowClick}
          data={data}
          labels={labels}
          columns={columns}
        />
      </div>
    </>
  );
};

export default BugListDashboard;

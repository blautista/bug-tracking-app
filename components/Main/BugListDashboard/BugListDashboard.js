import React, { useState, useEffect } from "react";
import Table from "../../Table/Table";
import styles from "./BugListDashboard.module.css";
import BugListPanel from "./HeaderPanel/BugListPanel";
import BugListStats from "./BugListStats";
import Tag from "../../UI/Tag";
import Head from "next/head";
import { useRouter } from "next/router";

const BugListDashboard = (props) => {
  const router = useRouter();

  const [issues, setIssues] = useState(props.issues);
  const [filteredIssues, setFilteredIssues] = useState(props.issues);
  const [isLoading, setIsLoading] = useState(null);
  const [fetchingError, setFetchingError] = useState(null);

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
      setFilteredIssues(
        issues.filter((issue) => {
          return issue.title.toLowerCase().includes(filterTerm.toLowerCase());
        })
      );
    } else {
      setFilteredIssues([...issues]);
    }
  };

  const handleTableRowClick = (rowData) => {
    router.push({
      pathname: router.pathname + `/${rowData.number}`,
      query: { projectTitle: router.query.projectTitle },
    });
  };

  const handleNewIssue = (data) => {
    setIssues((oldData) => [...oldData, data]);
  };

  return (
    <>
      <Head>
        <title>Issues for {router.query.projectTitle}</title>
      </Head>
      <div className={styles["dashboard-container"]}>
        <BugListStats issues={issues} />
        <BugListPanel
          filteredIssues={filteredIssues}
          onFilterChange={filterBugsHandler}
          onNewIssue={handleNewIssue}
        />
        <Table
          isLoading={isLoading}
          onRowClick={handleTableRowClick}
          data={filteredIssues}
          labels={labels}
          columns={columns}
        />
      </div>
    </>
  );
};

export default BugListDashboard;

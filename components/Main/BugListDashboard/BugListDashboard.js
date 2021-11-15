import React, { useState, useEffect } from "react";
import Table from "../../Table/Table";
import styles from "./BugListDashboard.module.css";
import BugListPanel from "./HeaderPanel/BugListPanel";
import Tag from "../../UI/Tag";
import Head from "next/head";
import { useRouter } from "next/router";

const BugListDashboard = (props) => {
  const router = useRouter();

  const [issues, setIssues] = useState(props.issues);
  const [filteredIssues, setFilteredIssues] = useState([]);
  const [isLoading, setIsLoading] = useState(null);
  const [fetchingError, setFetchingError] = useState(null);

  useEffect(() => {
    router.events.on('routeChangeStart', handleDetailsLoading);
    router.events.on('routeChangeComplete', handleDetailsLoadingComplete);
  }, []);

  const data = issues;
  const columns = [
    "number",
    { key: "priority", component: <Tag styling="blue" />, customProp: "text" },
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

  const handleDetailsLoading = () => {
    console.log('loading...');
  }
  const handleDetailsLoadingComplete = () => {
    console.log('Done!');
  }
  const handleNewIssue = (data) => {
    console.log('im filtering!!');  
    setIssues(oldData => [...oldData, data]);
  }

  console.log(data);

  return (
    <>
      <Head>
        <title>Issues</title>
      </Head>
      <div className={styles["dashboard-container"]}>
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

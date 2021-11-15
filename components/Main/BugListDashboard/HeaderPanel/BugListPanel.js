import React, { useState } from "react";
import styles from "./BugListPanel.module.scss";
import FilterInput from "./FilterInput";
import Button from "../../../Buttons/Button";
import NewIssue from "./NewIssue";
import Dropdown from "../../../Dropdown/Dropdown";
const BugListPanel = (props) => {
  const [isNewIssueActive, setIsNewIssueActive] = useState(false);
  const [isDropdownActive, setIsDropdownActive] = useState(false);

  const openNewIssueModal = () => {
    setIsNewIssueActive(true);
  };

  const closeNewIssueModal = () => {
    setIsNewIssueActive(false);
  };

  const handleFilterInput = (text) => {
    setIsDropdownActive(text.length > 0);
    props.onFilterChange(text);
  };

  const selectFromDropdown = (text) => {
    setIsDropdownActive(false);
    props.onFilterChange(text);
  }

  const handleNewIssue = (data) => {
    props.onNewIssue(data);
  }
  

  let content;

  if (isNewIssueActive) content = <NewIssue onExit={closeNewIssueModal} onNewIssue={handleNewIssue}/>;
  else content = null;

  return (
    <div className={styles.panelContainer}>
      {content}
      <div className={styles.panelGroup}>
        <FilterInput
          onFilterChange={handleFilterInput}
        />
        {props.filteredBugs && (
          <Dropdown
            onClick={selectFromDropdown}
            topOffset={40}
            isActive={isDropdownActive}
            data={[...props.filteredBugs]}
          />
        )}
        <Button styling="white" text="Search" />
      </div>
      <div className={styles.panelGroup}>
        <Button onClick={openNewIssueModal} styling="blue" text="New Issue" />
      </div>
    </div>
  );
};

export default BugListPanel;

import React from "react";
import { string } from "prop-types";
import styles from "./BugDetails.module.scss";
import Tag from "../../UI/Tag";

const BugDetailsTitle = ({ children }) => {
  return <h1 className={styles.title}>{children}</h1>;
};

const BugDetailsTitleText = ({ issueId, title }) => {
  return (
    <span>
      Issue {issueId}: {title}
    </span>
  );
};

const BugDetailsTitleTags = ({ priority, category }) => {
  return (
    <>
      <Tag text={category} category={category} />
      <Tag text={`${priority} priority`} priority={priority} />
    </>
  );
};

const BugDetailsDescription = (props) => {};

const BugDetailsMain = ({
  issueId,
  title,
  priority,
  category,
  createdAt,
  createdBy,
}) => {
  return (
    <div>
      <BugDetailsTitle>
        <BugDetailsTitleText issueId={issueId} title={title} />
        <BugDetailsTitleTags priority={priority} category={category} />
      </BugDetailsTitle>
      <p className={styles.subtitle}>
        Created by {createdBy} on {createdAt}
      </p>
    </div>
  );
};

BugDetailsMain.propTypes = {
  createdAt: string,
  createdBy: string,
  category: string,
  priority: string,
  issueId: string,
  title: string,
  lastModifiedAt: string,
  lastModifiedBy: string,
};

export default BugDetailsMain;

import React from "react";
import PropTypes from "prop-types";
import styles from "./BugComments.module.scss";

const BugComment = ({ username, createdAt, description }) => {
  return (
    <div className={styles.commentContainer} key={createdAt}>
      <h3>
        {username} | {createdAt}
      </h3>
      <p>{description}</p>
    </div>
  );
};

BugComment.propTypes = {
  username: PropTypes.string.isRequired,
  createdAt: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
};

export default BugComment;

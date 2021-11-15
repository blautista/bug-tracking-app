import React from "react";
import styles from "./TableField.module.scss";

const TableHeaderField = (props) => {
  return <th className={styles.headerField}>{props.text}</th>;
};

export default TableHeaderField;

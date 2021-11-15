import React from "react";
import TableHeaderField from "./TableHeaderField";
import styles from "./TableRow.module.scss";

const TableHeaderRow = (props) => {
  return (
    <tr className={styles.headerRow}>
      {props.labels.map((elem) => (
        <TableHeaderField key={elem} text={elem} />
      ))}
    </tr>
  );
};

export default TableHeaderRow;

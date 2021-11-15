import React from "react";
import TableField from "./TableField";
import styles from "./TableRow.module.scss";

const TableRow = (props) => {

  const isClickable = props.isClickable || false;

  const handleRowClick = (e) => {
    e.preventDefault();
    if (isClickable) props.onClick(props.data);
  };

  let cont = 0;

  const tableColumns = [];
  for (const elem of props.columnOrder) {
    tableColumns.push(
      <TableField
        key={cont++}
        data={props.data[elem.key] || props.data[elem] || "--"}
        component={elem.component || null}
        customProp={elem.customProp || null}
        tag={elem}
      />
    );
  }
  return (
    <tr className={`${styles.row} ${isClickable && styles.clickable}`} onClick={handleRowClick}>
      {tableColumns}
    </tr>
  );
};

export default TableRow;

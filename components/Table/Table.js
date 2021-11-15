import React, { useEffect, useState } from "react";
import TableRow from "./TableRow";
import TableHeaderRow from "./TableHeaderRow";
import styles from "./Table.module.scss";

const Table = (props) => {
  
  const columnOrder = props.columns || [];
  const clickableRows = (typeof props.clickableRows === 'boolean') ? props.clickableRows : true;

  console.log(clickableRows);
  
  let cont = 0;
  let issueText;
  let headerLabels = []

  if (!props.hasOwnProperty('labels')) { //use column keys as backup
    for (const elem of props.columns) {
      if (elem.hasOwnProperty('key')) headerLabels.push(elem.key);
      else headerLabels.push(elem); 
    }
  } else headerLabels = [...props.labels];

  const handleRowClick = (rowData) => {
    props.onRowClick(rowData);
  };
  
  if (props.isLoading) issueText = <p>Loading...</p>;
  if (props.fetchingError) issueText = <p>Error: {fetchingError.message}</p>;

  return (
    <React.Fragment>
      {issueText}
      {!props.isLoading && !props.fetchingError && props.data && (
        <table className={styles.table}>
          <thead>
            <TableHeaderRow labels={headerLabels} />
          </thead>
          <tbody className={styles.tbody}>
            {props.data.map((rowData) => {
              return (
                <TableRow
                  key={cont++}
                  data={rowData}
                  columnOrder={columnOrder}
                  isClickable={clickableRows}
                  onClick={handleRowClick}
                />
              );
            })}
          </tbody>
          <tfoot></tfoot>
        </table>
      )}
    </React.Fragment>
  );
};

export default Table;

import React from "react";
import styles from "./TableField.module.scss";

const TableField = (props) => {
  const sendClick = () => {
    if (props.onClick) props.onClick();
  };

  let output;
  let customProps = {};

  if (props.component) {
    if (props.customProp) customProps[props.customProp] = props.data;   
    output = React.cloneElement(
      props.component,
      customProps
    );
  } else output = props.data;

  return (
    <td className={styles.field} onClick={sendClick}>
      {output}
    </td>
  );
};

export default TableField;

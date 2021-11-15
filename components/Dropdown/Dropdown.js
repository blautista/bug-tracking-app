import React, {useState} from "react";
import DropdownRow from "./DropdownRow";
import styles from "./Dropdown.module.scss";

const Dropdown = (props) => {

  if (!props.isActive) return null;
  
  return (
    <div
      className={styles.dropdown}
      style={{ top: props.topOffset, left: props.leftOffset }}
    >
      {props.data.map((elem) => {
        return <DropdownRow key={elem.id} onClick={props.onClick} text={elem.name} />;
      })}
    </div>
  );
};

export default Dropdown;

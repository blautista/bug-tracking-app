import React from "react";
import styles from "./Tag.module.scss";
import { priorityToColor } from "../../functions/utils";

const Tag = (props) => {

  const styling = (!props.priority) ? props.styling : priorityToColor(props.priority);

  return (
    <div className={`${styles.tag}`} style={styling} onClick={props.onClick}>
      {props.text}
    </div>
  );
};

export default Tag;

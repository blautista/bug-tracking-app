import React from "react";
import styles from "./Tag.module.scss";
import { priorityToColor, categoryToColor} from "../../functions/utils";

const Tag = (props) => {

  let styling = {};

  if (props.priority) styling = priorityToColor(props.priority);
  if (props.category) styling = categoryToColor(props.category);

  return (
    <div className={`${styles.tag}`} style={styling} onClick={props.onClick}>
      {props.text}
    </div>
  );
};

export default Tag;

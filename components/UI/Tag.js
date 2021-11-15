import React from "react";
import styles from "./Tag.module.scss";

const Tag = (props) => {

  return (
    <div className={`${styles.tag} ${styles[props.styling]}`} onClick={props.onClick}>
      {props.text}
    </div>
  );
};

export default Tag;

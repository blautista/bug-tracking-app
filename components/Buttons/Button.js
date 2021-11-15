import React from "react";
import styles from "./Button.module.scss";

const Button = (props) => {
  return (
    <button
      disabled={props.disabled}
      className={`${styles.btn} ${styles[props.styling]}`}
      onClick={props.onClick}
      type={props.type || 'button'}
      form={props.form || null}
    >
      {props.text}
    </button>
  );
};

export default Button;

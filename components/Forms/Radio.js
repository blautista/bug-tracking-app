import React from "react";
import { Field } from "formik";
const Radio = (props) => {
  return props.data.map((elem) => {
    return (
      <label>
        <Field type="radio" key={props.value} name={props.name} value={elem.value} />
        {elem.label}
      </label>
    );
  });
};

export default Radio;

import React from "react";
import styles from "./LoginForm.module.css";
import { Formik, Form, Field, ErrorMessage } from "formik";
import Button from "../../Buttons/Button";

const LoginForm = () => {
  return (
    <div className={styles.mainContainer}>
      <Formik
        initialValues={{ email: "", password: "" }}
        validate={(values) => {
          const errors = {};
          if (!values.email) {
            errors.email = "Required";
          } else if (
            !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
          ) {
            errors.email = "Invalid email address";
          }
          return errors;
        }}
        onSubmit={(values, { setSubmitting }) => {
          setTimeout(() => {
            alert(JSON.stringify(values, null, 2));
            setSubmitting(false);
          }, 400);
        }}
      >
        {({ isSubmitting }) => (
          <Form className={styles.formContainer}>
            <h1>Login</h1>
            <label className={styles.label} for="email">Email</label>
            <Field className={styles.inputField} type="email" name="email" />
            <ErrorMessage name="email" component="div" />
            <label className={styles.label} for="password">Password</label>
            <Field
              className={styles.inputField}
              type="password"
              name="password"
            />
            <ErrorMessage name="password" component="div" />
            <Button type="submit" text="SUBMIT" styling="primary" />
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default LoginForm;

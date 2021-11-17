import React, { useState } from "react";
import { Form, Formik, Field } from "formik";
import Button from "../../Buttons/Button";
import styles from "./NewProjectForm.module.scss";
import Modal from "../../Modal/Modal";

const NewProjectForm = (props) => {
  const [isLoading, setIsLoading] = useState(false);
  const [hasFetchingFailed, setHasFetchingFailed] = useState(false);
  const [hasFetchingSucceeded, setHasFetchingSucceeded] = useState(false);

  const initialValues = {
    title: "",
  };

  const createNewProject = async (data) => {
    setHasFetchingFailed(false);
    setIsLoading(true);
    const res = await fetch("/api/new-project", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(data),
    });

    setIsLoading(false);

    if (res.ok) {
      setHasFetchingFailed(false);
      setHasFetchingSucceeded(true);
    } else {
      setHasFetchingFailed(true);
      setHasFetchingSucceeded(false);
    }
  };

  return (
    <Modal
      showLoading={isLoading}
      showError={hasFetchingFailed}
      errorMessage={
        "Error trying to create the new project. Please try again later"
      }
      showSuccess={hasFetchingSucceeded}
      successMessage={"New project created succesfully!"}
      onExit={props.onExit}
      title="Create new project"
    >
      <Formik
        initialValues={initialValues}
        onSubmit={(values) => {
          createNewProject({ ...values });
        }}
      >
        <Form className={styles.formContainer} id="newProjectForm">
          <label for="title">Title</label>
          <Field name="title" placeholder="Title" type="input" />
        </Form>
      </Formik>
      <div className={`${styles.formRow} alignRight`}>
        <Button
          type="submit"
          styling="blue"
          text="Submit"
          form="newProjectForm"
        />
        <Button styling="white" text="Cancel" />
      </div>
    </Modal>
  );
};

export default NewProjectForm;

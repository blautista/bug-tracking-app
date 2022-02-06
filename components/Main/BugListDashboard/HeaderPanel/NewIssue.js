import React from "react";
import Button from "../../../Buttons/Button";
import Modal from "../../../Modal/Modal";
import Radio from "../../../Forms/Radio";
import { Formik, Form, Field, ErrorMessage } from "formik";
import styles from "./NewIssue.module.scss";
import { useRouter } from "next/dist/client/router";

const NewIssue = (props) => {
  const router = useRouter();

  const dataValues = {
    projectTitle: router.query.projectTitle,
    createdBy: "pepito1",
    img: "",
    category: "TASK",
    number: 2,
  };

  const initialValues = {
    title: "",
    description: "",
    priority: "HIGH",
  };

  const createNewIssue = async (data) => {
    const res = await fetch("/api/new-issue", {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-type": "application/json",
      },
    });

    return res;
  };

  return (
    <Modal onExit={props.onExit} title="Create new Issue">
      <Formik
        initialValues={initialValues}
        validate={(values) => {
          const errors = {};
          if (!values.title) errors.title = "Required";
          if (!values.description) errors.description = "Required";
          else return {};
        }}
        onSubmit={(values) => {
          if (createNewIssue({ ...dataValues, ...values }).ok) {
            props.onNewIssue(data);
          } else {
            props.onNewIssueFail();
          }
        }}
      >
        {({ values, isSubmitting }) => (
          <Form id="newIssueForm" className={styles.formContainer}>
            <label for="title">Title</label>
            <Field name="title" placeholder="Title" type="input" />
            <ErrorMessage name="title" component="div" />
            <label for="description">Description</label>
            <Field
              name="description"
              placeholder="Insert a summary of the issue here"
              as="textarea"
            />
            <div className={styles.formRow}>
              <fieldset>
                <legend>Priority</legend>
                <Radio
                  name="priority"
                  data={[
                    {
                      label: "High",
                      value: "HIGH",
                    },
                    {
                      label: "Medium",
                      value: "MEDIUM",
                    },
                    {
                      label: "Low",
                      value: "LOW",
                    },
                  ]}
                />
              </fieldset>
            </div>
          </Form>
        )}
      </Formik>
      <div className={`${styles.formRow} alignRight`}>
        <Button
          type="submit"
          styling="blue"
          text="Submit"
          form="newIssueForm"
        />
        <Button styling="white" text="Cancel" />
      </div>
    </Modal>
  );
};

export default NewIssue;

import React from "react";
import Button from "../../../Buttons/Button";
import Modal from "../../../Modal/Modal";
import Radio from "../../../Forms/Radio";
import { Formik, Form, Field } from "formik";
import styles from "./NewIssue.module.scss";

const NewIssue = (props) => {
  const dataValues = {
    projectTitle: "my-first-project",
    createdBy: "pepito1",
    img:'ficku',
    category:'TASK',
    number: 2,
  };

  const initialValues = {
    title: 'your mom in tanga',
    description: 'your cousin in tanga',
    priority: 'HIGH'
  }

  const createNewIssue = async (data) => {

    const res = await fetch('/api/new-issue', {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-type': 'application/json',
      },
    });

    if (res) {
      props.onNewIssue(data);
    } else {
      props.onNewIssueFail();
    }
  }
  

  return (
    <Modal onExit={props.onExit} title="Create new Issue">
      <Formik
        initialValues={initialValues}
        onSubmit={(values) => {
          createNewIssue({...dataValues,...values});
        }}
      >
        {({values, isSubmitting}) => (
        <Form id="newIssueForm" className={styles.formContainer}>
          <label for="title">Title</label>
          <Field name="title" placeholder="Title" type="input" />
          <label for="description">
            Description
          </label>
            <Field name="description" placeholder="Title" as="textarea" />
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
        <Button type="submit" styling="blue" text="Submit" form="newIssueForm"/>
        <Button styling="white" text="Cancel" />
      </div>
    </Modal>
  );
};

export default NewIssue;

import React, { useState } from "react";
import styles from "./BugDetails.module.scss";
import Tag from "../../UI/Tag";
import Table from "../../Table/Table";
import Button from "../../Buttons/Button";
import Modal from "../../Modal/Modal";
import BugComments from "./BugComments";
import BugDetailsMain from "./BugDetailsMain";

const SectionContainer = ({ children, title }) => {
  return (
    <section className={styles.sectionContainer}>
      <h2 className={styles.sectionTitle}>{title}</h2>
      {children}
    </section>
  );
};

const BugDetails = (props) => {
  const [newModificationModal, setNewModificationModal] = useState(null);

  const openNewModificationModal = () => {
    setNewModificationModal(
      <Modal title="New Modification" onExit={closeNewModificationModal} />
    );
  };
  const closeNewModificationModal = () => {
    setNewModificationModal(null);
  };

  const createdAt = new Date(props.data.createdAt).toUTCString();
  const lastModifiedAt = props.data.history.length
    ? new Date(
        props.data.history[props.data.history.length - 1].createdAt
      ).toUTCString()
    : createdAt;

  return (
    <>
      <div className={styles.container}>
        {newModificationModal}
        <SectionContainer title="">
          <BugDetailsMain
            createdAt={props.data.createdAt}
            createdBy={props.data.createdBy}
            category={props.data.category}
            priority={props.data.priority}
            issueId={props.data.issueId}
            title={props.data.title}
            lastModifiedAt={lastModifiedAt}
          />
        </SectionContainer>
        <SectionContainer title="Description:">
          <p>{props.data.description}</p>
        </SectionContainer>
        <SectionContainer title="History:">
          <Table
            data={props.data.history}
            columns={[
              "createdBy",
              { key: "status", component: <Tag />, customProps: ["text"] },
              "description",
              "createdAt",
            ]}
            labels={[
              "Modified by",
              "New Status",
              "Summary",
              "Modification date",
            ]}
            clickableRows={false}
          />
          <Button
            styling="blue"
            text="New Modification"
            onClick={openNewModificationModal}
          />
        </SectionContainer>

        <SectionContainer title="Comments">
          <BugComments comments={props.data.comments} issueId={props.data.id} />
        </SectionContainer>
      </div>
    </>
  );
};

export default BugDetails;

import React, {useState} from "react";
import styles from "./BugDetails.module.scss";
import Card from "../../UI/Card";
import Tag from "../../UI/Tag";
import Table from "../../Table/Table";
import Button from "../../Buttons/Button";
import Modal from "../../Modal/Modal";
import BugComments from "./BugComments";

const BugDetails = (props) => {

  const [newModificationModal, setNewModificationModal] = useState(null);
  
  const openNewModificationModal = () => {
    setNewModificationModal(<Modal title='New Modification' onExit={closeNewModificationModal}/>);
  }
  const closeNewModificationModal = () => {
    setNewModificationModal(null);
  }

  const createdAt = new Date(props.data.createdAt).toUTCString();
  
  return (
    <>
      <div className={styles.container}>
        {newModificationModal}
        <h1 className={styles.title}>
          Issue {props.data.issueId}: {props.data.title}
          <Tag text="Enhancement" styling="blue" />
          <Tag text={`${props.data.priority} priority`} styling="red" />
        </h1>
        <p className={styles.subtitle}>
          Created by {props.data.createdBy} on {createdAt} 
          {props.data.history && `| Last modified by ${props.data.history[props.data.history.length - 1].username} on 
          ${props.data.history[props.data.history.length - 1].createdAt}`}
        </p>

        {/* ISSUE DESCRIPTION */}

        <section className={styles.sectionContainer}>
          <h2 className={styles.sectionTitle}>Description:</h2>
          <p>{props.data.description}</p>
        </section>

        {/* ISSUE HISTORY */}

        <section className={styles.sectionContainer}>
          <h2 className={styles.sectionTitle}>History</h2>
          <Table
            data={props.data.history}
            columns={["date", "user", "description"]}
            labels={["Modification date", "Modified by", "Summary"]}
            clickableRows={false}
          />
          <Button styling="blue" text="New Modification" onClick={openNewModificationModal}/>
        </section>

        {/* COMMENTS */}

        <section className={styles.sectionContainer}>
          <h2 className={styles.sectionTitle}>Comments:</h2>
          <BugComments comments={props.data.comments} issueId={props.data.id}/>
        </section>
      </div>
    </>
  );
};

export default BugDetails;

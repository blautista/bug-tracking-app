import React, { useRef, useState } from "react";
import styles from "./BugComments.module.scss";
import Button from "../../Buttons/Button";
import PropTypes from "prop-types";
import { commentType } from "../../../types";
import BugComment from "./BugComment";

const BugComments = (props) => {
  const [comments, setComments] = useState(props.comments);
  const [submitError, setSubmitError] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  console.log(props.comments);

  const fetchErrorMessage =
    "There was a problem submitting your message. Please try again later";

  const addComment = async ({ description }) => {
    setIsSubmitting(true);
    const user = "pepito1";

    const data = {
      description: description,
      username: user,
      issueId: props.issueId,
    };

    const res = await fetch("/api/new-comment", {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-type": "application/json",
      },
    });

    if (!res.ok) {
      setSubmitError(true);
    } else {
      setComments((oldComments) => [
        ...oldComments,
        { ...data, createdAt: "Just Now" },
      ]);
    }

    setIsSubmitting(false);
  };

  return (
    <div className={styles.container}>
      {comments && comments.length === 0 && (
        <p>There are no comments on this issue yet. Be the first one!</p>
      )}
      {comments &&
        comments.map(({ createdAt, username, description }) => {
          return (
            <BugComment
              createdAt={createdAt}
              username={username}
              description={description}
            />
          );
        })}
      {!isSubmitting && (
        <NewBugComment isSubmitting={isSubmitting} onFormSubmit={addComment} />
      )}
      {isSubmitting && <p>Loading...</p>}
    </div>
  );
};

const NewBugComment = ({ onFormSubmit, isSubmitting }) => {
  const textareaRef = useRef();

  return (
    <form
      onSubmit={() => onFormSubmit({ description: textareaRef.current.value })}
    >
      <textarea ref={textareaRef} className={styles.textarea}></textarea>
      <Button
        styling="blue"
        type="submit"
        text="Add comment"
        disabled={isSubmitting}
      />
    </form>
  );
};

BugComments.propTypes = {
  comments: PropTypes.arrayOf(commentType),
  issueId: PropTypes.string,
};

export default BugComments;

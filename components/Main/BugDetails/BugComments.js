import React, {useRef, useState} from "react";
import styles from "./BugComments.module.scss";
import Button from "../../Buttons/Button";
const BugComments = (props) => {

  const [comments, setComments] = useState(props.comments);
  const [submitError, setSubmitError] = useState(false);

  const textareaRef = useRef();

  const addComment = async () => {
    const description = textareaRef.current.value;
    const user = 'pepito1';

    const data = {description: description, username: user, issueId: props.issueId};

    const res = await fetch('/api/new-comment', {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        'Content-type': 'application/json',
      }
    });

    if (!res.ok) {
      console.log('uh oh bad thing happened');
    }
  }
  
  return (
    <div className={styles.container}>
      {comments && comments.map((comment) => {
        return (
          <div className={styles.commentContainer} key={comment.createdAt}>
            <h3>
              {comment.username} | {comment.createdAt}
            </h3>
            <p>{comment.description}</p>
          </div>
        );
      })}
      <textarea ref={textareaRef} className={styles.textarea}></textarea>
      <Button styling="blue" text="Add comment" onClick={addComment}/>
    </div>
  );
};

export default BugComments;

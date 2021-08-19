import React, { useState } from "react";

const NewSubCommentForm = ({ handleSubComment, comment, medium }) => {
  const [body, setBody] = useState("");
  const [currentUser, setCurrentUser] = useState(sessionStorage.getItem("id"));
  const [error, setError] = useState(null);

  return (
    <div>
      <form
        className="detailField"
        onSubmit={(e) => {
          handleSubComment(e, body, currentUser, medium.id, comment.id);
        }}
      >
        <textarea
          className="formTextarea"
          value={body}
          onChange={(e) => {
            setBody(e.target.value);
          }}
        ></textarea>
        <button className="primaryButton">Antworten</button>
      </form>
    </div>
  );
};

export default NewSubCommentForm;

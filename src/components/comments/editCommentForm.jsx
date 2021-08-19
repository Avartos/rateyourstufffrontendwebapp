import React, { useState } from "react";

function EditCommentForm({ handleEditComment, comment, handleDeleteComment}) {
  const [body, setBody] = useState(comment.textOfComment);

  return (
    <div>
      <form
        className="detailField"
        onSubmit={(e) => {
          handleEditComment(
            e,
            body,
            comment.userMappingId,
            comment.numberOfPosts,
            comment.id
          );
        }}
      >
        <textarea
          className="formTextarea"
          value={body}
          onChange={(e) => {
            setBody(e.target.value);
          }}
        ></textarea>
        <div>
          <button className="primaryButton">Ändern</button>
        </div>
      </form>
      <button className="primaryButton" onClick={handleDeleteComment}>Löschen</button>
    </div>
  );
}

export default EditCommentForm;

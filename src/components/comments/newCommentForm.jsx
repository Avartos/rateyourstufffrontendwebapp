import { useState } from "react";

const NewCommentForm = ({ handleSubmitFormComment, medium }) => {
  const [body, setBody] = useState("");
  const [currentUser, setCurrentUser] = useState(sessionStorage.getItem("id"));
  const [error, setError] = useState(null);

  return (
    <div className="newCommentForm">
      <form
        className="detailField"
        onSubmit={(e) => {
          handleSubmitFormComment(e, body, currentUser, medium.id);
          setBody("");
        }}
      >
        <label>
          <span className="smallHeading">Kommentar/Frage</span>
        </label>
        <textarea
          className="formTextarea"
          value={body}
          onChange={(e) => {
            setBody(e.target.value);
          }}
        />
        <div>
          <button className="primaryButton">Absenden</button>
        </div>
      </form>
    </div>
  );
};

export default NewCommentForm;

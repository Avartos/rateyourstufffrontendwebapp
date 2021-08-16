import React, {useState} from 'react';

function NewSubCommentForm(handleSubComment, comment, medium) {
    const [body, setBody] = useState("");
    const [currentUser, setCurrentUser] = useState(sessionStorage.getItem("id"));
    const [error, setError] = useState(null);

    return (
        <div>

            <form className="detailField"
                  onSubmit={(e) => {
                      handleSubComment(e, body, currentUser, medium.id, comment.id);
                  }}>
                <textarea className="formTextarea"
                          value={body}
                          onChange={(e) =>{
                              setBody(e.target.value);
                          }}>
                </textarea>
                <div>
                    <button className="primaryButton">Antworten</button>
                </div>
            </form>
        </div>
    );
}

export default NewSubCommentForm;
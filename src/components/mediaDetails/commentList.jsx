import React from "react";
import CommentEntry from "./commentEntry";

const CommentList = ({comments, handleFetchComments, medium}) => {

    return (
        <React.Fragment>
            {
                comments.map(comment => {
                    return  <CommentEntry key={comment.id} comment={comment} medium={medium}></CommentEntry>
                })
            }

            {comments.length >1 &&
            <button className="primaryButton" onClick={handleFetchComments}>
                Zeige Mehr Kommentare
            </button>
            }

        </React.Fragment>
     );
}
 
export default CommentList;
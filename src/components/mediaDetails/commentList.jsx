import RatingsEntry from "./ratingsEntry";
import React from "react";
import CommentEntry from "./commentEntry";

const CommentList = ({comments, handleFetchComments}) => {
    return (
        <React.Fragment>
            {
                comments.map(comment => {
                    return  <CommentEntry key={comment.id} comment={comment}></CommentEntry>
                })
            }
            <button onClick={handleFetchComments}>
                Zeige Mehr Kommentare
            </button>
        </React.Fragment>
     );
}
 
export default CommentList;
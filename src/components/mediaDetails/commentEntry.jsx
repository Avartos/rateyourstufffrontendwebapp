import React from "react";

const CommentEntry = ({comment}) => {
    return (
        <React.Fragment>
            {comment.userUserName}
            {comment.textOfComment}
        </React.Fragment>
    );
}
 
export default CommentEntry;
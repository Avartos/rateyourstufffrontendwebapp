import React from "react";

function SubCommentEntry({ subComment, comment }) {
  return (
    <div className="subComment">
      <h3>AW #{subComment.commentParentId}:  {subComment.userUserName}</h3>
      <label>{subComment.textOfComment}</label>
    </div>
  );
}

export default SubCommentEntry;

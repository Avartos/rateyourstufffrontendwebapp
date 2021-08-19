import React from "react";
import CreateIcon from "@material-ui/icons/Create";
import ReplyIcon from "@material-ui/icons/Reply";
import EditCommentForm from "./editCommentForm";
import { useHistory } from "react-router";
import { useState } from "react";
import authorization from "../../core/authorization";
import { Button } from "@material-ui/core";
import SubCommentList from "./subCommentList";
import NewSubCommentForm from "./newSubCommentForm";

function SubCommentEntry({ subComment, comment, medium }) {
    const [handleToggleEdit, setHandleToggleEdit] = useState(false);
    const [handleToggleSubComment, setHandleToggleSubComment] = useState(false);
    const [handleError, setHandleError] = useState(null);
  
    const history = useHistory();
    const [isSubCommentListVisible, setIsSubCommentListVisible] = useState(false);
  
  
    const handleEditComment = (e, body, currentUser, postNumbers, commentId) => {
    e.preventDefault();

    let updatedComment = {
      id: commentId,
      textOfComment: body,
      numberOfPosts: postNumbers,
      userMappingId: currentUser,
    };

    fetch(`http://localhost:5000/rest/comments`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: sessionStorage.getItem("Bearer "),
      },
      body: JSON.stringify(updatedComment),
    })
      .then((data) => {
        setHandleToggleEdit(false);
        //Reload page, to get updated comment
        history.go();
      })
      .catch((error) => {
        setHandleError(
          "Das Formular konnte nicht abgeschickt werden (" + handleError + ")"
        );
      });
  };

  const handleDeleteComment = () => {
    fetch(`http://localhost:5000/rest/comments/${subComment.id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: sessionStorage.getItem("Bearer "),
      },
    })
      .then((res) => {
        if (!res.ok) {
          throw Error("Fehler beim Löschen des Kommentars");
        }
        setHandleToggleEdit(false);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleSubComment = (
    e,
    body,
    currentUser,
    mediumToComment,
    parentComment
  ) => {
    e.preventDefault();

    let newSubComment = {
      textOfComment: body,
      numberOfPosts: 0,
      userMappingId: currentUser,
      mediumMappingId: mediumToComment,
      parentMappingId: parentComment,
    };
    console.log(newSubComment);

    fetch(`http://localhost:5000/rest/comments/add`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: sessionStorage.getItem("Bearer "),
      },
      body: JSON.stringify(newSubComment),
    })
      .then((data) => {
        setHandleToggleSubComment(false);
      })
      .catch((error) => {
        setHandleError(
          "Das Formular konnte nicht abgeschickt werden (" + handleError + ")"
        );
      });
  };

  return (
    <div className="subComment">
      <h3>
        #{subComment.id} - AW #{subComment.commentParentId}: {subComment.userUserName}
      </h3>
      <label>{subComment.textOfComment}</label>

      {comment.userId === parseInt(authorization.getUserId()) && (
        <CreateIcon
          className="editAndReplyButton"
          onClick={() => {
            setHandleToggleEdit(!handleToggleEdit);
            if (handleToggleEdit === true) {
              setHandleToggleEdit(!handleToggleEdit);
            }
          }}
        ></CreateIcon>
      )}

      <ReplyIcon
        className="editAndReplyButton"
        onClick={() => {
          setHandleToggleSubComment(!handleToggleSubComment);
          if (handleToggleSubComment === true) {
            setHandleToggleSubComment(!handleToggleSubComment);
          }
        }}
      ></ReplyIcon>

      {handleToggleEdit && (
        <EditCommentForm
          handleEditComment={handleEditComment}
          handleDeleteComment={handleDeleteComment}
          comment={subComment}
        />
      )}
      {!isSubCommentListVisible && (
        <Button
          onClick={() => {
            setIsSubCommentListVisible(true);
          }}
        >
          Antworten anzeigen
        </Button>
      )}
      {isSubCommentListVisible && (
        <SubCommentList comment={subComment}></SubCommentList>
      )}

      {handleToggleSubComment && (
        <NewSubCommentForm
          handleSubComment={handleSubComment}
          comment={subComment}
          medium={medium}
        ></NewSubCommentForm>
      )}
    </div>
  );
}

export default SubCommentEntry;

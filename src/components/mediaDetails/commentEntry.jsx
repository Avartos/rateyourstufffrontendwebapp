import React, {useState} from "react";
import {Divider} from "@material-ui/core";
import CreateIcon from '@material-ui/icons/Create';
import ReplyIcon from '@material-ui/icons/Reply';
import EditCommentForm from "../comments/editCommentForm";
import { useHistory } from "react-router-dom";
import NewSubCommentForm from "../comments/newSubCommentForm";
import useFetch from "../../hooks/useFetch";

const CommentEntry = ({comment, medium}) => {
    const [handleToggleEdit, setHandleToggleEdit] = useState(false);
    const [handleToggleSubComment, setHandleToggleSubComment] = useState(false);
    const [handleError, setHandleError] = useState(null);
    const history = useHistory();

    

    const handleEditComment = (e, body, currentUser, mediumToComment, postNumbers, commentId) => {
        e.preventDefault();

        let updatedComment = {
            id: commentId,
            textOfComment: body,
            numberOfPosts: postNumbers,
            userMappingId: currentUser,
            mediumMappingId: mediumToComment,
        };

        console.log(updatedComment);

        fetch(`http://localhost:5000/rest/comments`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(updatedComment),
        })
            .then((data) => {
                setHandleToggleEdit(false);
                //Reload page, to get actual average rating
                // history.go();
            })
            .catch((error) => {
                setHandleError(
                    "Das Formular konnte nicht abgeschickt werden (" + handleError + ")"
                );
            });
    };

    const handleSubComment = (e,body, currentUser,mediumToComment, parentComment) => {
        e.preventDefault();

        let newSubComment = {
            textOfComment: body,
            numberOfPosts: 0,
            userMappingId: currentUser,
            mediumMappingId: mediumToComment,
            comment_parent:parentComment,
        };
        console.log(newSubComment);

        fetch(`http://localhost:5000/rest/comments/add`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(newSubComment),
        })
            .then((data) => {
                console.log(data);
                setHandleToggleSubComment(false);
                //Reload page, to get actual average rating
                // history.go();
            })
            .catch((error) => {
                setHandleError(
                    "Das Formular konnte nicht abgeschickt werden (" + handleError + ")"
                );
            });
    };

    return (
        <React.Fragment>
            <h3>{comment.userUserName}</h3>
            <label>{comment.textOfComment}</label>

            {comment.userId == sessionStorage.getItem("id") &&
            <CreateIcon className="editAndReplyButton" onClick={() => {
                setHandleToggleEdit(!handleToggleEdit);
                if (handleToggleEdit === true) {
                    setHandleToggleEdit(!handleToggleEdit);
                }
            }}>
            </CreateIcon>
            }

            <ReplyIcon className="editAndReplyButton" onClick={() => {
                setHandleToggleSubComment(!handleToggleSubComment);
                if (handleToggleSubComment === true) {
                    setHandleToggleSubComment(!handleToggleSubComment);
                }
            }}>
            </ReplyIcon>


            {handleToggleEdit &&(
            <EditCommentForm handleEditComment={handleEditComment} comment={comment} medium={medium}/>
            )}

            {handleToggleSubComment &&
                <NewSubCommentForm handleSubComment={handleSubComment} comment={comment} medium={medium}></NewSubCommentForm>
            }
            <Divider />
        </React.Fragment>
    );
};
 
export default CommentEntry;
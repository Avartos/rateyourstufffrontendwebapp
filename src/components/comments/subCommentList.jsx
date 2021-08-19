import React from "react";
import SubCommentEntry from "./subCommentEntry";
import { useState } from "react";
import { useEffect } from "react";

function SubCommentList({ comment, medium, handleAddMessage }) {
  const [subComments, setSubComments] = useState([]);
  const numberOfSubCommentsPerPage = 2;
  const [currentSubCommentPage, setCurrentSubCommentPage] = useState(0);
  const [isLoadMoreButtonVisible, setIsLoadMoreButtonVisible] = useState(true);
  const handleFetchSubCommentsFromComment = (isInitialReload = false) => {
    const currentPage = isInitialReload ? 0 : currentSubCommentPage;
    fetch(
      `http://localhost:5000/rest/comments/all/subcomments/${comment.id}?page=${currentPage}&size=${numberOfSubCommentsPerPage}`
    )
      .then((res) => {
        if (!res.ok) {
          throw Error('Fehler beim Abrufen der Kommentare');
        }
        return res.json();
      })
      .then((data) => {
        if (isInitialReload) {
          setSubComments(data);
        } else {
          setSubComments([...subComments, ...data]);
        }
        console.log("Test");
        if (data.length < numberOfSubCommentsPerPage) {
          setIsLoadMoreButtonVisible(false);
        } else {
            setIsLoadMoreButtonVisible(true);
        }
        setCurrentSubCommentPage(currentPage + 1);
      })
      .catch((error) => {
        console.error(error);
        handleAddMessage('error', 'Fehler' , error.message);
      });
  };

  useEffect(() => {
    handleFetchSubCommentsFromComment(true);
  }, []);

  return (
    <div>
      <React.Fragment>
        {subComments.map((subComment) => {
          return (
            <SubCommentEntry
              key={subComment.id}
              subComment={subComment}
              comment={comment}
              medium={medium}
              handleReload={handleFetchSubCommentsFromComment}
              handleAddMessage={handleAddMessage}
            ></SubCommentEntry>
          );
        })}

        {isLoadMoreButtonVisible && (
          <button
            className="primaryButton"
            onClick={() => handleFetchSubCommentsFromComment()}
          >
            Weitere Antworten laden
          </button>
        )}
      </React.Fragment>
    </div>
  );
}

export default SubCommentList;

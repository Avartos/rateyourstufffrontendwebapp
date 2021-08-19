import React from "react";
import CommentEntry from "./commentEntry";
import { useState } from "react";
import { useEffect } from "react";

const CommentList = ({ handleFetchComments, medium, handleAddMessage }) => {
  const numberOfCommentsPerPage = 2;
  const [currentCommentPage, setCurrentCommentPage] = useState(0);
  const [comments, setComments] = useState([]);
  const [isLoadMoreButtonVisible, setIsLoadMoreButtonVisible] = useState(true);

  const fetchCommentsFromMedium = (isInitialFetch = false) => {
    const currentPage = isInitialFetch ? 0 : currentCommentPage;
    
    fetch(
      `http://localhost:5000/rest/comments/all/medium/${medium.id}?page=${currentPage}&size=${numberOfCommentsPerPage}`
    )
      .then((res) => {
        if (!res.ok) {
          throw Error('Fehler beim Abrufen der Kommentare');
        }
        return res.json();
      })
      .then((data) => {
        if (isInitialFetch) {
          setComments(data);
        } else {
          setComments([...comments, ...data]);
        }
        if (data < numberOfCommentsPerPage) {
          setIsLoadMoreButtonVisible(false);
        } else {
            setIsLoadMoreButtonVisible(true);
        }

        setCurrentCommentPage(currentPage + 1);
      })
      .catch((error) => {
        handleAddMessage(error.message)
        console.error(error);
      });
  };
  useEffect(() => {
    fetchCommentsFromMedium();
  }, []);

  return (
    <React.Fragment>
      {comments.map((comment) => {
        return (
          <CommentEntry
            key={comment.id}
            comment={comment}
            medium={medium}
            handleReload={fetchCommentsFromMedium}
            handleAddMessage={handleAddMessage}
          ></CommentEntry>
        );
      })}

      {isLoadMoreButtonVisible && (
        <button
          className="primaryButton"
          onClick={() => {
            fetchCommentsFromMedium();
          }}
        >
          Weitere Kommentare Laden
        </button>
      )}
    </React.Fragment>
  );
};

export default CommentList;

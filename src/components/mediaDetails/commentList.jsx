import React from "react";
import CommentEntry from "./commentEntry";
import { useState } from "react";
import { useEffect } from "react";

const CommentList = ({ handleFetchComments, medium }) => {
  const numberOfCommentsPerPage = 2;
  const [currentCommentPage, setCurrentCommentPage] = useState(0);
  const [comments, setComments] = useState([]);
  const [isLoadMoreButtonVisible, setIsLoadMorebUttonVisible] = useState(true);

  const fetchCommentsFromMedium = (isInitialFetch = false) => {
    const currentPage = isInitialFetch ? 0 : currentCommentPage;
    fetch(
      `http://localhost:5000/rest/comments/all/medium/${medium.id}?page=${currentPage}&size=${numberOfCommentsPerPage}`
    )
      .then((res) => {
        if (!res.ok) {
          throw Error("unable to fetch ratings");
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
          setIsLoadMorebUttonVisible(false);
        }
        setCurrentCommentPage(currentPage + 1);
      })
      .catch((error) => {
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

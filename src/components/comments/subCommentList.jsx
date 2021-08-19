import React from "react";
import SubCommentEntry from "./subCommentEntry";
import { useState } from "react";
import { useEffect } from "react";

function SubCommentList({ comment }) {
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
          throw Error("unable to fetch subcomments");
        }
        return res.json();
      })
      .then((data) => {
        console.log(data);
        if (isInitialReload) {
          setSubComments(data);
        } else {
          setSubComments([...subComments, ...data]);
        }
        if(data.length < numberOfSubCommentsPerPage) {
            setIsLoadMoreButtonVisible(false);
        }
        setCurrentSubCommentPage(currentPage + 1);
        console.log(currentPage);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  useEffect(()=> {
      handleFetchSubCommentsFromComment(true);
  }, [])

  return (
    <div>
      <React.Fragment>
        {subComments.map((subComment) => {
          return (
            <SubCommentEntry
              key={subComment.id}
              subComment={subComment}
              comment={comment}
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

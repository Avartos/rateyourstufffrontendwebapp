import React from 'react';
import SubCommentEntry from "./subCommentEntry";

function SubCommentList({subComments, handleFetchSubCommentsFromComment, comment}) {
    return (
        <div>

            <React.Fragment>
                {
                    subComments.map(subComment => {
                        return <SubCommentEntry key={subComment.id} subComment={subComment} comment={comment} ></SubCommentEntry>
                    })
                }

                {subComments.length > 1 &&
                <button className="primaryButton" onClick={handleFetchSubCommentsFromComment}>
                    Weitere laden
                </button>
                }

            </React.Fragment>
        </div>
    );
}

export default SubCommentList;
import React from 'react';
import SubCommentEntry from "./subCommentEntry";

function SubCommentList({subComments, handleFetchSubComments}) {
    return (
        <div>

            <React.Fragment>
                {
                    subComments.map(subComment => {
                        return <SubCommentEntry key={subComment.id} subComment={subComment}></SubCommentEntry>
                    })
                }
            </React.Fragment>
        </div>
    );
}

export default SubCommentList;
import React from 'react';

function SubCommentEntry({subComment, comment}) {
    console.log(subComment.id);
    return (

        <div>
                    <h3>{subComment.userUserName}</h3>
                    <label>{subComment.textOfComment}</label>
        </div>
    );
}

export default SubCommentEntry;
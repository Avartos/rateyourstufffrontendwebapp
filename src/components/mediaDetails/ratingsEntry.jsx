import React from "react";
import ReadOnlyRating from "../rating/readOnlyRating";

const RatingsEntry = ({rating}) => {
    return (
        <React.Fragment>
            <span>{rating.userUserName}</span>
            <ReadOnlyRating
                size="large"
                value={rating.givenPoints}
                maxValue={rating.max_POINTS}
                showValue={true}
            />
            <span>{rating.description}</span>
        </React.Fragment>
     );
}
 
export default RatingsEntry;
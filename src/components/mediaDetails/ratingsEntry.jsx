import React from "react";
import ReadOnlyRating from "../rating/readOnlyRating";

const RatingsEntry = ({rating}) => {
    return (
        <React.Fragment>
            {rating.userUserName}
            <ReadOnlyRating
                size="large"
                value={rating.givenPoints}
                maxValue={rating.max_POINTS}
                showValue={true}
            />
            {rating.description}
        </React.Fragment>
     );
}
 
export default RatingsEntry;
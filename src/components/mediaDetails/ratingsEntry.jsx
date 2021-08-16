import React from "react";
import ReadOnlyRating from "../rating/readOnlyRating";
import {Divider} from "@material-ui/core";

const RatingsEntry = ({rating}) => {
    return (
        <React.Fragment>
            <h3>{rating.userUserName}</h3>
            <ReadOnlyRating
                size="large"
                value={rating.givenPoints}
                maxValue={rating.max_POINTS}
                showValue={true}
            />
            <label>{rating.description}</label>
            <Divider />
        </React.Fragment>
     );
}
 
export default RatingsEntry;
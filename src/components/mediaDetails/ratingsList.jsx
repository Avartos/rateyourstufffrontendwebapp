import React from "react";
import RatingsEntry from "./ratingsEntry";



const RatingList = ({ratings, handleFetchRatings}) => {
    return (
        <React.Fragment>
        {
            ratings.map(rating => {
                return  <RatingsEntry key={rating.id} rating={rating}></RatingsEntry>
            })
        }
        <button onClick={handleFetchRatings}>
            Zeige Mehr
        </button>
        </React.Fragment>
    );
}

export default RatingList;
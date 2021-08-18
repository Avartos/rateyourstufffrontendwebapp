import React from "react";
import RatingsEntry from "./ratingsEntry";



const RatingList = ({medium, ratings, handleFetchRatings}) => {
    return (
        <React.Fragment>
        {
            ratings.map(rating => {
                return  <RatingsEntry key={rating.id} medium={medium} rating={rating}></RatingsEntry>
            })
        }
            {ratings.length>1 &&
            <button className="primaryButton" onClick={handleFetchRatings}>
                Zeige Mehr
            </button>
            }

        </React.Fragment>
    );
}

export default RatingList;
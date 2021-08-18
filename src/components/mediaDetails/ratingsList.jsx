import React from "react";
import RatingsEntry from "./ratingsEntry";



const RatingList = ({menium, ratings, handleFetchRatings}) => {
    return (
        <React.Fragment>
        {
            ratings.map(rating => {
                return  <RatingsEntry key={rating.id} medium={menium} rating={rating}></RatingsEntry>
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
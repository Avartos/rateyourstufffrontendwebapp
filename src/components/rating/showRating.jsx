import React, { useState } from "react";
import useFetch from "../../hooks/useFetch";
import ReadOnlyRating from "./readOnlyRating";

const ShowRating = () => {
  const {
    data: rating,
    isPending,
    error,
  } = useFetch(`http://localhost:5000/rest/ratings/3`);

  const [handleError, setHandleError] = useState(null);

  return (
    <React.Fragment>
      <span className="smallHeading">{rating.userId}</span>
      <ReadOnlyRating
        size="small"
        value={rating.givenPoints}
        showValue={true}
      ></ReadOnlyRating>
      <span>{rating.description}</span>
    </React.Fragment>
  );
};

export default ShowRating;

import React, { useState } from "react";
import { Rating } from "@material-ui/lab";
import authorization from "../../core/authorization";

function EditRatingForm({
  rating,
  medium,
  handleEditRating,
  handleDeleteRating,
}) {
  const [body, setBody] = useState(rating.description);
  const [valueRate, setValueRate] = useState(rating.givenPoints / 2);

  return (
    <div>
      <form
        className="detailField"
        onSubmit={(e) => {
          handleEditRating(
            e,
            body,
            rating.userMappingId,
            valueRate,
            medium.id,
            rating.id
          );
        }}
      >
        <label>
          <span className="smallHeading">Bewertungstext</span>
        </label>
        <Rating
          name="half-rating"
          precision={0.5}
          value={valueRate}
          onChange={(event, newValue) => {
            setValueRate(newValue);
          }}
        ></Rating>
        <textarea
          className="formTextarea"
          value={body}
          onChange={(e) => {
            setBody(e.target.value);
          }}
        />
        <div>
          <button className="primaryButton">Absenden</button>
          {parseInt(rating.userId) === parseInt(authorization.getUserId()) && (
            <button className="primaryButton" onClick={() => handleDeleteRating()}>
              Bewertung löschen
            </button>
          )}
        </div>
      </form>
    </div>
  );
}

export default EditRatingForm;

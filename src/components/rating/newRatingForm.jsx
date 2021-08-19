import { useState } from "react";
import { Rating } from "@material-ui/lab";
import authorization from "../../core/authorization";
import { useEffect } from "react";

const NewRatingForm = ({ handleSubmitFormRating, medium }) => {
  const [body, setBody] = useState("");
  const [currentUser, setCurrentUser] = useState(authorization.getUserId());
  const [valueRate, setValueRate] = useState(0);
  const [isPending, setIsPending] = useState(true);

  const fetchExistingRating = () => {
    fetch(
      `http://localhost:5000/rest/ratings/user/${authorization.getUserId()}/medium/${
        medium.id
      }`
    )
      .then((res) => {
        if (!res.ok) {
          throw Error("No rating available");
        }
        return res.json();
      })
      .then((data) => {
        setValueRate(data.givenPoints / 2);
        setBody(data.description);
        setIsPending(false);
      })
      .catch((error) => {
        console.error(error.message);
      });
  };

  useEffect(fetchExistingRating, []);

  return (
    <div className="newRatingForm">
      <form
        className="detailField"
        onSubmit={(e) => {
          handleSubmitFormRating(e, body, valueRate, currentUser, medium.id);
          setBody("");
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
        </div>
      </form>
    </div>
  );
};

export default NewRatingForm;

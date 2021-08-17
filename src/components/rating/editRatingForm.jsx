import React, {useState} from 'react';
import {Rating} from "@material-ui/lab";

function EditRatingForm({rating, medium}) {
    const [body, setBody] = useState(rating.description);
    const [currentUser, setCurrentUser] = useState(sessionStorage.getItem("id"));
    const [valueRate, setValueRate] = useState(rating.givenPoints);

    return (
        <div>
            <form className="detailField"
                  onSubmit={(e) => {
                      handleSubmitFormRating(e, body, valueRate, currentUser, medium.id);
                      setBody("");
                  }}
            >
                <label>
                    <span className="smallHeading">Bewertungstext</span>
                </label>
                <Rating name="half-rating" precision={0.5} onChange={(event, newValue) => {
                    setValueRate(newValue);
                }}></Rating>
                <textarea className="formTextarea"
                          value={body}
                          onChange={(e) =>{
                              setBody(e.target.value);
                          }}
                />
                <div>
                    <button className="primaryButton">Absenden</button>
                </div>

            </form>
        </div>
    );
}

export default EditRatingForm;
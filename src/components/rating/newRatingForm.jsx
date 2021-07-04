import { useState } from "react";

const NewRatingForm = ({handleSubmitFormRating}) =>{
        const [body, setBody] = useState("");
        const [currentUser, setCurrentUser] = useState(1);
        const [mediumToRate, setMediumToRate] = useState(7);

    
    return ( 

            <div className="newRatingForm">
                <form className="detailField"
                    onSubmit={(e) => {
                        handleSubmitFormRating(e, body, currentUser, mediumToRate);
                    setBody("");
                    }}
                >
                    <label>
                        <span className="smallHeading">Bewertungstext</span>
                    </label>
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
 
export default NewRatingForm;
import { useState } from "react";

const NewRatingForm = () =>{
        const [body, setBody] = useState("");
        const [currentUser, setCurrentUser] = useState(1);
        const [mediumToRate, setMediumToRate] = useState(12);
        const [error, setError] = useState(null);

        const handleSubmitForm = (e, body, currentUser, mediumToRate) => {
            e.preventDefault();
        
            let newRate = {
              desscription: body,
              numberOfPosts: 0,
            //   user: currentUser,
            //   medium: mediumToRate,
              minPoints: 0,
              maxPoints: 5,
              givenPoints: 4,
            };

        
            fetch(`http://localhost:5000/rest/ratings/add`, {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify(newRate),
            }).then(() => {
            //    fetchRatings();
            }).catch(error => {
                setError('Das Formular konnte nicht abgeschickt werden (' + error + ')');
            });
        };
    
    return ( 
        <div>
            <div className="newRatingForm">
                <form className="ratingBody"
                    onSubmit={(e) => {
                    handleSubmitForm(e, body, currentUser, mediumToRate);
                    setBody("");
                    }}
                >
                    <label>
                        <span>Bewertungstext</span>
                    </label>
                    <textarea
                        value={body}
                        onChange={(e) =>{
                            setBody(e.target.value);
                        }}
                        />
                    <button>Absenden</button>
                </form>
            </div>
        </div>
        );
    }
 
export default NewRatingForm;
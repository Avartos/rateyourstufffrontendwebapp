import { useState } from "react";

const rating = () => {

    const NewRatinForm = ({handleSubmitForm}) =>{
        const [title, setTitle] = useState("");
        const [body, setBody] = useState("");
        const [currentUser, setCurrentUser] = useState("");
    
    return ( 
        <div>
            <div className="newRatingForm">
                <form className="ratingBody"
                    onSubmit={(e) => {
                    handleSubmitForm(e, title, body, currentUser);
                    setTitle("");
                    setBody("");
                    }}
                >
                    <label>Titel</label>
                    <input
                    type = "text"
                    requiered
                    value={title}
                    onChange={(e) => {
                        setTitle(e.target.value);
                    }
                    }
                    />

                </form>
            </div>
        </div>
        );
    }
}
 
export default rating;
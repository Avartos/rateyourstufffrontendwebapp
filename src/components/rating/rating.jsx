import { useState } from "react";
import EmojiTextarea from 'react-emoji-textarea';

const Rating = () => {

    const NewRatinForm = ({handleSubmitForm}) =>{
        const [title, setTitle] = useState("");
        const [body, setBody] = useState("");
        const [currentUser, setCurrentUser] = useState("");
        const [mediumToRate, setMediumToRate] = useState("");
    
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

                    <label>
                        <span>Bewertungstext</span>
                    </label>
                    <EmojiTextarea
                        requiered
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
}
 
export default Rating;
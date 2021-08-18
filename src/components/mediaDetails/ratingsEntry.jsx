import React, {useState} from "react";
import ReadOnlyRating from "../rating/readOnlyRating";
import {Divider} from "@material-ui/core";
import CreateIcon from "@material-ui/icons/Create";
import EditRatingForm from "../rating/editRatingForm";
import { useHistory } from "react-router";

const RatingsEntry = ({rating, medium}) => {
    const [toggleEdit, setToggleEdit] = useState(false);
    const [handleError, setHandleError] = useState(null);
    const history = useHistory();

    const handleEditRating = (e, body, currentUser, valueRate, mediumToRate, ratingId) => {
        e.preventDefault();

        let updatedRating = {
            id: ratingId,
            description: body,
            numberOfPosts: 0,
            userMappingId: currentUser,
            mediumMappingId: medium.mediumMappingId,
            givenPoints: valueRate * 2,
        };

        fetch(`http://localhost:5000/rest/ratings`, {
            method: "PUT",
            headers: { "Content-Type": "application/json",
                "Authorization": sessionStorage.getItem("Bearer ")},
            body: JSON.stringify(updatedRating),
        })
            .then((data) => {
                setToggleEdit(false);
                //Reload page, to get updated rating
                history.go();
            })
            .catch((error) => {
                setHandleError(
                    "Das Formular konnte nicht abgeschickt werden (" + handleError + ")"
                );
            });
    };

    return (
        <React.Fragment>
            <h3>{rating.userUserName}</h3>
            <ReadOnlyRating
                size="large"
                value={rating.givenPoints}
                maxValue={rating.max_POINTS}
                showValue={true}
            />
            <label>{rating.description}</label>

            {rating.userId == sessionStorage.getItem("id") &&
            <CreateIcon className="editAndReplyButton" onClick={() => {
                setToggleEdit(!toggleEdit);
                if (toggleEdit === true) {
                    setToggleEdit(!toggleEdit);
                }
            }}>
            </CreateIcon>
            }
            {toggleEdit &&(
                <EditRatingForm handleEditRating={handleEditRating} rating={rating} medium={medium}/>
            )}

            <Divider />
        </React.Fragment>
     );
};
 
export default RatingsEntry;
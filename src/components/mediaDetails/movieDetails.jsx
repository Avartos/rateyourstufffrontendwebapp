import React, {useState} from "react";
import useFetch from "../../hooks/useFetch";
import { useParams } from "react-router-dom";
import ReadOnlyRating from "../rating/readOnlyRating";
import TabBar from "./tabBar";
import Chip from '@material-ui/core/Chip';
import NewRatingForm from "../rating/newRatingForm";
import NewCommentForm from "../comments/newCommentForm";

const MovieDetails = () => {
  const { id } = useParams();
  const {
    data: medium,
    isPending,
    error,
  } = useFetch(`http://localhost:5000/rest/movies/${id}`);
  const [handleError, setHandleError] = useState(null);
  const [handleToggleRating, setHandleToggleRating] = useState(false);

  const handleSubmitFormRating = (e, body, currentUser, mediumToRate) => {
    e.preventDefault();

    let newRate = {
      description: body,
      numberOfPosts: 0,
      userMappingID: currentUser,
      mediumMappingID: medium.id,
      givenPoints: 4,
    };


    fetch(`http://localhost:5000/rest/ratings/add`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newRate),
    }).then((data) => {
      console.log(data);
      //    fetchRatings();
    }).catch(error => {
      setHandleError('Das Formular konnte nicht abgeschickt werden (' + handleError + ')');
    });
  };

  const handleSubmitFormComment = (e, body, currentUser, mediumToComment) => {
    e.preventDefault();

    let newRate = {
      description: body,
      numberOfPosts: 0,
      userMappingID: currentUser,
      mediumMappingID: medium.id,
    };


    fetch(`http://localhost:5000/rest/comments/add`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newRate),
    }).then((data) => {
      console.log(data);
      //    fetchRatings();
    }).catch(error => {
      setHandleError('Das Formular konnte nicht abgeschickt werden (' + handleError + ')');
    });
  };

  return (
    <React.Fragment>
      {!isPending && (
        <div className="mediaDetails">
          <div className="content">
            <div className="head">
              <img
                src={`http://localhost:5000/${medium.picturePath}`}
                alt="poster"
              ></img>
              <div className="details">
                <h2 className="title">{medium.mediumName}</h2>
                <div className="detailField">
                  <span className="smallHeading">Genres</span>
                  <span>
                    {medium.genres.map((genre) => {
                      return <Chip color="secondary" variant="outlined" size="small" label={genre.genreName}/>
                    })}
                  </span>
                </div>

                <div className="detailField">
                  <span className="smallHeading">Sprachen</span>
                  <span>
                    {medium.languages.map((language) => {
                      return (
                        <Chip color="primary" size="small" label={language.language}/>
                      );
                    })}
                  </span>
                </div>

                <div className="detailField">
                  <h3>Handlung</h3>
                  <p className="shortDescription">{medium.shortDescription}</p>
                </div>

                <div className="detailField">
                  <span className="smallHeading">Durchschnittsbewertung</span>
                  <ReadOnlyRating size="large" value={3.5} showValue={true} />
                  <div className="showButton">
                    <button className="primaryButton" onClick={() => {
                      setHandleToggleRating(!handleToggleRating);
                    }}>
                      Neue Bewertung
                    </button>
                    <button className="primaryButton">Neuer Kommentar</button>
                  </div>
                </div>
              </div>
            </div>

            <div className="detailGroup">
              <div className="detailField">
                <span className="smallHeading">Länge</span>
                <span>{medium.length} Minuten</span>
              </div>

              <div className="detailField">
                <span className="smallHeading">Freigegeben ab</span>
                <span>{medium.ageRestriction} Jahren</span>
              </div>

              <div className="detailField">
                <span className="smallHeading">Erschienen</span>
                <span>{medium.releaseDate}</span>
              </div>
            </div>
            {handleToggleRating &&
            <div className="detailGroup">
              <NewRatingForm handleSubmitFormRating={handleSubmitFormRating}></NewRatingForm>
            </div>}
            <div className="detailGroup">
              <NewCommentForm></NewCommentForm>
            </div>
            <div className="body">
                <TabBar handleSubmitFormComment={handleSubmitFormComment}></TabBar>
            </div>
          </div>
        </div>
      )}
    </React.Fragment>
  );
};

export default MovieDetails;

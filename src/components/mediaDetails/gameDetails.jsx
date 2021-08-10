import React, { useState } from "react";
import useFetch from "../../hooks/useFetch";
import { useParams } from "react-router-dom";
import ReadOnlyRating from "../rating/readOnlyRating";
import TabBar from "./tabBar";
import Chip from "@material-ui/core/Chip";
import NewRatingForm from "../rating/newRatingForm";
import NewCommentForm from "../comments/newCommentForm";
import {useHistory} from "react-router-dom";

const HyphenNecessity = (moreThanOnePlayer) => {
  if (moreThanOnePlayer !== null) {
    return "-";
  }
  return;
};

const GameDetails = () => {
  const { id } = useParams();
  const {
    data: medium,
    isPending,
    error,
  } = useFetch(`http://localhost:5000/rest/games/${id}`);

  const history = useHistory();
  const [handleError, setHandleError] = useState(null);
  const [handleToggleRating, setHandleToggleRating] = useState(false);
  const [handleToggleComment, setHandleToggleComment] = useState(false);
  const [ratingCount, setRatingCount] = useState(0);

  const handleSubmitFormRating = (
    e,
    body,
    valueRate,
    currentUser,
    mediumToRate
  ) => {
    e.preventDefault();

    let newRate = {
      description: body,
      numberOfPosts: 0,
      userMappingId: currentUser,
      mediumMappingId: mediumToRate,
      givenPoints: valueRate * 2,
    };

    console.log(newRate);

    fetch(`http://localhost:5000/rest/ratings/add`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newRate),
    })
      .then((data) => {
        console.log(data);
        setHandleToggleRating(false);
        //Reload page, to get actual average rating
        history.go();
        //    fetchRatings();
      })
      .catch((error) => {
        setHandleError(
          "Das Formular konnte nicht abgeschickt werden (" + handleError + ")"
        );
      });
  };

  const handleSubmitFormComment = (e, body, currentUser, mediumToComment) => {
    e.preventDefault();

    let newRate = {
      description: body,
      numberOfPosts: 0,
      userMappingId: currentUser,
      mediumMappingId: mediumToComment,
    };

    fetch(`http://localhost:5000/rest/comments/add`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newRate),
    })
      .then((data) => {
        console.log(data);
        setHandleToggleRating(false);
        //Reload page, to get actual average rating
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
      {!isPending && (
        <div className="mediaDetails">
          <div className="content">
            <div className="head">
              <div className="imageWrapper">
                <img
                  src={`http://localhost:5000/${medium.picturePath}`}
                  alt="poster"
                ></img>
              </div>
              <div className="details">
                <h2 className="title">{medium.mediumName}</h2>
                <div className="detailField">
                  <span className="smallHeading">Genres</span>
                  <span>
                    {medium.genres.map((genre) => {
                      return (
                        <Chip
                          color="secondary"
                          variant="outlined"
                          size="small"
                          label={genre}
                        />
                      );
                    })}
                  </span>
                </div>

                <div className="detailField">
                  <span className="smallHeading">Sprachen</span>
                  <span>
                    {medium.languages.map((language) => {
                      return (
                        <Chip color="primary" size="small" label={language} />
                      );
                    })}
                  </span>
                </div>

                <div className="detailField">
                  <span className="smallHeading">Plattform</span>
                  <span>
                    {medium.platforms.map((platform) => {
                      return (
                        <Chip
                          color="primary"
                          size="small"
                          label={platform.platformTitle}
                        />
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
                  <ReadOnlyRating
                    size="large"
                    value={medium.averageRating}
                    maxValue={medium.max_RATING_POINTS}
                    showValue={true}
                  />

                  <div className="showButton">
                    <button
                      className="primaryButton"
                      onClick={() => {
                        setHandleToggleRating(!handleToggleRating);
                        if (handleToggleComment === true) {
                          setHandleToggleComment(!handleToggleComment);
                        }
                      }}
                    >
                      Neue Bewertung
                    </button>
                    <button
                      className="primaryButton"
                      onClick={() => {
                        setHandleToggleComment(!handleToggleComment);
                        if (handleToggleRating === true) {
                          setHandleToggleRating(!handleToggleRating);
                        }
                      }}
                    >
                      Neuer Kommentar
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <div className="detailGroup">
              <div className="detailField">
                <span className="smallHeading">Spieldauer</span>
                <span>{medium.averagePlaytime} Stunden</span>
              </div>

              <div className="detailField">
                <span className="smallHeading">Freigegeben ab</span>
                <span>{medium.ageRestriction} Jahren</span>
              </div>

              <div className="detailField">
                <span className="smallHeading">Spieleranzahl</span>
                <span>
                  {medium.minNumberOfGamers}{" "}
                  {HyphenNecessity(medium.maxNumberOfGamers)}{" "}
                  {medium.maxNumberOfGamers} Spieler{" "}
                </span>
              </div>

              <div className="detailField">
                <span className="smallHeading">Erschienen</span>
                <span>{medium.releaseDate}</span>
              </div>
            </div>

            {handleToggleRating && (
              <div className="detailGroup">
                <NewRatingForm
                  handleSubmitFormRating={handleSubmitFormRating}
                  medium={medium}
                ></NewRatingForm>
              </div>
            )}

            {handleToggleComment && (
              <div className="detailGroup">
                <NewCommentForm
                  handleSubmitFormComment={handleSubmitFormComment}
                  medium={medium}
                ></NewCommentForm>
              </div>
            )}

            <div className="body">
              <TabBar ratingCount={ratingCount} mediumId={id}></TabBar>
            </div>
          </div>
        </div>
      )}
    </React.Fragment>
  );
};

export default GameDetails;

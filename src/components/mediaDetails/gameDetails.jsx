import React, { useEffect, useState } from "react";
import useFetch from "../../hooks/useFetch";
import { useParams } from "react-router";
import ReadOnlyRating from "../rating/readOnlyRating";
import TabBar from "./tabBar";
import Chip from "@material-ui/core/Chip";
import NewRatingForm from "../rating/newRatingForm";
import NewCommentForm from "../comments/newCommentForm";
import { useHistory } from "react-router";
import { Button } from "@material-ui/core";
import SmallCollectionList from "./smallCollectionList";
import AddMediumToCollectionForm from "../collections/addMediumToCollectionForm";
import helper from "../../core/helper";
import { ReactComponent as PencilIcon } from "../../icons/pencil.svg";
import authorization from "../../core/authorization";

const HyphenNecessity = (moreThanOnePlayer) => {
  if (moreThanOnePlayer !== null) {
    return "-";
  }
  return;
};

const GameDetails = ({handleAddMessage}) => {
  const { id } = useParams();

  const history = useHistory();
  const [handleError, setHandleError] = useState(null);
  const [handleToggleRating, setHandleToggleRating] = useState(false);
  const [handleToggleComment, setHandleToggleComment] = useState(false);
  const [ratingCount, setRatingCount] = useState(0);
  const [commentCount, setCommentCount] = useState(0);

  const [medium, setMedium] = useState();
  const [isPending, setIsPending] = useState(true);

  const fetchMedium = () => {
    setIsPending(true);
    fetch(`http://localhost:5000/rest/games/${id}`)
    .then(res => {
      if(!res.ok) {
        throw Error ('Fehler beim Abrufen des Mediums');
      }
      return res.json();
    })
    .then(data => {
      setMedium(data);
      setIsPending(false);
    })
    .catch(error => {
      handleAddMessage('error', 'Fehler', error.message);
      history.push('/404');
    })
  }

  useEffect(fetchMedium,[]);

  const fetchRatingCount = () => {
    fetch(`http://localhost:5000/rest/ratings/count/${id}`)
      .then((res) => {
        if (!res.ok) {
          throw Error("unable to fetch ratingcounts");
        }
        return res.json();
      })
      .then((data) => {
        setRatingCount(data);
      })
      .catch((error) => {
        console.error(error);
      });
  };
  useEffect(fetchRatingCount, []);

  const fetchCommentCount = () => {
    fetch(`http://localhost:5000/rest/comments/count/${id}`)
      .then((res) => {
        if (!res.ok) {
          throw Error("unable to fetch commentcounts");
        }
        return res.json();
      })
      .then((data) => {
        setCommentCount(data);
      })
      .catch((error) => {
        console.error(error);
      });
  };
  useEffect(fetchCommentCount, []);

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

    fetch(`http://localhost:5000/rest/ratings/add`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: sessionStorage.getItem("Bearer "),
      },
      body: JSON.stringify(newRate),
    })
      .then((data) => {
        setHandleToggleRating(false);
        handleAddMessage('success', 'Erfolg', 'Die Bewertung wurde angelegt');
        fetchMedium();
      })
      .catch((error) => {
        handleAddMessage('error', 'Fehler', 'Der Kommentar konnte nicht angelegt werden');

      });
  };

  const handleSubmitFormComment = (e, body, currentUser, mediumToComment) => {
    e.preventDefault();

    let newComment = {
      textOfComment: body,
      numberOfPosts: 0,
      userMappingId: currentUser,
      mediumMappingId: mediumToComment,
    };

    fetch(`http://localhost:5000/rest/comments/add`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: sessionStorage.getItem("Bearer "),
      },
      body: JSON.stringify(newComment),
    })
      .then((data) => {
        setHandleToggleComment(false);
        handleAddMessage('success', 'Erfolg', 'Der Kommentar wurde hizugefügt');
        fetchMedium();
      })
      .catch((error) => {
        handleAddMessage('error', 'Fehler', 'Der Kommentar konnte nicht angelegt werden');
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
                <div className="titleWithEdit">
                  <h2 className="title">{medium.mediumName}</h2>
                    {authorization.isLoggedIn() && <span className="mediumEditButton"
                      onClick={() => {history.push(`/edit/game/${id}`);}}>
                      <PencilIcon />
                    </span>}
                </div>
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
                        <Chip color="primary" size="small" label={platform} />
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

                  {authorization.isLoggedIn() && <div className="showButton">
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
                  </div>}
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
                  handleAddMessage={handleAddMessage}
                ></NewRatingForm>
              </div>
            )}

            {handleToggleComment && (
              <div className="detailGroup">
                <NewCommentForm
                  handleSubmitFormComment={handleSubmitFormComment}
                  medium={medium}
                  handleAddMessage={handleAddMessage}
                ></NewCommentForm>
              </div>
            )}

            <div className="body">
              <TabBar
                ratingCount={ratingCount}
                mediumId={id}
                medium={medium}
                commentCount={commentCount}
                handleAddMessage={handleAddMessage}
              ></TabBar>
            </div>

            <div className="detailGroup">
              <span className="heading">Verwandte Sammlungen</span>
              <SmallCollectionList mediumId={id} />
            </div>
          </div>
        </div>
      )}
    </React.Fragment>
  );
};

export default GameDetails;

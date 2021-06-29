import React from "react";
import useFetch from "../../hooks/useFetch";
import { useParams } from "react-router-dom";
import ReadOnlyRating from "../rating/readOnlyRating";
import TabBar from "./tabBar";
import Chip from '@material-ui/core/Chip';

const MovieDetails = () => {
  const { id } = useParams();
  const {
    data: medium,
    isPending,
    error,
  } = useFetch(`http://localhost:5000/rest/movies/${id}`);

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
                </div>
              </div>
            </div>

            <div className="detailGroup">
              <div className="detailField">
                <span className="smallHeading">Spieldauer</span>
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

            <div className="body">
                <TabBar></TabBar>
            </div>
          </div>
        </div>
      )}
    </React.Fragment>
  );
};

export default MovieDetails;

import React from "react";
import { withStyles } from "@material-ui/core/styles";
import MuiAccordion from "@material-ui/core/Accordion";
import MuiAccordionSummary from "@material-ui/core/AccordionSummary";
import MuiAccordionDetails from "@material-ui/core/AccordionDetails";
import Typography from "@material-ui/core/Typography";
import useFetch from "../hooks/useFetch";
import ReadOnlyRating from "./rating/readOnlyRating";
import { Button } from "@material-ui/core";
import { useHistory } from "react-router";
import { ReactComponent as PencilIcon } from "../icons/pencil.svg";
import authorization from "../core/authorization";

const Accordion = withStyles({
  root: {
    border: "1px solid rgba(0, 0, 0, .925)",
    backgroundColor: "rgba(69, 69, 69, 1)",
    color: "white",
    boxShadow: "none",
    "&:not(:last-child)": {
      borderBottom: 0,
    },
    "&:before": {
      display: "none",
    },
    "&$expanded": {
      margin: "auto",
    },
  },
  expanded: {},
})(MuiAccordion);

const AccordionSummary = withStyles({
  root: {
    backgroundColor: "rgba(84, 84, 84, 1)",
    borderBottom: "1px solid rgba(0, 0, 0, .925)",
    marginBottom: -1,
    minHeight: 56,
    "&$expanded": {
      minHeight: 56,
    },
  },
  content: {
    "&$expanded": {
      margin: "12px 0",
    },
  },
  expanded: {},
})(MuiAccordionSummary);

const AccordionDetails = withStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
  },
}))(MuiAccordionDetails);

export default function CustomizedAccordions({ seasonId }) {
  const [expanded, setExpanded] = React.useState("panel1");
  const history = useHistory();

  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };

  const {
    data: episodes,
    isPending,
    error,
  } = useFetch(`http://localhost:5000/rest/episodes/season/${seasonId}`);

  return (
    <div>
      <div className="EditSeasonIcon">
        {authorization.isLoggedIn() && <span 
          onClick={() => {history.push(`/edit/season/${seasonId}`);}}><PencilIcon />
        </span>}
      </div>
      {!isPending &&
        episodes.map((episode) => {
          return (
            <Accordion
              key={`episode${episode.id}`}
              className="Accordion"
              square
              expanded={expanded === episode.episodeNumber}
              onChange={handleChange(episode.episodeNumber)}
            >
              <AccordionSummary
                className="AccordionSummary"
                aria-controls="panel1d-content"
                id="panel1d-header"
              >
                <Typography>
                  {episode.episodeNumber}. {episode.mediumName}
                  {authorization.isLoggedIn() && (
                    <Button
                      className="editButton"
                      onClick={() => {
                        history.push(`/edit/episode/${episode.id}`);
                      }}
                    >
                      Bearbeiten
                    </Button>
                  )}
                </Typography>
              </AccordionSummary>
              <AccordionDetails
                onClick={() => {
                  history.push(`/detail/episode/${episode.id}`);
                }}
              >
                <Typography>
                  <div className="episodeDetailDisplay">
                    <div className="episodeDetailDisplayLeft">
                      <img
                        className="episodeImg"
                        src={`http://localhost:5000/${episode.picturePath}`}
                        alt="poster"
                      ></img>
                    </div>

                    <div className="episodeDetailDisplayMiddle">
                      <div className="episodeDetailGroup">
                        <div className="episodeDetailField">
                          <span className="smallHeading"></span>
                          <span>{episode.releaseDate}</span>
                        </div>
                        <div className="episodeDetailField">
                          <span className="smallHeading"></span>
                          <span>{episode.length} Minuten</span>
                        </div>
                    
                      </div>

                      <div className="episodeDetailField">
                        <p className="shortDescription">
                          {episode.shortDescription}
                        </p>
                      </div>
                    </div>

                    <div className="episodeDetailDisplayRight">
                      <div className="episodeDetailField">
                        <span className="smallHeading">
                          Durchschnittsbewertung
                        </span>
                        <ReadOnlyRating
                          size="large"
                          value={episode.averageRating}
                          maxValue={episode.max_RATING_POINTS}
                          showValue={true}
                        />
                      </div>
                    </div>
                  </div>
                </Typography>
              </AccordionDetails>
            </Accordion>
          );
        })}
      {authorization.isLoggedIn() && (
        <React.Fragment>
          <p>Ist die gesuchte Episode noch nicht vorhanden?</p>
          <Button
            variant="contained"
            color="primary"
            onClick={() => history.push(`/add/episode/${seasonId}`)}
          >
            Neue Episode hinzuf??gen
          </Button>
        </React.Fragment>
      )}
    </div>
  );
}

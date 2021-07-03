import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import MuiAccordion from '@material-ui/core/Accordion';
import MuiAccordionSummary from '@material-ui/core/AccordionSummary';
import MuiAccordionDetails from '@material-ui/core/AccordionDetails';
import Typography from '@material-ui/core/Typography';
import useFetch from "../hooks/useFetch";

const Accordion = withStyles({
  root: {
    border: '1px solid rgba(0, 0, 0, .925)',
    backgroundColor: 'rgba(82, 82, 84, 1)',
    color: 'white',
    boxShadow: 'none',
    '&:not(:last-child)': {
      borderBottom: 0,
    },
    '&:before': {
      display: 'none',
    },
    '&$expanded': {
      margin: 'auto',
    },
  },
  expanded: {},
})(MuiAccordion);

const AccordionSummary = withStyles({
  root: {
    backgroundColor: 'rgba(94, 94, 94, 1)',
    borderBottom: '1px solid rgba(0, 0, 0, .925)',
    marginBottom: -1,
    minHeight: 56,
    '&$expanded': {
      minHeight: 56,
    },
  },
  content: {
    '&$expanded': {
      margin: '12px 0',
    },
  },
  expanded: {},
})(MuiAccordionSummary);

const AccordionDetails = withStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
  },
}))(MuiAccordionDetails);

export default function CustomizedAccordions({seasonId}) {
  const [expanded, setExpanded] = React.useState('panel1');

  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };

  const {
    data: episodes,
    isPending,
    error,
  } = useFetch(`http://localhost:5000/rest/episodes/season/${seasonId}`);
  console.log(episodes)
  return (
    <div>
      {!isPending && 
      episodes.map(episode=> { 
        return(<Accordion className="Accordion" square expanded={expanded === episode.episodeNumber} onChange={handleChange(episode.episodeNumber)}>
        <AccordionSummary className="AccordionSummary" aria-controls="panel1d-content" id="panel1d-header">
          <Typography>{episode.mediumName}</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            Bild<br/>
            Altersfreigabe<br/>
            Länge: <br/>
            Sprachen<br/>
            Handlung<br/>  
          </Typography>
        </AccordionDetails>
      </Accordion>)
      })
      }
    </div>
  );
}
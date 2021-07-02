import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import MuiAccordion from '@material-ui/core/Accordion';
import MuiAccordionSummary from '@material-ui/core/AccordionSummary';
import MuiAccordionDetails from '@material-ui/core/AccordionDetails';
import Typography from '@material-ui/core/Typography';
import EpisodeDetails from '../components/mediaDetails/episodeDetails';


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

export default function CustomizedAccordions({medium}) {
  const [expanded, setExpanded] = React.useState('panel1');

  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };

  return (
    <div>
      { medium != null && medium.seasons.map((episodeMap) => {
        episodeMap.map((detail) => {
          console.log("FUCK" + detail)
        })
        
      })}
      <Accordion className="Accordion" square expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
        <AccordionSummary className="AccordionSummary" aria-controls="panel1d-content" id="panel1d-header">
          <Typography>Folge #1 (Titel)</Typography>
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
      </Accordion>
      {/* <Accordion square expanded={expanded === 'panel2'} onChange={handleChange('panel2')}>
        <AccordionSummary aria-controls="panel2d-content" id="panel2d-header">
          <Typography>Folge #2 (Titel)</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            Bild<br/>
            Altersfreigabe<br/>
            Länge<br/>
            Sprachen<br/>
            Handlung<br/>  
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion square expanded={expanded === 'panel3'} onChange={handleChange('panel3')}>
        <AccordionSummary aria-controls="panel3d-content" id="panel3d-header">
          <Typography>Folge #3 (Titel)</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            Bild<br/>
            Altersfreigabe<br/>
            Länge<br/>
            Sprachen<br/>
            Handlung<br/>  
          </Typography>
        </AccordionDetails>
      </Accordion> */}
    </div>
  );
}
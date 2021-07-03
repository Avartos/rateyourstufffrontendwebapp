import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Accordion from '../components/accordion';
import useFetch from "../hooks/useFetch";



function TabPanel(props) {
  const { children, value, index, ...other } = props;
  
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    
  },
}));

export default function SimpleTabs({seriesId}) {
  const {
    data: seasons,
    isPending,
    error,
  } = useFetch(`http://localhost:5000/rest/seasons/series/${seriesId}`);

  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Tabs value={value} onChange={handleChange} aria-label="simple tabs example">
          {!isPending && seasons.map(season=>{
            return <Tab label={season.seasonTitle} key={season.id} {...a11yProps(0)} />
          })}
          
        </Tabs>
      </AppBar>
      {!isPending && seasons.map(season=>{
            return <TabPanel value={value} index={season.seasonNumber -1}>
            <Accordion seasonId= {season.id}></Accordion>
            </TabPanel>
          })}
    </div>
  );
}
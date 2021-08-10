import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import React, {useEffect, useState} from "react";
import TabPanel from "./tabPanel";
import RatingList from "./ratingsList";

const TabBar = ({ratingCount, mediumId}) => {
    const [ratings, setRatings] = useState([]);
    const [comments, setComments] = useState([]);
    const numberOfRatingsPerPage = 2;
    const numberOfCommentsPerPage = 2;
    const [currentRatingPage, setCurrentRatingPage] = useState(0);
    const [currentCommentPage, setCurrentCommentPage] = useState(0);

  const [value, setValue] = useState(0);
  const fetchRatingsFromMedium = () => {
      fetch(`http://localhost:5000/rest/ratings/all/medium/${mediumId}?page=${currentRatingPage}&size=${numberOfRatingsPerPage}`)
          .then ( res => {
                  if (!res.ok){
                      throw Error("unable to fetch ratings");
                  }
                  return res.json()
              }
          )
          .then (data => {
              setRatings([...ratings,...data]);
              setCurrentRatingPage(currentRatingPage+1)
          })
          .catch (error => {
              console.error(error);
          })
  };
  useEffect(()=>{
      fetchRatingsFromMedium();
  },[]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <React.Fragment>
      <Tabs
        value={value}
        onChange={handleChange}
        aria-label="simple tabs example"
      >
        <Tab label= {`Bewertungen (${ratingCount})`} />
        <Tab label="Kommentare" />
      </Tabs>
        {value === 0 && <RatingList ratings={ratings} handleFetchRatings={fetchRatingsFromMedium}>Bewertungen</RatingList>}

      {value === 1 && <TabPanel>Kommentare</TabPanel>}
    </React.Fragment>

  );
};

export default TabBar;

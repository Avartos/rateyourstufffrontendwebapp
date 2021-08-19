import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import TabPanel from "./tabPanel";
import React, { useEffect, useState } from "react";
import RatingList from "./ratingsList";
import CommentList from "./commentList";

const TabBar = ({
  ratingCount,
  commentCount,
  medium,
  mediumId,
  handleAddMessage,
}) => {
  const [ratings, setRatings] = useState([]);

  const numberOfRatingsPerPage = 2;
  const [currentRatingPage, setCurrentRatingPage] = useState(0);
  const [showValue, setShowValue] = useState(0);

  const [value, setValue] = useState(0);

  const fetchRatingsFromMedium = (isInitialFetch = false) => {
    const currentPage = isInitialFetch ? 0 : currentRatingPage;

    fetch(
      `http://localhost:5000/rest/ratings/all/medium/${mediumId}?page=${currentPage}&size=${numberOfRatingsPerPage}`
    )
      .then((res) => {
        if (!res.ok) {
          throw Error("unable to fetch ratings");
        }
        return res.json();
      })
      .then((data) => {
        if (isInitialFetch) {
          setRatings(data);
        } else {
          setRatings([...ratings, ...data]);
        }
        setCurrentRatingPage(currentPage + 1);
      })
      .catch((error) => {
        handleAddMessage(
          "error",
          "Fehler",
          "Beim Abrufen der Bewertungen ist ein Fehler aufgetreten"
        );
        console.error(error);
      });
  };
  useEffect(() => {
    fetchRatingsFromMedium();
  }, []);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleReloadData = () => {
    setCurrentRatingPage(0);
    fetchRatingsFromMedium(true);
  };

  return (
    <React.Fragment>
      <Tabs
        value={value}
        onChange={handleChange}
        aria-label="simple tabs example"
      >
        <Tab label={`Bewertungen (${medium.numberOfRatings})`} />
        <Tab label={`Kommentare (${medium.numberOfComments})`} />
      </Tabs>
      <TabPanel value={value} index={0}>
        {showValue === 0 && (
          <RatingList
            ratings={ratings}
            medium={medium}
            handleFetchRatings={fetchRatingsFromMedium}
            handleReloadData={handleReloadData}
            handleAddMessage={handleAddMessage}
          >
            Bewertungen
          </RatingList>
        )}
      </TabPanel>

      <TabPanel value={value} index={1}>
        {showValue === 0 && (
          <CommentList
            medium={medium}
            handleReloadData={handleReloadData}
            handleAddMessage={handleAddMessage}
          >
            Kommentare
          </CommentList>
        )}
      </TabPanel>
    </React.Fragment>
  );
};

export default TabBar;

import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import TabPanel from "./tabPanel";
import React, { useEffect, useState } from "react";
import RatingList from "./ratingsList";
import CommentList from "./commentList";

const TabBar = ({ ratingCount, commentCount, medium, mediumId }) => {
  const [ratings, setRatings] = useState([]);
  const [comments, setComments] = useState([]);
  const numberOfRatingsPerPage = 2;
  const numberOfCommentsPerPage = 2;
  const [showValue, setShowValue] = useState(0);
  const [currentRatingPage, setCurrentRatingPage] = useState(0);
  const [currentCommentPage, setCurrentCommentPage] = useState(0);

  const [value, setValue] = useState(0);

  const fetchRatingsFromMedium = (isInitialFetch = false) => {
    const currentPage = isInitialFetch ? 0 : currentCommentPage;

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
        console.error(error);
      });
  };
  useEffect(() => {
    fetchRatingsFromMedium();
  }, []);

  const fetchCommentsFromMedium = (isInitialFetch = false) => {
    const currentPage = isInitialFetch ? 0 : currentCommentPage;
    fetch(
      `http://localhost:5000/rest/comments/all/medium/${mediumId}?page=${currentPage}&size=${numberOfCommentsPerPage}`
    )
      .then((res) => {
        if (!res.ok) {
          throw Error("unable to fetch ratings");
        }
        return res.json();
      })
      .then((data) => {
        if (isInitialFetch) {
          setComments(data);
        } else {
          setComments([...comments, ...data]);
        }
        setCurrentCommentPage(currentPage + 1);
      })
      .catch((error) => {
        console.error(error);
      });
  };
  useEffect(() => {
    fetchCommentsFromMedium();
  }, []);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleReloadData = () => {
    setCurrentRatingPage(0);
    setCurrentCommentPage(0);
    fetchCommentsFromMedium(true);
    fetchRatingsFromMedium(true);
  };

  return (
    <React.Fragment>
      <Tabs
        value={value}
        onChange={handleChange}
        aria-label="simple tabs example"
      >
        <Tab label={`Bewertungen (${ratingCount})`} />
        <Tab label={`Kommentare (${commentCount})`} />
      </Tabs>
      <TabPanel value={value} index={0}>
        {showValue === 0 && (
          <RatingList
            ratings={ratings}
            medium={medium}
            handleFetchRatings={fetchRatingsFromMedium}
            handleReloadData={handleReloadData}
          >
            Bewertungen
          </RatingList>
        )}
      </TabPanel>

      <TabPanel value={value} index={1}>
        {showValue === 0 && (
          <CommentList
            comments={comments}
            handleFetchComments={fetchCommentsFromMedium}
            medium={medium}
            handleReloadData={handleReloadData}
          >
            Kommentare
          </CommentList>
        )}
      </TabPanel>
    </React.Fragment>
  );
};

export default TabBar;

import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import TabPanel from "./tabPanel";
import React, {useEffect, useState} from "react";
import RatingList from "./ratingsList";
import CommentList from "./commentList";

const TabBar = ({ratingCount,commentCount, medium, mediumId}) => {
    const [ratings, setRatings] = useState([]);
    const [comments, setComments] = useState([]);
    const numberOfRatingsPerPage = 2;
    const numberOfCommentsPerPage = 2;
    const [showValue, setShowValue] = useState(0);
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

    const fetchCommentsFromMedium = () => {
        fetch(`http://localhost:5000/rest/comments/all/medium/${mediumId}?page=${currentCommentPage}&size=${numberOfCommentsPerPage}`)
            .then ( res => {
                    if (!res.ok){
                        throw Error("unable to fetch ratings");
                    }
                    return res.json()
                }
            )
            .then (data => {
                setComments([...comments,...data]);
                setCurrentCommentPage(currentCommentPage+1)
            })
            .catch (error => {
                console.error(error);
            })
    };
    useEffect(()=>{
        fetchCommentsFromMedium();
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
        <Tab label={`Kommentare (${commentCount})`}/>
      </Tabs>
        <TabPanel value={value} index={0}>
            {showValue === 0 && <RatingList ratings={ratings} medium={medium} handleFetchRatings={fetchRatingsFromMedium}>Bewertungen</RatingList>}
        </TabPanel>

        <TabPanel value={value} index={1}>
            {showValue === 0 && <CommentList comments={comments} handleFetchComments={fetchCommentsFromMedium} medium={medium}>Kommentare</CommentList>}
        </TabPanel>

    </React.Fragment>

  );
};

export default TabBar;

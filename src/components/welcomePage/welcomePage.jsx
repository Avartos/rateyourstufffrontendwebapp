import React from "react";
import MediaSpotlightList from "./mediaSpotlightList";

const WelcomePage = () => {
  
  const numberOfEntries = 7;
  const orderBy = 'releaseDate';
  const order = 'desc';
  
  return (
    <div className="spotlightWrapper">
        <MediaSpotlightList fetchURL={`http://localhost:5000/rest/movies/all?page=0&size=${numberOfEntries}&orderBy=${orderBy}&order=${order}`} title="Filme"/>
        <br />
        <MediaSpotlightList fetchURL={`http://localhost:5000/rest/books/all?page=0&size=${numberOfEntries}&orderBy=${orderBy}&order=${order}`} title="Bücher"/>
        <br />
        <MediaSpotlightList fetchURL={`http://localhost:5000/rest/series/all?page=0&size=${numberOfEntries}&orderBy=${orderBy}&order=${order}`} title="Serien"/>
        <br />
        <MediaSpotlightList fetchURL={`http://localhost:5000/rest/games/all?page=0&size=${numberOfEntries}&orderBy=${orderBy}&order=${order}`} title="Spiele"/>
        <br />
    </div>
  );
};

export default WelcomePage;

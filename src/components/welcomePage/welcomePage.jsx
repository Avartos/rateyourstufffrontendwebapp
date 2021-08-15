import React from "react";
import MediaSpotlightList from "./mediaSpotlightList";

const WelcomePage = () => {
  
  const numberOfEntries = 5;
  const orderBy = 'releaseDate';
  const order = 'desc';
  const server = 'http://localhost:5000/rest';
  
  return (
    <div className="spotlightWrapper">
        <MediaSpotlightList mediaType={'movie'} linkTarget="movies" fetchURL={`${server}/movies/all?page=0&size=${numberOfEntries}&orderBy=${orderBy}&order=${order}`} title="Filme"/>
        <br />
        <MediaSpotlightList mediaType={'book'}  linkTarget="books" fetchURL={`${server}/books/all?page=0&size=${numberOfEntries}&orderBy=${orderBy}&order=${order}`} title="Bücher"/>
        <br />
        <MediaSpotlightList mediaType={'series'} linkTarget="series" fetchURL={`${server}/series/all?page=0&size=${numberOfEntries}&orderBy=${orderBy}&order=${order}`} title="Serien"/>
        <br />
        <MediaSpotlightList mediaType={'game'}  linkTarget="games" fetchURL={`${server}/games/all?page=0&size=${numberOfEntries}&orderBy=${orderBy}&order=${order}`} title="Spiele"/>
        <br />
    </div>
  );
};

export default WelcomePage;

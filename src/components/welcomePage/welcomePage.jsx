import React from "react";
import MediaSpotlightList from "./mediaSpotlightList";

const WelcomePage = () => {
  return (
    <div className="spotlightWrapper">
      <MediaSpotlightList
        fetchURL={"http://localhost:5000/movies-rest/all"}
        title="Filme"
      />
      <br />
        <MediaSpotlightList fetchURL={"http://localhost:5000/books-rest/all"} title="Bücher"/>
        <br />
        <MediaSpotlightList fetchURL={"http://localhost:5000/series-rest/all"} title="Serien"/>
        <br />
        <MediaSpotlightList fetchURL={"http://localhost:5000/games-rest/all"} title="Spiele"/>
        <br />
        <MediaSpotlightList fetchURL={"http://localhost:5000/episodes-rest/all"} title="Episoden"/>
    </div>
  );
};

export default WelcomePage;

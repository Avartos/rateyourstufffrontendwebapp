import { ReactComponent as HomeIcon } from "../icons/home.svg";
import { ReactComponent as NewsIcon } from "../icons/news.svg";
import { ReactComponent as HistoryIcon } from "../icons/history.svg";
import { ReactComponent as MyAccountIcon } from "../icons/myAccount.svg";
import { ReactComponent as MyFriendsIcon } from "../icons/myFriends.svg";
import { ReactComponent as MyRatingsIcon } from "../icons/myRatings.svg";
import { ReactComponent as MoviesIcon } from "../icons/movies.svg";
import { ReactComponent as SeriesIcon } from "../icons/series.svg";
import { ReactComponent as BooksIcon } from "../icons/books.svg";
import { ReactComponent as GamesIcon } from "../icons/games.svg";
import { ReactComponent as OptionsIcon } from "../icons/options.svg";
import CollectionsIcon from "@material-ui/icons/Collections";
import AddCircleIcon from "@material-ui/icons/AddCircle";

import { CSSTransition } from "react-transition-group";
import React, { useState } from "react";
import ToggleLink from "./toggleLink";
import helper from "../core/helper";

function Togglebar(props) {
  return (
    <CSSTransition in={true} classNames="leftNavs" timeout={200}>
      <div className="leftNavigation">
        <ToggleLink
          title="Home"
          target="/"
          handleSetVisible={props.handleSetVisible}
        >
          <HomeIcon />
        </ToggleLink>

        <ToggleLink
          title="News"
          target="/news"
          handleSetVisible={props.handleSetVisible}
        >
          <NewsIcon />
        </ToggleLink>

        <ToggleLink
          title="History"
          target="/history"
          handleSetVisible={props.handleSetVisible}
        >
          <HistoryIcon />
        </ToggleLink>
        <hr width="95%" align="center" size="1"></hr>
        {helper.isLoggedIn() && (
          <React.Fragment>
            <ToggleLink
              title="Mein Konto"
              target="/myAccount"
              handleSetVisible={props.handleSetVisible}
            >
              <MyAccountIcon />
            </ToggleLink>

            <ToggleLink
              title="Freunde"
              target="/myFriends"
              handleSetVisible={props.handleSetVisible}
            >
              <MyFriendsIcon />
            </ToggleLink>

            <ToggleLink
              title="Bewertungen"
              target="/myRatings"
              handleSetVisible={props.handleSetVisible}
            >
              <MyRatingsIcon />
            </ToggleLink>

            <ToggleLink
              title="Meine Sammlungen"
              target="/collections"
              handleSetVisible={props.handleSetVisible}
            >
              <CollectionsIcon />
            </ToggleLink>

            <hr width="95%" align="center" size="1"></hr>
          </React.Fragment>
        )}

        <ToggleLink
          title="Filme"
          target="/media/movies"
          handleSetVisible={props.handleSetVisible}
        >
          <MoviesIcon />
        </ToggleLink>

        <ToggleLink
          title="Serien"
          target="/media/series"
          handleSetVisible={props.handleSetVisible}
        >
          <SeriesIcon />
        </ToggleLink>

        <ToggleLink
          title="Bücher"
          target="/media/books"
          handleSetVisible={props.handleSetVisible}
        >
          <BooksIcon />
        </ToggleLink>

        <ToggleLink
          title="Spiele"
          target="/media/games"
          handleSetVisible={props.handleSetVisible}
        >
          <GamesIcon />
        </ToggleLink>
        {helper.isLoggedIn() && (
          <ToggleLink
            title="Medium anlegen"
            target="/add"
            handleSetVisible={props.handleSetVisible}
          >
            <AddCircleIcon />
          </ToggleLink>
        )}

        <hr width="95%" align="center" size="1"></hr>
        <ToggleLink
          title="Options"
          target="/options"
          handleSetVisible={props.handleSetVisible}
        >
          <OptionsIcon />
        </ToggleLink>
      </div>
    </CSSTransition>
  );
}

export default Togglebar;

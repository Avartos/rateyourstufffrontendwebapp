import { ReactComponent as HomeIcon } from '../icons/home.svg';
import { ReactComponent as NewsIcon } from '../icons/news.svg';
import { ReactComponent as HistoryIcon } from '../icons/history.svg';
import { ReactComponent as MyAccountIcon } from '../icons/myAccount.svg';
import { ReactComponent as MyFriendsIcon } from '../icons/myFriends.svg';
import { ReactComponent as MyRatingsIcon } from '../icons/myRatings.svg';
import { ReactComponent as MyStuffIcon } from '../icons/myStuff.svg';
import { ReactComponent as MoviesIcon } from '../icons/movies.svg';
import { ReactComponent as SeriesIcon } from '../icons/series.svg';
import { ReactComponent as BooksIcon } from '../icons/books.svg';
import { ReactComponent as GamesIcon } from '../icons/games.svg';
import { ReactComponent as OptionsIcon } from '../icons/options.svg';

import { CSSTransition } from 'react-transition-group';
import { Link } from 'react-router-dom';
import React, { useState, useEffect, useRef } from 'react';

function Togglebar(props) {
    const [isVisible, setIsVisible] = useState();
    
    return (
      
      <CSSTransition 
        in={isVisible}
        classNames="leftNavs"
        timeout={200}>
        <div className="leftNavigation">
          <div className="toggleLink">
            <p className="icon-button">{<HomeIcon />}</p>
            <Link to="/">Home</Link>
          </div>
          {/* <div className="toggleLink">
            <p className="icon-button">{<NewsIcon />}</p>
            <Link to="/news">News</Link>
          </div>
          <div className="toggleLink">
            <p className="icon-button">{<HistoryIcon />}</p>
            <Link to="/history">History</Link>
          </div> */}
          < hr width="95%" align="center" size="1" ></hr>
          <div className="toggleLink">
            <p className="icon-button">{<MyAccountIcon />}</p>
            <Link to="/userPanel">myAccount</Link>
          </div>
          <div className="toggleLink">
            <p className="icon-button">{<MyFriendsIcon />}</p>
            <Link to="/login">Login</Link>
          </div>
          <div className="toggleLink">
            <p className="icon-button">{<MyRatingsIcon />}</p>
            <Link to="/signup">Sign Up</Link>
          </div>
          {/* <div className="toggleLink">
            <p className="icon-button">{<MyStuffIcon />}</p>
            <Link to="/myStuff">myStuff</Link>
          </div> */}
          < hr width="95%" align="center" size="1" ></hr>
          <div className="toggleLink">
            <p className="icon-button">{<MoviesIcon />}</p>
            <Link to="/movies">Movies</Link>
          </div>
          <div className="toggleLink">
            <p className="icon-button">{<SeriesIcon />}</p>
            <Link to="/series">Series</Link>
          </div>
          <div className="toggleLink">
            <p className="icon-button">{<BooksIcon />}</p>
            <Link to="/books">Books</Link>
          </div>
          <div className="toggleLink">
            <p className="icon-button">{<GamesIcon />}</p>
            <Link to="/games">Games</Link>
          </div>
          < hr width="95%" align="center" size="1" ></hr>
          <div className="toggleLink">
            <p className="icon-button">{<OptionsIcon />}</p>
            <Link to="/options">Options</Link>
          </div>
      </div>
    </CSSTransition>
    );
  }

  function TogglebarLinks(props) {
    return (
      <a href="#" className="menu-item" onClick={() => <Link to="/">Home</Link>}>
        <span className="icon-button">{props.leftIcon}</span>
        {props.children}
      </a>
    );
  }

export default Togglebar
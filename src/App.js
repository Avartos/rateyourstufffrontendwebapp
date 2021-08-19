
// functional imports
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";
import authorization from "./core/authorization";

//component imports
import './App.css';
import './assets/css/app.scss';
import HeaderBar from './components/headerBar';
import WelcomePage from './components/welcomePage/welcomePage';
import SignUp from "./components/userManagement/signUp";
import AdminPanel from "./components/userManagement/adminPanel";
import UserPanel from "./components/userManagement/userPanel";
import MovieDetails from './components/mediaDetails/movieDetails';
import BookDetails from './components/mediaDetails/bookDetails';
import SeriesDetails from './components/mediaDetails/seriesDetails';
import GameDetails from './components/mediaDetails/gameDetails';
import EpisodeDetails from './components/mediaDetails/episodeDetails';
import Login from "./components/userManagement/login";
import AddMovieForm from './components/newMediaForms/addMovieForm';
import AddMediaForm from './components/newMediaForms/addMediaForm';
import AddBookForm from "./components/newMediaForms/addBookForm";
import AddGameForm from "./components/newMediaForms/addGameForm";

import MediaList from "./components/mediaLists/mediaList";
import SearchResultList from "./components/mediaLists/searchResultList";

import Logout from "./components/userManagement/logout";
import AddSeriesForm from "./components/newMediaForms/addSeriesForm";
import AddEpisodeForm from "./components/newMediaForms/addEpisodeForm";
import EditMovieForm from "./components/editMediaForms/editMovieForm";
import EditBookForm from "./components/editMediaForms/editBookForm";
import EditGameForm from "./components/editMediaForms/editGameForm";
import EditSeriesForm from "./components/editMediaForms/editSeriesForm";
import EditEpisodeForm from "./components/editMediaForms/editEpisodeForm"
import { useState } from "react";

import EditSeasonForm from "./components/editMediaForms/editSeasonForm";
import AddCollectionForm from "./components/collections/addCollectionForm";
import CollectionDetails from "./components/collections/collectionDetails";
import CollectionList from "./components/collections/collectionList";
import helper from "./core/helper";
import MessageList from "./components/messageList/messageList";
import MediaCollectionList from "./components/collections/mediaCollectionList";

function App() {

  // contains all alerts that can be added by different components.
  const [messages, setMessages] = useState([]);

  /**
   * Adds an alert to the alert list
   * @param {*} severity The type of alert (error, success, info)
   * @param {*} title  The title of the alert, can be empty
   * @param {*} body The main text of the alert
   */
  const handleAddMessage = (severity, title, body) => {
    const newMessage = {
      id: new Date().getUTCMilliseconds(),
      severity: severity,
      title: title,
      body: body,
    };
    setMessages([...messages, newMessage]);
  };

  /**
   * Removes an alert by the given id
   * @param {*} messageId the id of the alert that should be removed
   */
  const handleRemoveMessage = (messageId) => {
    const filteredMessages = messages.filter((message) => {
      return message.id !== messageId;
    });
    setMessages([...filteredMessages]);
  };

  return (
    <Router basename={"rateyourstufffrontendwebapp"}>
      <MessageList messages={messages} handleRemoveMessage={handleRemoveMessage} />
      <div className="App">
        <HeaderBar />
        <Switch>
          <Route exact path={["/", "/rateyourstufffrontendwebapp"]}><WelcomePage handleAddMessage={handleAddMessage} /></Route>
          <Route exact path="/detail/movie/:id"><MovieDetails handleAddMessage={handleAddMessage} /></Route>
          <Route exact path="/detail/book/:id"><BookDetails handleAddMessage={handleAddMessage} /></Route>
          <Route exact path="/detail/series/:id"><SeriesDetails handleAddMessage={handleAddMessage} /></Route>
          <Route exact path="/detail/game/:id"><GameDetails handleAddMessage={handleAddMessage} /></Route>
          <Route exact path="/detail/episode/:id"><EpisodeDetails handleAddMessage={handleAddMessage} /></Route>
          <Route exact path="/media/movies"><MediaList title="Filme" urlPath="movies/all" mediaType={'movie'} handleAddMessage={handleAddMessage} /></Route>
          <Route exact path="/media/series"><MediaList title="Serien" urlPath="series/all" mediaType={'series'} handleAddMessage={handleAddMessage} /></Route>
          <Route exact path="/media/books"><MediaList title="Bücher" urlPath="books/all" mediaType={'book'} handleAddMessage={handleAddMessage} /></Route>
          <Route exact path="/media/games"><MediaList title="Spiele" urlPath="games/all" mediaType={'game'} handleAddMessage={handleAddMessage} /></Route>
          <Route exact path="/searchResults"><SearchResultList /></Route>
          {!authorization.isLoggedIn() && <Route path="/signup"><SignUp handleAddMessage={handleAddMessage} /></Route>}
          {authorization.isAdmin() && <Route path="/adminpanel"><AdminPanel handleAddMessage={handleAddMessage} /></Route>}
          {authorization.isUser() && <Route path="/myAccount"><UserPanel handleAddMessage={handleAddMessage} /></Route>}
          {!authorization.isLoggedIn() && <Route path="/login"><Login handleAddMessage={handleAddMessage} /></Route>}
          {authorization.isLoggedIn() && <Route path="/login"><WelcomePage handleAddMessage={handleAddMessage} /></Route>}

          {/* Media Creation */}

          {helper.isLoggedIn() && <Route exact path="/add"><AddMediaForm /></Route>}
          {helper.isLoggedIn() && <Route path="/add/movie"><AddMovieForm handleAddMessage={handleAddMessage}></AddMovieForm></Route>}
          {helper.isLoggedIn() && <Route path="/add/book"><AddBookForm handleAddMessage={handleAddMessage}></AddBookForm></Route>}
          {helper.isLoggedIn() && <Route path="/add/series"><AddSeriesForm handleAddMessage={handleAddMessage}></AddSeriesForm></Route>}
          {helper.isLoggedIn() && <Route path="/add/episode/:id" exact><AddEpisodeForm handleAddMessage={handleAddMessage} /></Route>}
          {helper.isLoggedIn() && <Route path="/add/game"><AddGameForm handleAddMessage={handleAddMessage} /></Route>}
          {!helper.isLoggedIn() && <Route path="/add"><WelcomePage handleAddMessage={handleAddMessage} /></Route>}

          {/* Media Editing */}
          {helper.isLoggedIn() && <Route path="/edit/movie/:id"><EditMovieForm handleAddMessage={handleAddMessage} /></Route>}
          {helper.isLoggedIn() && <Route path="/edit/book/:id"><EditBookForm handleAddMessage={handleAddMessage} /></Route>}
          {helper.isLoggedIn() && <Route path="/edit/game/:id"><EditGameForm handleAddMessage={handleAddMessage} /></Route>}
          {helper.isLoggedIn() && <Route path="/edit/series/:id"><EditSeriesForm handleAddMessage={handleAddMessage} /></Route>}
          {helper.isLoggedIn() && <Route path="/edit/episode/:id"><EditEpisodeForm handleAddMessage={handleAddMessage} /></Route>}
          {helper.isLoggedIn() && <Route path="/edit/season/:id"><EditSeasonForm handleAddMessage={handleAddMessage} /></Route>}
          {!helper.isLoggedIn() && <Route path="/edit"><WelcomePage handleAddMessage={handleAddMessage} /></Route>}

          {/* Collection Handling */}
          {helper.isLoggedIn() && <Route path="/collection/add"><AddCollectionForm handleAddMessage={handleAddMessage} /></Route>}
          <Route path="/collections/medium/:id"><MediaCollectionList handleAddMessage={handleAddMessage} /></Route>
          <Route path="/collection/:id"><CollectionDetails handleAddMessage={handleAddMessage} /></Route>
          {helper.isLoggedIn() && <Route path="/collections"><CollectionList handleAddMessage={handleAddMessage} /></Route>}
          {!helper.isLoggedIn() && <Route path="/collections"><WelcomePage handleAddMessage={handleAddMessage} /></Route>}

          {helper.isLoggedIn() && <Route path="/logout"><Logout /></Route>}
          <Route path="/">
            <h1>404 - Not Found</h1><br />
          </Route>
        </Switch>

      </div>

    </Router>
  );
}

export default App;

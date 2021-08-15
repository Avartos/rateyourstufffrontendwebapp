
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
import Login from "./components/userManagement/login";
import AddMovieForm from './components/newMediaForms/addMovieForm';
import AddMediaForm from './components/newMediaForms/addMediaForm';
import AddBookForm from "./components/newMediaForms/addBookForm";
import AddGameForm from "./components/newMediaForms/addGameForm";

import MediaList from "./components/mediaLists/mediaList";

import Logout from "./components/userManagement/logout";
import AddSeriesForm from "./components/newMediaForms/addSeriesForm";
import AddEpisodeForm from "./components/newMediaForms/addEpisodeForm";
import EditMovieForm from "./components/editMediaForms/editMovieForm";
import EditBookForm from "./components/editMediaForms/editBookForm";
import EditGameForm from "./components/editMediaForms/editGameForm";
import EditSeriesForm from "./components/editMediaForms/editSeriesForm";
import EditEpisodeForm from "./components/editMediaForms/editEpisodeForm"

import EditSeasonForm from "./components/editMediaForms/editSeasonForm";
import AddCollectionForm from "./components/collections/addCollectionForm";
import CollectionDetails from "./components/collections/collectionDetails";
import CollectionList from "./components/collections/collectionList";
import helper from "./core/helper";

function App() {
  return (
    <Router>
      <div className="App">
        <HeaderBar />
        <Switch>
          <Route exact path={["/", "/rateyourstufffrontendwebapp"]}><WelcomePage></WelcomePage></Route>
          <Route exact path="/detail/movie/:id"><MovieDetails/></Route>
          <Route exact path="/detail/book/:id"><BookDetails/></Route>
          <Route exact path="/detail/series/:id"><SeriesDetails/></Route>
          <Route exact path="/detail/game/:id"><GameDetails/></Route>
          <Route exact path="/media/movies"><MediaList title="Filme" urlPath="movies/all" mediaType={'movie'}/></Route>
          <Route exact path="/media/series"><MediaList title="Serien" urlPath="series/all" mediaType={'series'}/></Route>
          <Route exact path="/media/books"><MediaList title="Bücher" urlPath="books/all" mediaType={'book'}/></Route>
          <Route exact path="/media/games"><MediaList title="Spiele" urlPath="games/all" mediaType={'game'}/></Route>
          {!authorization.isLoggedIn() && <Route path="/signup"><SignUp/></Route>}
          {authorization.isAdmin() && <Route path="/adminpanel"><AdminPanel/></Route>}
          {authorization.isUser() && <Route path="/userPanel"><UserPanel/></Route>}
          {!authorization.isLoggedIn() && <Route path="/login"><Login/></Route>}

          {/* Media Creation */}

          {helper.isLoggedIn() && <Route exact path="/add"><AddMediaForm /></Route>}
          {helper.isLoggedIn() && <Route path="/add/movie"><AddMovieForm></AddMovieForm></Route>}
          {helper.isLoggedIn() && <Route path="/add/book"><AddBookForm></AddBookForm></Route>}
          {helper.isLoggedIn() && <Route path="/add/series"><AddSeriesForm></AddSeriesForm></Route>}
          {helper.isLoggedIn() && <Route path="/add/episode/:id" exact><AddEpisodeForm/></Route>}
          {helper.isLoggedIn() && <Route path="/add/game"><AddGameForm/></Route>}
          
          {/* Media Editing */}
          {helper.isLoggedIn() && <Route path="/edit/movie/:id"><EditMovieForm/></Route>}
          {helper.isLoggedIn() && <Route path="/edit/book/:id"><EditBookForm/></Route>}
          {helper.isLoggedIn() && <Route path="/edit/game/:id"><EditGameForm/></Route>}
          {helper.isLoggedIn() && <Route path="/edit/series/:id"><EditSeriesForm/></Route>}
          {helper.isLoggedIn() && <Route path="/edit/episode/:id"><EditEpisodeForm/></Route>}
          {helper.isLoggedIn() && <Route path="/edit/season/:id"><EditSeasonForm/></Route>}

          {/* Collection Handling */}
          {helper.isLoggedIn() && <Route path="/collection/add"><AddCollectionForm/></Route>}
          <Route path="/collection/:id"><CollectionDetails/></Route>
          <Route path="/collections"><CollectionList/></Route>

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

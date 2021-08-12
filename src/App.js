
// functional imports
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";

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

function App() {

  return (
    <Router>
      <div className="App">
        <HeaderBar />
        <Switch>
          <Route exact path="/"><WelcomePage></WelcomePage></Route>
          <Route exact path="/detail/movie/:id"><MovieDetails/></Route>
          <Route exact path="/detail/book/:id"><BookDetails/></Route>
          <Route exact path="/detail/series/:id"><SeriesDetails/></Route>
          <Route exact path="/detail/game/:id"><GameDetails/></Route>
          <Route exact path="/media/movies"><MediaList title="Filme" urlPath="movies/all" mediaType={'movie'}/></Route>
          <Route exact path="/media/series"><MediaList title="Serien" urlPath="series/all" mediaType={'series'}/></Route>
          <Route exact path="/media/books"><MediaList title="Bücher" urlPath="books/all" mediaType={'book'}/></Route>
          <Route exact path="/media/games"><MediaList title="Spiele" urlPath="games/all" mediaType={'game'}/></Route>
          <Route path="/signup" ><SignUp /></Route>
          <Route path="/adminpanel"><AdminPanel /></Route>
          <Route path="/userPanel"><UserPanel /></Route>
          <Route path="/login"><Login /></Route>

          {/* Media Creation */}
          <Route exact path="/add"><AddMediaForm /></Route>
          <Route path="/add/movie"><AddMovieForm></AddMovieForm></Route>
          <Route path="/add/book"><AddBookForm></AddBookForm></Route>
          <Route path="/add/series"><AddSeriesForm></AddSeriesForm></Route>
          <Route path="/add/episode/:id" exact><AddEpisodeForm/></Route>
          <Route path="/add/game"><AddGameForm/></Route>

          {/* Media Editing */}
          <Route path="/edit/movie/:id"><EditMovieForm/></Route>
          <Route path="/edit/book/:id"><EditBookForm/></Route>
          <Route path="/edit/game/:id"><EditGameForm/></Route>

          <Route path="/logout"><Logout /></Route>
          <Route path="/">
            <h1>404 - Not Found</h1><br />
          </Route>
        </Switch>
        
      </div>
    </Router>
  );
}

export default App;

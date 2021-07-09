
import './App.css';
import './assets/css/app.scss';
import HeaderBar from './components/headerBar';
import WelcomePage from './components/welcomePage/welcomePage';
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";
import SignUp from "./components/userManagement/signUp";
import AdminPanel from "./components/userManagement/adminPanel";
import UserPanel from "./components/userManagement/userPanel";
import MovieDetails from './components/mediaDetails/movieDetails';
import BookDetails from './components/mediaDetails/bookDetails';
import SeriesDetails from './components/mediaDetails/seriesDetails';
import GameDetails from './components/mediaDetails/gameDetails';
import Login from "./components/userManagement/login";
import NewRatingForm from './components/rating/newRatingForm';


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
          <Route path="/signup"><SignUp /></Route>
          <Route path="/adminpanel"><AdminPanel /></Route>
          <Route path="/userPanel"><UserPanel /></Route>
          <Route path="/login"><Login /></Route>
          <Route path="/">
            <h1>404 - Not Found</h1><br />
          </Route>
        </Switch>
        
      </div>
    </Router>
  );
}

export default App;


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
import SearchResults from "./components/searchResults";
import NewRatingForm from './components/rating/newRatingForm';



function App() {
  // const media = [
  //   { id: '1', name: 'This first post is about React' },
  //   { id: '2', name: 'This next post is about Preact' },
  //   { id: '3', name: 'We have yet another React post!' },
  //   { id: '4', name: 'This is the fourth and final post' },
  // ];
  // const { search } = window.location;
  // const query = new URLSearchParams(search).get('s');
  // const filterMedia = (media, query) => {
  //   if (!query) {
  //       return media;
  //   }

  //   return media.filter((medium) => {
  //       const mediumName = medium.name.toLowerCase();
  //       return mediumName.includes(query);
  //   });
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
          <Route path="/searchResults"><SearchResults /></Route>
          <Route path="/">
            <h1>404 - Not Found</h1><br />
          </Route>
        </Switch>
        {/* <div>
            <searchBar />
            <ul>
                {media.map((medium) => (
                    <li key={medium.id}>{medium.name}</li>
                ))}
            </ul>
        </div> */}
      </div>
    </Router>
  );
}

export default App;

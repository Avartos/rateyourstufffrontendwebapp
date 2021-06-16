
import './App.css';
import './assets/css/app.scss';
import HeaderBar from './components/headerBar';
import GameList from './components/gameList';
import MovieList from './components/movieList';
import BookList from './components/bookList';
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";

function App() {
  return (
    <Router>
      <div className="App">
        <HeaderBar />
        <div class="mediaListWrapper">
          <GameList />
          <MovieList  />
          <BookList />
        </div>
      </div>
    </Router>
  );
}

export default App;

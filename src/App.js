
import './App.css';
import './assets/css/app.scss';
import HeaderBar from './components/headerBar';
import WelcomePage from './components/welcomePage/welcomePage';
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";
import SignUp from "./components/userManagement/signUp";
import AdminPanel from "./components/userManagement/adminPanel";
import UserPanel from "./components/userManagement/userPanel";

import MovieDetails from './components/mediaDetails/movieDetails';

function App() {

  return (
    <Router>
      <div className="App">
        <HeaderBar />
        <Switch>
          <Route exact path="/"><WelcomePage></WelcomePage></Route>
          <Route exact path="/detail/movie/:id"><MovieDetails/></Route>
          <Route path="/signup"><SignUp /></Route>
          <Route path="/adminpanel"><AdminPanel /></Route>
          <Route path="/userPanel"><UserPanel /></Route>
          <Route path="/">
            <h1>404 - Not Found</h1><br />
          </Route>
        </Switch>
        
      </div>
    </Router>
  );
}

export default App;

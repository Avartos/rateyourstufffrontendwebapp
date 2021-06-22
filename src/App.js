
import './App.css';
import './assets/css/app.scss';
import HeaderBar from './components/headerBar';
import WelcomePage from './components/welcomePage/welcomePage';
import signUp from "./components/userManagement/signUp";
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";
import SignUp from "./components/userManagement/signUp";


function App() {

  return (
    <Router>
      <div className="App">
        <HeaderBar />
        <Switch>
          <Route exact path="/"><WelcomePage></WelcomePage></Route>
          <Route exact path="/detail/:id"><h1>Work in Progress...vielleicht</h1></Route>
          <Route path="/signup"><SignUp /></Route>
          <Route path="/">
            <h1>404 - Not Found</h1><br />
          </Route>
        </Switch>
        
      </div>
    </Router>
  );
}

export default App;

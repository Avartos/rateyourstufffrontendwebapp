
import './App.css';
import './assets/css/app.scss';
import HeaderBar from './components/headerBar';
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";

function App() {
  return (
    <Router>
      <div className="App">
        <HeaderBar />
      </div>
    </Router>
  );
}

export default App;

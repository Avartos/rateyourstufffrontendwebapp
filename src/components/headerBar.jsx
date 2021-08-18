import { Link,useHistory } from "react-router-dom";
import { ReactComponent as MenuIcon } from '../icons/menu.svg';

import React, { useState, useEffect, useRef } from 'react';

import SearchBar from './searchBar';
import Togglebar from './togglebar';
import authorization from "../core/authorization";


const HeaderBar = () => {
    const history = useHistory();
    /**
     * Logout handler
     */
    const handleLogout = () => {
        sessionStorage.clear();
        history.go('/');
    }

    const [toggleBarIsVisible, setToggleBarIsVisible] = useState(false);

    return (
        <nav className="navbar">
          <div className="leftside">
            <NavItem icon={<MenuIcon />} isVisible={toggleBarIsVisible} handleSetVisible={setToggleBarIsVisible}>
              <Togglebar handleSetVisible={setToggleBarIsVisible}></Togglebar>
            </NavItem>
            <Link className="link" to="/"><h2>rateYourStuff</h2></Link>
          </div>
          <SearchBar/>
            {!authorization.isLoggedIn() && <Link className="link right" to="/signup">SignUp</Link>}
            {authorization.isLoggedIn() && <span className="link right" onClick={handleLogout}>Logout</span>}
            {!authorization.isLoggedIn() && <Link className="link right" to="/login">Login</Link>}
            <div className="gradient"></div>
        </nav>
     );
}

function NavItem(props) {

  return (
    <li className="nav-item">
      <span className="icon-button" onClick={() => props.handleSetVisible(!props.isVisible)}>{props.icon}</span>
      {props.isVisible && props.children}
    </li>
  );
}

export default HeaderBar;
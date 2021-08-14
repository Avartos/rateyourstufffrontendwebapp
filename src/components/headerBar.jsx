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
    return (
        <nav className="navbar">
          <div className="leftside">
            <NavItem icon={<MenuIcon />}>
              <Togglebar></Togglebar>
            </NavItem>
            <Link className="link" to="/"><h2>rateYourStuff</h2></Link>
          </div>
          <SearchBar/>
            {!authorization.isLoggedIn() && <Link className="link right" to="/signup">SignUp</Link>}
            {authorization.isLoggedIn() && <Link className="link right" onClick={handleLogout}>Logout</Link>}
            {!authorization.isLoggedIn() && <Link className="link right" to="/login">Login</Link>}
            {console.log("IsAdmin: " + authorization.isAdmin())}
            <div className="gradient"></div>
        </nav>
     );
}

function NavItem(props) {
  const [open, setOpen] = useState(false);

  return (
    <li className="nav-item">
      <a href="#" className="icon-button" onClick={() => setOpen(!open)}>
        {props.icon}
      </a>

      {open && props.children}
    </li>
  );
}

export default HeaderBar;
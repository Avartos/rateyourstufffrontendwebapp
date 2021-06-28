import { Link } from "react-router-dom";
import { ReactComponent as MenuIcon } from '../icons/menu.svg';

import React, { useState, useEffect, useRef } from 'react';

import SearchBar from './searchBar';
import Togglebar from './togglebar';


const HeaderBar = () => {
    return ( 
        <nav className="navbar">
          <div className="leftside">
            <NavItem icon={<MenuIcon />}>
              <Togglebar></Togglebar>
            </NavItem>
            <h2>RateYourStuff</h2>
          </div>
          <SearchBar/>
            <p>
                home
            </p>
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
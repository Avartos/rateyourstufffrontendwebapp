import React from 'react';

// const SearchBar = ({keyword,setKeyword}) => {
//   const BarStyling = {width:"20rem",background:"#F2F1F9", border:"none", padding:"0.5rem"};
//   return (
//     <input className="searchBar"
//      style={BarStyling}
//      key="random1"
//      value={keyword}
//      placeholder={"search media"}
//      onChange={(e) => setKeyword(e.target.value)}
//     />
    
//   );
// }

const SearchBar = () => (
  <form className="searchBar" action="searchResults/" method="get">
    <label htmlFor="header-search">
            <span className="visually-hidden">Search media</span>
        </label>
        <input
            type="text"
            id="header-search"
            placeholder="search media"
            name="s" 
        />
        <button className="submitButton" type="submit">Search</button>
  </form>
)

export default SearchBar
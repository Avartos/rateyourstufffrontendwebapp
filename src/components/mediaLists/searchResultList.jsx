import React, { useState, useEffect } from "react";
import MediaEntry from "../welcomePage/mediaEntry";



import {useLocation} from "react-router";
import { SpaRounded } from "@material-ui/icons";


const SearchList = () => {
    const [media, setMedia] = useState([]);
    const [isPending, setIsPending] = useState(true);
    const [error, setError] = useState(null);
    const [offset, setOffset] = useState(0);
    const [buttonIsVisible, setButtonIsVisible] = useState(true);
    const search = useLocation().search;
    const searchParam = new URLSearchParams(search).get('s');
    
    const entriesPerPage = 10;
  
    const fetchMedia = (cleanFetch = false, page = offset) => {
        const encodedParams = encodeURI(searchParam);
      fetch(
        `http://localhost:5000/rest/searchResults?s=${encodedParams}`
      )
        .then((res) => {
          if (!res.ok) {
            throw Error("Fehler beim Laden");
          }
          return res.json();
        })
        .then((data) => {
          setOffset(page + 1);
          setIsPending(false);
          if (cleanFetch) {
            setMedia(data);
          } else {
            setMedia([...media, ...data]);
          }
          setButtonIsVisible(data.length >= entriesPerPage);
        })
        .catch((error) => {
          console.error(error);
        });
    };
  
    useEffect(() => {
      fetchMedia(true, 0);
    }, []);
  
    const handleLoadMore = () => {
      fetchMedia();
    };
  
    return (
      <div className="list">
        <h1>searchResults</h1>
        <div className="largeMediaList">
          {!isPending && !error && <span>Ihre Suche erzielte leider keine Treffer!</span>}
          {!isPending &&
            !error &&
            media.map((medium) => {
              return (
                <MediaEntry
                  medium={medium}
                  key={medium.id}
                  mediaType={medium.mediaType}
                />
              );
            })}
        </div>
  
        {!isPending && buttonIsVisible && (
          <button className="primaryButton" onClick={handleLoadMore}>Mehr Laden...</button>
        )}
      </div>
    );
  };
export default SearchList;
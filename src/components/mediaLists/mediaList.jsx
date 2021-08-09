import React, { useState, useEffect } from "react";
import MediaEntry from "../welcomePage/mediaEntry";

const MediaList = ({ urlPath, title, mediaType }) => {
  const [media, setMedia] = useState([]);
  const [isPending, setIsPending] = useState(true);
  const [error, setError] = useState(null);
  const [offset, setOffset] = useState(0);
  const [buttonIsVisible, setButtonIsVisible] = useState(true);

  const entriesPerPage = 2;

  const fetchMedia = (cleanFetch = false, page = offset) => {
    console.log(`http://localhost:5000/rest/${urlPath}?page=${page}&size=${entriesPerPage}`);
    fetch(
      `http://localhost:5000/rest/${urlPath}?page=${page}&size=${entriesPerPage}`
    )
      .then((res) => {
        if (!res.ok) {
          throw Error("Fehler beim Laden");
        }
        return res.json();
      })
      .then((data) => {
        setOffset(page + 1);
        console.log(data);
        setIsPending(false);
        if (cleanFetch) {
          setMedia(data);
        } else {
          setMedia([...media, ...data]);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  useEffect(() => {
    fetchMedia(true, 0);
  }, [urlPath]);

  const handleLoadMore = () => {
    fetchMedia();
  };

  return (
    <div className="largeMediaList">
      <h1>{title}</h1>
      {!isPending &&
        !error &&
        media.map((medium) => {
          return (
            <MediaEntry medium={medium} key={medium.id} mediaType={mediaType} />
          );
        })}

      {!isPending && buttonIsVisible && (
        <button onClick={handleLoadMore}>Mehr Laden...</button>
      )}
    </div>
  );
};

export default MediaList;

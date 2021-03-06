import React, { useState, useEffect } from "react";
import MediaEntry from "../welcomePage/mediaEntry";

/**
 * This component is used to list media.
 * It offers a button to load more media, if there is more than the specified amount of media per page
 * @param {*} param0
 * @returns
 */
const MediaList = ({ urlPath, title, mediaType, handleAddMessage }) => {
  const [media, setMedia] = useState([]);
  const [isPending, setIsPending] = useState(true);
  const [error, setError] = useState(null);
  const [offset, setOffset] = useState(0);
  const [buttonIsVisible, setButtonIsVisible] = useState(true);

  const entriesPerPage = 25;

  const fetchMedia = (cleanFetch = false, page = offset) => {
    fetch(
      `http://localhost:5000/rest/${urlPath}?page=${page}&size=${entriesPerPage}&orderBy=releaseDate&order="asc`
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
        handleAddMessage("error", "Fehler", error.message);
      });
  };

  useEffect(() => {
    fetchMedia(true, 0);
  }, [urlPath]);

  const handleLoadMore = () => {
    fetchMedia();
  };

  return (
    <div className="list">
      <h1>{title}</h1>
      <div className="largeMediaList">
        {!isPending &&
          !error &&
          media.map((medium) => {
            return (
              <MediaEntry
                medium={medium}
                key={medium.id}
                mediaType={mediaType}
              />
            );
          })}
      </div>

      {!isPending && buttonIsVisible && (
        <button className="primaryButton" onClick={handleLoadMore}>
          Mehr Laden...
        </button>
      )}
    </div>
  );
};

export default MediaList;

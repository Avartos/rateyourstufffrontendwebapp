import helper from "../../core/helper";
import { useState } from "react";
import { useEffect } from "react";
import Collection from "./collection";
import React from "react";
import { Button } from "@material-ui/core";
import AddCollectionForm from "./addCollectionForm";
import { Link, useParams } from "react-router-dom";

/**
 * This component can be used to display all collections of a certain user
 * @param {*} param0 
 * @returns 
 */
const MediaCollectionList = ({ handleAddMessage }) => {
  const [collections, setCollections] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const COLLECTIONS_PER_PAGE = 15;
  const [isCollectionFormVisible, setIsCollectionFormVisible] = useState(false);
  const {id: mediumId} = useParams();
  const [mediumName, setMediumName] = useState('');
  const [mediaType, setMediaType] = useState('');
  const [isLoadMoreButtonVisible, setIsLoadMoreButtonVisible] = useState(true);

  const fetchMedium = () => {
    fetch(`http://localhost:5000/rest/media/${mediumId}`)
    .then(res => {
        if(!res.ok) {
            throw Error ('Fehler beim Abrufen des Mediums');
        }
        return res.json();
    })
    .then(data => {
        setMediumName(data.mediumName);
        setMediaType(data.mediaType);
    })
    .catch(error => {
        handleAddMessage('error', 'Fehler', error.message);
    }) 
  }

  const fetchCollections = () => {
    fetch(
      `http://localhost:5000/rest/collections/medium/${mediumId}?size=${COLLECTIONS_PER_PAGE}&page=${currentPage}`
    )
      .then((res) => {
        if (!res.ok) {
          throw Error("Fehler beim Abrufen der Sammlungen");
        }
        return res.json();
      })
      .then((data) => {
        if(data.length < COLLECTIONS_PER_PAGE) {
            setIsLoadMoreButtonVisible(false);
        }
        setCollections([...collections, ...data]);
        setCurrentPage(currentPage+1);
      })
      .catch((err) => {
        console.error(err);
        handleAddMessage("error", "Fehler", err.message);
      });
  };

  useEffect(() => {
    fetchCollections();
    fetchMedium();
  }, []);

  return (
    <div className="collectionListWrapper">
      <h1>Sammlungen mit "{mediumName}"</h1>
      <Link className="link" to={`/detail/${mediaType}/${mediumId}`}>Zurück</Link>

      <div className="collectionList">
        {collections.map((collection) => {
          return <Collection key={`${collection.title}${collection.id}`} collection={collection} />;
        })}
      </div>

      {isLoadMoreButtonVisible && <Button onClick={fetchCollections}>Mehr anzeigen</Button>}
    </div>
  );
};

export default MediaCollectionList;

import helper from "../../core/helper";
import { useState } from "react";
import { useEffect } from "react";
import Collection from "./collection";
import React from "react";
import { Button } from "@material-ui/core";
import AddCollectionForm from "./addCollectionForm";

/**
 * This component can be used to display all collections of a certain user
 * @param {*} param0 
 * @returns 
 */
const CollectionList = ({ handleAddMessage }) => {
  const [collections, setCollections] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const COLLECTIONS_PER_PAGE = 15;
  const [isCollectionFormVisible, setIsCollectionFormVisible] = useState(false);
  const [isLoadMoreButtonVisible, setIsLoadMoreButtonVisible] = useState(true);

  const fetchCollections = (isInitialFetch = false) => {
    const currentCollectionPage = isInitialFetch ? 0 : currentPage;
    fetch(
      `http://localhost:5000/rest/collections/user/${helper.getUserId()}?size=${COLLECTIONS_PER_PAGE}&page=${currentCollectionPage}`
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
        if(isInitialFetch) {
          setCollections(data);
        } else {
          setCollections([...collections, ...data]);
        }
        setCurrentPage(currentCollectionPage+1);
      })
      .catch((err) => {
        console.error(err);
        handleAddMessage("error", "Fehler", err.message);
      });
  };

  useEffect(fetchCollections, []);

  const handleCloseForm = () => {
    setIsCollectionFormVisible(false);
    fetchCollections(true);
  };

  return (
    <div className="collectionListWrapper">
      <h1>Meine Sammlungen</h1>
      <Button
        onClick={() => {
          setIsCollectionFormVisible(!isCollectionFormVisible);
        }}
      >
        {!isCollectionFormVisible
          ? "Neue Sammlung anlegen"
          : "Formular schließen"}
      </Button>
      {isCollectionFormVisible && (
        <AddCollectionForm handleCloseForm={handleCloseForm}/>
      )}
      <div className="collectionList">
        {collections.map((collection) => {
          return <Collection key={collection.id} collection={collection} />;
        })}
      </div>
      {isLoadMoreButtonVisible && <Button onClick={fetchCollections}>Mehr anzeigen...</Button>}
    </div>
  );
};

export default CollectionList;

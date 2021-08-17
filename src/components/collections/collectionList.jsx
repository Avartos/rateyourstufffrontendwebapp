import helper from "../../core/helper";
import { useState } from "react";
import { useEffect } from "react";
import Collection from "./collection";
import React from "react";
import { Button } from "@material-ui/core";
import { useHistory } from "react-router-dom";
import AddCollectionForm from "./addCollectionForm";

const CollectionList = () => {
  const [collections, setCollections] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const COLLECTIONS_PER_PAGE = 15;
  const [isCollectionFormVisible, setIsCollectionFormVisible] = useState(false);

  const fetchCollections = ({ handleAddMessage }) => {
    fetch(
      `http://localhost:5000/rest/collections/user/${helper.getUserId()}?size=${COLLECTIONS_PER_PAGE}&page=${currentPage}`
    )
      .then((res) => {
        if (!res.ok) {
          throw Error('Fehler beim Abrufen der Sammlungen');
        }
        return res.json();
      })
      .then((data) => {
        setCollections(data);
      })
      .catch((err) => {
        console.error(err);
        handleAddMessage("error", "Fehler", err.message);
      });
  };

  useEffect(fetchCollections, []);

  const handleCloseForm = () => {
    setIsCollectionFormVisible(false);
    fetchCollections();
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
        <AddCollectionForm handleCloseForm={handleCloseForm} />
      )}
      <div className="collectionList">
        {collections.map((collection) => {
          return <Collection key={collection.id} collection={collection} />;
        })}
      </div>
    </div>
  );
};

export default CollectionList;

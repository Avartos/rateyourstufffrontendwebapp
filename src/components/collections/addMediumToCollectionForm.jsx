import helper from "../../core/helper";
import { Button } from "@material-ui/core";
import { useState } from "react";
import { useEffect } from "react";
import { Autocomplete } from "@material-ui/lab";
import { TextField } from "@material-ui/core";
import React from "react";

const AddMediumToCollectionForm = ({ mediumId, handleUpdateCollectionData, handleAddMessage }) => {
  const [collections, setCollections] = useState([]);
  const [isAddToCollectionVisible, setIsAddToCollectionVisible] =
    useState(false);

  const [currentCollection, setCurrentCollection] = useState(null);

  const fetchCollections = () => {
    fetch(
      `http://localhost:5000/rest/collections/user/${helper.getUserId()}/medium/${mediumId}`
    )
      .then((res) => {
        if (!res.ok) {
          throw Error("Unable to fetch Collections");
        }
        return res.json();
      })
      .then((data) => {
        setCollections(data);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const handleAddToCollection = () => {
    fetch(
      `http://localhost:5000/rest/collections/${currentCollection.id}/medium/${mediumId}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: sessionStorage.getItem("Bearer "),
        },
      }
    )
      .then((res) => {
        if (!res.ok) {
          throw Error("Unable to update collection");
        }
        return res.json();
      })
      .then((data) => {
        handleUpdateCollectionData();
        setCurrentCollection(null);
        fetchCollections();

      })
      .catch((err) => {
        console.error(err);
      });
  };

  useEffect(fetchCollections, []);

  return (
    <React.Fragment>
      {collections.length > 0 && (
        <div className="addMediumToCollectionForm">
          <span>Dieses Medium zu einer Sammlung hinzufügen?</span>
          <div className="collectionSelection">
            <Autocomplete
              id="combo-box-demo"
              options={collections}
              getOptionLabel={(option) => option ? option.title : ''}
              style={{ width: 300 }}
              value={currentCollection}
              onChange={(e, value) => {
                setCurrentCollection(value);
              }}
              renderInput={(params) => (
                <TextField {...params} label="Combo box" variant="outlined"/>
              )}
            />
            {currentCollection && (
              <Button onClick={handleAddToCollection} variant="contained" color="primary">Hinzufügen</Button>
            )}
          </div>
        </div>
      )}
    </React.Fragment>
  );
};

export default AddMediumToCollectionForm;

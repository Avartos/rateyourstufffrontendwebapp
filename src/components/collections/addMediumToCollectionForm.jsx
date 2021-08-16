import helper from "../../core/helper";
import { Button } from "@material-ui/core";
import { useState } from "react";
import { useEffect } from "react";
import { Autocomplete } from "@material-ui/lab";
import { TextField } from "@material-ui/core";
import React from "react";

const AddMediumToCollectionForm = ({ mediumId }) => {
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
      `http://localhost:5000/rest/collections/${currentCollection}/medium/${mediumId}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
      .then((res) => {
        if (!res.ok) {
          throw Error("Unable to update collection");
        }
        return res.json();
      })
      .then((data) => {})
      .catch((err) => {
        console.error(err);
      });
  };

  useEffect(fetchCollections, []);

  return (
    <React.Fragment>
      {collections.length > 0 && (
        <div className="addMediumToCollectionForm">
          {console.log(collections)}
          <Button onClick={() => setIsAddToCollectionVisible(true)}>
            Medium zu einer Sammlung hinzufügen
          </Button>
          <div className="collectionSelection">
            <Autocomplete
              id="combo-box-demo"
              options={collections}
              getOptionLabel={(option) => option.title}
              style={{ width: 300 }}
              onChange={(e, value) => {
                setCurrentCollection(value ? value.id : null);
              }}
              renderInput={(params) => (
                <TextField {...params} label="Combo box" variant="outlined" />
              )}
            />
            {currentCollection && (
              <Button onClick={handleAddToCollection}>Hinzufügen</Button>
            )}
          </div>
        </div>
      )}
    </React.Fragment>
  );
};

export default AddMediumToCollectionForm;

import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import Collection from "../collections/collection";
import authorization from "../../core/authorization";
import AddMediumToCollectionForm from "../collections/addMediumToCollectionForm";
import { useHistory } from "react-router";
import { Button } from "@material-ui/core";

const SmallCollectionList = ({ mediumId }) => {
  const [collections, setCollections] = useState([]);
  const history = useHistory();

  const MAX_NUMBER_OF_COLLECTIONS = 5;

  const fetchCollections = () => {
    fetch(
      `http://localhost:5000/rest/collections/medium/${mediumId}?size=${MAX_NUMBER_OF_COLLECTIONS}`
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

  useEffect(fetchCollections, []);

  return (
    <React.Fragment>
      <div className="smallCollectionList">
        {collections.length >= 0 &&
          collections.map((collection) => {
            return (
              <Collection
                key={collection.id}
                collection={collection}
                mediumId={mediumId}
              ></Collection>
            );
          })}
      </div>
      {authorization.isLoggedIn() && (
        <AddMediumToCollectionForm
          mediumId={mediumId}
          handleUpdateCollectionData={fetchCollections}
        />
      )}

      {collections.length >= 0 && (
        <div className="addMediumButton">
          <Button
            onClick={() => {
              history.push(`/collections/medium/${mediumId}`);
            }}
          >
            Alle Sammlungen anzeigen
          </Button>
        </div>
      )}
    </React.Fragment>
  );
};

export default SmallCollectionList;

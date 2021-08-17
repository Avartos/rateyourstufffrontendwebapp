import { useParams } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";
import MediaEntry from "../welcomePage/mediaEntry";
import { Button } from "@material-ui/core";
import DefaultTextField from "../formComponents/defaultTextField";
import React from "react";
import helper from "../../core/helper";

const CollectionDetails = () => {
  const { id } = useParams();

  const [collection, setCollection] = useState(null);
  const [isPending, setIsPending] = useState(true);
  const [error, setError] = useState(null);
  const [media, setMedia] = useState([]);
  const [isEditModeActive, setIsEditModeActive] = useState(false);
  const [collectionTitle, setCollectionTitle] = useState('');

  const fetchCollection = () => {
    fetch(`http://localhost:5000/rest/collections/${id}`)
      .then((res) => {
        if (!res.ok) {
          throw Error("Collection not found");
        }
        return res.json();
      })
      .then((data) => {
        setCollection(data);
        setCollectionTitle(data.title);
        fetch(`http://localhost:5000/rest/media/collection/${id}`)
          .then((res) => {
            if (!res.ok) {
              throw Error("Unable to fetch Media");
            }
            return res.json();
          })
          .then((mediaResult) => {
            setMedia(mediaResult);
            setIsPending(false);
          })
          .catch((error) => {
            setError(error);
            setIsPending(false);
            console.error(error);
          });
      })
      .catch((err) => {
        setError(error);
        setIsPending(false);
        console.error(err);
      });
  };

  useEffect(fetchCollection, []);

  const handleSubmitChanges = (e) => {
    e.preventDefault();
    const updatedCollection = {
      title: collectionTitle,
      id: collection.id,
    }

    fetch(`http://localhost:5000/rest/collections`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: sessionStorage.getItem("Bearer "),
      },
      body: JSON.stringify(updatedCollection),
    })
    .then(res => {
      if(!res.ok) {
        throw Error ('Unable to update collection');
      }
      return res.json();
    })
    .then(() => {
      setIsEditModeActive(false);
    })
    .catch(err => {
      console.error(err);
    })
  }

  const handleDeleteMedium = (mediumId) => {
    const medium = {id: mediumId};
    fetch(`http://localhost:5000/rest/collections/${collection.id}/medium/${mediumId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: sessionStorage.getItem("Bearer "),
      },
    })
    .then(res => {
      if(!res.ok) {
        throw Error ('Unable to update collection');
      }
      return res.json();
    })
    .then((data) => {
      fetchCollection();
    })
    .catch(err => {
      console.error(err);
    })
  }

  return (
    <div className="collectionDetails">
      {!isPending && !error && (
        <div>
          {!isEditModeActive && <h2>"{collectionTitle}"</h2>}
          {isEditModeActive && <DefaultTextField title="Bezeichnung" value={collectionTitle} setter={setCollectionTitle}/>}
          <span>von {collection.userUserName}</span>
        </div>
      )}

      {!isEditModeActive && (collection && collection.userId == helper.getUserId()) && <Button onClick={() => {setIsEditModeActive(true)}}>Bearbeiten</Button>}
      {isEditModeActive && <Button onClick={handleSubmitChanges}>Neue Bezeichnung übernehmen</Button>}
      {isEditModeActive && <Button onClick={() => {setIsEditModeActive(false); setCollectionTitle(collection.title)}}>Abbrechen</Button>}

      {!isPending &&
        !error &&
        media.map((medium) => {
          return (
            <React.Fragment>
              <MediaEntry
              medium={medium}
              key={medium.id}
              mediaType={medium.mediaType}
            />
            {isEditModeActive && <Button onClick={() => {handleDeleteMedium(medium.id)}}>{medium.mediumName} aus der Sammlung entfernen</Button>}
            </React.Fragment>
            
          );
        })}
    </div>
  );
};

export default CollectionDetails;

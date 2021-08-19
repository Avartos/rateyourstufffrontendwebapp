import { useParams } from "react-router";
import { useState } from "react";
import { useEffect } from "react";
import MediaEntry from "../welcomePage/mediaEntry";
import { Button } from "@material-ui/core";
import DefaultTextField from "../formComponents/defaultTextField";
import React from "react";
import helper from "../../core/helper";
import { useHistory } from "react-router";

/**
 * This component can be used to view and edit the details of an existing collection
 * @param {*} param0 
 * @returns 
 */
const CollectionDetails = ({ handleAddMessage }) => {
  const { id } = useParams();

  const [collection, setCollection] = useState(null);
  const [isPending, setIsPending] = useState(true);
  const [error, setError] = useState(null);
  const [media, setMedia] = useState([]);
  const [isEditModeActive, setIsEditModeActive] = useState(false);
  const [collectionTitle, setCollectionTitle] = useState("");
  const history = useHistory();

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
              throw Error("Fehler beim Abrufen der Medien");
            }
            return res.json();
          })
          .then((mediaResult) => {
            setMedia(mediaResult);
            setIsPending(false);
          })
          .catch((error) => {
            setError(error);
            handleAddMessage("error", "Fehler", error.message);
            setIsPending(false);
            console.error(error);
          });
      })
      .catch((error) => {
        handleAddMessage("error", "Fehler", error.message);
        setError(error);
        setIsPending(false);
        console.error(error);
      });
  };

  useEffect(fetchCollection, []);

  const handleSubmitChanges = (e) => {
    e.preventDefault();
    const updatedCollection = {
      title: collectionTitle,
      id: collection.id,
    };

    fetch(`http://localhost:5000/rest/collections`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: sessionStorage.getItem("Bearer "),
      },
      body: JSON.stringify(updatedCollection),
    })
      .then((res) => {
        if (!res.ok) {
          throw Error("Fehler beim Aktualisieren der Collection");
        }
        return res.json();
      })
      .then(() => {
        setIsEditModeActive(false);
      })
      .catch((error) => {
        handleAddMessage("error", "Fehler", error.message);
        console.error(error);
      });
  };

  const handleDeleteMedium = (mediumId) => {
    fetch(
      `http://localhost:5000/rest/collections/${collection.id}/medium/${mediumId}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: sessionStorage.getItem("Bearer "),
        },
      }
    )
      .then((res) => {
        if (!res.ok) {
          throw Error("Fehler beim Entfernen des Mediums");
        }
        return res.json();
      })
      .then((data) => {
        fetchCollection();
      })
      .catch((error) => {
        handleAddMessage("error", "Fehler", error.message);
        console.error(error);
      });
  };

  const handleDeleteCollection = () => {
    fetch(`http://localhost:5000/rest/collections/${collection.id}`, {
      method: "DELETE",
      headers: {
        Authorization: sessionStorage.getItem("Bearer "),
      },
    })
      .then((res) => {
        if (res.status === 403) {
          throw Error("Keine Berechtigung zum Löschen vorhanden");
        } else if (!res.ok) {
          throw Error("Fehler beim Löschen der Sammlung");
        }
        handleAddMessage(
          "success",
          "Gelöscht",
          "Die Sammlung wurde erfolgreich gelöscht"
        );
        history.push("/collections");
      })
      .catch((error) => {
        handleAddMessage("error", "Fehler", error.message);
      });
  };

  return (
    <div className="collectionDetails">
      {!isPending && !error && (
        <div>
          {!isEditModeActive && <h2>"{collectionTitle}"</h2>}
          {isEditModeActive && (
            <DefaultTextField
              title="Bezeichnung"
              value={collectionTitle}
              setter={setCollectionTitle}
            />
          )}
          <span>von {collection.userUserName}</span>
        </div>
      )}

      {!isEditModeActive &&
        collection &&
        collection.userId == helper.getUserId() && (
          <Button 
            onClick={() => {
              setIsEditModeActive(true);
            }}
          >
            Bearbeiten
          </Button>
        )}
      {isEditModeActive && (
        <Button variant="contained" color="primary" onClick={handleSubmitChanges}>
          Neue Bezeichnung übernehmen
        </Button>
      )}
      {isEditModeActive && (
        <Button variant="contained" color="primary"
          onClick={() => {
            setIsEditModeActive(false);
            setCollectionTitle(collection.title);
          }}
        >
          Abbrechen
        </Button>
      )}

      {isEditModeActive && (
        <Button variant="contained" color="secondary"
          onClick={() => {
            setIsEditModeActive(false);
            handleDeleteCollection();
          }}
        >
          Sammlung löschen
        </Button>
      )}

      {!isPending &&
        !error &&
        media.map((medium) => {
          return (
            <React.Fragment key={Math.random()}>
              <MediaEntry
                medium={medium}
                key={medium.id}
                mediaType={medium.mediaType}
              />
              {isEditModeActive && (
                <Button
                variant="contained" color="primary"
                  onClick={() => {
                    handleDeleteMedium(medium.id);
                  }}
                >
                  {medium.mediumName} aus der Sammlung entfernen
                </Button>
              )}
            </React.Fragment>
          );
        })}
    </div>
  );
};

export default CollectionDetails;

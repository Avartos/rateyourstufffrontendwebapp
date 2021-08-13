import { useState } from "react";
import { useEffect } from "react";
import Collection from "../collections/collection";

const SmallCollectionList = ({ mediumId }) => {
  const [collections, setCollections] = useState([]);

  const MAX_NUMBER_OF_COLLECTIONS = 5;

  const fetchCollections = () => {
    fetch(
      `http://localhost:5000/rest/collections/medium/${mediumId}?size=${MAX_NUMBER_OF_COLLECTIONS}`
    )
      .then((res) => {
        if (!res.ok) {
          throw Error("Unable to fetch Colelctions");
        }
        return res.json();
      })
      .then((data) => {
        setCollections(data);
        console.log(data);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  useEffect(fetchCollections, []);

  return (
    <div className="smallCollectionList">
      {collections.length >= 0 && collections.map((collection) => {
        return <Collection key={collection.id} collection={collection} mediumId={mediumId}></Collection>;
      })}
    </div>
  );
};

export default SmallCollectionList;

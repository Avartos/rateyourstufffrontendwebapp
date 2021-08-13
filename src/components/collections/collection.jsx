import { useState } from "react";
import { useEffect } from "react";
import { Link } from "react-router-dom";

const Collection = ({ collection, mediumId = null }) => {
  const [mediaImages, setMediaImages] = useState([]);
  const prepareMediaImages = () => {
    let tempMedia = collection.media;

    if (tempMedia.length >= 4 && mediumId) {
      const currentMediaIndex = tempMedia
        .findIndex(medium => medium.id == mediumId);
      const tempMedium = tempMedia[currentMediaIndex];
      tempMedia[currentMediaIndex] = tempMedia[3];
      tempMedia[3] = tempMedium;
    }

    console.log(tempMedia);

    setMediaImages(
      tempMedia.map((medium) => {
        return medium.picturePath;
      }).slice(0,3)
    );
    console.log(mediaImages);
  };

  useEffect(() => {
    if (collection) {
      prepareMediaImages();
    }
  }, []);

  return (
    <Link to={`/collection/${collection.id}`}>
      <div className="collection">
        <div className="collectionWrapper">
          {mediaImages.map((image) => {
            return (
              <div className="collectionImageWrapper">
                <img src={`http://localhost:5000/${image}`} alt="" />
              </div>
            );
          })}
        </div>
        <span>{collection.title}</span>
      </div>
    </Link>
  );
};

export default Collection;

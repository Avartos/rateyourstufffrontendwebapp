import { Link } from "react-router-dom";
import ReadOnlyRating from "../rating/readOnlyRating";

const MediaEntry = ({ medium }) => {

    return (
    <Link className="link" to={`/detail/${medium.id}`}>
        <div className="mediaEntry">
        <div className="previewImageWrapper">
            <img
                height="75px"
                src={`http://localhost:5000/${medium.picturePath}`}
                alt="poster"
            ></img>
        </div>
        
        <div className="previewContent">
            <h3 className="title">{medium.mediumName}</h3>
            <div className="details">
                <span>{medium.releaseDate}</span>
                <span>{medium.genres.map(genre => {
                    return genre.genreName + ',';
                })}</span>
                <span>
                    <ReadOnlyRating size="small" value={Math.random()*5}></ReadOnlyRating>
                </span>
            </div>
        </div>
        </div>
    </Link>
  );
};

export default MediaEntry;

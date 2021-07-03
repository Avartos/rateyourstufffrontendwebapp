import { Link } from "react-router-dom";
import ReadOnlyRating from "../rating/readOnlyRating";
import Chip from '@material-ui/core/Chip';

const MediaEntry = ({ medium, mediaType }) => {

    return (
    <Link className="link" to={`/detail/${mediaType}/${medium.id}`}>
        <div className="mediaEntry">
        <div className="previewImageWrapper">
            <img
                src={`http://localhost:5000/${medium.picturePath}`}
                alt="poster"
            ></img>
        </div>
        
        <div className="previewContent">
            <h3 className="title">{medium.mediumName}</h3>
            <div className="details">
                <span>{medium.releaseDate}</span>
                <span>
                    {medium.genres.slice(0,3).map((genre) => {
                      return (
                        <Chip color="primary" size="small" key={genre} label={genre}/>
                      );
                    })}
                  </span>
                <span>
                    <ReadOnlyRating size="small" value={medium.averageRating} maxValue={medium.max_RATING_POINTS} ></ReadOnlyRating>
                </span>
            </div>
        </div>
        </div>
    </Link>
  );
};

export default MediaEntry;

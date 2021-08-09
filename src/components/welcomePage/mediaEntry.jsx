import { Link } from "react-router-dom";
import ReadOnlyRating from "../rating/readOnlyRating";
import Chip from '@material-ui/core/Chip';

const MediaEntry = ({ medium, mediaType }) => {

  const shortenString = (targetString, maxLength, moreTextSymbol) => {
    let shortenedString = targetString;
    if (targetString != null && targetString.length > maxLength) {
      shortenedString = targetString.substr(0, maxLength) + moreTextSymbol;
    }
    return shortenedString;
  };

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
            <h3 className="title" title={medium.mediumName}>{shortenString(medium.mediumName, 20, '...')}</h3>
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

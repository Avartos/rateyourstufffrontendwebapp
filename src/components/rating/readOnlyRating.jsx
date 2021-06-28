import React from 'react';
import Rating from '@material-ui/lab/Rating';

const ReadOnlyRating = ({size, value, showValue}) => {
    return ( 
        <div className="rating">
            {showValue && <span className="value">{value}</span>}
            <Rating className="ratingSymbol" size={size} defaultValue={0} value={value} readOnly precision={0.1}></Rating>
        </div>
     );
}
 
export default ReadOnlyRating;
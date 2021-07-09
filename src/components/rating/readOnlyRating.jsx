import React from 'react';
import Rating from '@material-ui/lab/Rating';

const ReadOnlyRating = ({size, value, showValue, maxValue}) => {
    
    const calculatePercentage = () => {
        return (5*value)/maxValue;
    }


    return ( 
        <div className="rating">
            {showValue && <span className="value">{calculatePercentage()}</span>}
            <Rating className="ratingSymbol" size={size} defaultValue={0} value={calculatePercentage()} readOnly precision={0.1}></Rating>
        </div>
     );
}
 
export default ReadOnlyRating;

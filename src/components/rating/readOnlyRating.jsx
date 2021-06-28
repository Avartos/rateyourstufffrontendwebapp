import React from 'react';
import Rating from '@material-ui/lab/Rating';

const ReadOnlyRating = ({size, value}) => {
    return ( 
        <React.Fragment>
            <Rating size={size} defaultValue={0} value={value} readOnly precision={0.1}></Rating>
        </React.Fragment>
     );
}
 
export default ReadOnlyRating;
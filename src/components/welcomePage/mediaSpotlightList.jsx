import useFetch from '../../hooks/useFetch';
import MediaEntry from './mediaEntry';
import { CircularProgress } from "@material-ui/core";
import React from 'react';

const MediaSpotlightList = ({fetchURL, title, mediaType}) => {
    
    const {data: media, isPending, error} = useFetch(fetchURL);

    return ( 
        <div className="spotlightList">
            <h3 className="listTitle"><span>{title}</span></h3>
            {isPending && 
            <div className="loading">
                <CircularProgress/>
                <p>Lade...</p>
            </div>
                

            }
            {!isPending && media != null &&
                media.content.map(medium => {
                    return <MediaEntry key={medium.id} medium={medium} mediaType={mediaType}/>
                })
            }
        </div>
     );
}
 
export default MediaSpotlightList;
import useFetch from '../../hooks/useFetch';
import MediaEntry from './mediaEntry';
import { CircularProgress } from "@material-ui/core";
import React from 'react';
import { Link } from 'react-router-dom';
import { useEffect } from 'react';

const MediaSpotlightList = ({fetchURL, title, mediaType, linkTarget, handleAddMessage}) => {
    
    const {data: media, isPending, error} = useFetch(fetchURL);

    useEffect(() => {
        if(error != null) {
            handleAddMessage('error', 'Fehler', `Fehler beim Laden von ${mediaType}`);
        }
    }, [error])

    return ( 
        <div className="spotlightList">
            <Link to={`/media/${linkTarget}`}><h3 className="listTitle link"><span>{title}</span></h3></Link>
            {isPending && 
            <div className="loading">
                <CircularProgress/>
                <p>Lade...</p>
            </div>
                

            }
            {!isPending && media != null && 
                media.map(medium => {
                    return <MediaEntry key={medium.id} medium={medium} mediaType={mediaType} />
                })
            }
        </div>
     );
}
 
export default MediaSpotlightList;
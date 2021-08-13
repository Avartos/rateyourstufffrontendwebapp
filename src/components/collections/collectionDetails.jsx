import { useParams } from "react-router";
import { useState } from "react";
import { useEffect } from "react";
import MediaEntry from "../welcomePage/mediaEntry";

const CollectionDetails = () => {
    
    const {id} = useParams();
    
    const [collection, setCollection] = useState();
    const [isPending, setIsPending] = useState(true);
    const [error, setError] = useState(null);
    const [media, setMedia] = useState([])

    const fetchCollection = () => {
        fetch(`http://localhost:5000/rest/collections/${id}`)
        .then(res => {
            if(!res.ok) {
                throw Error('Collection not found');
            }
            return res.json();
        })
        .then(data => {
            setCollection(data);
            fetch(`http://localhost:5000/rest/media/collection/${id}`)
            .then(res => {
                if(!res.ok) {
                    throw Error ('Unable to fetch Media');
                }
                return res.json();
            })
            .then(mediaResult => {
                setMedia(mediaResult);
                setIsPending(false);
                console.log(mediaResult);
            })
            .catch(error => {
                setError(error);
                setIsPending(false);
                console.error(error);
            })
        }) 
        .catch(err => {
            setError(error);
            setIsPending(false);
            console.log(err);
        })
    }

    useEffect(fetchCollection, []);
    
    return ( 
        <div className="collectionDetails">
            {!isPending && !error && <div>
                <h2>{collection.title}</h2>
                <span>{collection.userUserName}</span>
                </div>}
            {!isPending && !error && 
                media.map((medium) => {
                return (
                <MediaEntry
                    medium={medium}
                    key={medium.id}
                    mediaType={medium.mediaType}
                />
                )})
            }
        </div>
     );
}
 
export default CollectionDetails;
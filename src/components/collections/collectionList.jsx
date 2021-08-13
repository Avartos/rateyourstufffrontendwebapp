import helper from "../../core/helper";
import { useState } from "react";
import { useEffect } from "react";
import Collection from "./collection";

const CollectionList = () => {
    const [collections, setCollections] = useState([]);
    const [currentPage, setCurrentPage] = useState(0);
    const COLLECTIONS_PER_PAGE = 15;


    const fetchCollections = () => {
        console.log(`http://localhost:5000/rest/collections/${helper.getUserId}?size=${COLLECTIONS_PER_PAGE}&page=${currentPage}`)
        fetch(`http://localhost:5000/rest/collections/user/${helper.getUserId()}?size=${COLLECTIONS_PER_PAGE}&page=${currentPage}`)
        .then(res => {
            if(!res.ok) {
                throw Error ('Unable to fetch collections');
            }
            return res.json();
        })
        .then(data => {
            setCollections(data);
            console.log(data);
        })
        .catch(err => {
            console.error(err);
        })
    }

    useEffect(fetchCollections, []);
    
    
    return ( 
        <div className="collectionList">
            {collections.map(collection => {
                return <Collection key={collection.id} collection={collection}/>
            })}
        </div>
     );
}
 
export default CollectionList;
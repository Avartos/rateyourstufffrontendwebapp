import useFetch from './../hooks/useFetch';
import MediaEntry from './welcomePage/mediaEntry';
import { CircularProgress } from "@material-ui/core";
import React from 'react';
import MediaSpotlightList from './welcomePage/mediaSpotlightList';

// const MediaSpotlightList = ({fetchURL, title, mediaType}) => {
    
//     const {data: media, isPending, error} = useFetch(fetchURL);
    
    
//     return ( 
        
//         <div className="resultList">
//             <h3 className="listTitle"><span>{title}</span></h3>
//             {isPending && 
//             <div className="loading">
//                 <CircularProgress/>
//                 <p>Lade...</p>
//             </div>
                

//             }
//             {!isPending && media != null && 
//                 media.map(medium => {
//                     return <MediaEntry key={medium.id} medium={medium} mediaType={mediaType} />
//                 })
//             }
            
//         </div>
        
//      );
// }
 
// export default MediaSpotlightList;

const WelcomePage = () => {
  
    const numberOfEntries = 5;
    const orderBy = 'releaseDate';
    const order = 'desc';
    const server = 'http://localhost:5000/rest';
    
    return (
      <div className="spotlightWrapper">
          <MediaSpotlightList mediaType={'all'} fetchURL={`${server}/movies/all?page=0&orderBy=${orderBy}&order=${order}`} title="Search Results:"/>
          
      </div>
    );
  };
  
  export default WelcomePage;
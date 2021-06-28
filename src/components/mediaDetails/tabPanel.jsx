import React from 'react';

const TabPanel = (props) => {
    return ( 
        <div className="tabPanel">
            <span>{props.children}</span>
        </div>
     );
}
 
export default TabPanel;
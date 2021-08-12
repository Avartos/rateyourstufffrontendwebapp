import React from 'react';

const TabPanel = (props) => {
    return (
        <div className="tabPanel">
            {props.value === props.index && (
                <span>{props.children}</span>
            )}
        </div>
    );
}

export default TabPanel;
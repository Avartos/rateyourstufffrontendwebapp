import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import React, { useState } from "react";
import TabPanel from "./tabPanel";

const TabBar = ({ratingCount}) => {
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <React.Fragment>
      <Tabs
        value={value}
        onChange={handleChange}
        aria-label="simple tabs example"
      >
        <Tab label= {`Bewertungen (${ratingCount})`} />
        <Tab label="Kommentare" />
      </Tabs>
      {value === 0 && <TabPanel>Bewertungen</TabPanel>}

      {value === 1 && <TabPanel>Kommentare</TabPanel>}
    </React.Fragment>
  );
};

export default TabBar;

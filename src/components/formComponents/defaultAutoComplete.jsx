import React from "react";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { TextField } from "@material-ui/core";

const DefaultAutoComplete = ({ title, inputValues, targetValue, setter }) => {
  
    return (
    <React.Fragment>
      <span className="label">{title}</span>
      <Autocomplete
        options={inputValues}
        getOptionLabel={(option) => option}
        fullWidth
        value={targetValue}
        renderInput={(params) => (
          <TextField
            variant="filled"
            {...params}
            onChange={(e) => {
              setter(e.target.value);
            }}
          />
        )}
        freeSolo
        onChange={(e, value) => setter(value)}
      />
    </React.Fragment>
  );
};

export default DefaultAutoComplete;

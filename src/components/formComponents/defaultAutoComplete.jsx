import React from "react";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { TextField } from "@material-ui/core";

/**
 * This Component allows the user to select a value from a given list
 * The user can write the name of the option.
 * The user can also select an option that is not in the list
 * @param {*} param0
 * @returns
 */
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

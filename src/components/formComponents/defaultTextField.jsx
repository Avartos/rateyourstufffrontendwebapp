import React from "react";
import { TextField } from "@material-ui/core";

const DefaultTextField = ({ title, value, setter, type = "default", additionalOptions, isRequired=true, isError=false, helperText='Fehler'}) => {
  return (
    <React.Fragment>
      <span className="label">{title}{isRequired && '*'}</span>
      <TextField
        {...additionalOptions}
        value={value}
        type={type}
        error={isError}
        required={isRequired}
        helperText={isError ? helperText : ''}
        onChange={(e) => {
          setter(e.target.value);
        }}
        fullWidth
        variant="filled"
      />
    </React.Fragment>
  );
};

export default DefaultTextField;

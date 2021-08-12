import React from "react";
import { TextField } from "@material-ui/core";

const DefaultTextField = ({ title, value, setter, type = "default", additionalOptions, isRequired=true }) => {
  return (
    <React.Fragment>
      <span className="label">{title}{isRequired && '*'}</span>
      <TextField
        {...additionalOptions}
        value={value}
        type={type}
        required={isRequired}
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

import React from "react";
import { TextField } from "@material-ui/core";

/**
 * This component is a custom textfield
 * it offers options to mark errors in red ond offers an error hint text
 * @param {*} param0
 * @returns
 */
const DefaultTextField = ({
  title,
  value,
  setter,
  type = "default",
  additionalOptions,
  isRequired = true,
  isError = false,
  helperText = "Fehler",
}) => {
  return (
    <React.Fragment>
      <span className="label">
        {title}
        {isRequired && "*"}
      </span>
      <TextField
        {...additionalOptions}
        value={value}
        type={type}
        error={isError}
        required={isRequired}
        helperText={isError ? helperText : ""}
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

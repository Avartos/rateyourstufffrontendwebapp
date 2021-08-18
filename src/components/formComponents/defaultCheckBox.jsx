import { FormControlLabel, FormControl } from "@material-ui/core";
import { Checkbox } from "@material-ui/core";

/**
 * This Component can be used to offer a basic toggle in checkbox form
 * @param {*} param0 
 * @returns 
 */
const DefaultCheckBox = ({ title, value, setter }) => {
  return (
    <FormControl className="checkBox" component="fieldset">
      <FormControlLabel
        value={title}
        control={
          <Checkbox
            checked={value}
            onChange={() => {
              setter(!value);
            }}
            color="secondary"
          />
        }
        label={title}
        labelPlacement="end"
      />
    </FormControl>
  );
};

export default DefaultCheckBox;

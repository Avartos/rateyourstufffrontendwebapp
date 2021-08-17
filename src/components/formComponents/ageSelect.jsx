import { FormControl } from "@material-ui/core";
import { Select } from "@material-ui/core";
import { MenuItem } from "@material-ui/core";
import { Input } from "@material-ui/core";

/**
 * This Component is used to offer an age selection.
 * It allows the user to select ages: 0,6,12,16 and 18
 * @param {*} param0
 * @returns
 */
const AgeSelect = ({ title, value, setter }) => {
  const ITEM_HEIGHT = 48;
  const ITEM_PADDING_TOP = 8;
  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        width: 250,
      },
    },
  };

  return (
    <FormControl className="formControl">
      <span className="label">{title}</span>
      <Select
        key="0"
        value={value}
        input={<Input />}
        renderValue={() => `ab ${value}`}
        MenuProps={MenuProps}
        onChange={(e) => setter(e.target.value)}
        variant="filled"
      >
        <MenuItem value={0}>Ohne Altersbeschränkung</MenuItem>
        <MenuItem value={6}>Ab 6 Jahren</MenuItem>
        <MenuItem value={12}>Ab 12 Jahren</MenuItem>
        <MenuItem value={16}>Ab 16 Jahren</MenuItem>
        <MenuItem value={18}>Ab 18 Jahren</MenuItem>
      </Select>
    </FormControl>
  );
};

export default AgeSelect;

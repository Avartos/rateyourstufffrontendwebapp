import { FormControl } from "@material-ui/core";
import { Select } from "@material-ui/core";
import { MenuItem } from "@material-ui/core";
import { Input } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";


const AgeSelect = ({title, value, setter}) => {
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
  
    const useStyles = makeStyles((theme) => ({
      formControl: {
        margin: theme.spacing(1),
        minWidth: "100%",
        maxWidth: 300,
      },
      chips: {
        display: "flex",
        flexWrap: "wrap",
      },
      chip: {
        margin: 2,
      },
      noLabel: {
        marginTop: theme.spacing(3),
      },
    }));
  
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
}
 
export default AgeSelect;
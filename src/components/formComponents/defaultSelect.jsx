import { FormControl } from "@material-ui/core";
import { Select } from "@material-ui/core";
import { Chip } from "@material-ui/core";
import { Input } from "@material-ui/core";
import { MenuItem } from "@material-ui/core";
import { Checkbox } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

/**
 * This Component offers a custom select
 * @param {*} param0
 * @returns
 */
const DefaultSelect = ({
  title,
  inputList,
  targetValue,
  setter,
  chipColor = "primary",
  chipOutline = "default",
}) => {
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

  const classes = useStyles();

  return (
    <FormControl className="formControl">
      <span className="label">{title}</span>
      <Select
        multiple
        value={targetValue}
        input={<Input />}
        variant="filled"
        renderValue={(selected) => (
          <div className={classes.chips}>
            {selected.map((value) => (
              <Chip
                key={value}
                label={value}
                className={classes.chip}
                color={chipColor}
                variant={chipOutline}
              />
            ))}
          </div>
        )}
        MenuProps={MenuProps}
        onChange={setter}
      >
        {inputList.map((option) => {
          return (
            <MenuItem
              key={"item" + option.id + option.title}
              value={option.title}
            >
              <Checkbox
                key={"check" + option.id + option.title}
                checked={targetValue.indexOf(option.title) > -1}
              />
              {option.title}
            </MenuItem>
          );
        })}
      </Select>
    </FormControl>
  );
};

export default DefaultSelect;

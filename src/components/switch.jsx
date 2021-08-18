import React, {useEffect, useState} from 'react';
import Switch from '@material-ui/core/Switch';

export default function Switches({defaultValue = false, handleEnabledSwitch}) {
  const [state, setState] = React.useState({
    checkedA: false,
    checkedB: false,
  });
  const [isChecked, setIsChecked] = useState(defaultValue);

  //TODO: En-/Disabling User with Fetch
  const handleChange = (event) => {
    //setState({ ...state, [event.target.name]: event.target.checked });
    setIsChecked(event.target.checked);
    handleEnabledSwitch(event.target.checked);
  };

  return (
    <div>
      <Switch
        checked={isChecked}
        onChange={handleChange}
        name="checkedA"
        inputProps={{ 'aria-label': 'secondary checkbox' }}
      />
      
    </div>
  );
}
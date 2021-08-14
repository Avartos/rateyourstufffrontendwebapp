import {useHistory} from "react-router-dom";


const RedirectToPath = ({path}) => {
    const history = useHistory();
    console.log(path);
    history.go(path);
}

const redirect = {
    RedirectToPath,
}

export default redirect;
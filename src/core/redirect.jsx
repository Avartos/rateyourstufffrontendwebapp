import {useHistory} from "react-router";


const RedirectToPath = ({path}) => {
    const history = useHistory();
    history.go(path);
}

const redirect = {
    RedirectToPath,
}

export default redirect;
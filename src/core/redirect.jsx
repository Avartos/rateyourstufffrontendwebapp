import {useHistory} from "react-router";


const RedirectToPath = ({path}) => {
    const history = useHistory();
    console.log(path);
    history.go(path);
}

const redirect = {
    RedirectToPath,
}

export default redirect;
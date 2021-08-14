import {useHistory} from "react-router-dom";

/**
 * Component deletes users sessionStorage and provides that the user will be logged out
 * @returns {JSX.Element} Logout component
 * @constructor
 */
const Logout = () => {
    const _router = useHistory();
    return (
        <div className="loggedOut">
            {sessionStorage.clear()}
            {setTimeout(() => _router.go(), 1000)}
        </div>
    )
}
export default Logout;
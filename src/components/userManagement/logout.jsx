import {useHistory} from "react-router";

/**
 * Component deletes users sessionStorage and provides that the user will be logged out
 * @returns {JSX.Element} Logout component
 * @constructor
 */
const Logout = ({handleAddMessage}) => {
    const _router = useHistory();
    return (
        <div className="loggedOut">
            {sessionStorage.clear()}
            {handleAddMessage('info', 'Abgemeldet')}
            { _router.go()}
        </div>
    )
}
export default Logout;
import {useHistory} from "react-router-dom";

const Logout = () => {
    const _router = useHistory();
    return (
        <div className="loggedOut">
            {sessionStorage.clear()}
            {setTimeout(() => _router.push('/'), 1000)}
        </div>
    )
}
export default Logout;
import useFetch from "../../hooks/useFetch";
import UserPreview from "./userPreview";
import { useEffect } from "react";
// zuständige scss file ist die _signUp.scss
/**
 * Component to build the admin panel which provides functions for managing the users of rate your stuff
 * @returns {JSX.Element}
 * @constructor
 */
const AdminPanel = ({handleAddMessage}) => {
    const {data: users, isPending, error} = useFetch("http://localhost:5000/user/all");
    useEffect(() => {
        if(error) {
            handleAddMessage('error', 'Fehler', 'Fehler beim Laden der Nutzerdaten.');
        }
    }, [error])

    return (
        <div className="adminPanel">
            <h2>User Management:</h2>
            <div className="table">
                <table className="head">
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>UserName</th>
                        <th>Email</th>
                        <th>Enabled</th>
                        <th>Role</th>
                        <th>Options</th>
                    </tr>
                </table>
                <div className="userDisplay">
                    {!isPending && users != null
                    && users.map((user) => {
                        return <UserPreview user={user} key={user.id} handleAddMessage={handleAddMessage}/>
                    })
                    }
                </div>
            </div>
        </div>
    )
}

export default AdminPanel;
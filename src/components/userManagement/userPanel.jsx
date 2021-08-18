import useFetch from "../../hooks/useFetch";
import ChangeUserData from "./changeUserData";
import { useEffect } from "react";

const UserPanel = ({handleAddMessage}) => {
    /**
     * Store the id value from users sessionStorage in an local variable id
     * @type {string}
     */
    const id = sessionStorage.getItem("id");

    /**
     * Search for a matching user with stored id in databes
     */
    const {data: user, isPending, error} = useFetch(`http://localhost:5000/user/id=${id}`);

    useEffect(() => {
        if(error)
        handleAddMessage('error', 'Fehler', 'Fehler beim Abrufen der Daten');
    }, [error])

    /**
     * Return user data with component "ChangeUserData"
     */
    return (
        <div className="UserPanel">
            {/*{!isPending && console.log(user)}*/}
            {!isPending && user != null &&
                 <ChangeUserData user={user} key={user.id} handleAddMessage={handleAddMessage}/>
            }
        </div>
    )
}

export default UserPanel;
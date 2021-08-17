import Switch from '../../components/switch';
import {useState} from "react";

/**
 * Component shows the User data of all users in database
 * also this component provides the possibility to delete users
 * IMPORTANT: Functions to disable users will follow on next stage of this project
 * @param user from another component
 * @return {JSX.Element}
 * @constructor
 */

const UserPreview = ({user}) => {
    /**
     * Function consumes the id of chosen user and is sending a delete request to backend
     * @param id
     */

    const { login, setLogin } = useState(user.login);

    const handleDelete = (id) => {
        fetch(`http://localhost:5000/user/${user.id}`, {
            method: 'DELETE',
            headers: {
                "Content-Type": "application/json",
                "Authorization": sessionStorage.getItem("Bearer "),
            },
        }).then(() => {
            console.log('User successfully deleted');
        }).catch(error => {
            console.log(error);
        })
    }
    console.log({login});
    //TODO loginRoles (dropdown w. checkboxes...)n
    return (
        <div className="user-preview">
        <table>
            <tr>
                    <th>{user.id}</th>
                    <th>{user.firstName + ' ' + user.lastName}</th>
                    <th>{user.userName}</th>
                    <th>{login.email}</th>
                    <th><Switch />{login.isEnabled}</th>
                    <th><div className="deleteButton"><button onClick={() => handleDelete(user.id)}>Delete</button></div></th>
                    
                
            </tr>
        </table>
        </div>
    )
}
export default UserPreview

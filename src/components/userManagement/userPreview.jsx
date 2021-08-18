import Switch from '../../components/switch';
import {useState} from "react";
import React from "react";

const UserPreview = ({user}) => {



/**
 * Component shows the User data of all users in database
 * also
 *   - this component provides the possibility to delete users
 *   - change the state of the users, Enabled or Disabled
 *   - change the role of the users; User, Admin, Moderator, or Business
 * @return {string}
 * @constructor
 * @param RoleId
 */
    /**
     * Function consumes the id of chosen user and is sending a delete request to backend
     * @param id, which refers to the id of the user to delete em
     */
    const {errorMessage, setErrorMessage} = useState('');

    const handleDelete = (id) => {
        fetch(`http://localhost:5000/user/${user.id}`, {
            method: 'DELETE',
            headers: {
                "Content-Type": "application/json",
                "Authorization": sessionStorage.getItem("Bearer "),
            },
        }).then((response) => {
            if(!response.ok){
                throw Error("Löschen des Users fehlgeschlagen!")
            }

        }).catch(error => {
            setErrorMessage(error.message);
        })
    }


    /**
     * Component handles the role update and is sending a put request to the backend api
     * @param e even parameter
     * @param userId, refers to the user which will be dated up
     * @param roleId, refers to the chosen role
     */
    const handleUserUpdate = (e, userId, roleId) => {
        e.preventDefault();
        const updatedUser = {id: userId, roleMappingId: roleId};
        fetch('http://localhost:5000/user/customUpdate', {
            method: 'PUT',
            headers: {
                "Content-Type": "application/json",
                "Authorization": sessionStorage.getItem("Bearer "),
            },
            body: JSON.stringify(updatedUser)
        }).then((response) => {
            if (!response.ok) {
                throw Error("Update des Profiles fehlgeschlagen!");
            }
        }).catch((error) => {
            setErrorMessage(error.message);
        });

    }

    /**
     * Component handles the En-/Disabling of the Users
     * @param isEnabled, refers to the new state, Enabled or Disabled
     */
    const handleEnabledSwitch = (isEnabled) => {
        const login = {isEnabled: isEnabled}
        const updatedUser = {id: user.id, login};
        fetch('http://localhost:5000/user/isEnabledUpdate', {
            method: 'PUT',
            headers: {
                "Content-Type": "application/json",
                "Authorization": sessionStorage.getItem("Bearer "),
            },
            body: JSON.stringify(updatedUser)
        }).then((response) => {
            if (!response.ok) {
                throw Error("Update des von isEnabled fehlgeschlagen!");
            }
        }).catch((error) => {
            setErrorMessage(error.message);
        });

    };

return (
    <div className="user-preview">
        <table>
            <tr>
                <th>{user.id}</th>
                <th>{user.firstName + ' ' + user.lastName}</th>
                <th>{user.userName}</th>
                <th>{user.loginEmail}</th>
                <th>
                    <Switch defaultValue={user.loginIsEnabled} handleEnabledSwitch={handleEnabledSwitch}/>
                </th>
                <th>
                    <select
                        onChange={(e) => handleUserUpdate(e, user.id, e.target.value)}
                    >
                        <option value={1} selected={user.roleId === 1}>User</option>
                        <option value={2} selected={user.roleId === 2}>Admin</option>
                        <option value={3} selected={user.roleId === 3}>Moderator</option>
                        <option value={4} selected={user.roleId === 4}>Business</option>
                    </select>
                </th>
                <th>
                    <div className="deleteButton">
                        <button onClick={() => handleDelete(user.id)}>Delete</button>
                    </div>
                </th>


            </tr>
        </table>
    </div>
)
}
export default UserPreview

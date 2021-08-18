import Switch from '../../components/switch';
import {useState} from "react";
import React from "react";

/**
 * Component shows the User data of all users in database
 * also this component provides the possibility to delete users
 * IMPORTANT: Functions to disable users will follow on next stage of this project
 * @return {string}
 * @constructor
 * @param RoleId
 */



const UserPreview = ({user}) => {
    /**
     * Function consumes the id of chosen user and is sending a delete request to backend
     * @param id
     */
    const roles = ["User", "Admin", "Moderator", "Business"];
    const {value, setValue} = useState('');
    const {role, setRole} = useState('Admin');
    const {errorMessage, setErrorMessage} = useState('');
    const roleId = user.roleId - 1;
    console.log("User: " + user.userName + " Role: " + roles[roleId]);

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


    const handleUserUpdate = (e, userId, roleId) => {
        e.preventDefault();
        const updatedUser = {id: userId, roleMappingId: roleId};
        console.log(updatedUser);
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
            //setErrorMessage(error.message);
        });
        console.log(user);

    }

    const handleEnabledSwitch = (isEnabled) => {
        const login = {isEnabled: isEnabled}
        const updatedUser = {id: user.id, login};
        console.log(updatedUser);
        fetch('http://localhost:5000/user/isEnabledUpdate', {
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
            //setErrorMessage(error.message);
        });
        console.log(user);

    };


//TODO loginRoles (dropdown w. checkboxes...)n
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
                        defaultValue={roles[user.roleId]}
                        onChange={(e) => handleUserUpdate(e, user.id, e.target.value)}
                    >
                        <option value={1}>User</option>
                        <option value={2}>Admin</option>
                        <option value={3}>Moderator</option>
                        <option value={4}>Business</option>
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

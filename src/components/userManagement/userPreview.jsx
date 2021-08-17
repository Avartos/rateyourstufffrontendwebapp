import Switch from '../../components/switch';

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
    const handleDelete = (id) => {
        fetch(`http://localhost:5000/user/${user.id}`, {
            method: 'DELETE', headers: {
                "Content-Type": "application/json",
                "Authorization": sessionStorage.getItem("Bearer "),
            },
        }).then(() => {
            console.log('User successfully deleted');
        }).catch(error => {
            console.log(error);
        })
    }
    //TODO loginRoles (dropdown w. checkboxes...)n
    return (
        <div className="user-preview">
        <table>
            <tr>
                    <th>{user.id}</th>
                    <th>{user.firstName + ' ' + user.lastName}</th>
                    <th>{user.userName}</th>
                    <th>{user.loginEmail}</th>
                    <th><Switch />{user.loginIsEnabled}</th>
                    <th><div className="deleteButton"><button onClick={() => handleDelete(user.id)}>Delete</button></div></th>
                    
                
            </tr>
        </table>
        </div>
    )
}
export default UserPreview

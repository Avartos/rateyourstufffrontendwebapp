import DeleteUser from "./deleteUser";
import Switch from '../../components/switch';

const UserPreview = ({user}) => {
    const handleDelete = (id) => {
        fetch(`http://localhost:5000/user/${user.id}`, {
            method: 'DELETE'
        }).then(() => {
            console.log('User successfully deleted');
        })
    }
    //TODO loginRoles (dropdown w. checkboxes...)n
    return (
        <table>
        <tr>
        <div className="user-preview">
            <th><div className="userAttribute">{user.id}</div></th>
            <th><div className="userAttribute">{user.firstName + ' ' + user.lastName}</div></th>
            <th><div className="userAttribute">{user.userName}</div></th>
            <th><div className="userAttribute">{user.login.email}</div></th>
            <th><div className="userAttribute"><Switch />{user.login.isEnabled}</div></th>
            <th><div className="deleteButton"><button onClick={() => handleDelete(user.id)}>Delete</button></div></th>
            
        </div>
        </tr>
        </table>
    )
}
export default UserPreview

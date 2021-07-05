import DeleteUser from "./deleteUser";
import Switch from '../../components/switch';

const UserPreview = ({user}) => {
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
                    <th>{user.login.email}</th>
                    <th><Switch />{user.login.isEnabled}</th>
                    <th><div className="deleteButton"><button onClick={() => handleDelete(user.id)}>Delete</button></div></th>
                    
                
            </tr>
        </table>
        </div>
    )
}
export default UserPreview

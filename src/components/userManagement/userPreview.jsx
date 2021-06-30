import DeleteUser from "./deleteUser";

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
        <div className="user-preview">
            <div>{user.id}</div>
            <div>{user.firstName + ' ' + user.lastName}</div>
            <div>{user.userName}</div>
            <div>{user.login.email}</div>
            <div>{user.login.isEnabled}</div>
            <div>
                <button>Disable</button>
                <button onClick={() => handleDelete(user.id)}>Delete</button>
            </div>
        </div>
    )
}
export default UserPreview

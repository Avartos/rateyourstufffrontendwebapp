import useFetch from "../../hooks/useFetch";
import UserPreview from "./userPreview";
// zuständige scss file ist die _signUp.scss

const AdminPanel = () => {
    const {data: users, isPending, error} = useFetch("http://localhost:5000/user/all");
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
                        <th>Options</th>
                    </tr>
                </table>
                <div className="userDisplay">
                    {!isPending && users != null
                    && users.map((user) => {
                        console.log("User" + user);
                        return <UserPreview user={user} key={user.id}/>
                    })
                    }
                </div>
            </div>
        </div>
    )
}

export default AdminPanel;
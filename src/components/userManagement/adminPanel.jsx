import useFetch from "../../hooks/useFetch";
import UserPreview from "./userPreview";

const AdminPanel = () => {
    const {data: users, isPending, error} = useFetch("http://localhost:5000/user/all");
    return (
        <div className="adminPanel">
            <h2>User Management Panel</h2>
            <div className="attributeList">
                <div>ID</div>
                <div>Name</div>
                <div>UserName</div>
                <div>Email</div>
                <div>Enabled</div>
                <div>Options</div>
            </div>
            {!isPending && users != null
            && users.map((user) => {
                return <UserPreview user={user} key={user.id}/>
            })
            }
        </div>
    )
}

export default AdminPanel;
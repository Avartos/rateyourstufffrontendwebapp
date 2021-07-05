import useFetch from "../../hooks/useFetch";
import ChangeUserData from "./changeUserData";
import UserPreview from "./userPreview";

const UserPanel = () => {
    //sessionUserId for testing (later JSON userId in Session)
    const id = sessionStorage.getItem("id");

    const {data: user, isPending, error} = useFetch(`http://localhost:5000/user/id=${id}`);

    return (
        <div className="UserPanel">
            {/*{!isPending && console.log(user)}*/}
            {!isPending && user != null &&
                 <ChangeUserData user={user} key={user.id}/>
            }
        </div>
    )
}

export default UserPanel;
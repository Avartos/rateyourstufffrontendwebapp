import useFetch from "../../hooks/useFetch";
import ChangeUserData from "./changeUserData";

const UserPanel = () => {
    const sessionUserID = 1;

    const {data: users, isPending, error} = useFetch(`http://localhost:5000/user/${sessionUserID}`);

    return(
        <ChangeUserData user={users} />

    );
}
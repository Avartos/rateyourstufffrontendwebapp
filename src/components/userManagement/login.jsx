import {useState} from "react";
import useFetch from "../../hooks/useFetch";

const Login = () => {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const {data: uId, isPending, fetchError} = useFetch(`http://localhost:5000/uId=${username}`);


    const handleLogin = (e) => {
        e.preventDefault();
        fetch(`http://localhost:5000/authenticate`, {
            method: "POST",
            headers: {"Content-Type": "application/json" },
            body: JSON.stringify({username, password})
        })
            .then((response) => {
                if(!response.ok) {
                    console.log(response.data.error);
                    //throw error("no response available");
                }
                //console.log(username + password);
                //console.log("Response: "+response);
                return response.json();
            })
            .then((data) => {
                console.log({data});
                console.log({uId});
                sessionStorage.setItem("id", uId.toString());
                sessionStorage.setItem("username", username);
                sessionStorage.setItem("Bearer ", data);
                //history.push("/");
            })
            .catch((error) => {
              setError(
                    "Login nicht möglich ("+ error +")"
                );
            });
    };

    return (
        <div className="loginDisplay">
            <div className="loginBox">
                <h2>bei RaYS einloggen </h2>
                <form onSubmit={handleLogin}>
                    <label>Username</label>
                    <input className="loginInput"
                        type="text"
                        required
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                    <label>Password</label>
                    <input className="loginInput"
                        type="password"
                        required
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <button className="loginButton">login</button>
                </form>
            </div>
        </div>
    )
};

export default Login;
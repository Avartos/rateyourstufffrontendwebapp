import {useState} from "react";
import {decodeJWT} from "../decodeJWT";
import {useHistory} from "react-router-dom";
import RedirectingComponent from "./redirectingComponent";

const Login = () => {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const _router = useHistory();
    var decodedData;

    const handleLogin = (e) => {
        e.preventDefault();
        fetch(`http://localhost:5000/authenticate`, {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({username, password})
        })
            .then((response) => {
                if (!response.ok) {
                    console.log(response.data.error);
                    //throw error("no response available");
                }
                //console.log(username + password);
                //console.log("Response: "+response);
                return response.json();
            })
            .then((data) => {
                decodedData = decodeJWT(data.jwt);
                console.log(decodedData);
                sessionStorage.setItem("id", decodedData.id);
                sessionStorage.setItem("username", username);
                sessionStorage.setItem("Bearer ", `Bearer ${data.jwt}`);
                setTimeout(() => _router.push('/'), 1000);
            })
            .catch((error) => {
                setError(
                    "Login nicht möglich (" + error + ")"
                );
            });
    };

    return (
        <div className="login">
            <form onSubmit={handleLogin}>
                <label>Username</label>
                <input
                    type="text"
                    required
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
                <label>Password</label>
                <input
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button>login</button>
            </form>
        </div>
    )
};

export default Login;
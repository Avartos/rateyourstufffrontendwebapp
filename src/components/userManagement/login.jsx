import { useState } from "react";
import { decodeJWT } from "../decodeJWT";
import { useHistory } from "react-router";

/**
 * Component to provide a user login
 * @returns {JSX.Element} login Component
 * @constructor
 */
const Login = ({ handleAddMessage }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const _router = useHistory();
  var decodedData;

  /**
   * This component takes data from login-form, compares given data from user with data from database
   * and stores important data to the sessionStorage if the login was successful
   * @param e
   */
  const handleLogin = (e) => {
    e.preventDefault();
    fetch(`http://localhost:5000/authenticate`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    })
      .then((response) => {
        if (!response.ok) {
          throw Error("Beim Login ist ein Fehler aufgetreten");
        }
        return response.json();
      })
      .then((data) => {
        decodedData = decodeJWT(data.jwt);
        sessionStorage.setItem("id", decodedData.id);
        sessionStorage.setItem("username", username);
        sessionStorage.setItem("role", decodedData.role);
        sessionStorage.setItem("Bearer ", `Bearer ${data.jwt}`);
        handleAddMessage(
          "success",
          "Angemeldet",
          "Sie wurden erfolgreich angemeldet"
        );
      })
      .catch((error) => {
        handleAddMessage("error", "Fehler", error.message);
      });
  };

  return (
    <div className="loginDisplay">
      <div className="loginBox">
        <h2>bei RaYS einloggen </h2>
        <form onSubmit={handleLogin}>
          <label>Username</label>
          <input
            className="loginInput"
            type="text"
            required
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <label>Password</label>
          <input
            className="loginInput"
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button className="loginButton">login</button>
        </form>
      </div>
    </div>
  );
};

export default Login;

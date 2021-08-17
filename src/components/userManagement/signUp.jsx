import { useState } from "react";
import RedirectingComponent from "./redirectingComponent";
import { useHistory } from "react-router-dom";
import useFetch from "../../hooks/useFetch";
import { red } from "@material-ui/core/colors";

/**
 * Component is providing a SignUp-Form and converts sends the Data in JSON-Format over POST-Request to the Rest-API
 * @return {JSX.Element} signUp component
 * @constructor
 */
const SignUp = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [gender, setGender] = useState("male");
  const [userName, setUserName] = useState("");
  const [passwordHash, setPassword] = useState("");
  const [passwordHashReference, setPasswordHashReference] = useState("");
  const [email, setEmail] = useState("example@rays.com");
  const [errorMessage, setErrorMessage] = useState("");
  const [validUserStatus, setValidUserStatus] = useState(false);
  const [validEmailStatus, setValidEmailStatus] = useState(false);
  const [roleName, setRole] = useState("User");
  const _router = useHistory();

  /**
   * Function is comparing a given email address from form with all stored email-addresses in database and
   * @return true if email address isn´t currently taken, Status 418 if the email is currently stored in database.
   */
  async function checkIsValidEmail() {
    console.log(email);
    return fetch(`http://localhost:5000/login/check/`, {
      method: "POST",
      body: email,
    })
      .then((response) => {
        console.log('EMail ' + response.status);
        if (!response.ok) {
          throw Error("Email bereits vergeben!");
        }
        setValidEmailStatus(true)
        return true;
      })
      .catch((error) => {
        setValidEmailStatus(false);
        return true;
      });
  }

  /**
   * Function is comparing a given user name address from form with all stored user name in database and
   * @return true if user name isn´t currently taken, Status 418 if the user name is currently stored in database.
   */
  const checkIsValidUserName = async () => {
    console.log(userName);
    return fetch(`http://localhost:5000/user/check/is=${userName}`, {
      method: "GET",
    })
      .then((response) => {
        if (!response.ok) {
          throw Error("Username bereits vergeben!");
        }
        setValidUserStatus(true)
        return true;
      })
      .catch((error) => {
        setValidUserStatus(false)
        setErrorMessage(error.message);
        return false;
      });
  }

  /**
   * Function is checking if a password and his reference are eqal
   * @param passwordHash from password field of form
   * @param passwordHashReference from repeat password field of form
   * @returns {boolean} true if the both passwords are eqal
   */
  function isValidPassword() {
    if (passwordHash === passwordHashReference) {
      return true;
    } else {
      setErrorMessage("non identical passwords");
      return false;
    }
  }

  /**
   * Method generates the JSON-String after submit and sends fetches via POST-Request to the Rest-API
   * @param e is standard event param
   */
  const handleSubmit = async (e) => {
    e.preventDefault();
    const isEnabled = false;
    const role = { roleName };
    const login = { email, passwordHash, isEnabled };
    const user = { firstName, gender, lastName, userName, login, role };
    const isValidEmail = await checkIsValidEmail();
    const isValidUserName = await checkIsValidUserName();
    console.log(isValidEmail);
    console.log(isValidUserName);
    if (
        isValidEmail === true &&
        isValidUserName === true &&
        isValidPassword()
      ) {
          console.log("Halleo");
        fetch("http://localhost:5000/user/add", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(user),
        })
          .then((response) => {
            if (!response.ok) {
              throw Error("Registrierung fehlgeschlagen!");
            }
            _router.push("/login");
          })
          .catch((error) => {
            setErrorMessage(error.message);
          });
      } else {
        setErrorMessage("Error adding user");
      }
  };

  return (
    <div className="signUpDisplay">
      <div className="welcomeBox">
        <h1>Welcome to ... </h1>
        <p>This is your Plattform to rate all media you can imagine ...</p>
        <p>
          You have the Opinion to share your progress of books you read, games
          you play, series and movies you are actualy watching. The key to more
          fun is that you can share that with your friends. Additionally you can
          discuss some chapters, comment some progresses of your friends and
          many more! RateYourStuff can be easily the key to Share all your
          favourite Media with your favourite People and learn more about taste
          of them.
        </p>
        <p>Just sign up and find out what media can do to you !!</p>
        <p>Lets share our best moments with our friends.</p>
      </div>
      <div className="signUpBox">
        <h2>Account erstellen</h2>
        <div className="signUp">
          <form onSubmit={handleSubmit}>
            <label>Gender</label>
            <select
              className="genderChoiceField"
              value={gender}
              onChange={(e) => setGender(e.target.value)}
            >
              <option value="male">male</option>
              <option value="female">female</option>
              <option value="diverse">diverse</option>
            </select>
            <label>First Name</label>
            <input
              className="signUpInput"
              type="text"
              required
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
            <label>Last Name</label>
            <input
              className="signUpInput"
              type="text"
              required
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
            <label>User Name</label>
            <input
              className="signUpInput"
              type="text"
              required
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
            />
            <label>Email</label>
            <input
              className="signUpInput"
              title="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <label>Password</label>
            <input
              className="signUpInput"
              id="password"
              type="password"
              required
              value={passwordHash}
              onChange={(e) => setPassword(e.target.value)}
            />
            <label>Repeat Password</label>
            <input
              className="signUpInput"
              type="password"
              required
              value={passwordHashReference}
              onChange={(e) => setPasswordHashReference(e.target.value)}
            />
            {errorMessage}
            <button className="signUpButton">SignUp</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignUp;

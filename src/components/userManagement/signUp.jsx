import {useState} from "react";
import RedirectingComponent from "./redirectingComponent";
import {useHistory} from "react-router-dom";
import useFetch from "../../hooks/useFetch";
import {red} from "@material-ui/core/colors";


/**
 * Component is providing a SignUp-Form and converts sends the Data in JSON-Format over POST-Request to the Rest-API
 * @return {JSX.Element} signUp component
 * @constructor
 */
const SignUp = () => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [secondName, setSecondName] = useState('');
    const [gender, setGender] = useState('male');
    const [userName, setUserName] = useState('');
    const [passwordHash, setPassword] = useState('');
    const [passwordHashReference, setPasswordHashReference] = useState('')
    const [email, setEmail] = useState('example@rays.com');
    const [errorMessage, setErrorMessage] = useState('');
    const [validUserStatus, setValidUserStatus] = useState(true)
    const [validEmailStatus, setValidEmailStatus] = useState(true)
    const _router = useHistory();

    /**
     * Function is comparing a given email address from form with all stored email-addresses in database and
     * @return true if email address isn´t currently taken, Status 418 if the email is currently stored in database.
     */
    function emailValidator() {
        fetch(`http://localhost:5000/login/check/is=${email}`, {
            method: 'GET', mode: 'no-cors'
        }).then((response) => {
            setValidEmailStatus(response.status === 418)
        }).catch(error => {
            setErrorMessage("Email bereits vergeben!")
        })
    }

    /**
     * Function is comparing a given user name address from form with all stored user name in database and
     * @return true if user name isn´t currently taken, Status 418 if the user name is currently stored in database.
     */
    function userNameValidator() {
        fetch(`http://localhost:5000/user/check/is=${userName}`, {
            method: 'GET'
        }).then((response) => {
            setValidUserStatus(response.status === 418)

        }).catch(error => {
            setErrorMessage("Username bereits vergeben!")
        })
    }

    /**
     * Function is checking if a password and his reference are eqal
     * @param passwordHash from password field of form
     * @param passwordHashReference from repeat password field of form
     * @returns {boolean} true if the both passwords are eqal
     */
    function isValidPassword() {
        if(passwordHash === passwordHashReference)
        {
            return true;
        } else {
            setErrorMessage("non identical passwords")
            return false;
        }
    }


    /**
     * Method generates the JSON-String after submit and sends fetches via POST-Request to the Rest-API
     * @param e is standard event param
     */
    const handleSubmit = (e) => {
        e.preventDefault();
        const isEnabled = false;
        const login = {email, passwordHash, isEnabled}
        const user = {firstName, gender, lastName, secondName, userName, login};
        //emailValidator();
        /**
         * Check if UserName and EmailStatus are valid values
         */
        //userNameValidator();
        isValidPassword();
        console.log("validUserStatus" + validUserStatus + " / " + "validEmailStatus" + validEmailStatus);

        if (validUserStatus === true && validEmailStatus === true && isValidPassword()) {
            fetch('http://localhost:5000/user/add', {
                method: 'POST',
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify(user)
            }).then(() => {
                console.log('User successfully added');
                setTimeout(() => _router.push('/login'), 1500);
            })
            console.log(user);
        } else {
            setTimeout(() => setErrorMessage('Error adding user'), 3000);
        }

    }
    return (
        <div className="signUpDisplay">
            <div className="welcomeBox">
                <h1>Welcome to ... </h1>
                <p>This is your Plattform to rate all media you can imagine ...</p>
                <p>You have the Opinion to share your progress of books you read, games you play,
                    series and movies you are actualy watching. The key to more fun is that you can
                    share that with your friends. Additionally you can discuss some chapters,
                    comment some progresses of your friends and many more! RateYourStuff can be
                    easily the key to Share all your favourite Media with your favourite People
                    and learn more about taste of them.</p>
                <p>Just sign up and find out what media can do to you !!</p>
                <p>Lets share our best moments with our friends.</p>
            </div>
            <div className="signUpBox">
                <h2>Account erstellen</h2>
                <div className="signUp">
                    <form onSubmit={handleSubmit}>

                        <label>Gender</label>
                        <select className="genderChoiceField"
                                value={gender}
                                onChange={(e) => setGender(e.target.value)}
                        >
                            <option value="male">male</option>
                            <option value="female">female</option>
                            <option value="diverse">diverse</option>
                        </select>
                        <label>First Name</label>
                        <input className="signUpInput"
                               type="text"
                               required
                               value={firstName}
                               onChange={(e) => setFirstName(e.target.value)}
                        />
                        <label>Second Name</label>
                        <input className="signUpInput"
                               type="text"
                               value={secondName}
                               onChange={(e) => setSecondName(e.target.value)}
                        />
                        <label>Last Name</label>
                        <input className="signUpInput"
                               type="text"
                               required
                               value={lastName}
                               onChange={(e) => setLastName(e.target.value)}
                        />
                        <label>User Name</label>
                        <input className="signUpInput"
                               type="text"
                               required
                               value={userName}
                               onChange={(e) => setUserName(e.target.value)}
                        />
                        <label>Email</label>
                        <input className="signUpInput"
                               title="email"
                               required
                               value={email}
                               onChange={(e) => setEmail(e.target.value)}
                        />
                        <label>Password</label>
                        <input className="signUpInput"
                               id="password"
                               type="password"
                               required
                               value={passwordHash}
                               onChange={(e) => setPassword(e.target.value)}
                        />
                        <label>Repeat Password</label>
                        <input className="signUpInput"
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
}

export default SignUp;
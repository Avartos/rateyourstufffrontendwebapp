import {useState} from "react";
import RedirectingComponent from "./redirectingComponent";
import {useHistory} from "react-router-dom";
import useFetch from "../../hooks/useFetch";


/**
 * Component generates a SignUp-Form and converts sends the Data in JSON-Format over POST-Request to the Rest-API
 */
const SignUp = () => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [secondName, setSecondName] = useState('');
    const [gender, setGender] = useState('male');
    const [userName, setUserName] = useState('');
    const [passwordHash, setPassword] = useState('');
    const [email, setEmail] = useState('example@rays.com');
    const [errorMessage, setErrorMessage] = useState('');
    const [status, setStatus] = useState(true)
    const _router = useHistory();

    //TODO: Validation for email-address
    function checkUserName() {
        fetch(`http://localhost:5000/user/check/is=${userName}`, {
            method: 'GET'
        }).then((response) => {
            setStatus(response.status === 418)
        }).catch(error => {
        })
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
        checkUserName();
        if (status === false) {
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
            setErrorMessage("Username bereits vergeben!")
            setTimeout(() => setErrorMessage(''), 3000);
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
                               type="password"
                               required
                               value={passwordHash}
                               onChange={(e) => setPassword(e.target.value)}
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
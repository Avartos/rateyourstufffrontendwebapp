import {useState} from "react";

/**
 * Component which gives the user posibilities to change his personal data
 * @param user given from backend (Database)
 * @returns {JSX.Element} changeUserData
 * @constructor
 */
const ChangeUserData = ({user, handleAddMessage}) => {

    (console.log("ChangeUserDataOutput " + user));
    const [firstName, setFirstName] = useState(user.firstName);
    const [lastName, setLastName] = useState(user.lastName);
    const [secondName, setSecondName] = useState(user.secondName);
    const [userName, setUserName] = useState(user.userName);
    const [gender, setGender] = useState(user.gender);
    const [passwordHash, setPassword] = useState('DUMMY');
    const [passwordHashReference, setPasswordReference] = useState('DUMMY');
    const [email, setEmail] = useState(user.loginEmail);
    const [validUserStatus, setValidUserStatus] = useState(false)
    const [validEmailStatus, setValidEmailStatus] = useState(false)
    const [errorMessage, setErrorMessage] = useState('');

    const [error, setError] = useState('');

    const loginId = user.loginId;

    /**
     * Function is comparing a given email address from form with all stored email-addresses in database and
     * @return true if email address isn´t currently taken, Status 418 if the email is currently stored in database.
     */
    const checkIsValidEmail = async () =>  {
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
                handleAddMessage('error', 'Fehler', error.message);
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
                handleAddMessage('error', 'Fehler', error.message);
                return false;
            });
    }

    /**
     * Function is checking if a password and his reference are eqal
     * @param passwordHash from password field of form
     * @param passwordHashReference from repeat password field of form
     * @returns {boolean} true if the both passwords are eqal
     */
        // --- Functions
    const validPassword = (passwordHash, passwordHashReference) => {
            if (passwordHash === passwordHashReference) {
                return true;
            }
            return false;
        }


    /**
     * This function should update the user data like User Name
     * @param e default event parameter
     */
    const handleUserUpdate = async (e) => {
        e.preventDefault();
        const updatedUser = {id: user.id, firstName, lastName, gender, secondName, userName, login_id: loginId};
        //const isValidUsername = await checkIsValidUserName();
        //if (isValidUsername === true) {
            fetch('http://localhost:5000/user', {
                method: 'PUT',
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": sessionStorage.getItem("Bearer "),
                },
                body: JSON.stringify(updatedUser)
            }).then((response) => {
                if (!response.ok) {
                    throw Error("Update des Profiles fehlgeschlagen!");
                }
                handleAddMessage('success', 'Aktualisiert', 'Ihre Nutzerdaten wurden aktualisiert');
            }).catch((error) => {
                handleAddMessage('error', 'Fehler', error.message);
            });
   }

    /**
     * This function should update all Account Data like Email and Password
     * @param e
     */
    const handleAccountUpdate = async (e) => {
        e.preventDefault();
        const login = {id: user.loginId, isEnabled: user.loginIsEnabled, email, passwordHash};
        //const isValidEmail = await checkIsValidEmail();
        if (validPassword(passwordHash, passwordHashReference)) {
            fetch('http://localhost:5000/login', {
                method: 'PUT',
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": sessionStorage.getItem("Bearer "),
                },
                body: JSON.stringify(login)
            }).then((response) => {
                if(!response.ok){
                    throw Error("Updaten der Account - Daten fehlgeschlagen!");
                }
                setHasAccountBeenChanged(false);
                handleAddMessage('success', 'Aktualisiert', 'Ihr Account wurde aktualisiert');
            }).catch(error => {
                handleAddMessage('error', 'Fehler', error.message);
            });
            //console.log(user);
        } else {
            handleAddMessage('error', 'Fehler', 'Die Passwörter stimmen nicht überein');
        }
    }

    const [hasAccountBeenChanged, setHasAccountBeenChanged] = useState(false);


    return (
        <div className="changeUserData">
            <div className="userInformationDisplay">
                {/*<h2>Here you can change User Data</h2>*/}
                <div className="userInformationBox">
                    <h2>Personal Data:</h2>
                    <form onSubmit={handleUserUpdate}>
                        <label>Nutzername</label>
                        <input className="dataChangeInput"
                               type="test"
                               value={userName}
                               readOnly
                               disabled
                               onChange={(e) => setUserName(e.target.value)}
                        />
                        <label>Vorname</label>
                        <input className="dataChangeInput"
                               type="text"
                               value={firstName}
                               onChange={(e) => setFirstName(e.target.value)}
                        />

                        <label>Nachname</label>
                        <input className="dataChangeInput"
                               type="text"
                               value={lastName}
                               onChange={(e) => setLastName(e.target.value)}
                        />
                        <button className="changeButton">Update Profile</button>
                    </form>
                </div>
                <div className="userInformationBox">
                    <h2>Security Data:</h2>
                    <form onSubmit={handleAccountUpdate}>
                        <label>Email</label>
                        <input className="dataChangeInput"
                               type="email"
                               value={email}
                               onChange={(e) => {setEmail(e.target.value); setHasAccountBeenChanged(true)}}
                        />
                        <label>Passwort</label>
                        <input className="dataChangeInput"
                               type="password"
                               value={passwordHash}
                               onChange={(e) => {setPassword(e.target.value); setHasAccountBeenChanged(true)}}
                        />
                        <label>Passwort-Wiederholung</label>
                        <input className="dataChangeInput"
                               type="password"
                               value={passwordHashReference}
                               onChange={(e) => {setPasswordReference(e.target.value); setHasAccountBeenChanged(true)}}
                        />
                        <button className={'changeButton ' + (!hasAccountBeenChanged ? 'disabled' : '')} disabled={!hasAccountBeenChanged}>Update Account</button>
                        {error}
                    </form>
                </div>
            </div>
        </div>

    )
}

export default ChangeUserData;
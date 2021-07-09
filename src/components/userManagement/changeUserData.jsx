import {useState} from "react";

const ChangeUserData = ({user}) => {

    (console.log("ChangeUserDataOutput " + user));
    const [firstName, setFirstName] = useState(user.firstName);
    const [lastName, setLastName] = useState(user.lastName);
    const [secondName, setSecondName] = useState(user.secondName);
    const [userName, setUserName] = useState(user.userName);
    const [gender, setGender] = useState(user.gender);
    const [passwordHash, setPassword] = useState('DUMMY');
    const [passwordHashReference, setPasswordReference] = useState('DUMMY');
    const [email, setEmail] = useState(user.login.email);

    const [error, setError] = useState('');

    const loginId = user.login.id;

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
    const handleUserUpdate = (e) => {
        e.preventDefault();
        const updatedUser = {id: user.id, firstName, lastName, gender, secondName, userName, login_id: loginId};

        fetch('http://localhost:5000/user', {
            method: 'PUT',
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(updatedUser)
        }).then(() => {
            console.log('User successfully updated');
        })
        console.log(user);
    }

    /**
     * This function should update all Account Data like Email and Password
     * @param e
     */
    const handleAccountUpdate = (e) => {
        e.preventDefault();
        const login = {id: user.login.id , isEnabled: user.login.isEnabled, email, passwordHash};
        if (validPassword(passwordHash, passwordHashReference)){
            fetch('http://localhost:5000/login', {
                method: 'PUT',
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify(login)
            }).then(() => {
                console.log('Account successfully updated');
            })
            console.log(user);
        } else {
            console.log('Password Check failed');
            setError('non similar passwords');
        }
    }


    return (
        <div className="changeUserData">
            <div className="userInformationDisplay">
            {/*<h2>Here you can change User Data</h2>*/}
                <div className="userInformationBox">
                    <h2>Personal Data:</h2>
                    <form onSubmit={handleUserUpdate}>
                        <label>User Name</label>
                        <input className="dataChangeInput"
                            type="test"
                            value={userName}
                            onChange={(e) => setUserName(e.target.value)}
                        />
                        <label>First Name</label>
                        <input className="dataChangeInput"
                            type="text"
                            value={firstName}
                            onChange={(e) => setFirstName(e.target.value)}
                        />
                        {/* <label>Second Name</label>
                        <input className="dataChangeInput"
                            type="text"
                            value={secondName}
                            onChange={(e) => setSecondName(e.target.value)}
                        /> */}
                        <label>Last Name</label>
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
                    <form onSubmit={(e) => handleAccountUpdate(e)}>
                        <label>Email</label>
                        <input className="dataChangeInput"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(this.target.value)}
                        />
                        <label>Password</label>
                        <input className="dataChangeInput"
                            type="password"
                            value={passwordHash}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <label>Repeat Password</label>
                        <input className="dataChangeInput"
                            type="password"
                            value={passwordHashReference}
                            onChange={(e) => setPasswordReference(e.target.value)}
                        />
                        <button className="changeButton">Save Password</button>
                        {error}
                    </form>
                </div>
            </div>
        </div>

    )
}

export default ChangeUserData;
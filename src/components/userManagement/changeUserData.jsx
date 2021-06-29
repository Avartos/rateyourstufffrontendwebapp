import {useState} from "react";

const ChangeUserData = ({user}) => {
    const [firstName, setFirstName] = useState(user.firstName);
    const [lastName, setLastName] = useState(user.lastName);
    const [secondName, setSecondName] = useState(user.secondName);
    const [userName, setUserName] = useState(user.userName);
    const [passwordHash, setPassword] = useState('DUMMY');
    const [passwordHashReference, setPasswordReference] = useState('DUMMY');
    const [email, setEmail] = useState(user.login.email);

    const [error, setError] = useState('');

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
        const user = {firstName, lastName, secondName, userName};

        fetch('http://localhost:5000/user', {
            method: 'PUT',
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(user)
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
        const login = {email, passwordHash};
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
        <div className={ChangeUserData()}>
            <h2>Here you can change User Data</h2>
            <h3>Account Data</h3>
            <form onSubmit={handleAccountUpdate}>


            </form>
            <h3>Personal Data</h3>
            <form onSubmit={handleUserUpdate}>
                <label>User Name</label>
                <input
                    type="test"
                    value={userName}
                    onChange={(e) => setFirstName(e.target.value)}
                />
                <label>First Name</label>
                <input
                    type="text"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                />
                <label>Second Name</label>
                <input
                    type="text"
                    value={secondName}
                    onChange={(e) => setSecondName(e.target.value)}
                />
                <label>Last Name</label>
                <input
                    type="text"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                />
                <button>Update Profile</button>
            </form>
            <h3>Security Data:</h3>
            <form onSubmit={handleAccountUpdate()}>
                <label>Email</label>
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(this.target.value)}
                />
                <label>Password</label>
                <input
                    type="password"
                    value={passwordHash}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <lablel>Repeat Password</lablel>
                <input
                    type="password"
                    value={passwordHashReference}
                    onChange={(e) => setPasswordReference(e.target.value)}
                />
                <button>Save Password</button>
            </form>
        </div>

    )
}

export default ChangeUserData;
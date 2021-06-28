import {useState} from "react";

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

    /**
     * Method generates the JSON-String after submit and sends fetches via POST-Request to the Rest-API
     * @param e is standard event param
     */
    const handleSubmit = (e) => {
        e.preventDefault();
        const isEnabled = false;
        const login = { email, passwordHash, isEnabled }
        const user = {firstName, gender, lastName, secondName, userName, login};

        fetch('http://localhost:5000/user/add', {
            method: 'POST',
            headers: { "Content-Type": "application/json"},
            body: JSON.stringify(user)
        }).then(() => {
            console.log('User successfully added');
        })
        console.log(user);
    }
    return (
        <div className="SignUp">
            <h2>This will be the SignUp-Page</h2>
            <form onSubmit={handleSubmit}>
                <label>Gender</label>
                <select
                    value={gender}
                    onChange={(e) => setGender(e.target.value)}
                >
                    <option value="male">male</option>
                    <option value="female">female</option>
                    <option value="diverse">diverse</option>
                </select>
                <label>First Name</label>
                <input
                    type="text"
                    required
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
                    required
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                />
                <label>User Name</label>
                <input
                    type="text"
                    required
                    value={userName}
                    onChange={(e) => setUserName(e.target.value)}
                />
                <label>Email</label>
                <input
                    title="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <label>Password</label>
                <input
                    type="password"
                    required
                    value={passwordHash}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button>SignUp</button>
            </form>
        </div>
    );
}

export default SignUp;
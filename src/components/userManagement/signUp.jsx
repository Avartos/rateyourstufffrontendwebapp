import {useState} from "react";

const SignUp = () => {
    const [first_name, setFirstName] = useState('');
    const [last_name, setLastName] = useState('');
    const [second_name, setSecondName] = useState('');
    const [gender, setGender] = useState('male');
    const [user_name, setUserName] = useState('');
    const [password_hash, setPassword] = useState('');
    const [email, setEmail] = useState('example@rays.com');

    const handleSubmit = (e) => {
        e.preventDefault();
        const login = {email, password_hash}
        const user = {first_name, second_name, last_name, gender, user_name, login};

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
                    value={first_name}
                    onChange={(e) => setFirstName(e.target.value)}
                />
                <label>Second Name</label>
                <input
                    type="text"
                    required
                    value={second_name}
                    onChange={(e) => setSecondName(e.target.value)}
                />
                <label>Last Name</label>
                <input
                    type="text"
                    required
                    value={last_name}
                    onChange={(e) => setLastName(e.target.value)}
                />
                <label>User Name</label>
                <input
                    type="text"
                    required
                    value={user_name}
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
                    value={password_hash}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button>SignUp</button>
            </form>
        </div>
    );
}

export default SignUp;
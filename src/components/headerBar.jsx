import { Link } from "react-router-dom";

const HeaderBar = () => {
    return ( 
        <nav>
            <Link className="link" to="/">
            <h2>RateYorStuff</h2>
            </Link>
            
            <p>
                home
                <Link className="link" to="/signup">
                    SignUp
                </Link>
            </p>

            <div className="gradient"></div>
        </nav>
     );
}
 
export default HeaderBar;
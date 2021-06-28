import { Link } from "react-router-dom";

const HeaderBar = () => {
    return ( 
        <nav>
            <Link className="link" to="/">
            <h2>RateYorStuff</h2>
            </Link>
            
            <p>
                home
                <div><Link className="link" to="/signup">SignUp</Link></div>
            </p>

            <div className="gradient"></div>
        </nav>
     );
}
 
export default HeaderBar;
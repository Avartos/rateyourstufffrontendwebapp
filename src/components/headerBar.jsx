import { Link } from "react-router-dom";

const HeaderBar = () => {
    return ( 
        <nav>
            <Link className="link" to="/">
            <h2>RateYorStuff</h2>
            </Link>
            
            <span>
                home
                <div><Link className="link" to="/signup">SignUp</Link></div>
            </span>

            <div className="gradient"></div>
        </nav>
     );
}
 
export default HeaderBar;
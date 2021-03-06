import { Link } from "react-router-dom";

const ToggleLink = (props) => {
    return ( 
        <div className="toggleLink">
            <p className="icon-button">{props.children}</p>
            <Link to={props.target} onClick={() => props.handleSetVisible(false)}>{props.title}</Link>
          </div>
     );
}
 
export default ToggleLink;
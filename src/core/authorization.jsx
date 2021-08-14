import redirect from "./redirect";
import {useHistory} from "react-router-dom";

const isLoggedIn = () => {
    return sessionStorage.getItem("Bearer ") !== null;
};

/**
 * Functions are checking the role of the user and return true if user has required role
 * @returns {boolean} true if user has role admin, else false
 * @returns {boolean} true if user has role moderator or admin, else false
 * @returns {boolean} true if user has role user or moderator or admin, else false
 */
const isAdmin = () => {

    if(isLoggedIn() && sessionStorage.getItem('role') === 'Admin') {
        return true;
    } else if (isLoggedIn()) {
        //redirect.RedirectToPath('http://localhost:3000/forbidden');
        return false;
    } else {
        //redirect.RedirectToPath('http://localhost:3000/login');
        return false;
    }
}

const isModerator = () => {
    if(isLoggedIn() && sessionStorage.getItem('role') === 'Admin'
    || isLoggedIn() && sessionStorage.getItem('role') === 'Moderator') {
        return true;
    } else if (isLoggedIn()) {
        return false;
    } else {
        return false;
    }
}

const isUser = () => {
    if(isLoggedIn() && sessionStorage.getItem('role') === 'Admin'
    || isLoggedIn() && sessionStorage.getItem('role') === 'Moderator'
    || isLoggedIn() && sessionStorage.getItem('role') === 'User' ) {
        return true;
    } else if (isLoggedIn()) {
        return false;
    } else {
        return false;
    }
}

const isBusiness = () => {
    if(isLoggedIn() && sessionStorage.getItem('role') === 'Business') {
        return true;
    } else if (isLoggedIn()) {
        return false;
    } else {
        return false;
    }
}

const authorization = {
    isLoggedIn,
    isAdmin,
    isUser,
    isBusiness
}

export default authorization;
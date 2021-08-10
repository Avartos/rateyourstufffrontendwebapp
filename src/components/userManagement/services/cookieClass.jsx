
import {useCookies} from "react-cookie";

const CookieClass = () => {
    const [ cookies, setCookie ] = useCookies(["user"]);

    function storeCookie(userObject) {
        setCookie('user', userObject, { path: '/' })
    }

    function getCookies(){
        return cookies;
    }
}
export default CookieClass;
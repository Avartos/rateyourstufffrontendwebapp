import jwt_decode from "jwt-decode";

export function decodeJWT(jwt) {
    return jwt_decode(jwt);
}
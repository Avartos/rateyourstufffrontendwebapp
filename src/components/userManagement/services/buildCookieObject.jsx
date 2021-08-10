import {decodeJWT} from "../../decodeJWT";

export function buildCookieObject(jwtData) {
    var decodedData = decodeJWT(jwtData);
    var Bearer = `Bearer ${jwtData.jwt}`;
    var id = decodedData.id;
    var username = decodedData.sub;



    console.log(JSON.stringify({Bearer, username, id}));
}
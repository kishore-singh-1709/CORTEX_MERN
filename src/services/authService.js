import jwt_decode from "jwt-decode";

export default function getJwt(){
    return getToken();
}

export function getLoginJwt(){
        const jwt = getToken();
        try{
            return jwt_decode(jwt);
        }catch(ex){
            console.log('getLoginJwt',ex);
        }
}

//Hard Route Check - restricts invalid incoming routes
export function isValidLogin(){
    try{
        const {name:initUser}= getLoginJwt();
        return initUser;
      }catch(ex){
        console.log('app',ex);
    }
}

//Hard Route Check - restricts invalid incoming routes
export function isAdminLogin(){
    try{
        const {isAdmin}= getLoginJwt();
        return isAdmin;
      }catch(ex){
        console.log('app',ex);
    }
}

function getToken(){
    return localStorage.getItem('accessToken');
}

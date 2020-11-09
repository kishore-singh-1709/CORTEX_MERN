import { useEffect } from 'react';

const SignOut = (props) => {
    
    useEffect(()=>{
        localStorage.removeItem('accessToken');
        props.history.replace('/signin');
        window.location = '/signin'; //App full reload
    },[]);
    
    return null;
}
 
export default SignOut;
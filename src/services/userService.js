import axios from "axios";

const apiEndPointUser = '/users/';
const apiEndPointSignin = '/signin/';

export async function saveUser(customerObj){
        return await axios.post(apiEndPointUser,viewToModel(customerObj));
}

export async function validateUser(customerObj){
        return await axios.post(apiEndPointSignin,viewToModel(customerObj));
}

function viewToModel(viewObj){
const userModel = {
                    name:viewObj.name,
                    email:viewObj.email,
                    password:viewObj.password,
                    isAdmin:viewObj.isAdmin
                  };
return userModel;
}
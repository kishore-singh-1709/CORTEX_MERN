import axios from 'axios';
import getJwt from './authService';
import { handleToastInfo } from '../utils/toaster';


axios.defaults.baseURL = process.env.REACT_APP_API_URL;

const apiEndPointTicket = '/tickets/';
const apiEndPointStatus = '/status/';

//For Calling Secured REST Ends - JWT Token needs to sent in Request Header
axios.defaults.headers.common['x-auth'] = getJwt();

let errorCount = 0; // For axios.all exception,Prevent multpile toaster display

//Global Handling - For Handling Unexpected Errors - 500
axios.interceptors.response.use(null,error=>{
    const expectedError =  (error.response &&error.response.status >= 400 && error.response.status < 500);
    if(!expectedError && errorCount===0){
        console.log('interceptor',error);
        errorCount++;
        handleToastInfo({action:'error',msg:'UNEXPECTED ERROR OCCURED...'});
    }
    return Promise.reject(error);
});

export async function getInitialDatas(){
    return axios.all([
        axios.get(apiEndPointTicket),
        axios.get(apiEndPointStatus)
       ]).then(axios.spread((...responses)=>{
           const ticketList = responses[0].data;
           const statusList = responses[1].data;
           console.log('axios_all_m',ticketList);
           console.log('axios_all_g',statusList);
           return {ticketList, statusList};
       })).catch((e)=>{
            console.log('axios_all',e);
            handleTicketApiException(e);
       });
}

export async function getTickets (){
    try{
        const {data} = await axios.get(apiEndPointTicket);
        return data;
    }catch(exception){
        console.log(exception);
    }
}

export async function getTicket(id){
    try{
        const {data} = await axios.get(`${apiEndPointTicket}${id}`);
        return data;
    }catch(exception){
        console.log(exception);
    }
}

export async function saveTicket(ticketObj){
        return await axios.post(apiEndPointTicket,ticketObj);
}

export async function updateTicket(ticketObj){
        const _id = ticketObj._id;
        delete ticketObj._id;
        return await axios.put(`${apiEndPointTicket}${_id}`,ticketObj);
}

export async function deleteTicket(id){
    return await axios.delete(`${apiEndPointTicket}${id}`);
}

export function handleTicketApiException(ex){
    let msg;
    if(ex.response && ex.response.status){
        switch(ex.response.status){
            case 400: if(ex.response.data !== 'Invalid Token') break;
            case 401: msg = 'Please Login'; break;
            case 403: msg = 'Only Admin has privelege to do this action'; break;
            case 404: msg = 'HTTP Route wrong'; break;
            default:  return ex.response.data; 
        }
        handleToastInfo({action:'error',msg});
    }
}

export function mapToViewModel(ticket) {
    return {
        _id: ticket._id,
        title: ticket.title,
        statusId:ticket.status._id,
        description:ticket.description,
        progress:ticket.progress,
        assignee:ticket.assignee,
        userId:ticket.user._id
    }
}
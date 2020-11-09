import axios from 'axios';

const apiEndPointStatus = '/status/';

export async function getStatusDb(){
   try{     
        const {data} = await axios.get(apiEndPointStatus); 
        return data;
    }catch(e){
        console.log(e);
    }
}

export async function saveStatus(ticketObj){
    return await axios.post(apiEndPointStatus,ticketObj);
}

export async function updateStatus(ticketObj){
    const _id = ticketObj._id;
    delete ticketObj._id;
    return await axios.put(`${apiEndPointStatus}${_id}`,ticketObj);
}

export async function deleteStatus(id){
    return await axios.delete(`${apiEndPointStatus}${id}`);
}
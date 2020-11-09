import React  from 'react';
import Form from './common/form';
import Joi from 'joi-browser';
import { getStatusDb, saveStatus, updateStatus } from '../services/statusService';
import { ToastContainer } from 'react-toastify';
import { handleToastInfo } from '../utils/toaster';
import { handleTicketApiException } from '../services/ticketService';
import { isAdminLogin } from './../services/authService';

class StatusForm extends Form {

    state = { 
        data: {
            name:''
        },
        status: [],
        errors:{}
     }
     
     schema = {
        name: Joi.string().label('Status')
    }

    async componentDidMount() {
        if(!isAdminLogin()) window.location = '/not-found'; //Hard Route Check - restricts invalid incoming routes
        const status = await getStatusDb();
        this.setState({ status });
    }

    handleBack =()=>{
        this.props.history.replace('/tickets');
        window.location = '/tickets';
    }

    render() { 
        return (
        <div>
            <>
            <button className='btn btn-primary' onClick={()=>this.handleBack()}>&larr; Back</button>
            <h5>STATUS FORM</h5>
            </>
            <form onSubmit={this.handleSubmit}>
                {this.renderInput('name','Status')}
                {this.renderFormButton('Save')}
            </form>
            <ToastContainer position="bottom-center" autoClose={2000}/>
        </div>
         );
    }

    async doSubmit(){
        console.log('Status Form-submitted');
        const {data} = this.state;
        let submitAction;
        try{
            if(!data._id){
                console.log('saveTicket',data);
                await saveStatus(data);
                submitAction = 'Added';
            }else{
                await updateStatus(data);
                submitAction = 'Updated';
            } 
            handleToastInfo({action:'',msg: `${data.name} Status ${submitAction}` });
            setTimeout(()=>{
                this.props.history.replace('/tickets');
            },2000);
        }catch(ex){
            console.log('saveStatus_exception',ex);
            handleTicketApiException(ex);
        }
    }
}
 
export default StatusForm;
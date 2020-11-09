import React  from 'react';
import Form from './common/form';
import Joi from 'joi-browser';
import { getStatusDb } from '../services/statusService';
import { ToastContainer } from 'react-toastify';
import { handleToastInfo } from '../utils/toaster';
import { getTicket, handleTicketApiException, mapToViewModel, saveTicket, updateTicket } from '../services/ticketService';
import RangeSlider from './common/rangeSlider';
import { getLoginJwt } from '../services/authService';
import { isValidLogin } from './../services/authService';

class TicketForm extends Form {

    state = { 
        data: {
            title:'',
            description:'',
            statusId:'',
            assignee:'',
            progress:'0%',
            userId:''
        },
        status: [],
        errors:{}
     }
     
     schema = {
        title: Joi.string().min(5).max(10).required().label('Title'),
        description: Joi.string().max(20).label('Description'),
        assignee:Joi.string().required().label('Assignee'),
        statusId: Joi.string().label('Status'),
        userId: Joi.string().label('User'),
        progress: Joi.string().label('Progress')
    }

    async componentDidMount() {
        if(!isValidLogin()) window.location = '/not-found'; //Hard Route Check - restricts invalid incoming routes

        const {history, match} = this.props;

        const status = await getStatusDb();
        this.setState({ status });

        // match.url => '/tickets/new' => Empty form and save
        // match.url => '/ticket/id' => Load ticket in form and save =>match.params.id
        if(match.url.includes('new')) {
            const {_id} = getLoginJwt();
            const dataCopy = {...this.state.data};
            dataCopy.userId = _id;
            this.setState({data: dataCopy});
            return;
        }
        const ticketId = match.params.id;
        const ticket = await getTicket(ticketId);
        if(!ticket) return history.replace('/not-found');

        this.setState({ data: mapToViewModel(ticket) });
    }

    handleBack =()=>{
        this.props.history.replace('/tickets');
        window.location = '/tickets';
    }

    render() { 
         const {status, data} = this.state;
        return (
        <div>
            <>
            <button className='btn btn-primary' onClick={()=>this.handleBack()}>&larr; Back</button>
            <h5>TICKET FORM</h5>
            </>
            <form onSubmit={this.handleSubmit}>
                {this.renderInput('title','Title')} 
                {this.renderInput('assignee','Assignee')}
                {this.renderSelect('statusId','Status',status)}
                <RangeSlider progress={data.progress === '' ? '0%' : data.progress} onChange={this.handleProgressInput}/>
                {this.renderInput('description','Description')}
                {this.renderFormButton('Save')}
            </form>
            <ToastContainer position="bottom-center" autoClose={2000}/>
        </div>
         );
    }

    handleProgressInput =(e) =>{
        const currTicket = {...this.state.data};
        currTicket.progress = e.target.value+'%';
        this.setState({ data:currTicket });
    }

    async doSubmit(){
        console.log('Ticket Form-submitted');
        const {data} = this.state;
        let submitAction;
        try{
            if(!data._id){
                console.log('saveTicket',data);
                await saveTicket(data);
                submitAction = 'Added';
            }else{
                await updateTicket(data);
                submitAction = 'Updated';
            } 
            handleToastInfo({action:'',msg: `${data.title} Ticket ${submitAction}` });
            setTimeout(()=>{
                this.props.history.replace('/tickets');
            },2000);
        }catch(ex){
            console.log('saveTicket_exception',ex);
            handleTicketApiException(ex);
        }
    }
}
 
export default TicketForm;
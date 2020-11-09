import React, { Component } from 'react';
import Loader from 'react-loader-spinner'
import {Link} from 'react-router-dom';
import _ from 'lodash';
import { ToastContainer } from 'react-toastify';
import { handleToastInfo } from '../utils/toaster';
import Pagination from './common/pagination';
import { deleteTicket, getInitialDatas } from '../services/ticketService';
import {paginate} from '../utils/paginate';
import SearchBox from './searchBox';
import StatusList from './StatusList';
import TicketTable from './ticketTable';
import ProgressBar from './common/progressBar';
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css"
import jwt_decode from 'jwt-decode';
import { isValidLogin } from './../services/authService';

class TicketList extends Component {
    state = { 
        tickets:[],
        status:[],
        pageSize:4,
        currentPage:1,
        totalTickets:0,
        selectedStatus:null,
        sortColumn: {},
        searchQuery:'',
        tableHeaders: [{column:'title', name:'TITLE', order:'asc',content: ticket => <Link to={`/ticket/${ticket._id}`}>{ticket.title}</Link>},
        {column:'description', name:'DESCRIPTION', order:'asc'},
        {column:'assignee', name:'ASSIGNEE', order:'asc'},
        {column:'status.name', name:'STATUS', order:'asc'},
        {column:'progress', name:'PROGRESS', order:'asc',content: ticket => <ProgressBar progress={ticket.progress}/>}
    ]
     }

    async componentDidMount() {
        
        if(!isValidLogin()) window.location = '/not-found';//Hard Route Check - restricts invalid incoming routes
        
        
        const selectedStatus={_id:'',name:'All'};
        const sortColumn={column:'title', name:'Title', order:'asc'};
        const result = await getInitialDatas();
        if(!result) return;
        
        const {statusList, ticketList} = result;
        const status = [selectedStatus,...statusList];
        let tableHeaders = [...this.state.tableHeaders];
        const {user, isAdmin} = this.props;
        if(user && isAdmin){
            tableHeaders.push({column:'delete',content:ticket=> (<button className='btn btn-danger btn-sm' onClick={()=>this.handleDelete(ticket._id)}>Delete</button>)});
        }
        this.setState({tickets:ticketList, status, selectedStatus, totalTickets:ticketList.length, tableHeaders,sortColumn });
    }

    render() { 
        const {currentPage, pageSize, status, selectedStatus, sortColumn, tableHeaders, searchQuery} = this.state;
        const {ticketsFiltered, itemsCount} = this.getPageData(this.state);
        
        return (  
            <>
                {/* {itemsCount === 0 ? (
                    <>
                        <p>There are No Tickets in Database</p>
                        <Loader type="BallTriangle" color="#00BFFF" height={80} width={80} timeout={4000} />
                    </>
                ):( */}
                    <>
                    <div className='row'>
                        <div className='s-2'>
                           {this.props.isAdmin && <Link to='/status/new' className="btn btn-primary" style={{ marginBottom: 20 }}>Create Status</Link>}
                            <StatusList selectedStatus={selectedStatus} status={status} onStatusSelect={this.handleStatusFilter}/>
                        </div>
                        <div className='col'>
                        <Link to='/ticket/new' className="btn btn-primary" style={{ marginBottom: 20 }}>Create Ticket</Link>
                            <SearchBox value={searchQuery} onChange={this.handleSearch}/>
                                Ticket Count: &nbsp;
                                <span class="badge badge-light">{itemsCount}</span>

                            <TicketTable onDelete={this.handleDelete} tickets={ticketsFiltered} onSort={this.handleHeaderSort}
                            sortColumn={sortColumn} tableHeaders={tableHeaders}/>
                            <Pagination itemsCount={itemsCount} pageSize={pageSize} currentPage={currentPage} onPageChange={this.handlePageChange}/>
                        </div>
                    </div>
                    </>
                {/* ) } */}
                <ToastContainer position="bottom-center" autoClose={2000}/>
            </>
        );
    }

    handleSearch = (query) => {
    this.setState({ searchQuery:query, selectedStatus:null, currentPage:1 });       
    }
    
    handleStatusFilter = (selectedStatus) => {
        return this.setState({selectedStatus, searchQuery:'' ,currentPage:1});
    }

    getPageData = ({ tickets,selectedStatus, sortColumn, currentPage, pageSize, searchQuery }) => {
        let filtered = (selectedStatus && selectedStatus._id) ? 
            tickets.filter(m => m.status._id === selectedStatus._id) : tickets;
        if(searchQuery)
            filtered = tickets.filter(m=>m.title.toLowerCase().includes(searchQuery.toLowerCase()));
        else if (selectedStatus && selectedStatus._id)
            filtered = tickets.filter(m=>m.status._id === selectedStatus._id);
            
        const sorted = _.sortBy(filtered,[sortColumn.column],[sortColumn.order]);
        const ticketsFiltered = paginate([...sorted],currentPage,pageSize);
        const itemsCount = filtered.length;
        return {ticketsFiltered, itemsCount};
    }
      
      handlePageChange = (currentPage) =>{
        this.setState({ currentPage });
      }
      
        handleDelete = (id) => {
          const tickets = this.state.tickets.filter(m => m._id !== id);
          this.setState({tickets});
          deleteTicket(id);
          handleToastInfo({action: 'delete'});
      }
      
      handleHeaderSort = (sortColumn) =>{
        this.setState({sortColumn});
      }

}
export default TicketList;
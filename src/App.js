import jwt_decode  from 'jwt-decode';
import { Redirect, Route, Switch } from 'react-router-dom';
import React,{useEffect, useState} from 'react';
import SignInSide from './component/signInSide';
import SignUp from './component/signUp';
import NotFound from './component/common/notFound';
import NavBar from './component/common/navBar';
import SignOut from './component/signOut';
import TicketList from './component/ticketList';
import TicketForm from './component/ticketForm';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';
import StatusForm from './component/statusForm';

const App = () => {
  
  const [user, setUser] = useState('');
  const [isAdmin, setIsAdmin] = useState(false);
  
  useEffect(()=>{
    try{
        const jwt = localStorage.getItem('accessToken');;
        const {name, isAdmin}= jwt_decode(jwt);
        setUser(name);
        setIsAdmin(isAdmin);
      }catch(ex){
        console.log('app',ex);
      }
  },[user,isAdmin])
  
  return (
    <>
    <main className='container'>
      <NavBar user={user}/><br/>
      <div className='contents'>
        <Switch>
          <Route path='/signin' component={SignInSide} />
          <Route path='/signup' component={SignUp} />
          <Route path='/signout' component={SignOut} />
          <Route path='/ticket/:id' exact component={TicketForm} />
          <Route path='/ticket/new' exact component={TicketForm} />
          <Route path='/status/new' exact component={StatusForm} />
          <Route path='/not-found' component={NotFound} />
          <Route path='/tickets' exact component={()=><TicketList user={user} isAdmin={isAdmin}/>} /> 
          <Redirect from='/' exact to='/signin' />
          <Redirect to='/not-found' />
        </Switch>
      </div>
    </main>
    </>
  );
}

export default App;




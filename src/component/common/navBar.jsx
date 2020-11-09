import React from 'react';
import {NavLink, Link} from 'react-router-dom';

const NavBar = ({user:userName}) => {

  const loadLogOutLink = () => {
    return (
      <div className="navbar-collapse collapse w-100 order-3 dual-collapse2">
      <ul className="navbar-nav ml-auto"></ul>
      {(!userName) ? '' : (
      <>
      <span className="badge badge-secondary"><h6>{userName}</h6></span>
      <NavLink className="nav-item nav-link" to="/signout">Signout</NavLink>
      </>
      )}
      </div>
      )
  }
  
  return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">

          <div className="navbar-collapse collapse w-100 order-1 order-md-0 dual-collapse2">
          <ul className="navbar-nav mr-auto"> </ul>
          </div>
          
          <div className="mx-auto order-0">
            <Link className="navbar-brand" to="#">CORTEX+</Link>
          </div>

          {loadLogOutLink()}
        </nav>
      );
}

export default NavBar;
import React, { Component } from "react";
import { Link } from "react-router-dom";
import { withAuth } from "../lib/AuthProvider";
import '../../node_modules/bootstrap/dist/css/bootstrap.min.css'
// import SearchBar from "./SearchBar";

class Navbar extends Component {
 
 
    submitSearch = e => {
    e.preventDefault();
    this.props.history.push(`/`);
  };


  render() {
    let { user, logout, isLoggedin } = this.props;
    return (
      <div>
        { isLoggedin ? (
          <nav className="navbar navbar-expand-lg navbar-light" id="navbar">
          <span className="navbar-brand" >
          {/* <Link to="/">
                  <img alt="logo" src="logo.png" id="logo"/>
          </Link> */}
          
              </span>
              {/* <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                  <span className="navbar-toggler-icon" style={{"color":"white"}}></span>
               </button>
        <div className="collapse navbar-collapse flex-grow-1" id="navbarSupportedContent"> */}
          <ul className="nav navbar-nav ml-auto">
              {/* <li id="home" className="nav-item" >
                <Link to="/">Home</Link>
              </li> */}
              {/* <li className="nav-item" >
                <Link to={`/${user.username}`}>{user.username}</Link>
              </li> */}
              {(this.props.user.username === 'admin') ?
              <li className="nav-item" >
                <Link to={`/admin`}>Classroom</Link>
              </li>
              : null
              }

              <li className="nav-item">
              <a style={{color:"black"}} href="https://www.facebook.com/Vamos-Academy-Dubai-102816441270232/?ref=page_internal" target="_blank"><i className="fa fa-facebook-square"></i></a>
              </li>
              <li className="nav-item">
              <a style={{color:"black"}} href="https://www.instagram.com/vamosacademydubai/" target="_blank"><i className="fa fa-instagram"></i></a>
              </li>
              <li className="btn-group nav-item">
                <button type="button" className="btn right-menu dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                  { this.props.user.username }
                </button>
                <div className="dropdown-menu dropdown-menu-right" style={{ textAlign:"center", padding:"0.1em"}}>
                  <button className="dropdown-item" type="button" onClick={logout}>Logout</button>
                </div>
              </li>
              {/* <li className="nav-item">
              <Link to="/login">
                <button  id="logout-btn" onClick={logout}>Logout</button>
                </Link>
              </li> */}
            </ul>
          {/* </div> */}
              
        </nav>
        
        ) : (
          <nav className="navbar navbar-expand-lg navbar-light"  id="navbar">
          <span className="navbar-brand">
              </span>
          {/* <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                  <span className="navbar-toggler-icon" style={{"color":"white"}}></span>
               </button> */}
          {/* <div className="collapse navbar-collapse " id="navbarSupportedContent"> */}
        <ul className="nav navbar-nav ml-auto">
         {/* <li id="home" className="nav-item" >
                <Link to="/">Home</Link>
              </li>
              <li  className="nav-item" >
                <Link to="/login">
                  {" "}
                  <button id="login">Login</button>{" "}
                </Link>
              </li>
           
              <li  className="nav-item" >
                <Link to="/signup">
                  {" "}
                  <button id="signup" className="logout-btn">Signup</button>{" "}
                </Link>
              </li> */}
              <li className="nav-item">
              <a style={{color:"black"}} href="https://www.facebook.com/Vamos-Academy-Dubai-102816441270232/?ref=page_internal" target="_blank"><i className="fa fa-facebook-square"></i></a>
              </li>
              <li className="nav-item">
              <a style={{color:"black"}} href="https://www.instagram.com/vamosacademydubai/" target="_blank"><i className="fa fa-instagram"></i></a>
              </li>
            </ul> 
            {/* </div> */}
          </nav>
        )}
      </div>
    );
  }
}

export default withAuth(Navbar);

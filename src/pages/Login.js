import React, { Component } from "react";
import { withAuth } from "../lib/AuthProvider";
import Navbar from "../components/Navbar";
import { Link } from "react-router-dom";


class Login extends Component {
  state = { username: "", password: "" };

  handleFormSubmit = (event) => {
    event.preventDefault();
    const { username, password } = this.state;
    this.props.login({ username, password });
  };

  handleChange = event => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  render() {
    const { username, password } = this.state;

    return (
      <div>
        <Navbar />
        <div
        // id='login-page'
        className="loginfloat"
          style={{
            // backgroundColor: "rgba(255, 255, 255, 0.04)",
            // paddingBottom: "20vh",
            // paddingTop: "8vh"
          }}
        >
      
          <div id="homelogo">
             <img src="/logo.png" alt="logo"/>
          </div>
          <div id="splash-bg">
            <form onSubmit={this.handleFormSubmit} id="log-in">
              <h1 style={{color:"white",  marginTop:"0.7em", marginBottom:"-0.1em", fontFamily:"Edo", fontSize:"4rem"}}>Login</h1>
              <label>Username:</label>
              <input
                type="text"
                name="username"
                value={username}
                onChange={this.handleChange}
              />

              <label>Password:</label>
              <input
                type="password"
                name="password"
                value={password}
                onChange={this.handleChange}
              />

              <input
                style={{
                  width: "20%",
                  margin: "4.3vh auto",
                  backgroundColor:"#AC2322",
                  color:"white"
                }}
                type="submit"
                value="Login"
              />
          <p id="account-check"><span>Don't have an account? </span>
          <span>Sign Up</span> <Link to={"/signup"}><span style={{textDecoration:"underline", color:"white"}}>Here</span></Link>
          </p>
            </form>
          </div>
        </div>
        <footer style={{"padding":"0.8em", "backgroundColor":"#AC2322", "color":"white", bottom:"0"}}>© Vamos Academy 2020</footer>
      </div>
    );
  }
}

export default withAuth(Login);

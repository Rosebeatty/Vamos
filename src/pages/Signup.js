import React, { Component } from "react";
import { Link } from "react-router-dom";
import { withAuth } from "../lib/AuthProvider";
import Navbar from "../components/Navbar";
import axios from 'axios';

class Signup extends Component {
  state = {
    username: "",
    password: "",
    email: "",
    level: "A1",
    
  };

  async componentDidMount() {
    await axios.get(`${process.env.REACT_APP_API_URL}/users`)
    .then(res => {
      // let us = res.data.username;
      // let em = res.data.email;
      let data = res.data;
      data.forEach(user => {

      })
    })
    .catch(err => {
      console.log(err);
    })
  }


handleFormSubmit = async (event) => {
    event.preventDefault();
    const {
      username,
      password,
      level,
      email,
    } = this.state;
    //  console.log('Signup -> form submit', { username, password });
    
    await axios.get(`${process.env.REACT_APP_API_URL}/users`)
    .then(res => {
      // let us = res.data.username;
      // let em = res.data.email;
      let data = res.data;
      data.forEach(user => {
        if (this.state.username === user.username | user.email) {
           console.log("User Exists");
        } else {
        this.props.signup({
          username,
          password,
          level,
          email,
        }); // props.signup is Provided by withAuth() and Context API
        }
      })
    })
    .catch(err => {
      console.log(err);
    })

  };

  handleChange = event => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  render() {
    const {
      username,
      password,
      email,
      
    } = this.state;
    return (
      <div>
        <Navbar />
        <div
          className="signupfloat"
          style={{
            // backgroundColor: "rgba(255, 255, 255, 0.04)",
            // padding: "7vh 0"
          }}
         >
          <div id="homelogo">
             <img src="/logo.png" alt="logo"/>
          </div>
          <div id="splash-bg">
          <form onSubmit={this.handleFormSubmit} id="sign-up">
          <h1 style={{color:"white",  marginTop:"0.3em", marginBottom:"-0.1em", fontFamily:"Edo", fontSize:"4em"}}>Sign Up</h1>
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

            <label>Email:</label>
            <input
              type="email"
              name="email"
              value={email}
              onChange={this.handleChange}
            />
            {/* <label>Your Space's Theme:</label>
            <input
              type="text"
              name="theme"
              value={theme}
              onChange={this.handleChange}
            /> */}

            <input
              style={{
                  width: "20%",
                  margin: "3vh auto",
                  backgroundColor:"#AC2322",
                  color:"white"
                }}
              type="submit"
              value="Signup"
            />
          <p id="account-check"><span>Already have account? </span>
          <Link to={"/login"}><span style={{color:"white", textDecoration:"underline"}}>Login</span></Link>
          </p>
          </form>
          </div>
        </div>
        <footer style={{"padding":"0.8em", "backgroundColor":"#AC2322", "color":"white", bottom:"0"}}>© Vamos Academy 2020</footer>
      </div>
    );
  }
}

export default withAuth(Signup);

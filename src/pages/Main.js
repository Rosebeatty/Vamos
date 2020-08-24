import React, { Component } from 'react'
import { withAuth } from "../lib/AuthProvider";
import Navbar from '../components/Navbar';
import { Link } from "react-router-dom";
import Image from 'react-bootstrap/Image';

class Main extends Component {
    render() {
        let user = this.props.user

        return (
            <div id="home-page">
                <Navbar/>
                <div style={{height:"88vh", paddingTop:"1.8em"}}>
                    <div className="home-banner">
                        <section style={{ width: "220px", minHeight: "120px",
                             maxHeight: "auto", borderRadius:"20px", margin:"2em 3.5em"}}>
                            <Image style={{border:"5px solid white", maxWidth:"100%", height:"auto"}}  src="/profile-pic.jpg" roundedCircle fluid />
                        </section>
                        <section>
                            <h1 id="welcome">¡Hola {user.username}!</h1> 
                            <div id="main-info">
                                <p>Current Level: A1</p>
                                <p>Upcoming Lesson: 28/06/20</p>
                                <p>3 Classes Left</p>
                            </div>
                        </section>
                        <section style={{width: "450px", minHeight: "220px",
                             maxHeight: "auto"}}>
                        <Image style={{maxWidth:"100%", height:"auto"}}  src="/logo.png" roundedCircle fluid />
                        </section>
                    </div>
                    <div id="home-btns">
                        <button className="home-buttons"><Link to="/Calendar">Calendar</Link></button>
                        <button className="home-buttons"><Link to={`/${user.username}`}>Profile</Link></button>
                        <button className="home-buttons"><Link to="/C&A" >Classes <br/> & <br/> Activities</Link></button>
                        <button className="home-buttons"><Link to="/messages">Messages</Link></button>
                        <button className="home-buttons"><Link to="/availability">Availability</Link></button>
                        <button className="home-buttons"><Link to="/payments">Payments</Link></button>
                    </div>
                </div>
                <footer style={{"padding":"0.8em", "backgroundColor":"#AC2322", "color":"white"}}>© Vamos Academy 2020</footer>
            </div>
        )
    }
}

export default withAuth(Main)

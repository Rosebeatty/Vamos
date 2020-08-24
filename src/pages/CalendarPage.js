import React, { Component } from 'react';
import Navbar from '../components/Navbar';
import Calendar from '../components/Calendar';
import { withAuth } from "../lib/AuthProvider";
import axios from 'axios';
import Image from 'react-bootstrap/Image';
import { Link } from "react-router-dom";

class Cal extends Component {
    state = {
         events:[]
     }

    joinClass = async (theId) => {
        let userId = this.props.user._id;
        let username = this.props.user.username;
        let id = theId;
        await axios.put(`${process.env.REACT_APP_API_URL}/events/join/${id}`,
        { userId, username }
        )
        .then(res => {
            console.log(res.data.joinedClasses)
        })
        .catch(err => {
            console.log(err)
        })
    }

    retreiveEvent = () => {
        let id = "a"
        axios.get(`${process.env.REACT_APP_API_URL}/events/${id}`)
        .then(res => {
            console.log(res)
        })
        .catch(err => {
            console.log(err)
        })
    }

    allEvents = async () => {
        await axios.get(`${process.env.REACT_APP_API_URL}/events`)
        .then(res => {
            console.log(res.data)
           let data = res.data;
        //    let e = data.map(event => {
        //         let start = event.start
        //         let end = event.end
        //         let title = event.title
                
        //         let newEv = {};
        //         Object.assign(newEv, {start:start, end:end, title:title})
               
        //         return newEv
        //     })
        //     return e
            // return res
            this.setState({events:data})
        })
        .catch(err => {
            console.log(err)
        })
    }

    render() {
    let user = this.props.user
       
    return (
            <div>
            <Navbar />
               <div id="side-menu">
                        <Link to="/home"><Image fluid src="/logo.png" alt="logo" style={{width:"auto", height:"100px", paddingBottom:"0.3em", marginBottom:"1em"  }} /></Link>
                        <Link to="/Calendar"><button className="active-btns"><span>Calendar</span></button></Link>
                        <Link to={`/${user.username}`}><button className="side-btns"><span>Profile</span></button></Link>
                        <Link to="/C&A"><button className="side-btns"><span>Classes <br/> & Activities</span></button></Link>
                        <Link to="/messages"><button className="side-btns"><span>Messages</span></button></Link>
                        <Link to="/availability"><button className="side-btns"><span>Availability</span></button></Link>
                        <Link to="/payments"><button className="side-btns"><span>Payments</span></button></Link>
                    </div>
               <div>
                    <h2 id="calendar-title">The Vamos Calendar</h2>
                    <p id="title-text">The calendar is optimised to suggest lessons and activities at your level. Select an available slot to book your next lesson! </p>
               </div>
              <Calendar user={user} events={this.state.events} joinClass={this.joinClass} allEvents={this.allEvents} />
            
            </div>
        )
    }
}

export default withAuth(Cal)
import React, { Component } from 'react'
import { withAuth } from "../lib/AuthProvider";
import Navbar from '../components/Navbar';
import axios from 'axios';
import Image from 'react-bootstrap/Image';
import { Link } from "react-router-dom";
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button';
import moment from 'moment'

class Messages extends Component {
    state = {
        messages: [],
        message:'',
        messageCount: null,
        userId:[],
        show:false,
        currentDate: new Date(),
        reminder: 'Friendly Reminder'
        }
   
    componentDidMount = async () => {
        await this.getMessages();
        await this.checkTime(this.state.currentDate, 2)
    }
    
    getMessages = async () => {
        let id = this.props.user._id
        await axios.get(`${process.env.REACT_APP_API_URL}/notifications`)
        .then(res => {
            let notif = res.data;
            let messages = [];
            notif.forEach(m => {
                console.log(m)
                if (m.userId[0] === id) {
                    messages.push(m.notification)    
                }
            })
            this.setState({messages: messages})
        }).catch(err => {
            console.log(err)
        })
            let messageCount = document.getElementById('in-line').childElementCount;
            this.setState({userId: id, messageCount})
            if (this.state.messages.length === 0) {
                this.setState({messageCount:null})
            }
    }

    sendMessage = async (e) => {
        e.preventDefault();
        let { message } = this.state;
        let adminId = [];
        let id  = this.state.userId;
        adminId.push(id)
        await axios.post(`${process.env.REACT_APP_API_URL}/notifications/send-message`, { message, adminId })
        .then(res => {
            console.log(res)
            this.getMessages()
        }).catch(err => {
            console.log(err)
        })
    }

    //TWO DAYS BEFORE CLASS SEND A MESSAGE REMINDER ABOUT CLASS
    //get schedule and find dates of classes. compare dates with currentdate
    checkTime = (dateObj, numDays) => {
        let userId = this.props.user._id;
        axios.get(`${process.env.REACT_APP_API_URL}/users/${userId}`)
            .then(res => {
                let joined = res.data.joinedClasses;
                dateObj.setDate(dateObj.getDate() + numDays);
                    joined.map(j => {
                        axios.get(`${process.env.REACT_APP_API_URL}/events/${j}`)
                            .then(res => {
                                let d = Date.parse(dateObj).toString()
                                let s = Date.parse(res.data.start).toString()
                                let de = d.slice(0,5)
                                let se = s.slice(0,5)
                                if (de === se) {
                                    //send reminder message to user and to their email via mailchimp 
                                    let start = moment(res.data.start);
                                    let reminder = `Reminder: You have a class coming up in 2 days (${start})`;
                                    // axios.post(`${process.env.REACT_APP_API_URL}/notifications/send-reminder`, {reminder, userId})
                                    //     .then(res => {
                                    //         this.getMessages()
                                    //     })
                                    //     .catch(err => {
                                    //         console.log(err)
                                    //     })
                                    console.log("MESSAGE SENT!")
                                }
                            })
                            .catch(err => {
                                console.log(err)
                            })
                    })
            })
            .catch(err => {
                console.log(err);
                
            })
    }


    handleInput = (e) => {
        const { value } = e.target;
        this.setState({message: value})
    }

    handleInput2 = (e) => {
        const { value } = e.target;
        this.setState({email: value})
    }

    messageBox = () => {
        this.setState({show:true})
    }

    handleCancel = async () => {
        this.setState({show:false})
    }

    handleClose = async (e) => {
        this.sendMessage(e)
        this.setState({show:false})
    }


    render() {
        let {user} = this.props;
        let {messages, messageCount} = this.state;
        return (
            <div>
                <Navbar/>
                <div id="messages">
                    <h1 style={{fontFamily:"Edo", fontSize:"5em", color:"#AC2322", marginLeft:"2.1em"}}>Messages</h1>
                    <div id="side-menu">
                        <Link to="/home"><Image fluid src="/logo.png" alt="logo" style={{width:"auto", height:"100px", paddingBottom:"0.3em", marginBottom:"1em"  }} /></Link>
                        <Link to="/Calendar"><button className="side-btns"><span>Calendar</span></button></Link>
                        <Link to={`/${user.username}`}><button className="side-btns"><span>Profile</span></button></Link>
                        <Link to="/C&A"><button className="side-btns"><span>Classes <br/> & Activities</span></button></Link>
                        <Link to="/messages"><button className="active-btns"><span>Messages</span></button></Link>
                        <Link to="/availability"><button className="side-btns"><span>Availability</span></button></Link>
                        <Link to="/payments"><button className="side-btns"><span>Payments</span></button></Link>
                    </div>
                    <div id="inbox">
                        <div style={{overflow:"scroll", backgroundColor:"white", borderRadius:"20px", height:"54vh", width:"67vw", marginTop:"1.3em"}}>
                            <div id="inbox-header">
                                {messageCount ? (<p id="">Inbox ({messageCount} New Messages)</p>) : (<p>Inbox (0 New Messages)</p>) }
                                <button id="message-admin" onClick={this.messageBox}><p>Send us a message!</p></button>
                            </div>
                            <ul id="in-line">
                                { messages ? (
                                    messages.map(message => {
                                        let x = Math.random() * 10
                                        return <li className="inbox-lines" key={x}>{message}</li> 
                                })
                                ) : (<li></li>) }
                                { messages.length === 0 ? (
                                    <li className="inbox-lines">No Messages</li> 
                                ) : ('') }
                            </ul>
                        </div>
                    </div>
                </div>
                <div>
                    <Modal show={this.state.show} onHide={this.handleCancel.bind(this)} animation={false}>
                        <Modal.Header closeButton>
                        <Modal.Title>Send us a message!</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                        <div id="send-m">
                            <form onSubmit={(e) => this.sendMessage(e)}>
                                {/* <label>Email</label>
                                <input 
                                    type="text"
                                    onChange={this.handleInput2}
                                    value={this.state.title}
                                />
                                <br/> */}
                                <label>Message</label>
                                <input
                                    type="text"
                                    name="send"
                                    onChange={this.handleInput}
                                    value={this.state.message}
                                />
                            </form>
                        </div>
                        </Modal.Body>
                        <Modal.Footer>
                        <Button style={{padding:'0.2em'}} variant="secondary" onClick={this.handleCancel.bind(this)}>
                            Cancel
                        </Button>
                        <Button style={{padding:'0.2em'}} variant="primary" onClick={this.handleClose.bind(this)}>
                            Send
                        </Button>
                        </Modal.Footer>
                    </Modal>
                </div>
                <footer style={{"padding":"0.8em", "backgroundColor":"#AC2322", "color":"white"}}>© Vamos Academy 2020</footer>
            </div>
        )
    }
}

export default withAuth(Messages)

import React, { Component } from 'react'
import { withAuth } from "../lib/AuthProvider";
import Navbar from '../components/Navbar';
import axios from 'axios';
import Image from 'react-bootstrap/Image';
import { Link } from "react-router-dom";
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button';
import Select from 'react-select';
import moment from 'moment'

class CandA extends Component {
    state = {
        upcoming: [],
        completed: [],
        currentDate: new Date(),
        deleteModal: false
        }
   
    async componentDidMount() {
        await this.getClasses()
    }

    getClasses = async () => {
        console.log(Date.parse(new Date()))
        let id = this.props.user._id
        await axios.get(`${process.env.REACT_APP_API_URL}/users/${id}`)
        .then(res => {
            let classes = res.data.joinedClasses;
            classes.forEach(c => {
                axios.get(`${process.env.REACT_APP_API_URL}/events/${c}`)
                    .then(res => {
                        let titleArr = this.state.upcoming;
                        let titleArr2 = this.state.completed;
                        if (Date.parse(res.data.end) < this.state.currentDate) {
                           let content = res.data.title + ', ' + res.data.start
                            titleArr2.push(content);
                           this.setState({completed: titleArr2})
                        }
                        if (Date.parse(res.data.end) > this.state.currentDate) {
                            let content = res.data.title + ', ' + res.data.start
                            titleArr.push(content);
                           this.setState({upcoming: titleArr})
                        }
                    })
                    .catch(err => {
                        console.log(err)
                    })
            })
        }).catch(err => {
            console.log(err)
        })
    }

    openDelete = () => {
        this.setState({deleteModal: true})
    }

    handleDelete = () => {
        let id = this.props.user._id
        axios.put(`${process.env.REACT_APP_API_URL}/users/${id}`)
            .then(res => {
                console.log(res)
            })
            .catch(err => {
                console.log(err)
            })
    }

    handleCancel = async () => {
        this.setState({deleteModal:false})
    }


    render() {
        let {user} = this.props;
        let {completed, upcoming} = this.state

        return (
            <div>
                <Navbar/>
                <div id="cna">
                    <h1 style={{fontFamily:"Edo", fontSize:"5em", color:"#AC2322", marginLeft:"1.5em"}}>Classes & Activities</h1>
                    <div id="side-menu">
                        <Link to="/home"><Image fluid src="/logo.png" alt="logo" style={{width:"auto", height:"100px", paddingBottom:"0.3em", marginBottom:"1em"  }} /></Link>
                        <Link to="/Calendar"><button className="side-btns"><span>Calendar</span></button></Link>
                        <Link to={`/${user.username}`}><button className="side-btns"><span>Profile</span></button></Link>
                        <Link to="/C&A"><button className="active-btns"><span>Classes <br/> & Activities</span></button></Link>
                        <Link to="/messages"><button className="side-btns"><span>Messages</span></button></Link>
                        <Link to="/availability"><button className="side-btns"><span>Availability</span></button></Link>
                        <Link to="/payments"><button className="side-btns"><span>Payments</span></button></Link>
                    </div>
                    <Modal show={this.state.deleteModal}  onHide={this.handleCancel.bind(this)}>
                        <Modal.Header closeButton>
                        <Modal.Title>Are you sure you want to remove this class from your schedule?</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                        </Modal.Body>
                    </Modal>
                    <div id="cna-box">
                        <div id="completed-box">
                            <h5 style={{fontFamily:"Edo", fontSize:"3em", color:"#AC2322"}}>Completed</h5>
                            <ul style={{paddingLeft:"0"}}>
                            { completed ?
                            completed.map(complete => {
                                let x = Math.random() * 100
                                return (<li className="inbox-lines" key={x}>{complete}</li>) 
                        })
                        : ('') }
                
                            </ul>
                        </div>
                        <div id="upcoming-box">
                            <h5 style={{fontFamily:"Edo", fontSize:"3em", color:"#AC2322"}}>Upcoming</h5>
                            <ul style={{paddingLeft:"0"}}>
                            { upcoming ?
                            upcoming.map(coming => {
                                let x = Math.random() * 100
                                console.log(coming, x)
                                return (<li className="inbox-lines" key={x}>{coming}<button onClick={this.openDelete} className="deleteClass">X</button></li> )
                        })
                         : ('') }
                            </ul>
                        </div>
                    </div>
                </div>
                <footer style={{"padding":"0.8em", "backgroundColor":"#AC2322", "color":"white"}}>© Vamos Academy 2020</footer>
            </div>
        )
    }
}

export default withAuth(CandA)

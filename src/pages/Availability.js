import React, { Component } from 'react'
import { withAuth } from "../lib/AuthProvider";
import Navbar from '../components/Navbar';
import axios from 'axios';
import Image from 'react-bootstrap/Image';
import { Link } from "react-router-dom";
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button';
import Select from 'react-select';
  
const sundayOptions = [
    { value: 'Morning', label: 'Morning', color: '#36B37E' },
    { value: 'Afternoon', label: 'Afternoon', color: '#00B8D9' },
    { value: 'Evening', label: 'Evening', color: '#0052CC'},
]
const mondayOptions = [
    { value: 'Morning', label: 'Morning', color: '#36B37E' },
    { value: 'Afternoon', label: 'Afternoon', color: '#00B8D9' },
    { value: 'Evening', label: 'Evening', color: '#0052CC'},
]
const tuesdayOptions = [
    { value: 'Morning', label: 'Morning', color: '#36B37E' },
    { value: 'Afternoon', label: 'Afternoon', color: '#00B8D9' },
    { value: 'Evening', label: 'Evening', color: '#0052CC'},
]
const wednesdayOptions = [
    { value: 'Morning', label: 'Morning', color: '#36B37E' },
    { value: 'Afternoon', label: 'Afternoon', color: '#00B8D9' },
    { value: 'Evening', label: 'Evening', color: '#0052CC'},
]
const thursdayOptions = [
    { value: 'Morning', label: 'Morning', color: '#36B37E' },
    { value: 'Afternoon', label: 'Afternoon', color: '#00B8D9' },
    { value: 'Evening', label: 'Evening', color: '#0052CC'},
]
const fridayOptions = [
    { value: 'Morning', label: 'Morning', color: '#36B37E' },
    { value: 'Afternoon', label: 'Afternoon', color: '#00B8D9' },
    { value: 'Evening', label: 'Evening', color: '#0052CC'},
]
const saturdayOptions = [
    { value: 'Morning', label: 'Morning', color: '#36B37E' },
    { value: 'Afternoon', label: 'Afternoon', color: '#00B8D9' },
    { value: 'Evening', label: 'Evening', color: '#0052CC'},
];

class Availability extends Component {
    state = {
        userId: '', 
        show: false,
        sundayOption: ['Morning', 'Afternoon', 'Evening'],
        mondayOption: ['Morning', 'Afternoon', 'Evening'],
        tuesdayOption: ['Morning', 'Afternoon', 'Evening'],
        wednesdayOption: ['Morning', 'Afternoon', 'Evening'],
        thursdayOption: ['Morning', 'Afternoon', 'Evening'],
        fridayOption: ['Morning', 'Afternoon', 'Evening'],
        saturdayOption: ['Morning', 'Afternoon', 'Evening']
        }
        
        handleSunChange = sundayOption => {
            let sunday = [];
            if (sundayOption) {
            sundayOption.forEach(o => {
                sunday.push(o.value)
            })
            this.setState({ sundayOption: sunday });
             }
        };
        handleMonChange = mondayOption => {
            let monday = []
            if (mondayOption) {
            mondayOption.forEach(o => {
                monday.push(o.value)
            })
            this.setState({ mondayOption: monday });
            }
        };
        handleTuesChange = tuesdayOption => {
            let tuesday = [];
            if (tuesdayOption) {
            tuesdayOption.forEach(o => {
                tuesday.push(o.value)
            })
            this.setState({ tuesdayOption: tuesday });
        }
        };
        handleWedChange = wednesdayOption => {
            let wednesday = []
            if (wednesdayOption) {
            wednesdayOption.forEach(o => {
                wednesday.push(o.value)
            })
            this.setState({ wednesdayOption: wednesday });
            }
        };
        handleThursChange = thursdayOption => {
            let thursday = [];
            if (thursdayOption) {
            thursdayOption.forEach(o => {
                thursday.push(o.value)
            })
            this.setState({ thursdayOption: thursday });
            }
        };
        handleFriChange = fridayOption => {
            let friday = [];
            if (fridayOption) {
            fridayOption.forEach(o => {
                friday.push(o.value)
            })
            this.setState({ fridayOption: friday });
            }
        };
        handleSatChange = saturdayOption => {
            let saturday = [];
            if (saturdayOption) {
            saturdayOption.forEach(o => {
                saturday.push(o.value)
            })
            this.setState({ saturdayOption: saturday });
            }
        };

        handleClose = async () => {
            //save user availability to database
            const { userId } = this.state;
            const { sundayOption, mondayOption, tuesdayOption, wednesdayOption, thursdayOption, fridayOption, saturdayOption } = this.state
            this.setState({show:false})
            await axios.post(`${process.env.REACT_APP_API_URL}/availabilities/create`,
                { 
                userId, 
                sundayOption, 
                mondayOption, 
                tuesdayOption, 
                wednesdayOption, 
                thursdayOption, 
                fridayOption, 
                saturdayOption
            }).then(res => {
                console.log(JSON.parse(res.config.data))

            }).catch(err => {
                console.log(err)
            })
        }

        handleCancel = async () => {
            this.setState({show:false})
        }

        handleShow = async () => this.setState({show:true})

        componentDidMount() {
            //Retrieve availability data
            let userId = this.props.user._id;
            axios.get(`${process.env.REACT_APP_API_URL}/users/${userId}`)
                .then(res => {
                    let availId = res.data.availability.pop();
                    console.log(res.data);
                    axios.get(`${process.env.REACT_APP_API_URL}/availabilities/${availId}`)
                        .then(res => {
                            console.log(res)
                            this.setState({sundayOption:res.data.sunday, mondayOption:res.data.monday, tuesdayOption:res.data.tuesday, wednesdayOption:res.data.wednesday, thursdayOption:res.data.thursday, fridayOption:res.data.friday, saturdayOption: res.data.saturday})
                        })
                        .catch(err => {
                            console.log(err)
                        })
                })
                .catch(err => {
                    console.log(err)
                })
            this.setState({userId})
        }

        render() {
            let {user} = this.props;
            let {sundayOption, mondayOption, tuesdayOption, wednesdayOption, thursdayOption, fridayOption, saturdayOption} = this.state
            return (
                <div>
                    <Navbar/>
                    <div id="availability">
                        <h1 style={{fontFamily:"Edo", fontSize:"5em", color:"#AC2322", marginLeft:"2.3em"}}>Availability</h1>
                        <div id="side-menu">
                            <Link to="/home"><Image fluid src="/logo.png" alt="logo" style={{width:"auto", height:"100px", paddingBottom:"0.3em", marginBottom:"1em"  }} /></Link>
                            <Link to="/Calendar"><button className="side-btns"><span>Calendar</span></button></Link>
                            <Link to={`/${user.username}`}><button className="side-btns"><span>Profile</span></button></Link>
                            <Link to="/C&A"><button className="side-btns"><span>Classes <br/> & Activities</span></button></Link>
                            <Link to="/messages"><button className="side-btns"><span>Messages</span></button></Link>
                            <Link to="/availability"><button className="active-btns"><span>Availability</span></button></Link>
                            <Link to="/payments"><button className="side-btns"><span>Payments</span></button></Link>
                        </div>
                        <div id="avail-box">
                            <div className="available-days">
                                <h5>Sunday</h5>
                                {sundayOption ? sundayOption.map(e =>  ( <p key={e}>{e}</p> )) : '' }
                            </div>
                            <div className="available-days">
                                <h5>Monday</h5>
                                {mondayOption ? mondayOption.map(e =>  ( <p key={e}>{e}</p> )) : '' }

                            </div>
                            <div className="available-days">
                                <h5>Tuesday</h5>
                                {tuesdayOption ? tuesdayOption.map(e =>  ( <p key={e}>{e}</p> )) : '' }

                            </div>
                            <div className="available-days">
                                <h5>Wednesday</h5>
                                {wednesdayOption ? wednesdayOption.map(e =>  ( <p key={e}>{e}</p> )) : '' }

                            </div>
                            <div className="available-days">
                                <h5>Thursday</h5>
                                {thursdayOption ? thursdayOption.map(e =>  ( <p key={e}>{e}</p> )) : '' }
</div>
                            <div className="available-days">
                            <h5>Friday</h5>
                            {fridayOption ? fridayOption.map(e =>  ( <p key={e}>{e}</p> )) : '' }
                            </div>

                            <div className="available-days">
                            <h5>Saturday</h5>
                            {saturdayOption ? saturdayOption.map(e =>  ( <p key={e}>{e}</p> )) : '' }
                            </div>
                            <button onClick={this.handleShow} className="available-days">Update Info</button>
                        </div>
                    </div>
                    <div>
                        <Modal style={{top:"0%"}} show={this.state.show} onHide={this.handleCancel.bind(this)} animation={false}>
                        <Modal.Header closeButton>
                        <Modal.Title>Select your availability</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                        <div id="select-availability">
                            <p>Sunday</p>
                                <Select
                                    onChange={this.handleSunChange}
                                    closeMenuOnSelect={false}
                                    defaultValue={[sundayOptions[0], sundayOptions[1], sundayOptions[2]]}
                                    isMulti
                                    options={sundayOptions}
                                />
                                <p>Monday</p>
                                <Select
                                    onChange={this.handleMonChange}
                                    closeMenuOnSelect={false}
                                    defaultValue={[mondayOptions[0], mondayOptions[1], mondayOptions[2]]}
                                    isMulti
                                    options={mondayOptions}
                                />
                                <p>Tuesday</p>
                                <Select
                                    onChange={this.handleTuesChange}
                                    closeMenuOnSelect={false}
                                    defaultValue={[tuesdayOptions[0], tuesdayOptions[1], tuesdayOptions[2]]}
                                    isMulti
                                    options={tuesdayOptions}
                                />
                                <p>Wednesday</p>
                                <Select
                                    onChange={this.handleWedChange}
                                    closeMenuOnSelect={false}
                                    defaultValue={[wednesdayOptions[0], wednesdayOptions[1], wednesdayOptions[2]]}
                                    isMulti
                                    options={wednesdayOptions}
                                />
                                <p>Thursday</p>
                                <Select
                                    onChange={this.handleThursChange}
                                    closeMenuOnSelect={false}
                                    defaultValue={[thursdayOptions[0], thursdayOptions[1], thursdayOptions[2]]}
                                    isMulti
                                    options={thursdayOptions}
                                />
                                <p>Friday</p>
                                <Select
                                    onChange={this.handleFriChange}
                                    closeMenuOnSelect={false}
                                    defaultValue={[fridayOptions[0], fridayOptions[1], fridayOptions[2]]}
                                    isMulti
                                    options={fridayOptions}
                                />
                                <p>Saturday</p>
                                <Select
                                    onChange={this.handleSatChange}
                                    closeMenuOnSelect={false}
                                    defaultValue={[saturdayOptions[0], saturdayOptions[1], saturdayOptions[2]]}
                                    isMulti
                                    options={saturdayOptions}
                                />
                        </div>
                        </Modal.Body>
                        <Modal.Footer>
                        <Button variant="secondary" onClick={this.handleCancel.bind(this)}>
                            Cancel
                        </Button>
                        <Button variant="primary" onClick={this.handleClose.bind(this)}>
                            Save
                        </Button>
                        </Modal.Footer>
                    </Modal>
                </div>
                <footer style={{"padding":"0.8em", "backgroundColor":"#AC2322", "color":"white"}}>© Vamos Academy 2020</footer>
            </div>
            )
        }
}

export default withAuth(Availability)

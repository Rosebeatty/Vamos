import React, { Component } from 'react'
import { withAuth } from "../lib/AuthProvider";
import Navbar from '../components/Navbar';
import CheckoutForm from '../components/CheckoutForm'
import Image from 'react-bootstrap/Image';
import { Link } from "react-router-dom";
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button';
const stripePromise = loadStripe('pk_test_LdoApztm3uDxqEjiAMguiIgB00ZH2TO67Z'); // Your Publishable Key

class Payments extends Component {
    state = {
        show: false,
        pack: ['5 Classes', '10 Classes', '15 Classes', '20 Classes'],
        packagePrices: ['20 Euros', '15 Euros', '10 Euros', '5 Euros'],
        showMe:false
    }

    buyPackage = (e) => {
        //switch 
        if (e.target.innerHTML === '20 Classes') {
            this.setState({packagePrice:"20"})
        }
        if (e.target.innerHTML === '15 Classes') {
            this.setState({packagePrice:"15"})
        }
        if (e.target.innerHTML === '10 Classes') {
            this.setState({packagePrice:"10"})
        }
        if (e.target.innerHTML === '5 Classes') {
            this.setState({packagePrice:"5"})
        }
        this.setState({show:true})
    }

    openPack = (e) => {
        this.setState({showMe:true})

    }

    handleCancel = async () => {
        this.setState({show:false, showMe:false})
    }

    handleClose = async () => {
        this.setState({show:false})
    }

    render() {
        let {user} = this.props;
        let { pack, packagePrice } = this.state
        return (
            <div>
                <Navbar/>
                <div id="payments">
                    <h1 style={{fontFamily:"Edo", fontSize:"5em", color:"#AC2322", marginLeft:"2.1em"}}>Payments</h1>
                    <div id="side-menu">
                        <Link to="/home"><Image fluid src="/logo.png" alt="logo" style={{width:"auto", height:"100px", paddingBottom:"0.3em", marginBottom:"1em"  }} /></Link>
                        <Link to="/Calendar"><button className="side-btns"><span>Calendar</span></button></Link>
                        <Link to={`/${user.username}`}><button className="side-btns"><span>Profile</span></button></Link>
                        <Link to="/C&A"><button className="side-btns"><span>Classes <br/> & Activities</span></button></Link>
                        <Link to="/messages"><button className="side-btns"><span>Messages</span></button></Link>
                        <Link to="/availability"><button className="side-btns"><span>Availability</span></button></Link>
                        <Link to="/payments"><button className="active-btns"><span>Payments</span></button></Link>
                    </div>
                    <div id="pay">
                        <div style={{backgroundColor:"white", borderRadius:"20px", height:"49vh", width:"65vw", marginTop:"1.6em", justifyContent:"center", marginLeft:"3em"}}>
                            <ul id="payment-info">
                                <li>Student Name: {user.username}</li>
                                <li>Student ID:</li>
                                <li>Current Package:</li>
                                <li>Remaining Lessons:</li>
                            </ul>
                            {/* <div id="buy-classes">
                                { pack ? pack.map(p => {
                                    return (<div onClick={(e) => this.buyPackage(e)} key={p}>{p}</div>)
                                }) : ('')
                                }
                            </div> */}
                            <div id="buy-classes">
                                <div onClick={(e) => this.openPack(e)}>Request a new package</div>
                                <div>Request invoice overview</div>
                                <div>Ask us a question</div>
                            </div>
                        </div>
                        <Modal id="package1" show={this.state.showMe} onHide={this.handleCancel.bind(this)} animation={false}>
                            <Modal.Header closeButton>
                            <Modal.Title>
                                <h5>Choose a Vamos package and start learning Spanish ASAP! </h5>
                            </Modal.Title>
                            </Modal.Header>
                                <Modal.Body>
                                <div id="buy-classes">
                                    { pack ? pack.map(p => {
                                        return (<div onClick={(e) => this.buyPackage(e)} key={p}>{p}</div>)
                                    }) : ('')
                                    }
                                </div>
                                {/* <Modal.Footer>
                                        <Button variant="secondary" onClick={this.handleCancel.bind(this)}>
                                            Cancel
                                        </Button>
                                        <Button variant="primary" onClick={this.handleClose.bind(this)}>
                                            Buy
                                        </Button>
                                </Modal.Footer> */}
                                </Modal.Body>
                        </Modal>
                        <Modal id="package" show={this.state.show} onHide={this.handleCancel.bind(this)} animation={false}>
                            <Modal.Header closeButton>
                            <Modal.Title>VAMOS {packagePrice}</Modal.Title>
                            </Modal.Header>
                                <Modal.Body>
                                <div >
                                    <Elements stripe={stripePromise}>
                                        <CheckoutForm/>
                                    </Elements> 
                                </div>
                                {/* <Modal.Footer>
                                        <Button variant="secondary" onClick={this.handleCancel.bind(this)}>
                                            Cancel
                                        </Button>
                                        <Button variant="primary" onClick={this.handleClose.bind(this)}>
                                            Buy
                                        </Button>
                                </Modal.Footer> */}
                                </Modal.Body>
                        </Modal>
                        {/* </div> */}
                    </div>
                </div>
                <footer style={{"padding":"0.8em", "backgroundColor":"#AC2322", "color":"white"}}>© Vamos Academy 2020</footer>
            </div>
        )
    }
}

export default withAuth(Payments)

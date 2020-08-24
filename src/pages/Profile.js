import React, { Component } from 'react'
import { withAuth } from "../lib/AuthProvider";
import Navbar from '../components/Navbar';
import axios from 'axios';
import Image from 'react-bootstrap/Image';
import { Link } from "react-router-dom";
import Modal from 'react-bootstrap/Modal'

class Profile extends Component {
    state = {
        email: 'Unknown',
        level: 'Unknown',
        whatsapp: 'Rosebt',
        address: 'Carrer de Pujades 85',
        joinedClasses: [],
        show:false
        }
   
    async componentDidMount() {
        let id = this.props.user._id
        await axios.get(`${process.env.REACT_APP_API_URL}/users/${id}`)
        .then(res => {
        let data = res.data;
        axios.get(`${process.env.REACT_APP_API_URL}/events`)
        .then(joinedClass => {
            let joined = joinedClass.data;
            let joinedClasses = [];
            joined.forEach(theClass => {
                let students = theClass.students;
                return students.forEach(student => {
                        if (this.props.user.username === student) {
                        joinedClasses.push(theClass);
                        }
                    })
                })
                this.setState({joinedClasses: joinedClasses })
            })
           this.setState({email: data.email, level: data.level })
        })
        .catch(err => {
            console.log(err)
        })
    }

    handleCancel = async () => {
        this.setState({show:false})
    }


    handleSubmit = (e) => {
        e.preventDefault();
        let id = this.props.user._id;
        let { file } = this.state;
        let formData = new FormData();
        formData.append("file", file);
    
        const config = {
          headers: {
            "content-type": "multipart/form-data",
          },
        };
    
        axios
          .post(
            `${process.env.REACT_APP_API_URL}/users/upload/${id}`,
            formData,
            config
          )
          .then((res) => {
            alert("The file was successfully uploaded");
            const theFile = this.fileUpload.files[0];
            this.setState({ fileName: theFile.name, objects: res.data.objects });
    
            this.uploadFile();
          })
          .catch((error) => {
            console.log(error);
          });
      };

      updateInfo = () => {
          this.setState({show:true})
      }

    render() {
        let {user} = this.props;
        let {email, level, whatsapp, address, studentId} = this.state;


        return (
            <div>
                <Navbar/>
                <div id="profile">
                    <h1 style={{fontFamily:"Edo", fontSize:"5em", color:"#AC2322"}}>Student Info</h1>
                    <div id="side-menu">
                    {/* Upload Profile Pic */}
                            <Link to="/home"><Image fluid src="/logo.png" alt="logo" style={{width:"auto", height:"100px", paddingBottom:"0.3em", marginBottom:"1em"  }} /></Link>
                            <Link to="/Calendar"><button className="side-btns"><span>Calendar</span></button></Link>
                            <Link to={`/${user.username}`}><button className="active-btns"><span>Profile</span></button></Link>
                            <Link to="/C&A"><button className="side-btns"><span>Classes <br/> & Activities</span></button></Link>
                            <Link to="/messages"><button className="side-btns"><span>Messages</span></button></Link>
                            <Link to="/availability"><button className="side-btns"><span>Availability</span></button></Link>
                            <Link to="/payments"><button className="side-btns"><span>Payments</span></button></Link>
                    </div>
                    <div id="p">
                        <div style={{width:"200px", height:"25vh", borderRadius:"20px"}}>
                            <Image style={{border:"5px solid white", width:"100%", height:"100%"}}  src="/profile-pic.jpg" roundedCircle fluid />
                        </div>
                        <div id="profile-menu">
                            <p>Username: {user.username}</p>
                            <p>Student ID: {studentId}</p>
                            <p>Learning Group: {level}</p>
                            <p>Email: {email}</p>
                            <p>Whatsapp: {whatsapp}</p>
                            <p>Address: {address}</p>
                        </div>
                    </div>
                    <Modal show={this.state.show}  onHide={this.handleCancel.bind(this)}>
                        <Modal.Header closeButton>
                            <Modal.Title>Update your information</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                        <p>Upload a profile picture</p>
                            <form
                                onSubmit={this.handleSubmit}
                                encType="multipart/form-data"
                            >
                            <input
                                onChange={this.onChangeHandler}
                                type="file"
                                name="file"
                                ref={(ref) => (this.fileUpload = ref)}
                                style={{
                                color: "black",
                                backgroundColor: "white",
                                margin: "0 auto",
                                width: "70%",
                                }}
                            />
                            <button
                                id="save-object-btn"
                                onClick={this.showCreateButton}
                                type="submit"
                                value="upload"
                                // disabled={!enabled}
                            >
                            Save
                            </button>
                        </form>
                    </Modal.Body>
                    </Modal>
                    <button onClick={this.updateInfo} className="update-info">Update Information</button>
                </div>
                <footer style={{"padding":"0.8em", "backgroundColor":"#AC2322", "color":"white"}}>© Vamos Academy 2020</footer>
            </div>
        )
    }
}

export default withAuth(Profile)

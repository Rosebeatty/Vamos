import React, { Component } from "react";
import { Link } from "react-router-dom";
import { withAuth } from "../lib/AuthProvider";
import Navbar from "../components/Navbar";
import axios from 'axios';
import UploadContent from '../components/UploadContent'
import Image from 'react-bootstrap/Image';

class Classroom extends Component {
    state = {
        learning_group: ['A1', 'A2', 'A3', 'A4', 'A5', 'A6', 'A7', 'A8', 'A9']
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
    
    render() {
        let {learning_group} = this.state;

    return (
        <div id="classroom">
            <Navbar/>
                { (this.props.user.username === 'admin') ?
                (
                  <div>
                    <h1 style={{fontFamily:"Edo", fontSize:"5em", color:"#AC2322", marginLeft:"1.7em"}}>Vamos Classroom</h1>                
                      <div id="class-materials">
                          { learning_group ? learning_group.map(g => {
                              return (<Link to={`/upload-content/${g}`} key={g}><div className="class-material">{g}</div></Link>);
                          }) : ('')
                          }
                      </div>
                      <div id="side-menu">
                                <Link to="/home"><Image fluid src="/logo.png" alt="logo" style={{width:"auto", height:"100px", paddingBottom:"0.3em", marginBottom:"1em"  }} /></Link>
                                <Link to="/Calendar"><button className="side-btns"><span>Calendar</span></button></Link>
                                <Link to={`/admin`}><button className="active-btns"><span>Profile</span></button></Link>
                                <Link to="/C&A"><button className="side-btns"><span>Classes <br/> & Activities</span></button></Link>
                                <Link to="/messages"><button className="side-btns"><span>Messages</span></button></Link>
                                <Link to="/availability"><button className="side-btns"><span>Availability</span></button></Link>
                                <Link to="/payments"><button className="side-btns"><span>Payments</span></button></Link>
                      </div>
                {/* <UploadContent handleSubmit={this.handleSubmit}/> */}
                    </div>
                )
                : ( <div>No Entry</div> )
                }
            <footer style={{"padding":"0.8em", "backgroundColor":"#AC2322", "color":"white", marginTop:"0"}}>© Vamos Academy 2020</footer>
         </div>

        )
       }

}

export default withAuth(Classroom);

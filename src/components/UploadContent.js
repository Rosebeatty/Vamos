import React from 'react';
import Navbar from './Navbar';
import { Link } from "react-router-dom";
import Image from 'react-bootstrap/Image';

export default function UploadContent(props) {
    console.log(props.match.params.id)
    return (
        <div>
        <Navbar/>
            <h4 style={{paddingLeft: "7em"}}>Upload content to {props.match.params.id}</h4>
            <div id="side-menu">
                    <Image fluid src="/logo.png" alt="logo" style={{width:"auto", height:"100px", paddingBottom:"0.3em", marginBottom:"1em" }} />
                    <Link to="/Calendar"><button className="side-btns"><span>Calendar</span></button></Link>
                            <Link to={`/admin`}><button className="active-btns"><span>Profile</span></button></Link>
                            <Link to="/C&A"><button className="side-btns"><span>Classes <br/> & Activities</span></button></Link>
                            <Link to="/messages"><button className="side-btns"><span>Messages</span></button></Link>
                            <Link to="/availability"><button className="side-btns"><span>Availability</span></button></Link>
                            <Link to="/payments"><button className="side-btns"><span>Payments</span></button></Link>
            </div>
            <div id="file-upload">
            <div>
                <p>{props.match.params.id}.1</p>
                <form
                    onSubmit={props.handleSubmit}
                    encType="multipart/form-data"
                >
                <input
                    // onChange={props.onChangeHandler}
                    type="file"
                    name="file"
                     // ref={(ref) => (this.fileUpload = ref)}
                    style={{
                    color: "black",
                    backgroundColor: "white",
                    margin: "0 auto",
                    width: "70%",
                    }}
                />
                <button
                    id="save-object-btn"
                    type="submit"
                    value="upload"
                    // disabled={!enabled}
                >
                Save
                </button>
                </form>
            </div>
                <p>{props.match.params.id}.2</p>
                            <form
                                onSubmit={props.handleSubmit}
                                encType="multipart/form-data"
                            >
                            <input
                                // onChange={props.onChangeHandler}
                                type="file"
                                name="file"
                                // ref={(ref) => (this.fileUpload = ref)}
                                style={{
                                color: "black",
                                backgroundColor: "white",
                                margin: "0 auto",
                                width: "70%",
                                }}
                            />
                            <button
                                id="save-object-btn"
                                type="submit"
                                value="upload"
                                // disabled={!enabled}
                            >
                            Save
                            </button>
                        </form>
                <p>{props.match.params.id}.3</p>
                            <form
                                onSubmit={props.handleSubmit}
                                encType="multipart/form-data"
                            >
                            <input
                                // onChange={props.onChangeHandler}
                                type="file"
                                name="file"
                                // ref={(ref) => (this.fileUpload = ref)}
                                style={{
                                color: "black",
                                backgroundColor: "white",
                                margin: "0 auto",
                                width: "70%",
                                }}
                            />
                            <button
                                id="save-object-btn"
                                type="submit"
                                value="upload"
                                // disabled={!enabled}
                            >
                            Save
                            </button>
                        </form>
                </div>
        </div>
    )
}

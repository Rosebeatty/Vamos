import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import { withAuth } from "./lib/AuthProvider";
import './css/App.css';
import Signup from './pages/Signup';
import Login from './pages/Login';
import Home from './pages/Home';
import Main from './pages/Main';
import Cal from './pages/CalendarPage';
import Profile from './pages/Profile';
import Payments from './pages/Payments';
import Messages from './pages/Messages';
import Availability from './pages/Availability';
import CandA from './pages/CandA';
import UploadContent from './components/UploadContent';
import Classroom from './pages/Classroom';
// import Admin from './pages/Admin';
import AnonRoute from './components/AnonRoute';
import PrivateRoute from './components/PrivateRoute';

function App() {
  return (
    <div className="App">
      <Switch>
          <AnonRoute exact path="/" component={Home} />
          <AnonRoute exact path="/signup" component={Signup} />
          <AnonRoute exact path="/login" component={Login} />
          <PrivateRoute exact path="/Home" component={Main} />
          <PrivateRoute exact path="/calendar" component={Cal} />
          <PrivateRoute exact path="/admin" component={Classroom} />
          <PrivateRoute exact path="/upload-content/:id" component={UploadContent} />
          <PrivateRoute exact path="/availability" component={Availability} />
          <PrivateRoute exact path="/C&A" component={CandA} />
          <PrivateRoute exact path="/messages" component={Messages} />
          <PrivateRoute exact path="/payments" component={Payments} />
          <PrivateRoute exact path="/:username" component={Profile} />
          {/* <AnonRoute exact path="/admin" component={Admin} /> */}

           {/*<PrivateRoute exact path="/:id" component={UserPage} /> */}
      </Switch>
    </div>
  );
}

export default withAuth(App);

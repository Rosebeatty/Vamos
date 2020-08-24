import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware} from "redux";
import 'bootstrap/dist/js/bootstrap.bundle.min';
import 'bootstrap/dist/css/bootstrap.min.css';
import $ from 'jquery';
import App from './App';
import { BrowserRouter as Router } from 'react-router-dom';
import AuthProvider from './lib/AuthProvider';
// import { CalendarStore } from "./store";
// const calendarStore = new CalendarStore();
// import { Provider } from "react-redux";
// import thunk from "redux-thunk";
// import reducers from './store/reducers/albumsReducer'

// let store = createStore(reducers, applyMiddleware(thunk))

ReactDOM.render(
    <Router>
    {/* <Provider 
    // store={store}
    > */}
      <AuthProvider >
        <App />
      </AuthProvider>
    {/* </Provider> */}
    </Router>,
    document.getElementById('root'),
  );

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA

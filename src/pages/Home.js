import React, { Component } from 'react'
import Navbar from '../components/Navbar'
import { withAuth } from '../lib/AuthProvider'

class Home extends Component {
    render() {
        return (
            <div>
                <Navbar/>
                <h2>Welcome to Vamos Academy</h2>
            </div>
        )
    }
}

export default withAuth(Home)
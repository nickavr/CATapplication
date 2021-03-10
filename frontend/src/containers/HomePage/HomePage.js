import './HomePage.css';
import React from 'react';
import axios from 'axios';
import { GoogleLogout } from 'react-google-login';
let userService = require('../../Services/UserService');

let credentials = require('../../config/google-credentials.json');

const HomePage = function (props) {
    let user = JSON.parse(localStorage.getItem('currentUser'));
    console.log(user);

    const logout = res => {
        userService.emptyLocalStorage();
        props.history.push('/');
    };

    return (
        <>
            {' '}
            <h1>HomePage</h1>
            <GoogleLogout
                clientId={credentials.clientID}
                buttonText="Logout"
                onLogoutSuccess={logout}
                signOut={true}
            ></GoogleLogout>
        </>
    );
};

export default HomePage;

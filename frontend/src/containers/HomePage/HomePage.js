import './HomePage.css';
import React from 'react';
import { GoogleLogout } from 'react-google-login';

let credentials = require('../../config/google-credentials.json');

const HomePage = function (props) {
    const logout = res => {
        console.log(res);
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
            ></GoogleLogout>
        </>
    );
};

export default HomePage;

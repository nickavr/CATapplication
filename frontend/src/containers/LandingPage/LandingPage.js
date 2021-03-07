import React from 'react';
import { GoogleLogin } from 'react-google-login';
import axios from 'axios';
import cogoToast from 'cogo-toast';
import './LandingPage.css';

let credentials = require('../../config/google-credentials.json');
const API_BASE_URL = process.env.APP_BASE_URL_API;
//FIXME: env links not visible

function LandingPage(props) {
    const responseGoogleOnSuccess = response => {
        console.log(response.Is.ot);
        // console.log(response.tokenId);
        console.log(API_BASE_URL);

        axios
            .post(
                'http://localhost:8080/api' + '/login',
                { token: response.tokenId },
                {
                    headers: {
                        'Content-Type': 'application/JSON',
                    },
                }
            )
            .then(res => {
                // console.log(res);
                cogoToast.success('Login Successful', {
                    hideAfter: 4,
                    position: 'top-center',
                    heading: 'Welcome!',
                });
                props.history.push('/home');
            })
            .catch(err => {
                console.log(err);
            });
    };

    const responseGoogleOnFailure = response => {
        console.log(response.Is.ot);
        cogoToast.warn('Failed login', {
            hideAfter: 4,
            position: 'top-center',
            heading: 'Something went wrong',
        });
    };

    return (
        <header className="landingPage-container">
            <div className="hero-textbox">
                <h1>
                    Welcome to AdapTest. <br />
                    Use your institutional email.
                </h1>
                <GoogleLogin
                    clientId={credentials.clientID}
                    buttonText="Login"
                    onSuccess={responseGoogleOnSuccess}
                    onFailure={responseGoogleOnFailure}
                    cookiePolicy={'single_host_origin'}
                    isSignedIn={true}
                />
            </div>
        </header>
    );
}

export default LandingPage;

import React from 'react';
import { GoogleLogin } from 'react-google-login';
import axios from 'axios';
import cogoToast from 'cogo-toast';
import './LandingPage.css';
let credentials = require('../../config/google-credentials.json');
const URL = require('../../config/url-info.json');
//FIXME: env links not visible

function LandingPage(props, context) {
    const responseGoogleOnSuccess = response => {
        console.log(response.Is.ot);
        //TODO: uncomment validation for only accepting institutional emails:
        // if (!response.Is.ot.includes('ase')) {
        //     cogoToast.warn('Failed login', {
        //         hideAfter: 4,
        //         position: 'top-center',
        //         heading: 'Use Institutional email',
        //     });
        //     return 0;
        // }
        // console.log(response.tokenId);

        axios
            .post(
                URL.API_BASE_URL + '/login',
                { token: response.tokenId },
                {
                    headers: {
                        'Content-Type': 'application/JSON',
                    },
                }
            )
            .then(res => {
                // console.log(res.data[0]);
                cogoToast.success('Login Successful', {
                    hideAfter: 4,
                    position: 'top-center',
                    heading: 'Welcome!',
                });
                localStorage.setItem(
                    'currentUser',
                    JSON.stringify(res.data[0])
                );
                props.history.push('/home');
            })
            .catch(err => {
                console.log(err);
            });
    };

    const responseGoogleOnFailure = response => {
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

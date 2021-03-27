import React from 'react';
import axios from 'axios';
import cogoToast from 'cogo-toast';
import UserService from '../../Services/UserService';
import './JoinTestPage.css';

const URL = require('../../config/url-info.json');

function JoinTestPage() {
    let user = UserService.getUserFromStorage();
    let email = user.email;
    const handleJoinTest = () => {
        axios
            .get(`${URL.API_BASE_URL}/user/token`, {}, { params: { email } })
            .then(console.log('AAAAAAAAA'));
    };

    return (
        <div className="join-test-container">
            <h2 className="join-test-greetings-message">
                Welcome to adaptest, if you have been assigned to a test, please
                click start
            </h2>
            <button
                className="btn-signin btn-lg btn-block"
                onClick={() => handleJoinTest()}
            >
                Start
            </button>
        </div>
    );
}

export default JoinTestPage;
